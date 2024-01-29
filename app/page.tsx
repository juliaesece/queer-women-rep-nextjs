import Image from "next/image";
import styles from "./page.module.css";

import Card from "./_layout-components/Card";
import Link from "next/link";

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
    console.log('Data saved successfully!');
    return response.json();
  } else {
    console.log('Something went wrong!');
  }
};


export default async function Home() {
  const couples: couple[] = await getData()

  return (
    <main className={styles.main}>
      {
        couples.map( (couple) =>
        <Card couple={couple} key={couple.origin}/>
        )
      }
      <Link href="/1">Next page</Link>
    </main>

  );
}
