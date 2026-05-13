"use server"

import client from "@/app/lib/mongo"

export async function getAllCouples() {
    try {
        const database = client.db('couples');
        const collection = database.collection('couples');
        const data = await
            collection
                .find()
                .project({
                    _id: 1,
                    dateAdded: 1
                })
                .toArray();

        const parsedData: { dateAdded: string, _id: string }[] = data.map((el) => ({ dateAdded: el.dateAdded, _id: el._id.toString() }));
        return parsedData;
    } catch (error) {
        console.error("[getCouples] Server error on couples route")
        console.error(error)
        throw new Error(error)
    }
}

export const getUniqueNationalities = async () => {
    try {

        const database = client.db('couples');
        const collection = database.collection('couples');
        const data = await collection.aggregate([
            { $unwind: '$people' },
            { $group: { _id: '$people.nationality' } },
            { $match: { _id: { $nin: [null, ''] } } },
            { $sort: { _id: 1 } }
        ]).toArray()

        return data.map(d => d._id)
    } catch (error) {
        console.error("[getCouples] Server error on couples route")
        console.error(error)
        throw new Error(error)
    }
}