import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set")
}

let client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

try {
    if (process.env.NODE_ENV !== "production") {
        if (!global._mongoClientPromise) {
            global._mongoClientPromise = client.connect()
        }

        await global._mongoClientPromise
    } else {
        await client.connect()
    }
}
catch (e) {
    console.error("Error when attempting to connect to mongodb")
    console.error(error)
}

export default client