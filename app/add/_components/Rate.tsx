import styles from "./Form.module.css";
import { useAddContext } from "../AddContext";
import RatingsWrapper from "./RatingsWrapper";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import WhatshotOutlined from "@mui/icons-material/WhatshotOutlined";

export default function Rate() {
    const { couple, setCouple, currentSection, setCurrentSection } = useAddContext()

    return (
        <section className={styles.section}>
            <div className={styles.fullWidth}  >
                <p>Be the first to vote:</p>
            </div>
            <div>
                <label htmlFor="globalRating">Global rating:</label>
                <span className={styles.centerHorizontally}>
                    <RatingsWrapper couple={couple} icon={undefined} emptyIcon={undefined} setCouple={setCouple} name="globalRating"
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
                        }} />
                    {couple.globalRating}/5
                </span>
            </div>

            <div>
                <label htmlFor="romantic-connection">Romantic connection:</label>
                <span className={styles.centerHorizontally}>
                    <RatingsWrapper couple={couple}
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
                        setCouple={setCouple} name="romanticConnection" />
                    {couple.romanticConnection}/5
                </span>
            </div>

            {!(couple.people[0].lifeStage == "Children" || couple.people[0].lifeStage == "Children") &&
                <div>
                    <label htmlFor="chemistry">Chemistry:</label>
                    <span className={styles.centerHorizontally}>
                        <RatingsWrapper couple={couple}
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
                            }} setCouple={setCouple} name="chemistry" />
                        {couple.chemistry}/5
                    </span>
                </div>
            }
            <button onClick={() => setCurrentSection(currentSection + 1)}>Next</button>
        </section>
    );
}
