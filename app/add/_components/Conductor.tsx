"use client";

import styles from "../page.module.css";
import Person from "./Person";
import Concerns from "./Concerns";
import Relationship from "./Relationship";
import Story from "./Story";
import { useAddContext } from "../AddContext";
import { createCouple } from "../_actions/createCouple";
import Alert from '@mui/material/Alert';
import { useState } from "react";

export default function Conductor({ session }) {
    const { couple, currentSection } = useAddContext();
    const [alert, setAlert] = useState({ severity: "", message: "" })

    const createNewCouple = async (event) => {
        event.preventDefault()
        setAlert({ severity: "success", message: "We're processing your query" })

        const datedCouple = {
            ...couple,
            dateAdded: new Date()
        }

        const result = await createCouple(datedCouple, session.user.id);
        if (result) {
            setAlert({ severity: "success", message: "The new couple has been added to the database successfully" })
        }
        else {
            setAlert({ severity: "error", message: "There was an error with the database" })
        }
    }

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
