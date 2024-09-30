"use server"
import clientPromise from "@/app/lib/mongo"

export async function getUserByEmail(email) {
    const emailFilter = { email: { $eq: email } }

    try {
        const client = await clientPromise
        const database = client.db('test');
        const collection = database.collection('users');
        const data = await
            collection
                .findOne(emailFilter);
        const user = JSON.parse(JSON.stringify(data))
        if (!user) throw new Error("Database error")

        return user;
    } catch (error) {
        return { error: error.message }
    }
}