"use client"
import { createContext, useState, useContext } from 'react';
import { SearchCouple, Couple } from '../utils/types'

type SearchContextType = {
    searchCouple: SearchCouple,
    setSearchCouple: React.Dispatch<React.SetStateAction<SearchCouple>>,
    result: Couple[],
    setResult: React.Dispatch<React.SetStateAction<Couple[]>>,
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    handleEthnicityChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void,
    waitingMessage: string,
    setWaitingMessage: React.Dispatch<React.SetStateAction<string>>,
    sortBy: string,
    setSortBy: React.Dispatch<React.SetStateAction<string>>
}

export const SearchContext = createContext<null | SearchContextType>(null);


const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchCouple, setSearchCouple] = useState<SearchCouple>({ person: {ethnicity: []} });
    const [result, setResult] = useState([])
    const [waitingMessage, setWaitingMessage] = useState("No search has been made yet.")
    const [sortBy, setSortBy] = useState("rating")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setSearchCouple({
            ...searchCouple,
            [e.target.name]: e.target.value
        })
    }

    const handleEthnicityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setSearchCouple({
                ...searchCouple,
                person: { ...searchCouple.person, [e.target.name]: e.target.value }
            })
        } else {
            setSearchCouple({
                ...searchCouple,
                person: { ...searchCouple.person, ethnicity: [] }
            })
        }
    }

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setSearchCouple(
            prevCouple => ({
                ...prevCouple,
                [name]: checked
            })
        )
    }

    const value = {
        searchCouple,
        setSearchCouple,
        result,
        setResult,
        handleChange,
        handleEthnicityChange,
        handleCheckbox,
        waitingMessage,
        setWaitingMessage,
        sortBy,
        setSortBy
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContextProvider;

export const useSearchContext = () => {
    return useContext(SearchContext)
};