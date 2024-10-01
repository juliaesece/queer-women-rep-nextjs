import styles from "./Form.module.css";
import { useAddContext } from "../AddContext";

export default function Story() {
    const { couple, setCouple, handleChange, handleCheckbox, currentSection, setCurrentSection } = useAddContext()

    return (
        <section className={styles.section}>
            <div>
                <label className={styles.required} htmlFor="originType">Origin Type</label>
                <select name="originType" onChange={handleChange} value={couple.originType} required>
                    <option value="default">-----</option>
                    <option value="TV Show">TV Show</option>
                    <option value="Movie">Movie</option>
                </select>
            </div>
            <div>
                <label className={styles.required} htmlFor="origin">Name of the TV Show/Movie</label>
                <input className={styles.textInput} placeholder="Title of TV Show or movie" name="origin" onChange={handleChange} value={couple.origin} />
            </div>
            <div>
                <label htmlFor="year">Release date</label>
                <input type="date" placeholder="Year" name="year" onChange={handleChange} value={couple.year} />
            </div>
            <div className={styles.fullWidth}>
                <label htmlFor="description">Description of the TV Show/Movie</label>
                <textarea name="description" className={styles.longTextInput} onChange={handleChange} value={couple.description}>
                </textarea>
            </div>
            <div className={styles.fullWidth}>
                <input
                    type="checkbox"
                    name="isThereQueerCreators"
                    id="isThereQueerCreators"
                    onChange={handleCheckbox}
                    checked={couple.isThereQueerCreators}
                    className={styles.checkbox}
                />
                <label className={styles.checkboxLabel} htmlFor="isThereQueerCreators">There is a queer woman or non-binary person among the directors or writers (leave unchecked if there isn&apos;t)</label>

            </div>
            <h2>An image</h2>
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
