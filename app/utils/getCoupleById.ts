"use server"

import { ObjectId } from 'mongodb';
import client from "@/app/lib/mongo"
import { Couple } from './types';

export async function getCoupleById(unparsedId: string) {
    try {
        const id = new ObjectId(unparsedId)

        const database = client.db('couples');
        const collection = database.collection('couples');
        const data = await
            collection.findOne({ _id: id })
        const parsedData = {
            ...data,
            _id: data._id.toString(),
            reviewsId: data.reviewsId && data.reviewsId.toString(),
            watchedByUsers: data.watchedByUsers && data.watchedByUsers.map((el) => (el.toString())),
            createdBy: data.createdBy ? data.createdBy.toString() : null
        }
        return parsedData as unknown as Couple;
    } catch (error) {
        console.error("[createCoupleById] Server error on couples route")
        console.error(error)
        throw new Error("Server error on get by id")
    }
}