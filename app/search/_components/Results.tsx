"use client"
import { FC } from "react";
import st from "./Results.module.css"
import SmallCard from "./SmallCard";
import { useSearchContext } from "../SearchContext";


const Results: FC = () => {
  const { result } = useSearchContext()

  return (
    <section className={st.results}>
      <h2>Results:</h2>
      {result.length == 0 ?
        <p>There are no results</p>
        :
        result.map((couple) => <SmallCard couple={couple} />)
      }
    </section>
  )
}

export default Results;
