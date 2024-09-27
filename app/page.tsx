import styles from "./page.module.css";
import Card from "./_layout-components/Card";
import Aside from "./_layout-components/Aside";
import PaginationConductor from "./_nav-components/PaginationConductor";
import { getCouples } from "./utils/getCouples";
import Modal from "@/app/_layout-components/Modal"

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

export default async function Home({ searchParams }) {
  const couples: couple[] = await getData()
  const infoId = searchParams.info

  return (
    <>
      <Aside />
      <main className={styles.main}>
        {
          couples && couples.map((couple) =>
            <Card couple={couple} key={couple.origin} />
          )
        }
      </main>
      <PaginationConductor supercategory="home" page={1} current="home" totalPages={3} />
      {infoId && <Modal mongoId={infoId}  from="/" />}
    </>

  );
}
