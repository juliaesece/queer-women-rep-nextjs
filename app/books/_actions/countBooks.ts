"use server"
import client from "@/app/lib/mongo"
import parseFilter from "../../utils/parseFilter"

export async function countBooks(extraFilter) {
    let {sort, filter} = parseFilter(extraFilter, null)

    try {
        const database = client.db('couples');
        const collection = database.collection('books');
        const result = await
            collection
                .countDocuments(filter);
        return result;
    } catch (error) {
        return false
    }
} 