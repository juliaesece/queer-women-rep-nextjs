"use server"

import { ObjectId } from 'mongodb';
import client from "@/app/lib/mongo"
import { Couple } from './types';
import { unstable_cache } from 'next/cache';

export async function getCoupleById(unparsedId: string): Promise<Couple | null> {
    const keyParts = [`get-couple-by-id`, `couple:${unparsedId}`];

    const cachedCouple = await unstable_cache(
        async () => {
            try {
                const id = new ObjectId(unparsedId);
                const database = client.db('couples');
                const collection = database.collection('couples');
                const data = await collection.findOne({ _id: id });

                if (!data) {
                    return null;
                }

                const parsedData = {
                    ...data,
                    _id: data._id.toString(),
                    reviewsId: data.reviewsId?.toString(),
                    watchedByUsers: data.watchedByUsers?.map((el: ObjectId) => el.toString()),
                    createdBy: data.createdBy?.toString() || null,
                };
                return parsedData as unknown as Couple;
            } catch (error) {
                console.error("[getCoupleById] Server error on couples route", error);
                return (null)
            }
        },
        keyParts,
        {
            tags: ['couples', `couple:${unparsedId}`],
        }
    )();

    return cachedCouple;
}