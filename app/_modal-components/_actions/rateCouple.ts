"use server";

import { ObjectId } from 'mongodb';
import clientPromise from "@/app/lib/mongo";

export async function rateCouple(collectionName:string, ratingsId:string, userId:string, rating:number) {

    try {
        const parsedUserId = new ObjectId(userId)
        const parsedRatingsId = new ObjectId(ratingsId)

        const client = await clientPromise
        const database = client.db('couples');
        const ratings = database.collection(collectionName);
        const ratingsKey = "ratings." + parsedUserId
        let setObject = {}
        setObject[ratingsKey] = rating

        const result = await ratings.updateOne(
            { _id: parsedRatingsId },
            {
                $set: setObject
            }
        )

        if (!result.acknowledged || result.matchedCount != 1) {
            throw new Error("Database error, please try again in a few minutes")
        }

        const newResult = await ratings.findOne({ _id: parsedRatingsId })
        console.log(newResult)
        const newRatings = Object.values(newResult.ratings)
        const sum = newRatings.reduce((a: number, b: number) => a + b, 0);
        const avg = (sum / newRatings.length) || 0;
        console.log("avg", avg)
        const updatedCouples = await database.collection("couples").updateOne({_id: newResult.coupleId}, {$set: {"globalRating": avg}})
        if (!updatedCouples.acknowledged || updatedCouples.matchedCount != 1) {
            throw new Error("Database error, please try again in a few minutes")
        }

        return true;
    } catch (error) {
        console.log("[id route] Server error on couples route")
        console.log(error)
        return false
    }
}