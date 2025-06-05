import Image from "next/image";
import styles from "./page.module.css";
import Aside from "../_layout-components/Aside";
import { getBooks } from "./_actions/getBooks";
import { countBooks } from "./_actions/countBooks";
import { unstable_cache } from "next/cache";
import Link from "next/link";

const getCachedData = unstable_cache(
    async (page, extraFilter, tag) => {
        try {
            const books = await getBooks(page, extraFilter, tag)

            if (books) {
                return books
            } else {
                throw new Error("Database Error")
            }
        }
        catch (e) {
            throw new Error(e)
        }
    }, [], {
    tags: ["bookData"],
    revalidate: 60 // 60*60*24 // 1 day in seconds
})

async function getPages(extraFilter) {
    try {
        const count = await countBooks(extraFilter)

        if (count) {
            return Math.ceil(count / 9)
        } else {
            return 3
        }
    }
    catch (e) {
        return 3
    }
}

export default async function Component() {
    const books = await getCachedData(1, undefined, undefined)

    return (
        <>
            <Aside />
            <main className={styles.main}>
                <div className={styles.search}>
                    {["all books", "ice queen"].map((tag, idx) => <span className={styles.filterTag} key={idx}>{tag}</span>)}
                </div>
                <section className={styles.books}>
                    {books.map((book, idx) =>
                        <div  key={idx}>
                            <Link href={"/book-info/" + book._id} className={styles.card}>
                                <div className={styles.img_container}>
                                    <Image
                                        width={180}
                                        height={270}
                                        src={book.image}
                                        alt={book.title}
                                        className={styles.books_img}
                                    />
                                    <div
                                        className={styles.books_img_2}
                                        style={{ background: `url("${book.image}")` }}
                                    > </div>
                                </div>
                                <div className={styles.card__content}>
                                    <div className={styles.header}>
                                        <div>
                                            <h2>
                                                {book.title}
                                            </h2>
                                            <h3>
                                                By {book.author}
                                            </h3>
                                        </div>
                                        <p>
                                            {book.rating} ⭐
                                        </p>
                                    </div>
                                    <p className={styles.card__content_description}>
                                        {book.description}
                                    </p>
                                    <p className={styles.tags}>
                                        {book.genres?.map((genre, idx) => <span className={`${styles.highlightTag} ${styles.genre}`} key={idx}>{genre}</span>)}
                                        {book.tags?.map((tag, idx) => <span className={styles.highlightTag} key={idx}>{tag}</span>)}
                                    </p>
                                </div>
                            </Link>
                        </div>)}
                </section>
            </main>
        </>
    );
}