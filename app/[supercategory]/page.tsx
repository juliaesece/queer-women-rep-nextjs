
import Card from "../_layout-components/Card";
import styles from "@/app/page.module.css"
import PaginationConductor from "../_nav-components/PaginationConductor";
import { getCouples } from "../utils/getCouples";
import Modal from "@/app/_layout-components/Modal"

type person = {
    name: string
}

type couple = {
    person1: person;
    person2: person;
    people: person;
    origin: string;
    image: string;
    _id: string;
    altImg: string;
}

export default async function Home({ searchParams, params }: { searchParams, params: { supercategory: string } }) {

    const supercategory = params.supercategory
    const couples: couple[] = await getCouples(supercategory, 0)
    const infoId = searchParams.info

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
            {infoId && <Modal mongoId={infoId}  from={`/${supercategory}`} />}
        </>
    );
}
