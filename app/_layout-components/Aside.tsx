import Link from "next/link";
import st from "./aside.module.css"
import SearchIcon from '@mui/icons-material/Search';

function Aside() {

    return (
        <aside className={st.aside}>
            <ul className={st.aside__list}>
                <li className={`${st.aside__list_items} ${st.aside__list_items_disabled}`}> Most popular and liked</li>
                <li className={st.aside__list_items} >Most popular</li>
                <li className={st.aside__list_items}>Most liked</li>
                <li className={st.aside__list_items}>Recently added</li>
                <li className={st.aside__list_items}>Most recent releases</li>
                <li className={st.aside__list_items}>Give me more diversity!</li>
                <li className={`${st.aside__list_items} ${st.aside__list_items_disabled}`}>Hidden gems?</li>
                <li className={st.aside__list_items}>Happy endings </li>
            </ul>
            <p><Link href="/search" className={st.advancedSearch}><SearchIcon /> Advanced search</Link></p>
        </aside>
    );
}

export default Aside;
