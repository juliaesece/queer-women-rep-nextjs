
import Card from "@/app/_layout-components/Card";
import styles from "@/app/page.module.css"

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

async function getData( supercategory: string,page: string) {
    const url = "http://localhost:3000/api/couples/?supercategory=" + supercategory + "&p=" + page;
    const response = await fetch(url, {
        method: 'GET'
    });

    if (response.ok) {
        return response.json();
    } else {
        console.log('Something went wrong!');
    }
};

export default async function Home({ params }: { params: { supercategory: string, page: string } }) {
    const page = params.page
    const supercategory = params.supercategory
    const couples: couple[] = await getData(supercategory, page)

    return (
        <main className={styles.main}>
            {
                couples.map((couple) =>
                    <Card couple={couple} key={couple.origin} />
                )
            }
        </main>
    );
}
