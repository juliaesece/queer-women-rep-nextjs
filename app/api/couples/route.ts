import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    let client
    if (process.env.MONGODB_URI) {
        client = new MongoClient(process.env.MONGODB_URI, {});
    }
    else {
        throw new Error("MONGODB_URI environment variable is not set")
    }

    const supercategoryLookup: { "tv-shows": string, "movies": string } = {
        "tv-shows": "TV Show",
        "movies": "Movie"
    }

    let filter = {}
    if (request.nextUrl.searchParams.get("supercategory") != null && request.nextUrl.searchParams.get("supercategory") != "home") {
        const unparsedSupercategory: string = request.nextUrl.searchParams.get("supercategory") || ""
        const supercategory: string = supercategoryLookup[unparsedSupercategory as keyof typeof supercategoryLookup]
        filter = { originType: supercategory }
    }

    const page: number = Number(request.nextUrl.searchParams.get("p")) || 0
    const cardsPerPage = 9

    try {
        await client.connect();
        const database = client.db('couples');
        const collection = database.collection('couples');
        const data = await
            collection
                .find(filter)
                .skip(page * cardsPerPage)
                .limit(cardsPerPage)
                .toArray();
        return NextResponse.json(data);
    } catch (error) {
        console.log("Server error on couples route")
        console.log(error)
    } finally {
        await client.close();

    }
    return NextResponse.json({ error: "There was an error" });
}