import { FC } from "react";
import st from "./SmallCard.module.css"
import Link from "next/link";
import Image from "next/image";
import { Couple } from "@/app/utils/types";

interface Props {
  couple: Couple;
}

const SmallCard: FC<Props> = ({ couple }) => {

  const link = "?info=" + couple._id
  return (
    <div className={st.card}>
      <Link href={link} className={st.card__link}>
        <Image src={couple.image} alt={couple.altImg} width={300} height={300} className={st.card__image} />
        <div className={st.card__content}>
          <h3 className={st.card__title}>{couple.people[0].name} and {couple.people[1].name}</h3>
          <p className={st.card__subtitle}>{couple.origin}</p>
        </div>
      </Link>
    </div>
  )
}

export default SmallCard;
