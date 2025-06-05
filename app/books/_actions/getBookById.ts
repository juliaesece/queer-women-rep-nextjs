"use server"

import { ObjectId } from 'mongodb';
import client from "@/app/lib/mongo"
import { Book } from '../../utils/types';
import { getBookByIdSchema } from './schemas';

export async function getBookById(unparsedId: string) {
    try {
        // Validate input
        const validatedInput = getBookByIdSchema.parse({ unparsedId });
        const id = new ObjectId(validatedInput.unparsedId)

        const database = client.db('couples');
        const collection = database.collection('books');
        const data = await
            collection.findOne({ _id: id })
        const parsedData = {
            ...data,
            _id: data._id.toString()
        }
        return parsedData as unknown as Book;
    } catch (error) {
        console.error("[getBookById] Server error on books route")
        console.error(error)
        throw new Error("Server error on get by id")
    }
} 