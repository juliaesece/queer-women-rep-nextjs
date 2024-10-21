"use server"

import { ObjectId } from 'mongodb';
import clientPromise from "@/app/lib/mongo"

export async function getCoupleById(unparsedId: string) {
    try {
        const id = new ObjectId(unparsedId)
        const client = await clientPromise
        const database = client.db('couples');
        const collection = database.collection('couples');
        const data = await
            collection.findOne({ _id: id })
        const parsedData = { ...data,
             _id: data._id.toString(),
              reviewsId: data.reviewsId && data.reviewsId.toString(),
              watchedByUsers: data.watchedByUsers && data.watchedByUsers.map((el) => (el.toString())),
              createdBy: data.createdBy ? data.createdBy.toString() : null }
        return parsedData;
    } catch (error) {
        console.error("[createCoupleById] Server error on couples route")
        console.error(error)
        return { error: "There was an error" };
    }
}