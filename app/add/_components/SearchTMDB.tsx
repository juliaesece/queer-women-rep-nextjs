"use client";
import { useState, useEffect } from "react";
import { queryTMDB, getOneTMDB } from "../_actions/queryTMDB";
import styles from "./SearchTMDB.module.css";
import defaultStyles from "./Form.module.css"
import Image from "next/image";
import { useAddContext } from "../AddContext";

const SearchTMDB = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const { couple, setCouple } = useAddContext()

  const statusLookup = {
    "Returning Series": "Ongoing",
    "Canceled": "Cancelled",
    "Ended": "Completed"
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    try {

      const results = await queryTMDB(query)

      if (!results) throw new Error("TMDB error")

      console.log(results)

      const topResults = results.map((item) => {
        const isTV = item.media_type === "tv";
        return {
          id: item.id,
          title: item.title || item.name,
          releaseDate: isTV ? item.first_air_date : item.release_date,
          poster_path: item.poster_path,
          media_type: item.media_type
        };
      }
      )
      setResults(topResults);
    } catch (err) {
      setResults([]);
      console.log(err)
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => console.log(couple), [couple])

  const handleSelectResult = async (result) => {
    const selected = await getOneTMDB(result.media_type, result.id)
    const isTV = result.media_type === "tv";
    const mediaStatus = isTV ? statusLookup[selected.status] : "Completed"

    setCouple({
      ...couple,
      mediaType: isTV ? "TV Show" : "Movie",
      origin: isTV ? selected.name : selected.title,
      status: mediaStatus,
      mediaDescription: selected.overview,
      year: isTV ? selected.first_air_date : selected.release_date,
      genres: selected.genres
    })
    // something for creator/director, created_by: [{name: ""}]
    // and seasons

    // netflix: networks[{name: "Netflix"}]
    setResults([])
  };

  return (
    <>
      <div className={defaultStyles.fullWidth}>
        <label htmlFor="searchTMDB">
          Complete this faster with information from The Movie Database (which also includes information about TV Shows)
        </label>
        <input
          type="text"
          id="searchTMDB"
          name="searchTMDB"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie or TV show"
          className={defaultStyles.shortTextInput}
        />
        <button className={defaultStyles.TMDBbutton} onClick={handleSearch}>
          Search
        </button>
      </div>

      {error && (
        <div className={styles.error}>{error}</div>
      )}

      {results.length > 0 && (
        <div className={styles.resultsGrid}>
          {results.map((result) => (
            <div
              key={result.id}
              className={styles.card}
              onClick={() => handleSelectResult(result)}
            >
              <div className={styles.cardContent}>
                <div className={styles.posterContainer}>
                  {result.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w154${result.poster_path}`}
                      alt={result.title}
                      className={styles.poster}
                      width={154}
                      height={231}
                    />
                  ) : (
                    <span className={styles.poster}>No Poster Available</span>
                  )}
                </div>
                <h3 className={styles.title}>{result.title}</h3>
                <p className={styles.subtitle}>
                  {result.media_type.toUpperCase()} • {result.releaseDate?.split('-')[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </>
  );
};

export default SearchTMDB;
