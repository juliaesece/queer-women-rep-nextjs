"use server"
import client from "@/app/lib/mongo"
import parseFilter from "./parseFilter"

export async function countCouples(unparsedSupercategory, extraFilter) {

    const supercategoryLookup: { "tv-shows": string, "movies": string } = {
        "tv-shows": "TV Show",
        "movies": "Movie"
    }

    let {sort, filter} = parseFilter(extraFilter)

    if (unparsedSupercategory != null && unparsedSupercategory != "home") {
        const supercategory: string = supercategoryLookup[unparsedSupercategory as keyof typeof supercategoryLookup]
        filter = { mediaType: supercategory }
    }


    try {
        
        const database = client.db('couples');
        const collection = database.collection('couples');
        const result = await
            collection
                .countDocuments(filter);
        return result;
    } catch (error) {
        return false
    }
}