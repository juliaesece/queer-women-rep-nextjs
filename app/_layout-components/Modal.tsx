import Link from "next/link";
import st from "./modal.module.css"
import Image from "next/image";
import { getCoupleById } from "@/app/utils/getCoupleById";
import { Rating } from "@mui/material";

export default async function DetailedCard({ mongoId }: { mongoId: string }) {

    let couple = await getCoupleById(mongoId);
    if (couple.error) {
        throw new Error("Invalid Id")
    }

    return (
        <div className={st.modal}>

            <div className={st.modal_content}>
                <div className={st.gradient_container}>
                    <Image className={st.modal_image} src={couple.image} alt={couple.altImg} width={2000} height={2000} />
                </div>
                <div className={st.modal_textContent}>
                    <div className={st.modal_title}>
                        <h2>{couple.person1.name} and {couple.person2.name}</h2>
                        <h3>{couple.originType} — {couple.origin} ({couple.year.getFullYear()})</h3>
                    </div>

                    <div className={st.modal_ratings}>
                        <p><em>Global Rating</em>: {couple.globalRating}</p>
                        <Rating />
                        <span className="contenedor-flechas">
                            <svg height="20" width="30" >
                                <polygon fill="#829A41" className="flechas verde" id="voteUp" points="15,00 00,20 30,20" />
                            </svg>

                            <span>(upVotes total)</span>

                            <svg height="20" width="30">
                                <polygon fill="#FD694B" className="flechas roja" id="voteDown" points="15,20 00,00 30,00" />
                            </svg>
                            <span>(downVotes total)</span>
                        </span>
                        <p> <em>Watched by user? </em>
                            {"Yes. No."}
                            <button className="detailedButton" >
                                {"I didn't watch it tho : Wait. I did watch it!"}
                            </button></p>
                        <p>Watched by <em>watchedCount</em> users.</p>
                        <p><em>Romantic connection from 1 to 5</em>: {couple.romanticConnection}</p>
                        <p><em>Chemistry from 1 to 5</em>: {couple.chemistry}</p><br />
                    </div>
                    <div className={st.modal_description}>
                        <p> <em>Description</em>: {couple.description}</p>
                        <p><em>State of the story</em>: {couple.status}</p>
                        <p><em>Screen time</em>: {couple.screenTime}</p>
                        <p><em>Story importance</em>: {couple.storyImportance}</p>
                    </div>

                    <div  className={st.modal_spoilerland}>
                        <p><em>Enter spoilerland (hover to reveal spoilers)</em></p>
                        <p><em>Is coming out a thing</em>: <span className={st.spoiler}>{couple.concerns.comingOut ? "Yes" : "No"}</span></p>
                        <p><em>Is there cheating on a third party</em>: <span className={st.spoiler}>{couple.concerns.cheating ? "Yes" : "No"}</span></p>
                        <p><em>How much homophobia from 1 to 5</em>: <span className={st.spoiler}>{couple.concerns.homophobia}</span></p>
                        <p><em>Is there death</em>: <span className={st.spoiler}>{couple.concerns.death ? "Yes" : "No"}</span></p>
                        <p><em>Ending</em>: <span className={st.spoiler}>{couple.ending}</span></p>
                    </div>
                    <br />
                    <Link href="/">
                        <button className="detailedButton">Quit</button>
                    </Link>
                </div>
            </div>
        </div >
    )
}
