"use server";

import { ObjectId } from 'mongodb';
import client from "@/app/lib/mongo";
import { rateBookSchema } from './schemas';

export async function rateBook(bookId: string, userId: string, rating: number) {
    try {
        // Validate input
        const validatedInput = rateBookSchema.parse({ bookId, userId, rating });
        const parsedUserId = new ObjectId(validatedInput.userId)
        const parsedBookId = new ObjectId(validatedInput.bookId)

        const database = client.db('couples');
        const ratings = database.collection('ratings')

        const ratingsKey = "ratings." + parsedUserId
        let setObject: Record<string, number> = {}
        setObject[ratingsKey] = rating

        const result = await ratings.updateOne(
            { _id: parsedBookId },
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

        const newResult = await ratings.findOne({ _id: parsedBookId })
        const newRatings = Object.values(newResult?.ratings || {}) as number[]
        const sum = newRatings.reduce((a: number, b: number) => a + b, 0);
        const avg = (Number(sum) / newRatings.length) || 0;

        const booksSetObject = {
            rating: avg,
            ratingCount: newRatings.length
        }

        const updatedBooks = await database.collection("books").updateOne({ _id: newResult?._id as ObjectId }, { $set: booksSetObject })
        if (!updatedBooks.acknowledged || updatedBooks.matchedCount != 1) {
            throw new Error("Database error, please try again in a few minutes")
        }

        return true;
    } catch (error) {   
        console.error("[rateBook] Server error on books route")
        console.error(error)
        return false
    }
} 