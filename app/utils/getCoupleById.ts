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
        return data;
    } catch (error) {
        console.log("[id route] Server error on couples route")
        console.log(error)
        return { error: "There was an error" };
    }
}