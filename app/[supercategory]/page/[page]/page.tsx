
import Card from "@/app/_layout-components/Card";
import styles from "@/app/page.module.css"
import PaginationConductor from "@/app/_nav-components/PaginationConductor";
import { getCouples } from "@/app/utils/getCouples";

type person = {
    name: string
}

type couple = {
    person1: person | string;
    person2: person | string;
    origin: string;
    image: string;
    _id: string;
}


export default async function Home({ params }: { params: { supercategory: string, page: string } }) {
    const page = params.page
    const supercategory = params.supercategory
    const couples: couple[] = await getCouples(supercategory, Number(page))

    return (
        <>
            <main className={styles.main}>
                {
                    couples && couples.map((couple) =>
                        <Card couple={couple} key={couple.origin} />
                    )
                }
            </main>
            <PaginationConductor supercategory={supercategory} page={page} current={supercategory + "/page/"+ page} totalPages={3}  />
        </>

    );
}
