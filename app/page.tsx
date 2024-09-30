import styles from "./page.module.css";
import Card from "./_layout-components/Card";
import Aside from "./_layout-components/Aside";
import PaginationConductor from "./_nav-components/PaginationConductor";
import { getCouples } from "./utils/getCouples";
import Modal from "@/app/_layout-components/Modal"
import { countCouples } from "./utils/countCouples";

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

async function getData() {
  try {
    const couples = await getCouples("home", 0)

    const count = await countCouples()

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
  const couples: couple[] = await getData()
  const infoId = searchParams.info
  const nbPages = await getPages("home")

  return (
    <>
      <Aside />
      <main className={styles.main}>
        <div>
          {
            couples && couples.slice(0, 3).map((couple) =>
              <Card couple={couple} key={couple.origin} />
            )
          }
        </div>
        <div>
          {
            couples && couples.slice(3, 6).map((couple) =>
              <Card couple={couple} key={couple.origin} />
            )
          }
        </div>
        <div>
          {
            couples && couples.slice(6, 9).map((couple) =>
              <Card couple={couple} key={couple.origin} />
            )
          }
        </div>
      </main>
      <PaginationConductor supercategory="home" page={1} current="home" totalPages={nbPages} />
      {infoId && <Modal mongoId={infoId} from="/" />}
    </>

  );
}
