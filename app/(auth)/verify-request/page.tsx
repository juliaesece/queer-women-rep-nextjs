import styles from "../signin/page.module.css"

export default async function AuthPage() {

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h2>
                    Check your email
                </h2>
                <p>A sign in link has been sent to your email address. It might take a few minutes to arrive. Check your spam folder if it doesn&apos;t arrive in 5 minutes.</p>
            </div>
        </main>
    )
}
