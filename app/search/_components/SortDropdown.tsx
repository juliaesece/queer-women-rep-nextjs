"use client";

import styles from './Results.module.css';
import { useSearchContext } from '../SearchContext';

export default function SortDropdown() {
    const { result, setResult, sortBy, setSortBy } = useSearchContext();

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortBy = e.target.value;
        setSortBy(newSortBy);
        
        const sortedResults = [...result].sort((a, b) => {
            switch (newSortBy) {
                case 'rating':
                    return (b.globalRating || 0) - (a.globalRating || 0);
                case 'screenTime':
                    return (b.screenTime || 0) - (a.screenTime || 0);
                case 'storyImportance':
                    return (a.storyImportance || 0) - (b.storyImportance || 0);
                case 'dateAddedASC':
                    return new Date(b.year).getTime() - new Date(a.year).getTime();
                case 'dateAddedDESC':
                    return new Date(a.year).getTime() - new Date(b.year).getTime();
                default:
                    return 0;
            }
        });
        
        setResult(sortedResults);
    };

    return (
        <div className={styles.sortContainer}>
            <label htmlFor="sortBy">Sort by:</label>
            <select
                id="sortBy"
                name="sortBy"
                value={sortBy}
                onChange={handleSort}
                className={styles.sortSelect}
            >
                <option value="rating">Click to select</option>
                <option value="rating">Rating (High to Low)</option>
                <option value="screenTime">Screen Time (High to Low)</option>
                <option value="storyImportance">Story Importance (High to Low)</option>
                <option value="dateAddedASC">Release Date (Newest to Oldest)</option>
                <option value="dateAddedDESC">Release Date (Oldest to Newest)</option>

            </select>
        </div>
    );
} 