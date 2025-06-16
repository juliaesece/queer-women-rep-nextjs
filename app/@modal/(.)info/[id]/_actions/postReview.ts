"use server";

import { ObjectId } from 'mongodb';
import client from "@/app/lib/mongo";
import { Collection } from 'mongodb';
import { Review } from '@/app/utils/types';

export async function postReview(reviewsId: string, newReview: Review) {

    type Reviews = {
        messages: { _id: String, reviews: String[] }[],
    }

    try {
        const id = new ObjectId(reviewsId)


        const database = client.db('couples');
        const reviews: Collection<Reviews> = database.collection('reviews');

        const updateObject = {
            $push: {
                "reviews": newReview
            }
        }

        const result = await reviews.updateOne(
            { _id: id },
            updateObject
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