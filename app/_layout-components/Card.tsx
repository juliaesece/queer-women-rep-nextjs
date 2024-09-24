import { FC } from "react";
import st from "./card.module.css"
import Link from "next/link";
import { Couple } from "../utils/types";
import Image from "next/image";

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


interface Props {
  couple: couple;
}

const Card: FC<Props> = ({ couple }) => {
  // const imgBackground = {
  //   // backgroundImage: "url('" + couple.image + "')"
  // };

  const link = "/info/" + couple._id
  return (
    <div className={st.card}>
      <Link href={link} className={st.card__link}>
        <Image src={couple.image} alt={couple.altImg} width={300} height={300} className={st.bgImg} />
        <div className={st.card__content}>
          <h3 className={st.card__title}>{typeof couple.person1?.name === "string" ? couple.person1.name : couple.people[0].name} and {typeof couple.person2?.name === "string" ? couple.person2.name : couple.people[1].name}</h3>
          <p className={st.card__subtitle}>{couple.origin}</p>
        </div>
      </Link>
    </div>
  )
}

export default Card;
