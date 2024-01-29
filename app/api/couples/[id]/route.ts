import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = new ObjectId(params.id)
    let client
    if (process.env.MONGODB_URI) {
        client = new MongoClient(process.env.MONGODB_URI, {});
    }
    else {
        throw new Error("MONGODB_URI environment variable is not set")
    }
    try {
        await client.connect();
        const database = client.db('couples');
        const collection = database.collection('couples');
        const data = await
            collection.findOne({ _id: id })
        return NextResponse.json(data);
    } catch (error) {
        console.log("[id route] Server error on couples route")
        console.log(error)
    } finally {
        await client.close();

    }
    return NextResponse.json({ error: "There was an error" });
}