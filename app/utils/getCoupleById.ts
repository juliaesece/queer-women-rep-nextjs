"use server"

import { ObjectId } from 'mongodb';
import clientPromise from "@/app/lib/mongo"

export async function getCoupleById(unparsedId: string) {
    try {

        console.log(unparsedId)
        const id = new ObjectId(unparsedId)
        console.log(id)
        const client = await clientPromise
        const database = client.db('couples');
        const collection = database.collection('couples');
        console.log("id coupels", id)
        const data = await
            collection.findOne({ _id: id })
        const parsedData = { ...data,
             _id: data._id.toString(),
              reviewsId: data.reviewsId && data.reviewsId.toString(),
              watchedByUsers: data.watchedByUsers && data.watchedByUsers.map((el) => (el.toString())) }
        return parsedData;
    } catch (error) {
        console.log("[id route] Server error on couples route")
        console.log(error)
        return { error: "There was an error" };
    }
}