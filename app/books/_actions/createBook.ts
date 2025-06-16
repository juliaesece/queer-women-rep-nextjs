// "use server";

// import client from "@/app/lib/mongo";
// import { Book } from '../../utils/types';
// import { ObjectId } from 'mongodb';
// import { Collection } from 'mongodb';
// import { revalidateTag } from "next/cache";
// import { createBookSchema } from './schemas';

// export async function createBook(newBook: Book, userId: string) {
//     try {
//         // Validate input
//         const validatedInput = createBookSchema.parse({ newBook, userId });
//         const parsedUserId = new ObjectId(validatedInput.userId)

//         const database = client.db('couples');
//         const collection: Collection<Book> = database.collection('books');
//         const parsedBook = {
//             ...validatedInput.newBook,
//             dateAdded: new Date(),
//             ratingCount: validatedInput.newBook.rating ? 1 : 0
//         } as Book
//         const result = await collection.insertOne(parsedBook)

//         if (!result.acknowledged || !result.insertedId) throw new Error("Database error when creating the new book")

//         // Store all ratings elsewhere, and compute the average. We'll store only the average on book, and update it on writes
//         let ratingsSetObject = { "_id": new ObjectId(result.insertedId), "ratings": {} }

//         if (parsedBook.rating) {
//             ratingsSetObject.ratings[userId] = parsedBook.rating
//             const ratingsResult = await database.collection('ratings').insertOne(ratingsSetObject)
//             if (!ratingsResult.acknowledged || !ratingsResult.insertedId) throw new Error("Database error when creating ratings section")
//         }

//         revalidateTag('bookData')
//         return true;
//     } catch (error) {
//         console.error("[createBook] Server error on books route")
//         console.error(error)
//         return false
//     }
// } 