"use server";

import { ObjectId } from 'mongodb';
import clientPromise from "@/app/lib/mongo"

export async function getReviews(unparsedId: string) {
    try {
        const id = new ObjectId(unparsedId)
        const client = await clientPromise
        const database = client.db('couples');
        const reviews = database.collection('reviews');
        const data = await
            reviews.findOne({ _id: id })
        if (!data) return []
        const reviewsJson = JSON.parse(JSON.stringify(data))
        const secondParse = {...reviewsJson, coupleId: reviewsJson.coupleId.toString()} // Shouldn't be neccesary but oh well
        return secondParse;
    } catch (error) {
        console.log("[id route] Server error on couples route")
        console.log(error)
        return { error: "There was an error" };
    }
}