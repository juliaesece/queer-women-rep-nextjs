
import styles from './page.module.css';
import Modal from "@/app/@modal/(.)info/[id]/Modal"
import SearchForm from './_components/SearchForm';
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import Results from './_components/Results';
import SearchContextProvider from './SearchContext';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Everything Sapphic - Search and filter for lesbian, bisexual and queer women media to watch",
  description: "Advanced search our collaborative catalog of sapphic (lesbian, bisexual and queer women and enbies) representation in media (TV Shows, movies, or books), where you can filter for the kind of representation you're searching for, be it POC or happy endings.",
};

export default async function AdvancedSearch({ searchParams }) {
    const resSearchParams = await searchParams
    const infoId = resSearchParams.info
    const session = await getServerSession(authOptions)

    return (
        <main className={styles.main}>
            <SearchContextProvider>
                <SearchForm session={session} />
                <Results />
                {infoId && <Modal mongoId={infoId} session={session} origin="search"/>}
            </SearchContextProvider>
        </main>
    );
};