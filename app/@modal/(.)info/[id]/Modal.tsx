import Link from "next/link";
import st from "./modal.module.css"
import Image from "next/image";
import { getCoupleById } from "@/app/utils/getCoupleById";
import { getReviews } from "./_actions/getReviews";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import WhatshotOutlined from "@mui/icons-material/WhatshotOutlined";
import ReviewsComponent from "./Reviews";
import { Session } from "next-auth";
import RatingsWrapper from "./_components/RatingsWrapper";
import { storyImportanceOptions, screenTimeOptions } from "../../../utils/couplesOptions";
import { Couple, Review } from "../../../utils/types";
import { headers } from 'next/headers'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GoBack from "./_components/GoBack";
import { Suspense } from "react";
import { homophobiaOptions } from "@/app/utils/couplesOptions";

const getYear = (yearValue) => {

    if (!yearValue) {
        return ""; // Null/undefined/empty string
    }

    let dateObject;

    if (yearValue instanceof Date) {
        dateObject = yearValue;
    } else if (typeof yearValue === 'string' || typeof yearValue === 'number') {
        dateObject = new Date(yearValue);
    } else {
        return "";
    }

    if (isNaN(dateObject.getTime())) {
        return "";
    }

    return ` (${dateObject.getFullYear()})`; // Return the year
}

export default async function Modal({ mongoId, session, origin }: { mongoId: string, session: Session | undefined, origin: string }) {
    function getSearchTranslation(locale: string) {
        // Object mapping locales to their main language translations of "search"
        const translations = {
            'us': 'search',
            'gb': 'search',
            'uk': 'search',
            'es': 'buscar',
            'cl': 'buscar',
            'mx': 'buscar',
            'ar': 'buscar',
            'fr': 'recherche',
            'ca': 'search',
            'de': 'suchen',
            'it': 'cerca',
            'pt': 'buscar',
            'br': 'buscar',
            'nl': 'search',
            'jp': '検索',
            "eg": "search",
            'kr': '검색',
            'cn': '搜索',
            'tw': '搜尋',
            'ru': 'поиск',
            'pl': 'szukaj',
            'tr': 'arama',
            'se': 'sök',
            'dk': 'søg',
            'no': 'søk',
            'fi': 'etsi'
        };

        // Convert locale to lowercase to handle different cases
        const normalizedLocale = locale.toLowerCase();

        // Return translation if it exists, otherwise return 'search' as default
        return translations[normalizedLocale as keyof typeof translations] || 'search';
    }

    const couplePromise = getCoupleById(mongoId);
    const headersPromise = headers();
    const [couple, headersList] = await Promise.all([
        couplePromise,
        headersPromise
    ]);


    console.log("homophobia options", homophobiaOptions)
    const acceptLanguage = headersList.get('accept-language')?.slice(3, 5) ?? "us"

    let reviewsPromise = getReviews(couple._id as string)

    return (
        <div className={st.modal}>
            <div className={st.modal_content}>
                <GoBack origin={origin} />
                <Image className={st.modal_image} src={couple.image} alt={couple.altImg} width={2000} height={2000} />
                <div className={st.modal_textContent}>

                    <div className={st.modal_title}>
                        <h2>{couple.people[0].name} and {couple.people[1].name}</h2>
                        <h3>{couple.mediaType} — {couple.origin}{getYear(couple.year)}</h3>
                    </div>

                    <div className={`${st.modal_ratings}  ${st.modal_mediaRating}`}>
                        <div>
                            <p className={st.shorten}>Rating for {couple.origin}</p>
                            <div className={st.modal_ratings_inline}>
                                <RatingsWrapper
                                    dbValue={couple.globalRating}
                                    dbCount={couple.globalRatingCount}
                                    icon={undefined}
                                    emptyIcon={undefined}
                                    sx={{
                                        color: "#d63900",
                                        '& .MuiRating-icon': {
                                            color: "#d63900",
                                            opacity: 0.4
                                        },
                                        '& .MuiRating-iconFilled': {
                                            opacity: 0.9
                                        },
                                        '& .MuiRating-iconHover': {
                                            opacity: 1
                                        }
                                    }}
                                    couple={couple} session={session} collectionName="globalRatings" />
                            </div>
                        </div>


                    </div>
                    <div className={st.modal_description}>
                        <p><em>Synopsis for {couple.origin}:</em></p>
                        <p>{couple.mediaDescription}</p>
                        <br />
                        <p><em>State of the story</em>: {couple.status}</p>
                        {(couple.genres ?? []).length > 0 && <p><em>Genres</em>: {(couple.genres ?? []).map((genre, idx) => ((idx + 1) != (couple.genres ?? []).length ? genre.name.toLocaleLowerCase() + ", " : genre.name.toLocaleLowerCase()))}</p>}
                        <p className={st.searchLinkContainer} >
                            <a className={st.searchLink} href={`https://www.justwatch.com/${acceptLanguage}/${getSearchTranslation(acceptLanguage)}?q=${couple.origin}`} target="_blank">
                                <span>Search where to watch</span>
                                <OpenInNewIcon fontSize="small" />
                            </a>
                            <a className={st.searchLink} href={`https://www.youtube.com/results?search_query=${couple.people[0].name}+and+${couple.people[1].name}`} target="_blank">
                                <span>Search for edits on youtube</span>
                                <OpenInNewIcon fontSize="small" />
                            </a>
                        </p>
                    </div>


                    <div className={`${st.modal_ratings} ${st.modal_coupleRating}`}>
                        <div>
                            <p>Romantic rating</p>
                            <div className={st.modal_ratings_inline}>
                                <RatingsWrapper
                                    dbValue={couple.romanticConnection}
                                    dbCount={couple.romanticConnectionCount}
                                    icon={<Favorite fontSize="inherit" />}
                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                    sx={{
                                        color: "#d63900",
                                        '& .MuiRating-icon': {
                                            color: "#d63900",
                                            opacity: 0.4
                                        },
                                        '& .MuiRating-iconFilled': {
                                            opacity: 0.9
                                        },
                                        '& .MuiRating-iconHover': {
                                            opacity: 1
                                        }
                                    }}
                                    couple={couple} session={session} collectionName="romanticRatings" />

                            </div>
                        </div>
                        {!(couple.people[0].lifeStage == "Children" || couple.people[0].lifeStage == "Children") &&
                            <div>
                                <p>Chemistry rating</p>
                                <div className={st.modal_ratings_inline}>
                                    <RatingsWrapper
                                        dbValue={couple.chemistry}
                                        dbCount={couple.chemistryCount}
                                        icon={<WhatshotIcon fontSize="inherit" />}
                                        emptyIcon={<WhatshotOutlined fontSize="inherit" />}
                                        sx={{
                                            color: "#d63900",
                                            '& .MuiRating-icon': {
                                                color: "#d63900",
                                                opacity: 0.4
                                            },
                                            '& .MuiRating-iconFilled': {
                                                opacity: 0.9
                                            },
                                            '& .MuiRating-iconHover': {
                                                opacity: 1
                                            }
                                        }}
                                        couple={couple} session={session} collectionName="chemistryRatings" />
                                </div>
                            </div>
                        }
                        {!session && <p className={st.small}>Log in to vote/rate</p>}

                    </div>
                    <div className={st.modal_coupleDescription}>
                        <h3><em>The couple</em></h3>
                        <p><em>Short description of the couple</em></p>
                        <p>{couple.shortDescription}</p>
                        <p><em>Screen time</em>: {(screenTimeOptions ?? []).find((el) => el.value == couple.screenTime)?.label ?? "Undefined"}</p>
                        <p><em>Story importance</em>: {(storyImportanceOptions ?? []).find((el) => el.value == couple.storyImportance)?.label ?? "Undefined"}</p>
                        <br />

                        {couple.tags && <><p className={st.modal_tags_container}><span>Tags:</span> {couple.tags.map((tag) =>
                            <Link href={"/?tag=" + tag} className={st.modal_tags} key={tag}>{tag}</Link>
                        )}</p><br /></>}


                    </div>

                    <div className={st.modal_spoilerland}>
                        {couple.longDescription &&
                            <>
                                <details>
                                    <summary><em>Detailed description of the couple (likely to contain spoilers)</em></summary>
                                    {couple.longDescription}
                                </details>
                                <br />
                            </>
                        }
                        <details>
                            <summary>
                                <em>Enter spoilerland (click here to show the themes; click on a theme to reveal spoilers)</em>
                            </summary>

                            <details>
                                <summary>
                                    Does this story focus a lot on a coming out storyline?
                                </summary>
                                {typeof couple.concerns == "undefined" ?
                                    "Information not given" : <> {
                                        couple.concerns.comingOut ? "Yes" : "No"
                                    }</>
                                }
                            </details>

                            <details>
                                <summary>
                                    Is there cheating on a third party
                                </summary>
                                {typeof couple.concerns == "undefined" ?
                                    "Information not given" : <> {
                                        couple.concerns.cheating ? "Yes" : "No"
                                    }</>
                                }
                            </details>

                            <details>
                                <summary>
                                    How much homophobia does this depict?
                                </summary>
                                {typeof couple.concerns == "undefined" ?
                                    "Information not given" : <> {homophobiaOptions.filter(option => Number(option.value) == Number(couple.concerns.homophobia))?.[0]?.label} ({couple.concerns.homophobia} on a scale of 1 to 5)</>
                                }
                            </details>

                            <details>
                                <summary>
                                    Does one of the people in the couple die?
                                </summary>
                                {typeof couple.concerns == "undefined" ?
                                    "Information not given" : <> {
                                        couple.concerns.death ? "Yes" : "No"
                                    }</>
                                }
                            </details>

                            <details>
                                <summary>
                                    Is the ending happy or sad?
                                </summary>
                                {couple.ending}
                            </details>
                        </details>
                    </div>
                    <Suspense fallback="Loading reviews...">
                        <ReviewsComponent reviewsPromise={reviewsPromise} session={session} />
                    </Suspense>
                </div>
            </div>
        </div >
    )
}
