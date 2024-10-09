"use client"

import styles from "./Form.module.css";
import { useAddContext } from "../AddContext";
import Countries from "./Countries";
import {
    genderOptions,
    sexualOrientationOptions,
    genderIdentityOptions,
    genderExpressionOptions, lifeStageOptions, ethnicityOptions
} from "@/app/utils/couplesOptions"

export default function Person({ number }) {
    const { couple, setCouple, currentSection, setCurrentSection } = useAddContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setCouple(
            prevCouple => ({
                ...prevCouple,
                people: prevCouple.people.map((person, index) =>
                    index === number ? { ...person, [e.target.name]: e.target.value } : person
                )
            })
        )
    }

    const handleEthnicityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setCouple(prevCouple => ({
                ...prevCouple,
                people: prevCouple.people.map((person, index) =>
                    index === number ? { ...person, ethnicity: [...prevCouple.people[number].ethnicity, value] } : person
                )
            }))
        } else {
            setCouple(prevCouple => ({
                ...prevCouple,
                people: prevCouple.people.map((person, index) =>
                    index === number ? { ...person, ethnicity: prevCouple.people[number].ethnicity.filter(ethnicity => ethnicity !== value) } : person
                )
            }))
        }
    };

    const handleSecondNationality = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setCouple(
            prevCouple => ({
                ...prevCouple,
                people: prevCouple.people.map((person, index) =>
                    index === number ? { ...person, moreThanOneCountry: checked } : person
                )
            })
        )
    }

    return (
        <section className={styles.section}>
            <h2>Person {number + 1}</h2>
            <div>
                <label className={styles.required}>Name</label>
                <input
                    placeholder="First name"
                    name="name"
                    onChange={handleChange}
                    value={couple.people[number].name}
                    className={styles.textInput}
                    required
                />
            </div>
            <div>
                <label htmlFor="gender">Gender</label>
                <select name="gender" onChange={handleChange} value={couple.people[number].gender}>
                    <option value="default">-----</option>
                    {genderOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="sexualOrientation">Sexual orientation</label>
                <select name="sexualOrientation" onChange={handleChange} value={couple.people[number].sexualOrientation}>
                    <option value="default">-----</option>
                    {sexualOrientationOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="genderIdentity">Which applies?</label>
                <select name="genderIdentity" onChange={handleChange} value={couple.people[number].genderIdentity}>
                    <option value="default">-----</option>
                    {genderIdentityOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="genderExpression">Gender expression</label>
                <select name="genderExpression" onChange={handleChange} value={couple.people[number].genderExpression}>
                    <option value="default">-----</option>
                    {genderExpressionOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="lifeStage">Life-stage</label>
                <select name="lifeStage" onChange={handleChange} value={couple.people[number].lifeStage}>
                    <option value="default">-----</option>
                    {lifeStageOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <fieldset>
                <div>
                    <legend>Check all which apply</legend>
                    {ethnicityOptions.map(option => (
                        <span key={option.value}>
                            <input
                                type="checkbox"
                                name="ethnicity"
                                className={styles.checkbox}
                                value={option.value}
                                id={option.value}
                                onChange={handleEthnicityChange}
                                checked={couple.people[number].ethnicity.includes(option.value)}
                            />
                            <label className={styles.checkboxLabel} htmlFor={option.value}>{option.label}</label>
                        </span>
                    ))}
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <Countries name="nationality" number={number} handleChange={handleChange} />
                </div>
                <div className={styles.checkboxDiv}>
                    <input
                        type="checkbox"
                        name="moreThanOneCountry"
                        id="moreThanOneCountry"
                        onChange={handleSecondNationality}
                        className={styles.checkbox}
                        checked={couple.people[number].moreThanOneCountry} />
                    <label className={styles.checkboxLabel} htmlFor="moreThanOneCountry">They are from more than one country (immigrants, travelers, etc.)</label>
                </div>
                {couple.people[number].moreThanOneCountry === true && <div>
                    <Countries name="secondNationality" number={number} handleChange={handleChange} /></div>}
            </fieldset>
            <button onClick={() => setCurrentSection(currentSection + 1)}>Next</button>
        </section>
    );
}
