import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/utils/authOptions"
import styles from "../signin/page.module.css"
import Username from "./Username"

export default async function AuthPage() {
    const session = await getServerSession(authOptions)

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h2>Username</h2>
                <p>
                    Please set a username for your account:
                </p>
                <Username session={session} />
            </div>
        </main>
    )
}
