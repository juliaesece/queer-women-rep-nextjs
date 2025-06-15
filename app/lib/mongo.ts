import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set")
}


const uri = process.env.MONGODB_URI
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    maxPoolSize: 20,
    minPoolSize: 5,
    maxIdleTimeMS: 50000,
    waitQueueTimeoutMS: 10000
}

let client: MongoClient;

try {
    if (process.env.NODE_ENV === "development") {
        // In development mode, use a global variable so that the value
        // is preserved across module reloads caused by HMR (Hot Module Replacement).
        let globalWithMongo = global as typeof globalThis & {
            _mongoClient?: MongoClient;
        };

        if (!globalWithMongo._mongoClient) {
            globalWithMongo._mongoClient = new MongoClient(uri, options);
        }
        client = globalWithMongo._mongoClient;
    } else {
        // In production mode, it's best to not use a global variable.
        client = new MongoClient(uri, options);
    }
} catch (error) {
    console.error("Error when attempting to connect to mongodb")
    console.error(error)
    throw error;
}

export default client;