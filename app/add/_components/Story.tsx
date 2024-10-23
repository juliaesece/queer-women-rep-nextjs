import styles from "./Form.module.css";
import { useAddContext } from "../AddContext";
import { originTypeOptions, statusOptions } from "@/app/utils/couplesOptions";

export default function Story() {
    const { couple, handleChange, handleCheckbox, currentSection, setCurrentSection } = useAddContext()

    return (
        <section className={styles.section}>
            <div>
                <label className={styles.required} htmlFor="mediaType">Media type</label>
                <select name="mediaType" onChange={handleChange} value={couple.mediaType} required>
                    <option value="default">-----</option>
                    {originTypeOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className={styles.required} htmlFor="origin">Name of the TV Show/Movie</label>
                <input className={styles.textInput} placeholder="Title of TV Show or movie" name="origin" onChange={handleChange} value={couple.origin} />
            </div>
            <div>
                <label htmlFor="status">Completed status</label>
                <select name="status" onChange={handleChange} value={couple.status}>
                    <option value="default">-----</option>
                    {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="year">Release date</label>
                <input type="date" placeholder="Year" name="year" onChange={handleChange} value={couple.year} />
            </div>
            <div className={styles.fullWidth}>
                <label htmlFor="description">Synopsis of the TV Show/Movie</label>
                <textarea name="description" className={styles.longTextInput} onChange={handleChange} value={couple.mediaDescription}>
                </textarea>
            </div>
            <div className={styles.fullWidth}>
                <input
                    type="checkbox"
                    name="areThereQueerCreators"
                    id="areThereQueerCreators"
                    onChange={handleCheckbox}
                    checked={couple.areThereQueerCreators}
                    className={styles.checkbox}
                />
                <label className={styles.checkboxLabel} htmlFor="areThereQueerCreators">There is a queer woman or non-binary person among the directors or writers (leave unchecked if there isn&apos;t)</label>

            </div>  
            <h2>An image of them</h2>
            <div className={styles.fullWidth}>
                <label className={styles.required} htmlFor="status">Image URL</label>
                <input className={styles.textInput} type="url" placeholder="Choose a good quality image in which we can see both people" name="image" onChange={handleChange} value={couple.image} />
            </div>
            <div className={styles.fullWidth}>
                <label htmlFor="status">Image description</label>
                <input className={styles.textInput} placeholder="Image description" name="altImg" onChange={handleChange} value={couple.altImg} />
            </div>
            <button onClick={() => setCurrentSection(currentSection + 1)}>Next</button>
        </section>
    );
}
