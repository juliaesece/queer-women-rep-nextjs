import { FC } from "react";
import st from "./Results.module.css"
import SmallCard from "./SmallCard";
import SortDropdown from "./SortDropdown";
import { searchCouples } from "../_actions/searchCouples";
import { Session } from "next-auth";

type ResultsProps = {
  searchObj: Record<string, string | string[] | undefined>
  session: Session
}

const Results: FC<ResultsProps> = async ({ searchObj, session }) => {
  let waitingMessage = Object.keys(searchObj).length == 0 ? "No search has been made yet." : "No couples have been found"

  const result = await searchCouples(searchObj, session)

  if (result.error) return <section className={st.results}>
    <h2>Results:</h2>
    <p>Sorry, there has been an error. Please contact the dev.</p>
  </section>

  return (
    <section className={st.results}>
      <h2>Results:</h2>
      {result.length == 0 ?
        <div className={st.waitingMessage}>
          <p>{waitingMessage}</p>
        </div>
        :
        <>
          <SortDropdown />
          {result.map((couple) => <SmallCard couple={couple} key={couple._id} />)}
        </>
      }
    </section>
  )
}

export default Results;
