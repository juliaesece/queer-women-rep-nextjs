import styles from "./Form.module.css";
import { Couple } from "../../utils/types";
import { useSearchContext } from "../SearchContext";
import { searchConcerns, booleanOptions, homophobiaOptions } from "@/app/utils/couplesOptions";

export default function SearchConcerns() {
    const { searchCouple, setSearchCouple, handleChange } = useSearchContext()

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSearchCouple(prevPerson => ({
            ...prevPerson,
            [name]: value === 'true'
        }));
    };

    return (
        <section className={styles.section}>
            {searchConcerns.map((concern) => (
                <fieldset key={concern.key} className={styles.fullWidth}>
                    <legend>{concern.question}</legend>
                    {booleanOptions.map(option => (
                        <div key={option.value}>
                            <input
                                type="radio"
                                name={concern.key}
                                value={option.value}
                                id={`${concern.key}-${option.value}`}
                                checked={searchCouple[concern.key] === (option.value === 'true')}
                                onChange={handleRadioChange}
                                className={styles.checkbox}
                            />
                            <label className={styles.checkboxLabel} htmlFor={`${concern.key}-${option.value}`}>
                                {option.label}
                            </label>
                        </div>
                    ))}
                </fieldset>
            ))}
            <div className={styles.fullWidth}>
                <label htmlFor="concerns.homophobia">
                    How much homophobic or sexist violence they are subjected to (less or equal to):
                </label>
                <select
                    name="concerns.homophobia"
                    onChange={handleChange}
                    value={searchCouple.concernsHomophobia}
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
