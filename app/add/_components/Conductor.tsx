"use client";

import styles from "../page.module.css";
import Person from "./Person";
import Concerns from "./Concerns";
import Relationship from "./Relationship";
import Story from "./Story";
import { useAddContext } from "../AddContext";
import { createCouple } from "../_actions/createCouple";
import Alert from '@mui/material/Alert';
import { useEffect, useState } from "react";
import { outOfFive, outOfFour } from "@/app/utils/types";
import Rate from "./Rate";

export default function Conductor({ session }) {
    const { couple, currentSection } = useAddContext();
    const [alert, setAlert] = useState({ severity: "", message: "" })

    const createNewCouple = async (event) => {
        event.preventDefault()
        setAlert({ severity: "success", message: "We're processing your query" })

        const datedCouple = {
            ...couple,
            dateAdded: new Date(),
            screenTime: Number(couple.screenTime) as outOfFive,
            storyImportance: Number(couple.storyImportance) as outOfFour,
            globalRating: Number(couple.globalRating) as outOfFive,
            romanticConnection: Number(couple.romanticConnection) as outOfFive,
            chemistry: Number(couple.chemistry) as outOfFive
        }

        const result = await createCouple(datedCouple, session.user.id);
        if (result) {
            setAlert({ severity: "success", message: "The new couple has been added to the database successfully" })
        }
        else {
            setAlert({ severity: "error", message: "There was an error with the database" })
        }
    }

    useEffect(()=> {console.log(couple.tags)}, [couple])

    return (
        <form className={styles.form} >
            {currentSection == 0 &&
                <>
                    <h1>The couple</h1>
                    <Person number={0} />
                </>
            }
            {currentSection == 1 &&
                <>
                    <h1>The couple</h1>
                    <Person number={1} />
                </>
            }
            {currentSection == 2 &&
                <>
                    <h1>The story they&apos;re in</h1>
                    <Story />
                </>
            }
            {currentSection == 3 &&
                <>
                    <h1>Their relationship</h1>
                    <Relationship />
                </>
            }
                        {currentSection == 4 &&
                <>
                    <h1>Their relationship</h1>
                    <Rate />
                </>
            }
            {currentSection == 5 &&
                <>
                    <h1>General concerns and information</h1>
                    <Concerns />
                    {alert.message && <Alert severity={alert.severity == "success" ? "success" : "error"} className={styles.alert}>
                        {alert.message}
                    </Alert>}
                    <button type="submit" onClick={createNewCouple} disabled={alert.message && true}>Submit</button>
                </>
            }
        </form>
    );
}
