import styles from "./page.module.css";
import Card from "./_layout-components/Card";
import Aside from "./_layout-components/Aside";
import PaginationConductor from "./_nav-components/PaginationConductor";

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
  const response = await fetch('http://localhost:3000/api/couples', {
    method: 'GET'
  });

  if (response.ok) {
    return response.json();
  } else {
    console.log('Something went wrong!');
  }
};

export default async function Home() {
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
        <PaginationConductor />
      </main>
    </>

  );
}
