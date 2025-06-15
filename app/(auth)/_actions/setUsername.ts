"use server"
import client from "@/app/lib/mongo"

export async function setDBUsername(username: string, email: string) {

    const usernameFilter = { username: { $eq: username } }
    const emailFilter = { email: { $eq: email } }
    const updateDoc = {
        $set: {
            username: username
        }
    }

    try {
        
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
        console.error(error)
        return {error: false}
    }
}