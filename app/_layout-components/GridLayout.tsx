import Card from "./Card";
import styles from "./GridLayout.module.css";
import { ShortCouple } from "../utils/types";

export default async function GridLayout({ couples }: {couples: ShortCouple[]}) {
    return (
        <div className={styles.grid}>
            {couples && couples.map((couple) =>
                <Card couple={couple} key={couple.origin} />
            )}
        </div>
    );
}