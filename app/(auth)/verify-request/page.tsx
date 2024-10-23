import styles from "../signin/page.module.css"

export default async function AuthPage() {

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h2>
                    Check your email
                </h2>
                <p>A sign in link has been sent to your email address. It might take a few minutes to arrive. Also it will be by mila.t.namphai, I don&apos;t have a specific email for this website yet.</p>
            </div>
        </main>
    )
}
