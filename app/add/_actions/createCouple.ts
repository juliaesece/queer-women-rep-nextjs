"use server";

import client from "@/app/lib/mongo";
import { Couple } from '../../utils/types';
import { ObjectId } from 'mongodb';
import { Collection } from 'mongodb';

export async function createCouple(newCouple: Couple, userId: string) {

    try {
        const parsedUserId = new ObjectId(userId)
        
        const database = client.db('couples');
        const collection: Collection<Couple> = database.collection('couples');
        const parsedCouple = {...newCouple, year: new Date (newCouple.year), createdBy: parsedUserId} as Couple 
        const result = await collection.insertOne(parsedCouple)

        if (!result.acknowledged || !result.insertedId) throw new Error("Database error when creating the new couple")

        const reviews = database.collection('reviews');
        const reviewsResult = await
            reviews.insertOne({ "coupleId": result.insertedId, "reviews": [] }) as {acknowledged: boolean, insertedId: ObjectId}
        if (!reviewsResult.acknowledged || !reviewsResult.insertedId) throw new Error("Database error when creating reviews section")


        // Store all ratings elsewhere, and compute the average. We'll store only the average on couple, and update it on writes
        const globalResult = await database.collection('globalRatings').insertOne({
            "_id": new ObjectId(result.insertedId), "ratings": {parsedUserId: parsedCouple.globalRating}
        })
        if (!globalResult.acknowledged || !globalResult.insertedId) throw new Error("Database error when creating globalRatings section")

        const chemistryResult = await database.collection('chemistryRatings').insertOne({
            "_id": new ObjectId(result.insertedId), "ratings": {parsedUserId: parsedCouple.chemistry}
        })
        if (!chemistryResult.acknowledged || !chemistryResult.insertedId) throw new Error("Database error when creating revchemistryRatingsiews section")

        const romanticResult = await database.collection('romanticRatings').insertOne({
            "_id": new ObjectId(result.insertedId), "ratings": {parsedUserId: parsedCouple.romanticConnection}
        })
        if (!romanticResult.acknowledged || !romanticResult.insertedId) throw new Error("Database error when creating romanticRatings section")

        const updateDoc = {
            $set: {
                reviewsId: reviewsResult.insertedId
            }
        }

        const finalResult = await collection.updateOne({ _id: result.insertedId }, updateDoc)
        
        if (!finalResult.acknowledged || finalResult.modifiedCount != 1) throw new Error("Database error when updating couple")

        return true;
    } catch (error) {
        console.error("[createCouple] Server error on couples route")
        console.error(error)
        return false
    }
}