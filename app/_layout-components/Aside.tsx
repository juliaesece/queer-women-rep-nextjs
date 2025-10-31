"use client"

import Link from "next/link";
import st from "./aside.module.css"
import SearchIcon from '@mui/icons-material/Search';
import { usePathname } from 'next/navigation'

export default function Aside({filters} : {filters: string}) {
    const pathname = usePathname()
    return (
        <aside className={st.aside}>
            <details className={st.aside__details}>
                <summary className={st.aside__summary}></summary>
            </details>
            <ul className={st.aside__list}>
                {/* <li className={`${st.aside__list_items} ${st.aside__list_items_disabled}`}> Most popular and liked</li>
                <li className={`${st.aside__list_items} ${st.aside__list_items_disabled}`} >Most popular</li> */}
                <li className={`${filters == "most-liked" ? st.aside__active : ""} ${st.aside__list_items}`}>
                    <Link href={pathname + "?filter=most-liked"}>
                        Most liked
                    </Link>
                </li>
                <li className={`${filters == "" || filters == "recently-added" ? st.aside__active : ""} ${st.aside__list_items}`}>
                    <Link href={pathname + "?filter=recently-added"}>
                        Recently added
                    </Link>
                </li>
                <li className={`${filters == "most-recent" ? st.aside__active : ""} ${st.aside__list_items}`}>
                    <Link href={pathname + "?filter=most-recent"}>
                        Most recent releases
                    </Link></li>
                <li className={`${filters == "more-diverse" ? st.aside__active : ""} ${st.aside__list_items}`}>
                    <Link href={pathname + "?filter=more-diverse"}>
                        Give me more diversity!
                    </Link></li>
                {/* <li className={`${st.aside__list_items} ${st.aside__list_items_disabled}`}>Hidden gems?</li> */}
                <li className={`${filters == "happy-endings" ? st.aside__active : ""} ${st.aside__list_items}`}>
                    <Link href={pathname + "?filter=happy-endings"}>
                        Happy endings
                    </Link></li>
            </ul>
            <p className={st.advancedSearch__container}><Link href="/search" className={st.advancedSearch}><SearchIcon /> Advanced search</Link></p>
        </aside>
    );
}
