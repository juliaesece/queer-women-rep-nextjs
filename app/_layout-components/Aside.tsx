"use client"

import Link from "next/link";
import st from "./aside.module.css"
import SearchIcon from '@mui/icons-material/Search';
import { usePathname } from 'next/navigation'

export default function Aside() {
    const pathname = usePathname()
    return (
        <aside className={st.aside}>
            <ul className={st.aside__list}>
                <li className={`${st.aside__list_items} ${st.aside__list_items_disabled}`}> Most popular and liked</li>
                <li className={`${st.aside__list_items} ${st.aside__list_items_disabled}`} >Most popular</li>
                <li className={`${st.aside__list_items} ${st.aside__list_items_disabled}`}>Most liked</li>
                <li className={st.aside__list_items}>
                    <Link href={pathname + "?filter=recently-added"}>
                        Recently added
                    </Link>
                </li>
                <li className={st.aside__list_items}>
                    <Link href={pathname + "?filter=most-recent"}>
                        Most recent releases
                    </Link></li>
                <li className={st.aside__list_items}>
                    <Link href={pathname + "?filter=more-diverse"}>
                        Give me more diversity!
                    </Link></li>
                <li className={`${st.aside__list_items} ${st.aside__list_items_disabled}`}>Hidden gems?</li>
                <li className={st.aside__list_items}>
                    <Link href={pathname + "?filter=happy-endings"}>
                        Happy endings
                    </Link></li>
            </ul>
            <p><Link href="/search" className={st.advancedSearch}><SearchIcon /> Advanced search</Link></p>
        </aside>
    );
}
