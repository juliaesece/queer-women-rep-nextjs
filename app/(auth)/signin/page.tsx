import { getProviders } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/utils/authOptions"
import SignIn from "./signin"
import styles from "./page.module.css"
import { redirect } from 'next/navigation'

export default async function AuthPage() {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect("/my-account")
    }

    const providers = await getProviders()

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h2>Sign up or login by clicking on one of the buttons below</h2>
                <p>If you don't have an account, clicking on the button will create one.</p>
                <div className={styles.providers_list}>
                {Object.values(providers).map((provider) => (
                    <SignIn provider={provider} key={provider.id} />
                ))}
                </div>
            </div>
        </main>
    )
}
