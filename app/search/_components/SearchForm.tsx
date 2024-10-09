"use client";

import styles from './SearchForm.module.css';
import { searchCouples } from '../_actions/searchCouples';
import { useSearchContext } from '../SearchContext';
import SearchPeople from './SearchPeople';
import SearchRelationship from './SearchRelationship';
import SearchStory from './SearchStory';
import SearchConcerns from './SearchConcerns';
import { useState } from 'react';

export default function SearchForm() {
    const { searchCouple, setSearchCouple, setResult, setWaitingMessage } = useSearchContext()
    const [open, setOpen] = useState(0);

    const isOpen = (id) => {
        return id === open ? true : false;
    }

    const findCouples = async (e) => {
        e.preventDefault()
        setWaitingMessage("Searching...")
        const result = await searchCouples(searchCouple)
        setResult(result)
        if (result.length == 0) setWaitingMessage("No couples were found")
    }

    return (
        <form className={styles.searchForm} onSubmit={findCouples}>
            <details open={isOpen(0)}>
                <summary onClick={(e) => {
                    e.preventDefault();
                    setOpen(0)
                }}>One of the people is:</summary>
                <SearchPeople />
            </details>
            <details open={isOpen(1)}>
                <summary onClick={(e) => {
                    e.preventDefault();
                    setOpen(1)
                }} >Filters for the relationship:</summary>
                <SearchRelationship />
            </details>
            <details open={isOpen(2)}>
                <summary onClick={(e) => {
                    e.preventDefault();
                    setOpen(2)
                }}>Filters for the story:</summary>
                <SearchStory />
            </details>
            <details open={isOpen(3)}>
                <summary onClick={(e) => {
                    e.preventDefault();
                    setOpen(3)
                }}>Filters for concerns:</summary>
                <SearchConcerns />
            </details>
            <div className={styles.buttonsContainer}>
                <button className={styles.removeFilters} type="button" onClick={() => setSearchCouple({ person: {ethnicity: []} })}>Remove all filters</button>
                <button className={styles.submitButton} type='submit'>Search</button>
            </div>  
        </form>
    );
};

