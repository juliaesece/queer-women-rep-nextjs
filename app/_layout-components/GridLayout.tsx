import Card from "./Card";

export default async function GridLayout({ couples }) {

    return (
        <>
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
        </>);
}