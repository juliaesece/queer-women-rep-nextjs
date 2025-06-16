"use server";

import client from "@/app/lib/mongo";
import { Couple } from '../../utils/types';
import { ObjectId } from 'mongodb';
import { Collection } from 'mongodb';
import { revalidateTag } from "next/cache";

export async function createCouple(newCouple: Couple, userId: string) {

    try {
        const parsedUserId = new ObjectId(userId)

        const database = client.db('couples');
        const collection: Collection<Couple> = database.collection('couples');
        const parsedCouple = {
            ...newCouple,
            year: new Date(newCouple.year),
            createdBy: parsedUserId,
            globalRatingCount: newCouple.globalRating ? 1 : 0,
            chemistryCount: newCouple.chemistry ? 1 : 0,
            romanticConnectionCount: newCouple.romanticConnection ? 1 : 0,
            averageRating: (newCouple.chemistry + newCouple.romanticConnection + newCouple.globalRating) / 3
        } as Couple
        const result = await collection.insertOne(parsedCouple)

        if (!result.acknowledged || !result.insertedId) throw new Error("Database error when creating the new couple")

        const reviews = database.collection('reviews');
        const reviewsResult = await
            reviews.insertOne({ "coupleId": result.insertedId, "reviews": [] }) as { acknowledged: boolean, insertedId: ObjectId }
        if (!reviewsResult.acknowledged || !reviewsResult.insertedId) throw new Error("Database error when creating reviews section")



        // Store all ratings elsewhere, and compute the average. We'll store only the average on couple, and update it on writes

        let globalSetObject = { "_id": new ObjectId(result.insertedId), "ratings": {} }

        if (parsedCouple.globalRating) {
            globalSetObject.ratings[userId] = parsedCouple.globalRating
            const globalResult = await database.collection('globalRatings').insertOne(globalSetObject)
            if (!globalResult.acknowledged || !globalResult.insertedId) throw new Error("Database error when creating globalRatings section")
        }

        if (parsedCouple.chemistry) {
            globalSetObject.ratings[userId] = parsedCouple.chemistry
            const chemistryResult = await database.collection('chemistryRatings').insertOne(globalSetObject)
            if (!chemistryResult.acknowledged || !chemistryResult.insertedId) throw new Error("Database error when creating revchemistryRatingsiews section")
        }

        if (parsedCouple.romanticConnection) {
            globalSetObject.ratings[userId] = parsedCouple.romanticConnection
            const romanticResult = await database.collection('romanticRatings').insertOne(globalSetObject)
            if (!romanticResult.acknowledged || !romanticResult.insertedId) throw new Error("Database error when creating romanticRatings section")
        }

        const updateDoc = {
            $set: {
                reviewsId: reviewsResult.insertedId
            }
        }

        const finalResult = await collection.updateOne({ _id: result.insertedId }, updateDoc)

        if (!finalResult.acknowledged || finalResult.modifiedCount != 1) throw new Error("Database error when updating couple")
        revalidateTag('coupleData')
        return true;
    } catch (error) {
        console.error("[createCouple] Server error on couples route")
        console.error(error)
        return false
    }
}