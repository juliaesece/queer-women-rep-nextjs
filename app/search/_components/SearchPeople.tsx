"use client";

import styles from './SearchForm.module.css';
import {
    genderOptions,
    sexualOrientationOptions,
    genderIdentityOptions,
    genderExpressionOptions, lifeStageOptions, ethnicityOptions
} from "@/app/utils/couplesOptions"
import { useSearchContext } from '../SearchContext';
import Countries from './Countries';


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


    return (
        <section className={styles.section}>
            <div>
                <label htmlFor="gender">Gender</label>
                <select name="gender" onChange={handleChange} value={searchCouple.person.gender || ""}>
                    <option value="">Any (excluding male)</option>
                    {genderOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="sexualOrientation">Sexual orientation</label>
                <select name="sexualOrientation" onChange={handleChange} value={searchCouple.person.sexualOrientation || ""}>
                    <option value="">Any (excluding straight)</option>
                    {sexualOrientationOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="genderIdentity">Gender modality</label>
                <select name="genderIdentity" onChange={handleChange} value={searchCouple.person.genderIdentity || ""}>
                    <option value="">Any</option>
                    {genderIdentityOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="genderExpression">Gender expression</label>
                <select name="genderExpression" onChange={handleChange} value={searchCouple.person.genderExpression || ""}>
                    <option value="">Any</option>
                    {genderExpressionOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="lifeStage">Life-stage</label>
                <select name="lifeStage" onChange={handleChange} value={searchCouple.person.lifeStage || ""}>
                    <option value="">Any</option>
                    {lifeStageOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <fieldset>
                <div>
                    <legend>Check all which apply (the search will be with "or")</legend>
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
                    <Countries name="nationality" />
                </div>
               
            </fieldset>
        </section>
    );
};

