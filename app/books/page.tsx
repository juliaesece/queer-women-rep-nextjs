import Image from "next/image";
import styles from "./page.module.css";


export default function Component() {

    const testData = Array(5).fill({
        title: "Truth and Measure",
        author: "Roslyn Sinclair",
        genres: ["romance"],
        rating: "4.5",
        description: "What happens when the world’s fiercest fashion editor learns she’s pregnant—and her distracting assistant is the only one she can turn to? This wildly popular age-gap lesbian romance mixes humor and chaos with self-discovery.",
        imageLink: "https://covers.openlibrary.org/b/id/12802741-L.jpg",
        tags: ["age gap", "boss", "ceo", "ice queen", "started as fanfic"]
    })


    return (
        <main className={styles.main}>
            <form className={styles.search}>
                Search
                <br />
                <label>
                    Genre
                </label>
                <select>
                    <option>Lorem ipsum</option>
                </select>

                <br />
                <label>
                    Tags
                </label>
                <select>
                    <option>Lorem ipsum</option>
                </select>
            </form>
            <section className={styles.books}>
                {testData.map((book, idx) =>
                    <div className={styles.card} key={idx}>
                        <Image
                            width={180}
                            height={270}
                            src={book.imageLink}
                            alt="test"
                        />
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
    );
}