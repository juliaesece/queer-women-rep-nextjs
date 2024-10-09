"use server";

import clientPromise from "@/app/lib/mongo";
import { Couple } from '../../utils/types';

export async function createCouple(newCouple: Couple) {

    // Convert newcouple TODO!!
    /*
    year to date
    screentime, story importance, global rating, romantic connection, concernshomophobia, and chemistry to numbers
    */

    try {
        const client = await clientPromise
        const database = client.db('couples');
        const collection = database.collection('couples');
        const parsedCouple = {...newCouple, year: new Date (newCouple.year)}
        const result = await collection.insertOne(parsedCouple)

        if (!result.acknowledged || !result.insertedId) throw new Error("Database error when creating the new couple")

        const reviews = database.collection('reviews');
        const reviewsResult = await
            reviews.insertOne({ "coupleId": result.insertedId, "reviews": [] })
        if (!result.acknowledged || !result.insertedId) throw new Error("Database error when creating reviews section")

        const updateDoc = {
            $set: {
                reviewsId: reviewsResult.insertedId,
            }
        }

        const finalResult = await collection.updateOne({ _id: result.insertedId }, updateDoc)
        
        if (!finalResult.acknowledged || finalResult.modifiedCount != 1) throw new Error("Database error when updating couple")

        return true;
    } catch (error) {
        console.log("[id route] Server error on couples route")
        console.log(error)
        return false
    }
}