"use server"

import client from "@/app/lib/mongo"
import { Book } from "../../utils/types"
import parseFilter from "../../utils/parseFilter"
import { getBooksSchema } from './schemas';

export async function getBooks(unparsedPage: number, extraFilter: string | undefined, tag) {
    try {
        // Validate input
        const validatedInput = getBooksSchema.parse({ unparsedPage, extraFilter, tag });
        let {sort, filter} = parseFilter(validatedInput.extraFilter, validatedInput.tag)

        const page: number = validatedInput.unparsedPage ? Number(validatedInput.unparsedPage) - 1 : 0
        const cardsPerPage = 9

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
            ratingCount: el.ratingCount || 0,
            year: el.year || new Date().getFullYear(),
            status: el.status || 'Unknown',
            areThereQueerCreators: el.areThereQueerCreators || false,
            shortDescription: el.shortDescription || '',
            longDescription: el.longDescription || '',
            storyImportance: el.storyImportance || 1,
            ending: el.ending || 'Unknown',
            concerns: {
                comingOut: el.concerns?.comingOut || false,
                death: el.concerns?.death || false,
                cheating: el.concerns?.cheating || false,
                homophobia: el.concerns?.homophobia || 1
            }
        }));
        return parsedData;
    } catch (error) {
        console.error("[getBooks] Server error on books route")
        console.error(error)
        throw new Error(error)
    }
}
