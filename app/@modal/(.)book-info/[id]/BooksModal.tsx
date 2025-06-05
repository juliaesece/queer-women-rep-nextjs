import Link from "next/link";
import st from "./modal.module.css"
import Image from "next/image";
import { getBookById } from "@/app/books/_actions/getBookById";
import { Session } from "next-auth";
import RatingsWrapper from "./_components/RatingsWrapper";
import { storyImportanceOptions, screenTimeOptions } from "../../../utils/couplesOptions";
import { Book } from "../../../utils/types";
import { headers } from 'next/headers'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GoBack from "./_components/GoBack";

export default async function BooksModal({ mongoId, session, origin }: { mongoId: string, session: Session, origin: string }) {

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

    const book: Book = await getBookById(mongoId);

    const headersList = await headers()
    const acceptLanguage = headersList.get('accept-language')?.slice(3, 5) ?? "us"

    let reviews = {
        _id: 'undefined',
        reviews: []
    }

    return (
        <div className={st.modal}>
            <div className={st.modal_content}>
                <GoBack origin={origin} />
                <Image className={st.modal_image} src={book.image} alt={book.altImg} width={2000} height={2000} />
                <div className={st.modal_textContent}>
                    <div className={st.modal_title}>
                        <h2>{book.title}</h2>
                        <h3>By {book.author} {/* ({typeof book.year.getMonth === 'function' ? book.year.getFullYear() : "Undefined"}) */}</h3>
                    </div>

                    <div className={`${st.modal_ratings}  ${st.modal_mediaRating}`}>
                        <div>
                            <p className={st.shorten}>Rating for {book.title}</p>
                            <div className={st.modal_ratings_inline}>
                                <span>
                                    {book.rating}
                                </span>
                                <RatingsWrapper
                                    dbValue={book.rating}
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
                                    book={book} session={session} collectionName="globalRatings" />
                                {/* {book.globalRatingCount &&
                                    <span>
                                        ({book.globalRatingCount})
                                    </span>
                                } */}
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
                        <p><em>Synopsis for {book.title}:</em></p>
                        {/* <p>{book.mediaDescription}</p> */}
                        <br />
                        <p><em>State of the story</em>: {book.status}</p>
                        {book.genres && <p><em>Genres</em>: {book.genres.map((genre, idx) => ((idx + 1) != book.genres.length ? genre.toLocaleLowerCase() + ", " : genre.toLocaleLowerCase()))}</p>}
                    </div>



                    {!session && <p className={st.small}>Log in to vote/rate</p>}

                </div>
                <div>
                    <h3><em>The book</em></h3>
                    <p><em>Short description of the book</em></p>
                    <p>{book.shortDescription}</p>
                    <p><em>Story importance</em>: {storyImportanceOptions.find((el) => el.value == book.storyImportance).label}</p>
                    <br />

                    {book.tags && <><p className={st.modal_tags_container}><span>Tags:</span> {book.tags.map((tag) =>
                        <Link href={"/?tag=" + tag} className={st.modal_tags} key={tag}>{tag}</Link>
                    )}</p><br /></>}


                </div>

                <div className={st.modal_spoilerland}>
                    {book.longDescription &&
                        <>
                            <details>
                                <summary><em>Detailed description of the book (likely to contain spoilers)</em></summary>
                                {book.longDescription}
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
                            {typeof book.concerns == "undefined" ?
                                "Information not given" : <> {
                                    book.concerns.comingOut ? "Yes" : "No"
                                }</>
                            }
                        </details>

                        <details>
                            <summary>
                                Is there cheating on a third party
                            </summary>
                            {typeof book.concerns == "undefined" ?
                                "Information not given" : <> {
                                    book.concerns.cheating ? "Yes" : "No"
                                }</>
                            }
                        </details>

                        <details>
                            <summary>
                                How much homophobia does this depict? from 1 to 5
                            </summary>
                            {typeof book.concerns == "undefined" ?
                                "Information not given" : <> {book.concerns.homophobia} (from 1 to 5)</>
                            }
                        </details>

                        <details>
                            <summary>
                                Does one of the people in the book die?
                            </summary>
                            {typeof book.concerns == "undefined" ?
                                "Information not given" : <> {
                                    book.concerns.death ? "Yes" : "No"
                                }</>
                            }
                        </details>

                        <details>
                            <summary>
                                Is the ending happy or sad?
                            </summary>
                            {book.ending}
                        </details>
                    </details>
                </div>
            </div>
        </div>
    )
}
