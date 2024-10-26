"use client"

import styles from "./FormNav.module.css";
import { useAddContext } from "../AddContext";

export default function FormNav() {
    const { currentSection, setCurrentSection } = useAddContext();

    return (
        <nav className={styles.main}>
            <div onClick={() => setCurrentSection(0)} className={currentSection == 0 ? styles.active : ""}>
                Person 1
            </div>
            <div onClick={() => setCurrentSection(1)} className={currentSection == 1 ? styles.active : ""}>
                Person 2
            </div>
            <div onClick={() => setCurrentSection(2)} className={currentSection == 2 ? styles.active : ""}>
                Story
            </div>
            <div onClick={() => setCurrentSection(3)} className={currentSection == 3 ? styles.active : ""}>
                Relationship
            </div>
            <div onClick={() => setCurrentSection(4)} className={currentSection == 4 ? styles.active : ""}>
                First votes
            </div>
            <div onClick={() => setCurrentSection(5)} className={currentSection == 5 ? styles.active : ""}>
                Final information
            </div>
        </nav>
    );
}