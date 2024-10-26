import styles from "./Form.module.css";
import { useAddContext } from "../AddContext";
import { screenTimeOptions, storyImportanceOptions, romanticConnectionOptions, chemistryOptions, endingOptions } from "@/app/utils/couplesOptions";

export default function Relationship() {
    const { couple, handleChange, setCouple, currentSection, setCurrentSection } = useAddContext()

    const handleTags = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setCouple(
            prevCouple => ({
                ...prevCouple,
                tags: e.target.value.split(", "),
            })
        )
    }

    return (
        <section className={styles.section}>
            <div className={styles.fullWidth}>
                <label htmlFor="coupleDescription" className={styles.required}>Short description of the story of the couple within the TV Show/Movie, cannot contain spoilers:</label>
                <textarea
                    name="shortDescription"
                    placeholder="Here write a short summary of who they are and why do they know each other."
                    onChange={handleChange}
                    value={couple.shortDescription}
                    className={styles.longTextInput}
                    required
                >
                </textarea>
            </div>
            {/* <div className={styles.fullWidth}>
                <input
                    type="checkbox"
                    name="coupleDescriptionIsSameAsStory"
                    onChange={handleCheckbox}
                    checked={couple.coupleDescriptionIsSameAsStory}
                    className={styles.checkbox}
                />
                <label className={styles.checkboxLabel} htmlFor="coupleDescriptionIsSameAsStory">It's the same as the main story</label>
            </div> */}

            <div className={styles.fullWidth}>
                <label htmlFor="tags">Tags (separated by a comma)</label>
                <input className={styles.textInput} placeholder="For instance: enemies to lovers, period drama, etc." name="tags" id="tags" onChange={handleTags} value={couple.tags.join(", ")} />
            </div>

            <div className={styles.fullWidth}>
                <label htmlFor="coupleDescription">Long description of the story of the couple within the TV Show/Movie, may contain spoilers:</label>
                <textarea
                    name="longDescription"
                    placeholder="Here you can write a longer description, speaking about different stages of the relationship, or why it's good or bad representation."
                    onChange={handleChange}
                    value={couple.longDescription}
                    className={styles.longTextInput}
                >
                </textarea>
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
