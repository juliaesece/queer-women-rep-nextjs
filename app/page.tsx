import styles from "./page.module.css";
import Aside from "./_layout-components/Aside";
import GridLayout from "./_layout-components/GridLayout";
import PaginationConductor from "./_nav-components/PaginationConductor";
import { getCouples } from "./utils/getCouples";
import Modal from "@/app/_modal-components/Modal"
import { countCouples } from "./utils/countCouples";
import { CoupleV1 } from "@/app/utils/types";

async function getData() {
  try {
    const couples = await getCouples("home", 0)

    if (!couples.error) {
      return couples
    } else {
      return []
    }
  }
  catch (e) {
    return []
  }
};

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

export default async function Home({ searchParams }) {
  const couples: CoupleV1[] = await getData()
  const infoId = searchParams.info
  const nbPages = await getPages("home")

  return (
    <>
      <Aside />
      <main className={styles.main}>
        <GridLayout couples={couples} />
      </main>
      <PaginationConductor supercategory="home" page={1} current="home" totalPages={nbPages} />
      {infoId && <Modal mongoId={infoId} from="/" />}
    </>
  );
}
