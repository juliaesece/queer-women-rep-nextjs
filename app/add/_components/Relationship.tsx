import styles from "./Form.module.css";
import { useAddContext } from "../AddContext";
import { screenTimeOptions, storyImportanceOptions, romanticConnectionOptions, chemistryOptions, endingOptions } from "@/app/utils/couplesOptions";

export default function Relationship() {
    const { couple, handleChange, handleCheckbox, currentSection, setCurrentSection } = useAddContext()


    return (
        <section className={styles.section}>
            <div className={styles.fullWidth}>
                <label htmlFor="coupleDescription">Description of the story of the couple within the TV Show/Movie:</label>
                <textarea
                    name="coupleDescription"
                    placeholder="Here write a summary of who they are and who they are for each other. You can copy the description you made before if the story of the couple is the same as the story of the TV Show/Movie, like in a romantic movie."
                    onChange={handleChange}
                    value={couple.coupleDescription}
                    className={styles.longTextInput}
                >
                </textarea>
            </div>
            <div className={styles.fullWidth}>
                <input
                    type="checkbox"
                    name="coupleDescriptionIsSpoiler"
                    onChange={handleCheckbox}
                    checked={couple.coupleDescriptionIsSpoiler}
                    className={styles.checkbox}
                />
                <label className={styles.checkboxLabel} htmlFor="coupleDescriptionIsSpoiler">This a spoiler for the TV Show/Movie (leave unchecked if it isn&apos;t)</label>
            </div>


            <div>
                <label htmlFor="screen-time">Give an approximate of how much screen time they have:</label>
                <select name="screenTime" onChange={handleChange} value={couple.screenTime}>
                    <option value="0">-----</option>
                    {screenTimeOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="story-importance">Give an approximate of how important their relationship is for the movie/tv show:</label>
                <select name="storyImportance" onChange={handleChange} value={couple.storyImportance}>
                    <option value="0">-----</option>
                    {storyImportanceOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="globalRating">Global rating:</label>
                <input
                    placeholder="Number from 0 to 5"
                    name="globalRating"
                    type="number"
                    min="0"
                    max="5"
                    onChange={handleChange}
                    value={couple.globalRating}
                />
            </div>

            <div>
                <label htmlFor="romantic-connection">Romantic connection:</label>
                <select name="romanticConnection" onChange={handleChange} value={couple.romanticConnection}>
                    <option value="0">-----</option>
                    {romanticConnectionOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="chemistry">Chemistry:</label>
                <select name="chemistry" onChange={handleChange} value={couple.chemistry}>
                    <option value="0">-----</option>
                    {chemistryOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="ending">Ending:</label>
                <select name="ending" onChange={handleChange} value={couple.ending}>
                    <option value="default">-----</option>
                    {endingOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <button onClick={() => setCurrentSection(currentSection + 1)}>Next</button>
        </section>
    );
}
