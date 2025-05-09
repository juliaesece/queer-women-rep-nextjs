"use server"

import client from "@/app/lib/mongo"
import { ObjectId } from 'mongodb';

export async function getDiscordLink() {

    try {
        const id = new ObjectId("681e5412517f07ae3ed76ebb")

        const database = client.db('couples');
        const collection = database.collection('discord');
        const data = await
            collection
                .findOne({ _id: id });
        const parsedData = {
            link: data.link,
            validUntil: data.validUntil,
            _id: data._id.toString(),
        }

        return parsedData;
    } catch (error) {
        console.error("[getDiscordLink] Server error on getDiscordLink route")
        console.error(error)
        throw new Error(error)
    }
}