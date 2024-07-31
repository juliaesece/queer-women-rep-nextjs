import { FC } from "react";
import st from "./card.module.css"
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

interface Props {
    couple: couple
}

const Card: FC<Props> = ({ couple }) => {
  const imgBackground = {
    backgroundImage: "url('" + couple.image + "')"
  }; 

  const link = "/info/" + couple._id
  return (
      <div style={imgBackground} className={st.card}>
        <Link href={link}>
        <div className={st.card__content}>
          <h3 className={st.card__title}>{typeof couple.person1 === "string" ? couple.person1: couple.person1.name} and {typeof couple.person2 === "string" ? couple.person2: couple.person2.name}</h3>
          <p className={st.card__subtitle}>{couple.origin}</p>
        </div>
        </Link>
      </div>
  )
}

export default Card;
