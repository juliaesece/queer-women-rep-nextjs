"use server"

import client from "@/app/lib/mongo"
import { ShortCouple } from "./types"

export async function getCouples(unparsedSupercategory: string, unparsedPage: number, extraFilter: string | undefined) {

    const supercategoryLookup: { "tv-shows": string, "movies": string } = {
        "tv-shows": "TV Show",
        "movies": "Movie"
    }

    let filter = {}
    let sort: any = { "dateAdded": -1 }

    switch (extraFilter) {
        case "recently-added":
            sort = { "dateAdded": -1 }
            break;
        case "most-recent":
            sort = { "year": -1 }
            break;
        case "more-diverse":
            filter = {
                "$or": [
                    { "people.gender": "Non-Binary" },
                    { "people.genderIdentity": "Trans" },
                    { "people.genderIdentity": "Trans" },
                    { "people.ethnicity": "black" },
                    { "people.ethnicity": "asian" },
                    { "people.ethnicity": "indigenous" },
                    { "people.ethnicity": "latinx" },
                    { "people.genderExpression": "Butch" }
                ]
            }
            break;
        case "happy-endings":
            filter = { "ending": "Happy" }
            break;
        default:
            break
    }

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
                    image: 1
                })
                .toArray();

        const parsedData: ShortCouple[] = data.map((el) => ({ people: el.people, origin: el.origin, image: el.image, _id: el._id.toString() }));
        return parsedData;
    } catch (error) {
        console.error("[getCouples] Server error on couples route")
        console.error(error)
        throw new Error(error)
    }
}