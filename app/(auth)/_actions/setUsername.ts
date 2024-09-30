"use server"
import clientPromise from "@/app/lib/mongo"

export async function setDBUsername(username, email) {

    const usernameFilter = { username: { $eq: username } }
    const emailFilter = { email: { $eq: email } }
    const updateDoc = {
        $set: {
            username: username
        }
    }

    try {
        const client = await clientPromise
        const database = client.db('test');
        const collection = database.collection('users');
        const uniqueCheck = await
            collection
                .findOne(usernameFilter);

        if (uniqueCheck) throw new Error("Username already exists, please use another username")

        const result = await
            collection
                .updateOne(emailFilter, updateDoc);

        if (!result.acknowledged || result.matchedCount != 1) {
            throw new Error("Database error, please try again in a few minutes")
        }

        return {error: false};
    } catch (error) {
        return {error: error.message}
    }
}