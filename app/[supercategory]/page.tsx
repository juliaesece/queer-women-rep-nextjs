
import styles from "@/app/page.module.css"
import PaginationConductor from "../_nav-components/PaginationConductor";
import { getCouples } from "../utils/getCouples";
import Modal from "@/app/_modal-components/Modal"
import { countCouples } from "../utils/countCouples";
import GridLayout from "../_layout-components/GridLayout";
import { ShortCouple } from "@/app/utils/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import { unstable_cache } from "next/cache";

const getCachedData = unstable_cache(
    async (supercategory, page, extraFilter) => {
      try {
        const couples: ShortCouple[] = await getCouples(supercategory, page, extraFilter)
  
        if (couples) {
          return couples
        } else {
          throw new Error("Database Error")
        }
      }
      catch (e) { 
        throw new Error(e)
      }
    }, [], {
    tags: ["coupleData"],
    revalidate: 3600
  })

async function getPages(supercategory) {
    try {
        const count = await countCouples(supercategory)

        if (count) {
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
    const extraFilter = searchParams.filter
    const couples: ShortCouple[] = await getCachedData(supercategory, 0, extraFilter)
    const infoId = searchParams.info
    const nbPages = await getPages(supercategory)
    const session = await getServerSession(authOptions)

    return (
        <>
            <main className={styles.main}>
                <GridLayout couples={couples} />
                <PaginationConductor supercategory={supercategory} page={1} current={supercategory} totalPages={nbPages} extraFilter={extraFilter}/>
            </main>
            {infoId && <Modal mongoId={infoId} from={`/${supercategory}`} session={session} />}
        </>
    );
}
