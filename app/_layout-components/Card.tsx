import { FC } from "react";

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

interface Props {
    couple: couple
}

const Card: FC<Props> = ({ couple }) => {
  const imgBackground = {
    backgroundImage: "url('" + couple.image + "')"
  };
  return (
      <div className="card" style={imgBackground} key={couple.origin}>
        <div className="card--content">
          <h3>{couple.person1.name? couple.person1.name : couple.person1} and {couple.person2.name? couple.person2.name : couple.person2}</h3>
          <p className="origin">{couple.origin}</p>
        </div>
      </div>
  )
}

export default Card;
