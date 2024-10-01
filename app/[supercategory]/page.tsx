
import styles from "@/app/page.module.css"
import PaginationConductor from "../_nav-components/PaginationConductor";
import { getCouples } from "../utils/getCouples";
import Modal from "@/app/_modal-components/Modal"
import { countCouples } from "../utils/countCouples";
import GridLayout from "../_layout-components/GridLayout";
import { CoupleV1 } from "@/app/utils/types";

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

export default async function Home({ searchParams, params }: { searchParams, params: { supercategory: string } }) {
    const supercategory = params.supercategory
    const couples: CoupleV1[] = await getCouples(supercategory, 0)
    const infoId = searchParams.info
    const nbPages = await getPages(supercategory)

    return (
        <>
            <main className={styles.main}>
                <GridLayout couples={couples} />
            </main>
            <PaginationConductor supercategory={supercategory} page={1} current={supercategory} totalPages={nbPages} />
            {infoId && <Modal mongoId={infoId} from={`/${supercategory}`} />}
        </>
    );
}
