"use server";

import { ObjectId } from 'mongodb';
import client from "@/app/lib/mongo";
import { revalidateTag } from 'next/cache';

export async function rateCouple(collectionName: string, coupleId: string, userId: string, rating: number) {

    let fieldToUpdate

    switch (collectionName) {
        case "globalRatings":
            fieldToUpdate = "globalRating"
            break;
        case "chemistryRatings":
            fieldToUpdate = "chemistry"
            break;
        case "romanticRatings":
            fieldToUpdate = "romanticConnection"
            break;
        default:
            throw new Error("Invalid collectionName")
    }

    try {
        const parsedUserId = new ObjectId(userId)
        const parsedRatingsId = new ObjectId(coupleId)

        const database = client.db('couples');
        const ratings = database.collection(collectionName)

        const ratingsKey = "ratings." + parsedUserId
        let setObject = { [ratingsKey]: rating }

        const ratingsResult = await ratings.updateOne(
            { _id: parsedRatingsId },
            {
                $set: setObject
            },
            { upsert: true }
        )

        if (!ratingsResult.acknowledged || !(ratingsResult.matchedCount == 1 || ratingsResult.upsertedCount == 1 )) {
            console.log(ratingsResult)
            console.log()
            throw new Error("Database error, please try again in a few minutes")
        }

        const updatedRatingDoc = await ratings.findOne({ _id: parsedRatingsId })

        if (!updatedRatingDoc) {
            throw new Error("Database error, please try again in a few minutes")
        }

        // Switch to incremental updates when necessary
        const updatedRatingsArray = Object.values(updatedRatingDoc.ratings) as number[]
        const sum = updatedRatingsArray.reduce((a: number, b: number) => a + b, 0);
        const avg = (Number(sum) / updatedRatingsArray.length) || 0;
        const couplesSetObject: Record<string, number> = {}
        couplesSetObject[fieldToUpdate] = avg

        const fieldToUpdateCount = fieldToUpdate + "Count"
        couplesSetObject[fieldToUpdateCount] = updatedRatingsArray.length

        const updatedCouples = await database.collection("couples").updateOne({ _id: updatedRatingDoc._id }, { $set: couplesSetObject })
        if (!updatedCouples.acknowledged || updatedCouples.matchedCount != 1) {
            throw new Error("Database error, please try again in a few minutes")
        }

        const updateAverage = await database.collection("couples").updateOne(
            { _id: updatedRatingDoc._id },
            [
                {
                    $set: {
                        averageRating: { $avg: ["$romanticConnection", "$chemistry", "$globalRating"] }
                    }
                }
            ]
        )

        if (!updateAverage.acknowledged || updateAverage.matchedCount != 1) {
            throw new Error("Database error, please try again in a few minutes")
        }

        const tag = `couple:${coupleId}`;
        try {
            revalidateTag(tag);
            console.log(`Successfully revalidated tag: ${tag}`);
        } catch (error) {
            console.error(`Error revalidating tag ${tag}:`, error);
        }

        return {success: true, newRating: avg, newCount: updatedRatingsArray.length };
    } catch (error) {
        console.error("[rateCouple] Server error on couples route")
        console.error(error)
        return {success: false, newRating: 0, newCount: 0}
    }
}