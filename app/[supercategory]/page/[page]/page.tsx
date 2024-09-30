
import Card from "@/app/_layout-components/Card";
import styles from "@/app/page.module.css"
import PaginationConductor from "@/app/_nav-components/PaginationConductor";
import { getCouples } from "@/app/utils/getCouples";
import Modal from "@/app/_layout-components/Modal"
import { countCouples } from "@/app/utils/countCouples";

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

async function getPages(supercategory) {
    try {
        const count = await countCouples(supercategory)

        if (!count.error) {
            return Math.ceil(count / 9)
        } else {
            return 3
        }
    }
    catch (e) {
        return 3
    }
};


export default async function Home({ searchParams, params }: { searchParams, params: { supercategory: string, page: string } }) {
    const page = params.page
    const supercategory = params.supercategory
    const couples: couple[] = await getCouples(supercategory, Number(page))
    const infoId = searchParams.info
    const nbPages = await getPages(supercategory)

    return (
        <>
            <main className={styles.main}>
                {
                    couples && couples.map((couple) =>
                        <Card couple={couple} key={couple.origin} />
                    )
                }
            </main>
            <PaginationConductor supercategory={supercategory} page={page} current={supercategory + "/page/" + page} totalPages={nbPages} />
            {infoId && <Modal mongoId={infoId} from={`/${supercategory}/page/${page}`} />}

        </>

    );
}
