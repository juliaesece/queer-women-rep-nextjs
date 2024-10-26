import styles from "./Form.module.css";
import { useAddContext } from "../AddContext";
import { romanticConnectionOptions, chemistryOptions } from "@/app/utils/couplesOptions";

export default function Rate() {
    const { couple, handleChange, setCouple, currentSection, setCurrentSection } = useAddContext()

    return (
        <section className={styles.section}>
            <div className={styles.fullWidth}  >
                <p>Be the first to vote:</p>
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

            {!(couple.people[0].lifeStage == "Children" || couple.people[0].lifeStage == "Children") &&
                <div>
                    <label htmlFor="chemistry">Chemistry:</label>
                    <select name="chemistry" onChange={handleChange} value={couple.chemistry}>
                        <option value="0">-----</option>
                        {chemistryOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            }
            <button onClick={() => setCurrentSection(currentSection + 1)}>Next</button>
        </section>
    );
}
