
import Card from "../_layout-components/Card";
import styles from "@/app/page.module.css"
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

async function getData(page: string) {
    const url = "http://localhost:3000/api/couples/?p=" + page;
    console.log("url", url)
    const response = await fetch(url, {
        method: 'GET'
    });

    if (response.ok) {
        console.log('Data saved successfully!');
        return response.json();
    } else {
        console.log('Something went wrong!');
    }
};

export default async function Home({ params }: { params: { page: string } }) {
    const page = params.page
    const couples: couple[] = await getData(page)
    console.log("hola params")

    console.log("params", params)

    return (
        <main className={styles.main}>
            {
                couples.map((couple) =>
                    <Card couple={couple} key={couple.origin} />
                )
            }
            <Link href="/">Previous page</Link>
        </main>
    );
}
