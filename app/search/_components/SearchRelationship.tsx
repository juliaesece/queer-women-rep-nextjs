import { useSearchContext } from "../SearchContext";
import styles from "./Form.module.css";
import { screenTimeOptions, storyImportanceOptions, numberAndHigherOptions, endingOptions } from "@/app/utils/couplesOptions";

export default function SearchRelationship() {
    const { searchCouple, handleChange, handleCheckbox } = useSearchContext()

    return (
        <section className={styles.section}>
            <h3>All filters on this section are greater or equal to, so what you select is the minimum.</h3>
            <div>
                <label htmlFor="screenTime">How much screen time they have:</label>
                <select name="screenTime" onChange={handleChange} value={searchCouple.screenTime || ""}>
                    <option value="">Any</option>
                    {screenTimeOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="storyImportance">How important their relationship is for the movie/tv show:</label>
                <select name="storyImportance" onChange={handleChange} value={searchCouple.storyImportance || ""}>
                    <option value="">Any</option>
                    {storyImportanceOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="globalRating">Global rating:</label>
                <select name="globalRating" onChange={handleChange} value={searchCouple.globalRating || ""}>
                    <option value="">Any</option>
                    {numberAndHigherOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="romantiConnection">Romantic connection:</label>
                <select name="romanticConnection" onChange={handleChange} value={searchCouple.romanticConnection || ""}>
                    <option value="">Any</option>
                    {numberAndHigherOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="chemistry">Chemistry:</label>
                <select name="chemistry" onChange={handleChange} value={searchCouple.chemistry || ""}>
                    <option value="">Any</option>
                    {numberAndHigherOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="ending">Ending:</label>
                <select name="ending" onChange={handleChange} value={searchCouple.ending || ""}>
                    <option value="">Any</option>
                    {endingOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </section>
    );
}
