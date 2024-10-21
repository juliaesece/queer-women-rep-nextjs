import { useSearchContext } from "../SearchContext";
import styles from "./Form.module.css";
import { screenTimeOptions, storyImportanceOptions, romanticConnectionOptions, chemistryOptions, endingOptions } from "@/app/utils/couplesOptions";

export default function SearchRelationship() {
    const { searchCouple, handleChange, handleCheckbox } = useSearchContext()

    return (
        <section className={styles.section}>
            <div>
                <label htmlFor="screenTime">How much screen time they have:</label>
                <select name="screenTime" onChange={handleChange} value={searchCouple.screenTime}>
                    <option value={0}>-----</option>
                    {screenTimeOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="storyImportance">How important their relationship is for the movie/tv show:</label>
                <select name="storyImportance" onChange={handleChange} value={searchCouple.storyImportance}>
                    <option value={0}>-----</option>
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
                    value={searchCouple.globalRating}
                />
            </div>

            <div>
                <label htmlFor="romantiConnection">Romantic connection:</label>
                <select name="romanticConnection" onChange={handleChange} value={searchCouple.romanticConnection}>
                    <option value="0">-----</option>
                    {romanticConnectionOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="chemistry">Chemistry:</label>
                <select name="chemistry" onChange={handleChange} value={searchCouple.chemistry}>
                    <option value="0">-----</option>
                    {chemistryOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="ending">Ending:</label>
                <select name="ending" onChange={handleChange} value={searchCouple.ending}>
                    <option value="default">-----</option>
                    {endingOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </section>
    );
}
