import Card from "./Card";
import styles from "./GridLayout.module.css";

export default async function GridLayout({ couples }) {
    return (
        <div className={styles.grid}>
            {couples && couples.map((couple) =>
                <Card couple={couple} key={couple.origin} />
            )}
        </div>
    );
}