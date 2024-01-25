import Image from "next/image";
import styles from "./page.module.css";

import Card from "./_layout-components/Card";

type person = {
  name: string
}


type couple = {
  person1: person | string;
  person2: person | string;
  origin: string;
  image: string;
  id: string;
}


export default function Home() {
  const couples: couple[] = [
    {
      person1: "hola",
      person2: "hola",
      origin: "hola",
      image: "url",
      id: "id",
    },
    {
      person1: "hola2",
      person2: "hola2",
      origin: "hola2",
      image: "url2",
      id: "id",
    }
  ]
  return (
    <main className={styles.main}>
      {
        couples.map( (couple) =>
        <Card couple={couple}/>
        )

      }
    </main>
  );
}
