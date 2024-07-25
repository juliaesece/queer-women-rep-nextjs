import { createContext, useState, useContext } from 'react';
import {Person, Couple, outOfFive, outOfFour } from './types'

type AddContextType = {
    couple: Couple,
    setCouple: React.Dispatch<React.SetStateAction<Couple>>,
    currentSection: number,
    setCurrentSection: React.Dispatch<React.SetStateAction<number>>,
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AddContext = createContext<null | AddContextType>(null);


const AddContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [couple, setCouple] = useState({
        people: [
            {
                name: "",
                gender: "",
                sexualOrientation: "",
                genderIdentity: "",
                genderExpression: "",
                ethnicity: [],
                nationality: "",
                moreThanOneCountry: false,
                secondNationality: "",
                lifeStage: ""
            },
            {
                name: "",
                gender: "",
                sexualOrientation: "",
                genderIdentity: "",
                genderExpression: "",
                ethnicity: [],
                nationality: "",
                moreThanOneCountry: false,
                secondNationality: "",
                lifeStage: ""
            }
        ],
        origin: "",
        originType: "",
        year: 0,
        status: "",
        description: "",
        isThereQueerCreators: false,
        queerDirectors: false,
        image: "",
        altImg: "",
        coupleDescription: "",
        coupleDescriptionIsSpoiler: false,
        screenTime: 0 as outOfFive,
        storyImportance: 0 as outOfFour,
        globalRating: 0 as outOfFive,
        romanticConnection: 0 as outOfFive,
        chemistry: 0 as outOfFive,
        ending: "",
        concernsComingOut: false,
        concernsDeath: false,
        concernsCheating: false,
        concernsHomophobia: 0 as outOfFive
    });


    const [currentSection, setCurrentSection] = useState(0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setCouple(
            prevCouple => ({
                ...prevCouple,
                [e.target.name]: e.target.value
            })
        )
    }

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCouple(
            prevCouple => ({
                ...prevCouple,
                [name]: checked
            })
        )
    }

    const value = {
        couple,
        setCouple,
        currentSection,
        setCurrentSection,
        handleChange,
        handleCheckbox
    };

    return (
        <AddContext.Provider value={value}>
            {children}
        </AddContext.Provider>
    );
};

export default AddContextProvider;

export const useAddContext = () => {
    return useContext(AddContext)
};