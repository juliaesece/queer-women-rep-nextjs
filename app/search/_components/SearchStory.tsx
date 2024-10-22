import styles from "./Form.module.css";
import { useSearchContext } from "../SearchContext";
import { originTypeOptions, statusOptions } from "@/app/utils/couplesOptions";

export default function SearchStory() {
    const { searchCouple, handleChange, handleCheckbox } = useSearchContext()

    return (
        <section className={styles.section}>
            <div>
                <label  htmlFor="originType">Origin Type</label>
                <select name="originType" onChange={handleChange} value={searchCouple.originType || "default"}>
                    <option value="default">-----</option>
                    {originTypeOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="status">Completed status</label>
                <select name="status" onChange={handleChange} value={searchCouple.status || "default"}>
                    <option value="default">-----</option>
                    {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <div className={styles.fullWidth}>
                <input
                    type="checkbox"
                    name="isThereQueerCreators"
                    id="isThereQueerCreators"
                    onChange={handleCheckbox}
                    checked={searchCouple.isThereQueerCreators}
                    className={styles.checkbox}
                />
                <label className={styles.checkboxLabel} htmlFor="isThereQueerCreators">There is a queer woman or non-binary person among the directors or writers (leave unchecked if there isn&apos;t)</label>
            </div>
        </section>
    );
}
