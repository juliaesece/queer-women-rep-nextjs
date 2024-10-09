"use client";

import styles from './SearchForm.module.css';
import Countries from '../../add/_components/Countries';
import {
    genderOptions,
    sexualOrientationOptions,
    genderIdentityOptions,
    genderExpressionOptions, lifeStageOptions, ethnicityOptions
} from "@/app/utils/couplesOptions"
import { useSearchContext } from '../SearchContext';


export default function SearchPeople() {
    const { searchCouple, setSearchCouple } = useSearchContext()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setSearchCouple(
            {
                ...searchCouple,
                person: { ...searchCouple.person, [e.target.name]: e.target.value }
            }
        )
    }


    const handleEthnicityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setSearchCouple(
                {
                    ...searchCouple,
                    person: { ...searchCouple.person, ethnicity: [...searchCouple.person.ethnicity, value] }
                }
            )
        } else {
            setSearchCouple(
                {
                    ...searchCouple,
                    person: { ...searchCouple.person, ethnicity: searchCouple.person.ethnicity.filter((el) => el != value) }
                }
            )
        }
    };

    const handleSecondNationality = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setSearchCouple(
            {
                ...searchCouple,
                person: { ...searchCouple.person, moreThanOneCountry: checked }
            }
        )
    }

    return (
        <section className={styles.section}>
            <div>
                <label htmlFor="gender">Gender</label>
                <select name="gender" onChange={handleChange} value={searchCouple.person.gender}>
                    <option value="default">-----</option>
                    {genderOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="sexualOrientation">Sexual orientation</label>
                <select name="sexualOrientation" onChange={handleChange} value={searchCouple.person.sexualOrientation}>
                    <option value="default">-----</option>
                    {sexualOrientationOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="genderIdentity">Gender modality</label>
                <select name="genderIdentity" onChange={handleChange} value={searchCouple.person.genderIdentity}>
                    <option value="default">-----</option>
                    {genderIdentityOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="genderExpression">Gender expression</label>
                <select name="genderExpression" onChange={handleChange} value={searchCouple.person.genderExpression}>
                    <option value="default">-----</option>
                    {genderExpressionOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="lifeStage">Life-stage</label>
                <select name="lifeStage" onChange={handleChange} value={searchCouple.person.lifeStage}>
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
                                checked={searchCouple.person.ethnicity?.includes(option.value)}
                            />
                            <label className={styles.checkboxLabel} htmlFor={option.value}>{option.label}</label>
                        </span>
                    ))}
                </div>
            </fieldset>
            <fieldset>
                <div>
                    {/* <Countries name="nationality" handleChange={handleChange} /> */}
                </div>
                <div className={styles.checkboxDiv}>
                    <input
                        type="checkbox"
                        name="moreThanOneCountry"
                        id="moreThanOneCountry"
                        onChange={handleSecondNationality}
                        className={styles.checkbox}
                        checked={searchCouple.person.moreThanOneCountry} />
                    <label className={styles.checkboxLabel} htmlFor="moreThanOneCountry">They are from more than one country (immigrants, travelers, etc.)</label>
                </div>
                {searchCouple.person.moreThanOneCountry === true && <div>
                    {/*  <Countries name="secondNationality" handleChange={handleChange} /> */}</div>}
            </fieldset>
        </section>
    );
};

