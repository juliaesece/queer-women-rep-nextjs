import styles from "./page.module.css";
import Aside from "./_layout-components/Aside";
import GridLayout from "./_layout-components/GridLayout";
import PaginationConductor from "./_nav-components/PaginationConductor";
import { getCouples } from "./utils/getCouples";
import { countCouples } from "./utils/countCouples";
import { ShortCouple } from "@/app/utils/types";
import { unstable_cache } from 'next/cache';

const getCachedData = unstable_cache(
  async (extraFilter, tag) => {
    try {
      const couples: ShortCouple[] = await getCouples("home", 1, extraFilter, tag)

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

export default async function Home({ searchParams }) {
  const searchParamsRes = await searchParams
  const extraFilter = searchParamsRes.filter
  const tag = searchParamsRes.tag
  const couples: ShortCouple[] = await getCachedData(extraFilter, tag)
  const nbPages = await getPages("home", extraFilter)

  return (
    <>
      <Aside />
      <main className={styles.main}>
        <GridLayout couples={couples} />
        <PaginationConductor supercategory="home" page={1} current="home" totalPages={nbPages} extraFilter={extraFilter} />
      </main>
    </>
  );
}
