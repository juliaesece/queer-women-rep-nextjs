
import styles from './page.module.css';
import Modal from "@/app/_modal-components/Modal"
import SmallCard from './_components/SmallCard';
import SearchForm from './_components/SearchForm';
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import Results from './_components/Results';
import SearchContextProvider from './SearchContext';


export default async function AdvancedSearch({ searchParams }) {
    const infoId = searchParams.info
    const session = await getServerSession(authOptions)

    return (
        <main className={styles.main}>
            <SearchContextProvider>
                <SearchForm />
                <Results />
                {infoId && <Modal mongoId={infoId} from="/search" session={session} />}
            </SearchContextProvider>

        </main>
    );
};

