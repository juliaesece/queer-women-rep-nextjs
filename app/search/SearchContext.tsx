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
    handleSecondNationality: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchContext = createContext<null | SearchContextType>(null);


const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchCouple, setSearchCouple] = useState<SearchCouple>({ person: {} });
    const [result, setResult] = useState([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setSearchCouple({
            ...searchCouple,
            person: { ...searchCouple.person, [e.target.name]: e.target.value }
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

    const handleSecondNationality = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setSearchCouple({
            ...searchCouple,
            person: { ...searchCouple.person, moreThanOneCountry: checked }
        })
    }

    const value = {
        searchCouple,
        setSearchCouple,
        result,
        setResult,
        handleChange,
        handleEthnicityChange,
        handleSecondNationality
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