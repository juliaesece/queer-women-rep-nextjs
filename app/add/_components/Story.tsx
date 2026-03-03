import styles from "./Form.module.css";
import { useAddContext } from "../AddContext";
import { originTypeOptions, statusOptions } from "@/app/utils/couplesOptions";
import SearchTMDB from "./SearchTMDB";
import { useState } from "react";

export default function Story() {
    const { couple, handleChange, handleCheckbox, currentSection, setCurrentSection } = useAddContext()
    const [previewStatus, setPreviewStatus] = useState(null)

    return (
        <section className={styles.section}>
            <div className={styles.fullWidth}>
                <SearchTMDB />
            </div>
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
            {couple.mediaType == "Webseries" && <div className={styles.fullWidth}>
                <label htmlFor="webseriesLink">Link to the webseries:</label>
                <input className={styles.textInput} placeholder="Link" name="webseriesLink" onChange={handleChange} value={couple.webseriesLink} />
            </div>}
            <div className={styles.fullWidth}>
                <label htmlFor="mediaDescription">Synopsis of the TV Show/Movie</label>
                <textarea name="mediaDescription" className={styles.longTextInput} onChange={handleChange} value={couple.mediaDescription}>
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
            <p className={styles.fullWidth}>
                Here below you will be able to see a preview of your image.
            </p>
            {couple.image && (
                <img
                    src={couple.image}
                    onLoad={() => setPreviewStatus('valid')}
                    onError={() => setPreviewStatus('invalid')}
                    alt="Image has failed to load"
                    className={styles.previewImage}
                />
            )}

            {previewStatus == "valid" && <p className={styles.fullWidth}> The image link seems to be working well.</p>}
            {previewStatus == "invalid" && <p className={styles.fullWidth}>
                Your image link is invalid. Try to <a target="_blank" className="link--subtle-underlined" href="https://cloudinary.com/blog/questions/how-to-copy-image-address#how_to_copy_image_address_by_device_and_browser_">access this short tutorial</a> and follow the instructions there on how to get an image link. If it doesn&apos;t work, just leave the original link, and the developer of the site will be able to fix it.</p>}
            <button onClick={() => setCurrentSection(currentSection + 1)}>Next</button>
        </section>
    );
}
