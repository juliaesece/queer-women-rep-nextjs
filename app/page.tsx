import styles from "./page.module.css";
import Aside from "./_layout-components/Aside";
import GridLayout from "./_layout-components/GridLayout";
import PaginationConductor from "./_nav-components/PaginationConductor";
import { getCouples } from "./utils/getCouples";
import Modal from "@/app/_modal-components/Modal"
import { countCouples } from "./utils/countCouples";
import { ShortCouple } from "@/app/utils/types";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/authOptions";
import { unstable_cache } from 'next/cache';

const getCachedData = unstable_cache(
  async (extraFilter) => {
    try {
      const couples: ShortCouple[] = await getCouples("home", 0, extraFilter)

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

export default async function Home({ searchParams }) {
  const extraFilter = searchParams.filter
  const couples: ShortCouple[] = await getCachedData(extraFilter)
  const infoId = searchParams.info
  const nbPages = await getPages("home")
  const session = await getServerSession(authOptions)

  return (
    <>
      <Aside />
      <main className={styles.main}>
        <GridLayout couples={couples} />
        <PaginationConductor supercategory="home" page={1} current="home" totalPages={nbPages} extraFilter={extraFilter} />
      </main>
      {infoId && <Modal mongoId={infoId} from="/" session={session} />}
    </>
  );
}
