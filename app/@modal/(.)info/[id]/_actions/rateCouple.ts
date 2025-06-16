"use server";

import { ObjectId } from 'mongodb';
import client from "@/app/lib/mongo";

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
            break;
    }

    try {
        const parsedUserId = new ObjectId(userId)
        const parsedRatingsId = new ObjectId(coupleId)

        const database = client.db('couples');
        const ratings = database.collection(collectionName)

        const ratingsKey = "ratings." + parsedUserId
        let setObject = {
            [ratingsKey]: rating
        }

        const result = await ratings.updateOne(
            { _id: parsedRatingsId },
            {
                $set: setObject
            }
        )

        if (!result.acknowledged) {
            throw new Error("Database error, please try again in a few minutes")
        }

        if (result.matchedCount != 1) {
            throw new Error("Database error, please try again in a few minutes")
        }

        const newResult = await ratings.findOne({ _id: parsedRatingsId })
        if (!newResult) {
            throw new Error("Database error, please try again in a few minutes")
        }
        const newRatings = Object.values(newResult.ratings) as number[]
        const sum = newRatings.reduce((a: number, b: number) => a + b, 0);
        const avg = (Number(sum) / newRatings.length) || 0;
        const couplesSetObject: Record<string, number> = {}
        couplesSetObject[fieldToUpdate] = avg

        const fieldToUpdateCount = fieldToUpdate + "Count"
        couplesSetObject[fieldToUpdateCount] = newRatings.length

        const updatedCouples = await database.collection("couples").updateOne({ _id: newResult._id }, { $set: couplesSetObject })
        if (!updatedCouples.acknowledged || updatedCouples.matchedCount != 1) {
            throw new Error("Database error, please try again in a few minutes")
        }

        const updateAverage = await database.collection("couples").updateOne({ _id: newResult._id },
            {
                $set: {
                    averageRating: {
                        $avg: ["$romanticConnection", "$chemistry", "$globalRating"]
                    }
                }
            }
        )

        if (!updateAverage.acknowledged || updateAverage.matchedCount != 1) {
            throw new Error("Database error, please try again in a few minutes")
        }

        return true;
    } catch (error) {
        console.error("[rateCouple] Server error on couples route")
        console.error(error)
        return false
    }
}