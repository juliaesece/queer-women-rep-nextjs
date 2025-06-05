"use server"

import client from "@/app/lib/mongo"
import { Book } from "../../utils/types"
import parseFilter from "../../utils/parseFilter"

export async function getBooks(unparsedPage: number, extraFilter: string | undefined, tag) {
    let {sort, filter} = parseFilter(extraFilter, tag)

    const page: number = unparsedPage ? Number(unparsedPage) - 1 : 0
    const cardsPerPage = 9

    try {
        const database = client.db('couples');
        const collection = database.collection('books');
        const data = await
            collection
                .find(filter)
                .sort(sort)
                .skip(page * cardsPerPage)
                .limit(cardsPerPage)
                .toArray();

        const parsedData: Book[] = data.map((el: any) => ({ 
            title: el.title,
            author: el.author,
            genres: el.genres || [],
            tags: el.tags || [],
            rating: el.rating || 0,
            description: el.description || '',
            image: el.image || '',
            altImg: el.altImg || '',
            dateAdded: el.dateAdded || new Date(),
            _id: el._id.toString(),
            ratingCount: el.ratingCount || 0
        }));
        return parsedData;
    } catch (error) {
        console.error("[getBooks] Server error on books route")
        console.error(error)
        throw new Error(error)
    }
}
