import { z } from 'zod';

// Book schema
export const bookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    genres: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    rating: z.number().min(0).max(5).optional(),
    description: z.string().default(''),
    image: z.string().default(''),
    altImg: z.string().default(''),
    dateAdded: z.date().optional(),
    _id: z.string().optional(),
    year: z.number(),
    status: z.string(),
    shortDescription: z.string(),
    longDescription: z.string(),
    storyImportance: z.number().min(1).max(4),
    ending: z.string(),
    concerns: z.object({
        comingOut: z.boolean(),
        death: z.boolean(),
        cheating: z.boolean(),
        homophobia: z.number().min(1).max(5)
    })
});

// Create book input schema
export const createBookSchema = z.object({
    newBook: bookSchema,
    userId: z.string().min(1, "User ID is required")
});

// Get book by ID schema
export const getBookByIdSchema = z.object({
    unparsedId: z.string().min(1, "Book ID is required")
});

// Rate book schema
export const rateBookSchema = z.object({
    bookId: z.string().min(1, "Book ID is required"),
    userId: z.string().min(1, "User ID is required"),
    rating: z.number().min(0).max(5)
});

// Search books schema
export const searchBooksSchema = z.object({
    unparsedSearchBook: z.record(z.any()).optional(),
    session: z.object({
        user: z.object({
            id: z.string(),
            username: z.string()
        })
    }).nullable()
});

// Get books schema
export const getBooksSchema = z.object({
    unparsedPage: z.number().min(1).optional(),
    extraFilter: z.string().optional(),
    tag: z.string().optional()
}); 