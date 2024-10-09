"use client"
import { FC } from "react";
import st from "./Results.module.css"
import SmallCard from "./SmallCard";
import { useSearchContext } from "../SearchContext";


const Results: FC = () => {
  const { result, waitingMessage } = useSearchContext()

  return (
    <section className={st.results}>
      <h2>Results:</h2>
      {result.length == 0 ?
      <div className={st.waitingMessage}>
         <p>{waitingMessage}</p>
      </div>
       
        :
        result.map((couple) => <SmallCard couple={couple} key={couple._id} />)
      }
    </section>
  )
}

export default Results;
