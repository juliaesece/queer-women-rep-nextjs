import styles from './page.module.css';
import Modal from "@/app/@modal/(.)info/[id]/Modal"
import SearchForm from './_components/SearchForm';
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import Results from './_components/Results';
import SearchContextProvider from './SearchContext';
import { ModalSkeleton } from "@/app/@modal/(.)info/[id]/ModalSkeleton";
import { Suspense } from 'react';
import { ethnicityOptions } from '../utils/couplesOptions';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


const convertUrlToObject = (searchParams) => {
    let searchObj = searchParams
    let personParams = new URLSearchParams(searchParams.person)
    personParams = Object.fromEntries(personParams.entries())
    searchObj.person = personParams
    return searchObj
}

const parseEthnicity = (ethnicity) => {
    if (!ethnicity) return []

    return ethnicity
        .split(',')
        .map(value => ethnicityOptions.find(o => o.value === value)?.label)
        .filter(Boolean)
}


function generateSearchMetadata(searchParams) {
    const parsedSearchParams = convertUrlToObject(searchParams)
    const { mediaType, ending,
        'concerns.death': concernsDeath,
        'concerns.comingOut': concernsComingOut,
        'concerns.homophobia': concernsHomophobia,
        romanticConnection,
        isThereQueerCreators
    } = parsedSearchParams

    const {
        gender, sexualOrientation, genderIdentity,
        nationality, ethnicity
    } = searchParams.person

    const titleParts = []

    if (gender == "Non-Binary") titleParts.push(gender)
    else if (genderIdentity == "Non-Binary") titleParts.push(genderIdentity)

    if (genderIdentity == "Trans") titleParts.push(genderIdentity)

    if (sexualOrientation) titleParts.push(sexualOrientation)

    // "Couples" is always the noun
    titleParts.push('Couples')

    // 3. Modifiers
    if (mediaType) titleParts.push(`in ${mediaType}s`)

    const title = titleParts.length > 1
        ? `${titleParts.join(' ')} — Everything Sapphic`
        : `Search — Everything Sapphic`

    // Description is more generous, can mention more filters
    const descParts = ["Browse"]
    if (Number(romanticConnection) > 3.5) descParts.push(`the best`)

    if (sexualOrientation || genderIdentity) {
        descParts.push(`${sexualOrientation.toLowerCase() ?? genderIdentity.toLowerCase()} couples`)
    } else {
        descParts.push('lesbian couples')
    }
    descParts.push(`in ${mediaType ? mediaType + "s" : "media"},`)
    if (nationality) descParts.push(`from ${nationality},`)
    if (ethnicity?.length) descParts.push(`with ${parseEthnicity(ethnicity).join(' or ')} representation,`)
    if (ending) descParts.push(`with a ${ending.toLowerCase()} ending,`)
    if (concernsDeath == 'false') descParts.push(`where no one dies,`)
    if (concernsComingOut == 'false') descParts.push(`not centered around a coming out storyline,`)
    if (Number(concernsHomophobia) < 2) descParts.push(`with low to no homophobia depicted,`)
    if (isThereQueerCreators == 'true') descParts.push(`by queer creators`)


    if (descParts[descParts.length - 1].endsWith(',')) {
        descParts[descParts.length - 1] = descParts[descParts.length - 1].slice(0, -1)
    }

    const description = descParts.join(' ') + '.'

    return { title, description }
}

export async function generateMetadata({ searchParams }: Props) {
    const resSearchParams = await searchParams

    const hasFilters = Object.keys(resSearchParams).length > 0
    if (!hasFilters) return {
        title: "Everything Sapphic - Search and filter for lesbian, bisexual and queer women media to watch",
        description: "Advanced search our collaborative catalog of sapphic (lesbian, bisexual and queer women and enbies) representation in media (TV Shows, movies, or books), where you can filter for the kind of representation you're searching for, be it POC or happy endings.",
    };

    const { title, description } = generateSearchMetadata(resSearchParams)

    return {
        title,
        description,
        robots: 'index, follow',
        openGraph: { title, description }
    }
}

export default async function AdvancedSearch({ searchParams }: Props) {
    const resSearchParams = await searchParams
    const infoId = resSearchParams.info
    const session = await getServerSession(authOptions)

    return (
        <main className={styles.main}>
            <SearchContextProvider>
                <SearchForm session={session} />
                <Results searchObj={convertUrlToObject(resSearchParams)} />
                <Suspense fallback={<ModalSkeleton />}>
                    {infoId && <Modal mongoId={infoId} session={session} origin="search" />}
                </Suspense>
            </SearchContextProvider>
        </main>
    );
};