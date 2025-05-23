import Image from "next/image";
import styles from "./page.module.css";
import Aside from "../_layout-components/Aside";

export default function Component() {

    const testData = [{
        title: "Truth and Measure",
        author: "Roslyn Sinclair",
        genres: ["romance"],
        rating: "4.5",
        description: "What happens when the world’s fiercest fashion editor learns she’s pregnant—and her distracting assistant is the only one she can turn to? This wildly popular age-gap lesbian romance mixes humor and chaos with self-discovery.",
        imageLink: "https://covers.openlibrary.org/b/id/12802741-L.jpg",
        tags: ["age gap", "boss", "ceo", "ice queen", "started as fanfic"]
    },
    {
        title: "Delilah Green Doesn't Care",
        author: "Ashley Herring Blake",
        genres: ["romance"],
        rating: "4.5",
        description: "Delilah Green swore she would never go back to Bright Falls—nothing is there for her but memories of a lonely childhood where she was little more than a burden to her cold and distant stepfamily. Her life is in New York, with her photography career finally gaining steam and her bed never empty. Sure, it’s a different woman every night, but that’s just fine with her.",
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1643753957i/54756850.jpg",
        tags: ["age gap", "boss", "ceo", "ice queen", "started as fanfic"]
    },
    {
        title: "The Snowball Effect",
        author: "Haley Cass",
        genres: ["romance"],
        rating: "4.5",
        description: "For the first time, Regan Gallagher is facing the world without her best friend by her side – no, Sutton isn’t dead but she is in Rome, following her dreams. And Regan really is thrilled for her. Left to her own devices, she’s doing… fine.",
        imageLink: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1723018706i/217192122.jpg",
        tags: ["age gap", "boss", "ceo", "ice queen", "started as fanfic"]
    }]

   


    return (
        <>
            <Aside />
            <main className={styles.main}>
                <div className={styles.search}>
                    {["all books", "ice queen"].map((tag, idx) => <span className={styles.filterTag}>{tag}</span>)}

                </div>
                <section className={styles.books}>
                    {testData.map((book, idx) =>
                        <div className={styles.card} key={idx}>
                            <div className={styles.img_container}>
                                <Image
                                    width={180}
                                    height={270}
                                    src={book.imageLink}
                                    alt="test"
                                    className={styles.books_img}

                                />
                                <div
    
                                    className={styles.books_img_2}
                                    style={{background: `url("${book.imageLink}")`}}
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
                                        Rating: {book.rating} ⭐
                                    </p>
                                </div>
                                <p>

                                </p>
                                <p className={styles.card__content_description}>
                                    {book.description}
                                </p>
                                <p className={styles.tags}>
                                    {book.genres.map((genre, idx) => <span className={`${styles.highlightTag} ${styles.genre}`}>{genre}</span>)}
                                    {book.tags.map((tag, idx) => <span className={styles.highlightTag}>{tag}</span>)}
                                </p>
                            </div>
                        </div>)}
                </section>
            </main>
        </>
    );
}