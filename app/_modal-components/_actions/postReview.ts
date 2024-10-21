"use server";

import { ObjectId } from 'mongodb';
import clientPromise from "@/app/lib/mongo";

export async function postReview(reviewsId, newReview) {

    try {
        const id = new ObjectId(reviewsId)

        const client = await clientPromise
        const database = client.db('couples');
        const reviews = database.collection('reviews');
        const result = await reviews.updateOne(
            { _id: id },
            {
                $push: {
                    "reviews": newReview
                }
            }
        )
        
        if (!result.acknowledged || result.matchedCount != 1) {
            throw new Error("Database error, please try again in a few minutes")
        }

        return true;
    } catch (error) {
        console.error("[id route] Server error on couples route")
        console.error(error)
        return false
    }
}