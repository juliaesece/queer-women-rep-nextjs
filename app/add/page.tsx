import styles from "./page.module.css";
import Conductor from "./_components/Conductor";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/utils/authOptions"
import FormNav from "./_components/FormNav";
import simpleStyles from "@/app/(auth)/signin/page.module.css"

export default async function Add() {
    const session = await getServerSession(authOptions)

    return (
        <>
            {session ?
                <main className={styles.main}>
                        <FormNav />
                        <Conductor />
                </main>
                :
                <main className={simpleStyles.main}>
                    <div className={simpleStyles.container}>
                        <p>
                            You must be logged in to contribute to the database
                        </p>
                    </div>
                </main>
            }
        </>
    );
}
