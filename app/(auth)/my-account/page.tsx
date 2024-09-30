import styles from "../signin/page.module.css"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/utils/authOptions"
import { redirect } from "next/navigation"
import Logout from "./Logout"

export default async function Login() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/signin")
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h2>You are logged in</h2>
                <p>Your username is: {session.user.username}</p>
                <p>Your email is: {session.user.email} </p>
                <Logout />
            </div>
        </main>
    )
}
