import st from './modal.module.css';

export function ModalSkeleton() {
    return (
        <div className={st.modal}>
            <div className={`${st.modal_content} ${st.modal_content_animation}`}>
                <div className={st.modal_content}>
                    <div className={st.modal_image} />
                    <div className={st.modal_textContent}>

                        <div className={st.modal_title}>
                            <h2></h2>
                            <h3></h3>
                        </div>

                        <div className={`${st.modal_ratings}  ${st.modal_mediaRating}`}>
                            <div>
                                <p className={st.shorten}>Rating for </p>
                                <div className={st.modal_ratings_inline}>
                                    <span>
                                    </span>

                                </div>
                            </div>

                        </div>
                        <div className={st.modal_description}>
                            <p><em>Synopsis for :</em></p>
                            <p></p>
                            <br />
                            <p><em>State of the story</em>: </p>
                            <p>Search where to watch</p>
                        </div>


                        <div className={`${st.modal_ratings} ${st.modal_coupleRating}`}>
                            <div>
                                <p>Romantic rating</p>
                                <div className={st.modal_ratings_inline}>

                                </div>
                            </div>
                        </div>
                        <div>
                            <h3><em>The couple</em></h3>
                            <p><em>Short description of the couple</em></p>
                            <p></p>
                            <p><em>Screen time</em>:</p>
                            <p><em>Story importance</em>: </p>
                            <br />
                        </div>

                        <div className={st.modal_spoilerland}>
                            <details>
                                <summary><em>Detailed description of the couple (likely to contain spoilers)</em></summary>
                            </details>
                            <br />

                            <details>
                                <summary>
                                    <em>Enter spoilerland (click here to show the themes; click on a theme to reveal spoilers)</em>
                                </summary>

                                <details>
                                    <summary>
                                        Does this story focus a lot on a coming out storyline?
                                    </summary>

                                </details>

                                <details>
                                    <summary>
                                        Is there cheating on a third party
                                    </summary>

                                </details>

                                <details>
                                    <summary>
                                        How much homophobia does this depict? from 1 to 5
                                    </summary>

                                </details>

                                <details>
                                    <summary>
                                        Does one of the people in the couple die?
                                    </summary>

                                </details>

                                <details>
                                    <summary>
                                        Is the ending happy or sad?
                                    </summary>
                                </details>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}