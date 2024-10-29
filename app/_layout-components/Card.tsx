import { FC } from "react";
import st from "./card.module.css"
import Link from "next/link";
import Image from "next/image";
import { Couple } from "@/app/utils/types";

interface Props {
  couple: Couple;
}

const Card: FC<Props> = ({ couple }) => {

  const link = "?info=" + couple._id
  return (
    <div className={st.card}>
      <Link href={link} className={st.card__link}>
        <Image src={couple.image} alt={couple.altImg} width={400} height={270} className={st.bgImg} 
        placeholder="blur"
        blurDataURL="data:image/webp;base64,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" />
        <div className={st.card__content}>
          <h3 className={st.card__title}>{couple.people[0].name} and {couple.people[1].name}</h3>
          <p className={st.card__subtitle}>{couple.origin}</p>
        </div>
      </Link>
    </div>
  )
}

export default Card;
