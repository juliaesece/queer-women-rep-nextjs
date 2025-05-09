"use server"

import client from "@/app/lib/mongo"
import { ShortCouple } from "./types"
import parseFilter from "./parseFilter"

export async function getCouples(unparsedSupercategory: string, unparsedPage: number, extraFilter: string | undefined, tag) {

    const supercategoryLookup: { "tv-shows": string, "movies": string } = {
        "tv-shows": "TV Show",
        "movies": "Movie"
    }

    let {sort, filter} = parseFilter(extraFilter, tag)

    if (unparsedSupercategory != null && unparsedSupercategory != "home") {
        const supercategory: string = supercategoryLookup[unparsedSupercategory as keyof typeof supercategoryLookup]
        filter = { ...filter, mediaType: supercategory }
    }

    const page: number = unparsedPage ? Number(unparsedPage) - 1 : 0
    const cardsPerPage = 9

    try {

        const database = client.db('couples');
        const collection = database.collection('couples');
        const data = await
            collection
                .find(filter)
                .sort(sort)
                .skip(page * cardsPerPage)
                .limit(cardsPerPage)
                .project({
                    _id: 1,
                    people: 1,
                    origin: 1,
                    image: 1,
                    altImg: 1
                })
                .toArray();

        const parsedData: ShortCouple[] = data.map((el) => ({ people: el.people, origin: el.origin, image: el.image, altImg: el.altImg, _id: el._id.toString() }));
        return parsedData;
    } catch (error) {
        console.error("[getCouples] Server error on couples route")
        console.error(error)
        throw new Error(error)
    }
}