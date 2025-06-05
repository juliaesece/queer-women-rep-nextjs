"use server"

import client from "@/app/lib/mongo"

function transformQuery(query) {
    const transformedQuery = {};

    for (let [key, value] of Object.entries(query)) {
        if (value === "default" || value === 0 || value === "0" || value === "") continue; // Avoid empty filters

        if (key === 'genres' && Array.isArray(value)) {
            if (value.length == 0) continue
            transformedQuery[key] = { "$all": value };
            continue
        }

        if (key === 'tags' && Array.isArray(value)) {
            if (value.length == 0) continue
            transformedQuery[key] = { "$all": value };
            continue
        }

        transformedQuery[key] = value;
    }

    return transformedQuery;
}

export async function searchBooks(unparsedSearchBook, session) {
    let filter

    if (Object.keys(unparsedSearchBook).length == 0) {
        filter = {}
    } else {
        filter = transformQuery(unparsedSearchBook)
    }

    try {
        const database = client.db('books');
        const collection = database.collection('books');
        const data = await
            collection
                .find(filter)
                .toArray();

        const logDB = client.db('log');
        const searchLog = logDB.collection('search')
        searchLog.insertOne({ timestamp: new Date(), query: filter, userId: session ? session.user.id : null, username: session ? session.user.username : "no-user" }) // Don't await?

        return JSON.parse(JSON.stringify(data));
    } catch (error) {
        console.error("[searchBooks] Server error on books route")
        console.error(error)
    }
    return ({ error: "There was an error" });
} 