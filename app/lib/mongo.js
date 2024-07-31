import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set")
}

let client = new MongoClient(process.env.MONGODB_URI, {});

let clientPromise

if (process.env.NODE_ENV !== "production") {
    if (!global._mongoClientPromise) {
        global._mongoClientPromise = client.connect()
    }

    clientPromise = global._mongoClientPromise
} else {
    clientPromise = client.connect()
}

export default clientPromise