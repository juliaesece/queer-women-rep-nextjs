
import GridLayout from "@/app/_layout-components/GridLayout";
import styles from "@/app/page.module.css"
import PaginationConductor from "@/app/_nav-components/PaginationConductor";
import { getCouples } from "@/app/utils/getCouples";
import Modal from "@/app/@modal/(.)info/[id]/Modal"
import { countCouples } from "@/app/utils/countCouples";
import { ShortCouple } from "@/app/utils/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { unstable_cache } from "next/cache";

const getCachedData = unstable_cache(
    async (supercategory, page, extraFilter, tag) => {
      try {
        const couples: ShortCouple[] = await getCouples(supercategory, page, extraFilter, tag)
  
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
    tags: ["coupleData"]
  })

async function getPages(supercategory, extraFilter) {
    try {
        const count = await countCouples(supercategory, extraFilter)

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


export default async function Home({ searchParams, params }: { searchParams, params: { supercategory: string, page: string } }) {
    const page = params.page
    const extraFilter = searchParams.filter
    const supercategory = params.supercategory
    const tag = searchParams.tag
    const couples: ShortCouple[] = await getCachedData(supercategory, Number(page), extraFilter, tag)
    const infoId = searchParams.info
    const nbPages = await getPages(supercategory, extraFilter)
    const session = await getServerSession(authOptions)

    return (
        <>
            <main className={styles.main}>
                <GridLayout couples={couples} />
                <PaginationConductor supercategory={supercategory} page={page} current={supercategory + "/page/" + page} totalPages={nbPages} extraFilter={extraFilter}/>
            </main>
            {infoId && <Modal mongoId={infoId} session={session} />}
        </>
    );
}
