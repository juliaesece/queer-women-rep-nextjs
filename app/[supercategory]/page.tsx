
import styles from "@/app/page.module.css"
import PaginationConductor from "../_nav-components/PaginationConductor";
import { getCouples } from "../utils/getCouples";
import Modal from "@/app/@modal/(.)info/[id]/Modal"
import { countCouples } from "../utils/countCouples";
import GridLayout from "../_layout-components/GridLayout";
import { ShortCouple } from "@/app/utils/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import { unstable_cache } from "next/cache";

interface PageProps {
  params: Promise<{ supercategory: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

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
            throw new Error(e instanceof Error ? e.message : String(e))
      }
    }, [], {
    tags: ["coupleData"]
  })

async function getPages(supercategory: string, extraFilter: string | undefined) {
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

export default async function Home({ searchParams, params }: PageProps) {
    const resParams = await params;
    const resSearchParams = await searchParams;
    const supercategory = resParams.supercategory
    const extraFilter = resSearchParams.filter
    const tag = resSearchParams.tag
    const couples: ShortCouple[] = await getCachedData(supercategory, 1, extraFilter, tag)
    const infoId = resSearchParams.info
    const nbPages = await getPages(supercategory, extraFilter)
    const session = await getServerSession(authOptions)

    return (
        <>
            <main className={styles.main}>
                <GridLayout couples={couples} />
                <PaginationConductor supercategory={supercategory} page={1} current={supercategory} totalPages={nbPages} extraFilter={extraFilter}/>
            </main>
            {infoId && <Modal mongoId={infoId} session={session} origin="home" />}
        </>
    );
}
