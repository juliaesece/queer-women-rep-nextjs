"use server"
import client from "@/app/lib/mongo"

export async function countCouples(unparsedSupercategory) {

    const supercategoryLookup: { "tv-shows": string, "movies": string } = {
        "tv-shows": "TV Show",
        "movies": "Movie"
    }

    let filter = {}
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