import { createContext, useState, useContext } from 'react';
import { Couple, outOfFive, outOfFour } from '../utils/types'

type AddContextType = {
    couple: Couple,
    setCouple: React.Dispatch<React.SetStateAction<Couple>>,
    currentSection: number,
    setCurrentSection: React.Dispatch<React.SetStateAction<number>>,
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void,
    emptyCouple: Couple
}

export const AddContext = createContext<null | AddContextType>(null);


const AddContextProvider = ({ children }: { children: React.ReactNode }) => {
    const emptyCouple = {
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
        mediaType: "",
        year: new Date(),
        status: "",
        mediaDescription: "",
        areThereQueerCreators: false,
        image: "",
        altImg: "",
        shortDescription: "",
        longDescription: "",
        tags: [],
        screenTime: 0 as outOfFive,
        storyImportance: 0 as outOfFour,
        globalRating: 0 as outOfFive,
        romanticConnection: 0 as outOfFive,
        chemistry: 0 as outOfFive,
        ending: "",
        concerns: {
            comingOut: false,
            death: false,
            cheating: false,
            homophobia: 0 as outOfFive
        },
        dateAdded: new Date()
    }
    const [couple, setCouple] = useState(emptyCouple);

    const [currentSection, setCurrentSection] = useState(0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.name == "mediaType" && e.target.value == "Movie") {
            setCouple(
                prevCouple => ({
                    ...prevCouple,
                    [e.target.name]: e.target.value,
                    status: "Completed"
                })
            )
        } else {
            setCouple(
                prevCouple => ({
                    ...prevCouple,
                    [e.target.name]: e.target.value
                })
            )
        }
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
        handleCheckbox,
        emptyCouple
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