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
import { Couple } from "../../../utils/types";
import { headers } from 'next/headers'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GoBack from "./_components/GoBack";

export default async function Modal({ mongoId, session }: { mongoId: string, session: Session }) {

    function getSearchTranslation(locale) {
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
        return translations[normalizedLocale] || 'search';
    }

    const couple: Couple = await getCoupleById(mongoId);

    const headersList = await headers()
    const acceptLanguage = headersList.get('accept-language')?.slice(3, 5) ?? "us"

    let reviews = {
        _id: 'undefined',
        reviews: []
    }

    reviews = await getReviews(couple._id)

    return (
        <div className={st.modal}>
            <div className={st.modal_content}>
                <GoBack />
                <Image className={st.modal_image} src={couple.image} alt={couple.altImg} width={2000} height={2000} />
                <div className={st.modal_textContent}>
                    <div className={st.modal_title}>
                        <h2>{couple.people[0].name} and {couple.people[1].name}</h2>
                        <h3>{couple.mediaType} — {couple.origin} ({typeof couple.year.getMonth === 'function' ? couple.year.getFullYear() : "Undefined"})</h3>
                    </div>

                    <div className={`${st.modal_ratings}  ${st.modal_mediaRating}`}>
                        <div>
                            <p className={st.shorten}>Rating for {couple.origin}</p>
                            <div className={st.modal_ratings_inline}>
                                <span>
                                    {couple.globalRating}
                                </span>
                                <RatingsWrapper
                                    dbValue={couple.globalRating}
                                    icon={undefined}
                                    emptyIcon={undefined}
                                    sx={{
                                        color: "#d63900",
                                        "& .MuiRating-icon": {
                                            color: "#d63900",
                                            opacity: 0.4
                                        },
                                        "& .MuiRating-iconFilled": {
                                            opacity: 0.9
                                        },
                                        '& .MuiRating-iconHover': {
                                            opacity: 1
                                        }
                                    }}
                                    couple={couple} session={session} collectionName="globalRatings" />
                                {couple.globalRatingCount &&
                                    <span>
                                        ({couple.globalRatingCount})
                                    </span>
                                }
                            </div>
                        </div>


                    </div>
                    <div className={st.modal_description}>
                        {/* <div className={st.modal_watchedRatings}>
                            <div>
                                Watched by user?
                                <IconButton disabled sx={{ border: "none" }} size="small">
                                    <VisibilityIcon />
                                </IconButton>
                            </div>
                            <div>
                                Watched by [watchedCount] users.
                            </div>
                        </div> */}
                        <p><em>Synopsis for {couple.origin}:</em></p>
                        <p>{couple.mediaDescription}</p>
                        <br />
                        <p><em>State of the story</em>: {couple.status}</p>
                        {couple.genres && <p><em>Genres</em>: {couple.genres.map((genre, idx) => ((idx + 1) != couple.genres.length ? genre.name.toLocaleLowerCase() + ", " : genre.name.toLocaleLowerCase()))}</p>}
                        <p><a className={st.link} href={`https://www.justwatch.com/${acceptLanguage}/${getSearchTranslation(acceptLanguage)}?q=${couple.origin}`} target="_blank">Search where to watch<OpenInNewIcon fontSize="small" /></a></p>
                    </div>


                    <div className={`${st.modal_ratings} ${st.modal_coupleRating}`}>
                        <div>
                            <p>Romantic rating</p>
                            <div className={st.modal_ratings_inline}>
                                <span>
                                    {couple.romanticConnection}
                                </span>
                                <RatingsWrapper
                                    dbValue={couple.romanticConnection}
                                    icon={<Favorite fontSize="inherit" />}
                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                    sx={{
                                        color: "#d63900",
                                        "& .MuiRating-icon": {
                                            color: "#d63900",
                                            opacity: 0.4
                                        },
                                        "& .MuiRating-iconFilled": {
                                            opacity: 0.9
                                        },
                                        '& .MuiRating-iconHover': {
                                            opacity: 1
                                        }
                                    }}
                                    couple={couple} session={session} collectionName="romanticRatings" />
                                {couple.romanticConnectionCount &&
                                    <span>
                                        ({couple.romanticConnectionCount})
                                    </span>
                                }
                            </div>
                        </div>
                        {!(couple.people[0].lifeStage == "Children" || couple.people[0].lifeStage == "Children") &&
                            <div>
                                <p>Chemistry rating</p>
                                <div className={st.modal_ratings_inline}>
                                    <span>
                                        {couple.chemistry}
                                    </span>
                                    <RatingsWrapper
                                        dbValue={couple.chemistry}
                                        icon={<WhatshotIcon fontSize="inherit" />}
                                        emptyIcon={<WhatshotOutlined fontSize="inherit" />}
                                        sx={{
                                            color: "#d63900",
                                            "& .MuiRating-icon": {
                                                color: "#d63900",
                                                opacity: 0.4
                                            },
                                            "& .MuiRating-iconFilled": {
                                                opacity: 0.9
                                            },
                                            '& .MuiRating-iconHover': {
                                                opacity: 1
                                            }
                                        }}
                                        couple={couple} session={session} collectionName="chemistryRatings" />
                                    {couple.chemistryCount &&
                                        <span>
                                            ({couple.chemistryCount})
                                        </span>
                                    }
                                </div>
                            </div>
                        }
                        {!session && <p className={st.small}>Log in to vote/rate</p>}

                    </div>
                    <div>
                        <h3><em>The couple</em></h3>
                        <p><em>Short description of the couple</em></p>
                        <p>{couple.shortDescription}</p>
                        <p><em>Screen time</em>: {screenTimeOptions.find((el) => el.value == couple.screenTime).label}</p>
                        <p><em>Story importance</em>: {storyImportanceOptions.find((el) => el.value == couple.storyImportance).label}</p>
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
                                    How much homophobia does this depict? from 1 to 5
                                </summary>
                                {typeof couple.concerns == "undefined" ?
                                    "Information not given" : <> {couple.concerns.homophobia} (from 1 to 5)</>
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
                    <ReviewsComponent reviews={reviews} session={session} />
                </div>
            </div>
        </div >
    )
}
