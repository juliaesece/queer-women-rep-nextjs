"use client";

import styles from './SearchForm.module.css';
import { useSearchContext } from '../SearchContext';
import SearchPeople from './SearchPeople';
import SearchRelationship from './SearchRelationship';
import SearchStory from './SearchStory';
import SearchConcerns from './SearchConcerns';
import { useRouter } from 'next/navigation'

export default function SearchForm() {
    const { searchCouple, setSearchCouple, setWaitingMessage } = useSearchContext()
    const router = useRouter()

    const findCouples = async (e) => {
        e.preventDefault()
        setWaitingMessage("Searching...")

        let modifiableSearchCouple = JSON.parse(JSON.stringify(searchCouple)) // Deep copy, otherwise ethnicity becomes undefined

        // If person is empty, delete
        if (Object.keys(modifiableSearchCouple.person).length == 1
            && Object.keys(modifiableSearchCouple.person)[0] == "ethnicity"
            && modifiableSearchCouple.person.ethnicity.length == 0
        ) delete modifiableSearchCouple.person
        else if (
            modifiableSearchCouple.person.ethnicity.length == 0
        ) delete modifiableSearchCouple.person.ethnicity

        if (modifiableSearchCouple.person.nationality == "") delete modifiableSearchCouple.person.nationality

       // console.log needs testing?

        let searchURL = new URLSearchParams(modifiableSearchCouple)
        let personUrl = new URLSearchParams(modifiableSearchCouple.person)

        searchURL.set("person", personUrl.toString())

        router.push('/search?' + searchURL)
    }

    return (
        <form className={styles.searchForm} onSubmit={findCouples}>
            <details open>
                <summary>One of the people is:</summary>
                <SearchPeople />
            </details>
            <details>
                <summary>Filters for the relationship:</summary>
                <SearchRelationship />
            </details>
            <details>
                <summary>Filters for the story:</summary>
                <SearchStory />
            </details>
            <details>
                <summary>Filters for concerns:</summary>
                <SearchConcerns />
            </details>
            <div className={styles.buttonsContainer}>
                <button className={styles.removeFilters} type="button" onClick={() => {
                    setSearchCouple({ person: { ethnicity: [] } })
                    router.push('/search')
                    router.refresh()
                }
                }>Remove all filters</button>
                <button className={styles.submitButton} type='submit'>Search</button>
            </div>
        </form>
    );
};

