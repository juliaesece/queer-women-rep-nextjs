import styles from "./Form.module.css";
import { useAddContext } from "../AddContext";
import { concerns, booleanOptions, homophobiaOptions } from "@/app/utils/couplesOptions";


export default function Concerns() {
    const { couple, setCouple } = useAddContext()

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCouple({
            ...couple,
            concerns: {
                ...couple.concerns,
                [name]: value === 'true'
            }
        });
    };

    const concernHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        setCouple({
            ...couple,
            concerns: {
                ...couple.concerns,
                [name]: value
            }
        }
        )
    }

    return (
        <section className={styles.section}>
            {concerns.map((concern) => (
                <fieldset key={concern.key} className={styles.fullWidth}>
                    <legend>{concern.question}</legend>
                    {booleanOptions.map(option => (
                        <div key={option.value}>
                            <input
                                type="radio"
                                name={concern.key}
                                value={option.value}
                                checked={couple.concerns[concern.key] === (option.value === 'true')}
                                onChange={handleRadioChange}
                                className={styles.checkbox}
                                id={`${concern.key}-${option.value}`}
                            />
                            <label className={styles.checkboxLabel} htmlFor={`${concern.key}-${option.value}`}>
                                {option.label}
                            </label>
                        </div>
                    ))}
                </fieldset>
            ))}
            <div className={styles.fullWidth}>
                <label htmlFor="homophobia">
                    How much homophobic or sexist violence are they subjected to?
                </label>
                <select
                    name="homophobia"
                    onChange={concernHandleChange}
                    value={couple.concerns.homophobia}
                >
                    <option value="0">-----</option>
                    {homophobiaOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </section>
    );
}
