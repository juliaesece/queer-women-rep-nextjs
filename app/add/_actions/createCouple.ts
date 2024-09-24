"use server";

import clientPromise from "@/app/lib/mongo";
import { Couple } from '../types';

export async function createCouple(newCouple: Couple) {

    try {
        const client = await clientPromise
        const database = client.db('couples');
        const collection = database.collection('couples');
        const data = await
            collection.insertOne(newCouple)
        return true;
    } catch (error) {
        console.log("[id route] Server error on couples route")
        console.log(error)
        return false
    }
}