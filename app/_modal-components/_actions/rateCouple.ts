"use server";

import { ObjectId } from 'mongodb';
import clientPromise from "@/app/lib/mongo";

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

        const client = await clientPromise
        const database = client.db('couples');
        const ratings = database.collection(collectionName)

        const ratingsKey = "ratings." + parsedUserId
        console.log(ratingsKey)
        let setObject = {}
        setObject[ratingsKey] = rating

        const result = await ratings.updateOne(
            { _id: parsedRatingsId },
            {
                $set: setObject
            }
        )

        console.log("result", result)

        if (!result.acknowledged) {
            throw new Error("Database error, please try again in a few minutes")
        }

        if (result.matchedCount != 1) {
            throw new Error("Database error, please try again in a few minutes")
        }


        const newResult = await ratings.findOne({ _id: parsedRatingsId })
        console.log(newResult)
        const newRatings = Object.values(newResult.ratings)
        console.log(newRatings)
        const sum = newRatings.reduce((a: number, b: number) => a + b, 0);
        console.log(sum)
        const avg = (Number(sum) / newRatings.length) || 0;
        console.log("avg", avg)
        const couplesSetObject = {}
        couplesSetObject[fieldToUpdate] = avg
        console.log(couplesSetObject)
        const updatedCouples = await database.collection("couples").updateOne({ _id: newResult._id }, { $set: couplesSetObject })
        if (!updatedCouples.acknowledged || updatedCouples.matchedCount != 1) {
            throw new Error("Database error, please try again in a few minutes")
        }

        return true;
    } catch (error) {   
        console.log("[rateCouple] Server error on couples route")
        console.log(error)
        return false
    }
}