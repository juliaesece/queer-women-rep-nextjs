
import Card from "../_layout-components/Card";
import styles from "@/app/page.module.css"
import PaginationConductor from "../_nav-components/PaginationConductor";
import { getCouples } from "../utils/getCouples";

type person = {
    name: string
}

type couple = {
    person1: person | string;
    person2: person | string;
    origin: string;
    image: string;
    _id: string;
    originType: string;
}

export default async function Home({ params }: { params: { supercategory: string } }) {

    const supercategory = params.supercategory
    const couples: couple[] = await getCouples(supercategory, 0)

    return (
        <>
            <main className={styles.main}>
                {
                    couples && couples.map((couple) =>
                        <Card couple={couple} key={couple.origin} />
                    )
                }
            </main>
            <PaginationConductor supercategory={supercategory} page={1} current={supercategory} totalPages={3} />
        </>
    );
}
