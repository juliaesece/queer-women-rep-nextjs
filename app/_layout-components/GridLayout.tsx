import Card from "./Card";
import styles from "./GridLayout.module.css";
import { Suspense } from 'react';
import { ShortCouple } from "../utils/types";

function Loading() {
  return <h2>Loading...</h2>;
}


export default async function GridLayout({ couples }: { couples: ShortCouple[] }) {
    return (
        <div className={styles.grid}>
            {couples && couples.map((couple) =>
                <Suspense key={couple.origin} fallback={<Loading />}>
                    <Card couple={couple} key={couple.origin} />
                </Suspense>
            )}
        </div>
    );
}