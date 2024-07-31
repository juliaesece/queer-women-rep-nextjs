import clientPromise from "@/app/lib/mongo"

export async function getCouples (unparsedSupercategory : string, unparsedPage : number) {

    const supercategoryLookup: { "tv-shows": string, "movies": string } = {
        "tv-shows": "TV Show",
        "movies": "Movie"
    }

    let filter = {}
    if (unparsedSupercategory != null && unparsedSupercategory != "home") {
        const supercategory: string = supercategoryLookup[unparsedSupercategory as keyof typeof supercategoryLookup]
        filter = { originType: supercategory }
    }

    const page: number = unparsedPage ? Number(unparsedPage) - 1 : 0
    const cardsPerPage = 9

    try {
        const client = await clientPromise
        const database = client.db('couples');
        const collection = database.collection('couples');
        const data = await
            collection
                .find(filter)
                .skip(page * cardsPerPage)
                .limit(cardsPerPage)
                .toArray();
        return (data); 
    } catch (error) {
        console.log("Server error on couples route")
        console.log(error)
    }
    return ({ error: "There was an error" });
}