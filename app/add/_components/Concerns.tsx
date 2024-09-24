import styles from "./Form.module.css";
import { useAddContext } from "../AddContext";
import { Couple } from "../types";

type Option = {
    value: string;
    label: string;
}

type Concern = {
    key: keyof Pick<Couple, 'concernsComingOut' | 'concernsDeath' | 'concernsCheating'>;
    question: string;
}

export default function Concerns() {
    const { couple, setCouple, handleChange } = useAddContext()

    const booleanOptions: Option[] = [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' },
    ];

    const concerns: Concern[] = [
        { key: 'concernsComingOut', question: 'Is coming out a thing in this story?' },
        { key: 'concernsDeath', question: 'Does someone of the couple die?' },
        { key: 'concernsCheating', question: 'Is there cheating (on a third party)?' },
    ];

    const homophobiaOptions: Option[] = [
        { value: '1', label: 'None at all' },
        { value: '2', label: 'A little bit' },
        { value: '3', label: 'A solid amount' },
        { value: '4', label: 'A considerable amount' },
        { value: '5', label: 'Just. too. much.' },
    ];


    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCouple(prevPerson => ({
            ...prevPerson,
            [name]: value === 'true'
        }));
    };

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
                                checked={couple[concern.key] === (option.value === 'true')}
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
                <label htmlFor="concernsHomophobia">
                    How much homophobic or sexist violence are they subjected to?
                </label>
                <select
                    name="concernsHomophobia"
                    onChange={handleChange}
                    value={couple.concernsHomophobia}
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
