"use server";

import { ObjectId } from 'mongodb';
import clientPromise from "@/app/lib/mongo"

export async function getReviews(unparsedCoupleId, unparsedId) {    
    try {
        const client = await clientPromise
        const database = client.db('couples');
        const reviews = database.collection('reviews');

        if (!unparsedId) {
            const couples = database.collection('couples');
            const couplesId = new ObjectId(unparsedCoupleId)

            const reviewsResult = await
                reviews.insertOne({ "coupleId": couplesId, "reviews": [] })
            if (!reviewsResult.acknowledged || !reviewsResult.insertedId) throw new Error("Database error when creating reviews section")

            const updateDoc = {
                $set: {
                    reviewsId: reviewsResult.insertedId,
                }
            }

            const finalResult = await couples.updateOne({ _id: unparsedCoupleId }, updateDoc)

            if (!finalResult.acknowledged || finalResult.modifiedCount != 1) throw new Error("Database error when updating couple")
            return { _id: reviewsResult.insertedId.toString(), couplesId: unparsedCoupleId.toString(), reviews: [] }
        } 
        const id = new ObjectId(unparsedId)

        const data = await
            reviews.findOne({ _id: id })

        const reviewsJson = JSON.parse(JSON.stringify(data))
        const secondParse = { ...reviewsJson, coupleId: reviewsJson.coupleId.toString() } // Shouldn't be neccesary but oh well
        return secondParse;
    } catch (error) {
        console.log("[getReviews] Server error on couples route")
        console.log(error)
        return { error: "There was an error" };
    } 
}