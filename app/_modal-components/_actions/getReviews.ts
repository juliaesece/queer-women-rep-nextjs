"use server";

import { ObjectId } from 'mongodb';
import clientPromise from "@/app/lib/mongo"

export async function getReviews(unparsedCoupleId) {
    try {
        const client = await clientPromise
        const database = client.db('couples');
        const reviews = database.collection('reviews');
        const couplesId = new ObjectId(unparsedCoupleId)

        const data = await
            reviews.findOne({ _id: couplesId })

        if (!data) {
            const reviewsResult = await
                reviews.insertOne({ "_id": couplesId, "reviews": [] })
            if (!reviewsResult.acknowledged || !reviewsResult.insertedId) throw new Error("Database error when creating reviews section")

            return { _id: unparsedCoupleId, reviews: [] }
        }

        const parsedData = { ...data, _id: data._id.toString() }
        return parsedData;
    } catch (error) {
        console.error("[getReviews] Server error on couples route")
        console.error(error)
        return { error: "There was an error" };
    }
}