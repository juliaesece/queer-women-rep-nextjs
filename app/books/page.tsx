import Image from "next/image";
import styles from "./page.module.css";


export default function Component() {

    const testData = Array(5).fill({
        title: "Truth and Measure",
        author: "Roslyn Sinclair",
        rating: "4.5",
        description: "What happens when the world’s fiercest fashion editor learns she’s pregnant—and her distracting assistant is the only one she can turn to? This wildly popular age-gap lesbian romance mixes humor and chaos with self-discovery.",
        imageLink: "https://covers.openlibrary.org/b/id/12802741-M.jpg"
    })


    return (
        <main className={styles.main}>
            {testData.map((book) =>
                <div className={styles.card}>
                    <Image
                        width={180}
                        height={270}
                        src={book.imageLink}
                        alt="test"
                    />
                    <div className={styles.card__content}>
                        <h2>
                            {book.title}
                        </h2>
                        <h3>
                            {book.author}
                        </h3>
                        Rating: {book.rating}
                        <p>
                            {book.description}
                        </p>
                        <span className={styles.highlightTag}>Age Gap</span>
                    </div>
                </div>)}

        </main>
    );
}