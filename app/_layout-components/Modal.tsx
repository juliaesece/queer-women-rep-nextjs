import Link from "next/link";
import st from "./modal.module.css"
import Image from "next/image";
import { getCoupleById } from "@/app/utils/getCoupleById";
import { IconButton, Rating } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import WhatshotOutlined from "@mui/icons-material/WhatshotOutlined";
import CloseIcon from '@mui/icons-material/Close';


export default async function DetailedCard({ mongoId, from }: { mongoId: string, from: string }) {

    let couple = await getCoupleById(mongoId);
    if (couple.error) {
        throw new Error("Invalid Id")
    }

    return (
        <div className={st.modal}>
            <div className={st.modal_content}>
                <Link href={from} className={st.modal_closeButton}>
                    <IconButton size="large">
                        <CloseIcon />
                    </IconButton>
                </Link>
                <Image className={st.modal_image} src={couple.image} alt={couple.altImg} width={2000} height={2000} />
                <div className={st.modal_textContent}>
                    <div className={st.modal_title}>
                        <h2>{couple.person1.name} and {couple.person2.name}</h2>
                        <h3>{couple.originType} — {couple.origin} ({couple.year.getFullYear()})</h3>
                    </div>

                    <div className={st.modal_ratings}>
                        <div>
                            <p>Global Rating</p>
                            <Rating
                                value={couple.globalRating}
                                readOnly
                                size="large"
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
                            />
                        </div>
                        <div>
                            <p>Romantic rating</p>
                            <Rating
                                value={couple.romanticConnection}
                                size="large"
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
                            />
                        </div>
                        <div>
                            <p>Chemistry rating</p>
                            <Rating
                                value={couple.chemistry}
                                size="large"
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
                            />
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
                        <p><em>Description</em></p>
                        <p>{couple.description}</p>
                        <br />

                        <p><em>State of the story</em>: {couple.status}</p>
                        <p><em>Screen time</em>: {couple.screenTime}</p>
                        <p><em>Story importance</em>: {couple.storyImportance}</p>
                    </div>

                    <div className={st.modal_spoilerland}>
                        <p><em>Enter spoilerland (click to reveal spoilers)</em></p>

                        <details>
                            <summary>
                                Does this {couple.originType} focus a lot on a coming out storyline?
                            </summary>
                            {couple.concerns.comingOut ? "Yes" : "No"}
                        </details>

                        <details>
                            <summary>
                                Is there cheating on a third party
                            </summary>
                            {couple.concerns.cheating ? "Yes" : "No"}
                        </details>

                        <details>
                            <summary>
                                How much homophobia does this depict? from 1 to 5
                            </summary>
                            {couple.concerns.homophobia} (from 1 to 5)
                        </details>

                        <details>
                            <summary>
                                Does one of the people in the couple die?
                            </summary>
                            {couple.concerns.death ? "Yes" : "No"}
                        </details>

                        <details>
                            <summary>
                                Is the ending happy or sad?
                            </summary>
                            {couple.ending}
                        </details>
                    </div>
                </div>
            </div>
        </div >
    )
}
