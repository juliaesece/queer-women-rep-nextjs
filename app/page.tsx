import styles from "./page.module.css";
import Card from "./_layout-components/Card";
import Aside from "./_layout-components/Aside";
import PaginationConductor from "./_nav-components/PaginationConductor";
import { getCouples } from "./utils/getCouples";

type person = {
  name: string
}

type couple = {
  person1: person | string;
  person2: person | string;
  origin: string;
  image: string;
  _id: string;
}

async function getData() {
  try {
    const couples = await getCouples("home", 0)

    if (!couples.error) {
      return couples
    } else {
      console.log('Something went wrong! on getcouples');
      return []
    }
  }
  catch (e) {
    console.log("Error on fetch", e)
    return []
  }
};

export default async function Home({ searchParams }) {
  console.log("searchParams", searchParams)

  const couples: couple[] = await getData()
  return (
    <>
      <Aside />
      <main className={styles.main}>
        {
          couples.map((couple) =>
            <Card couple={couple} key={couple.origin} />
          )
        }
      </main>
      <PaginationConductor supercategory="home" page={1} current="home" totalPages={3} />
    </>

  );
}
