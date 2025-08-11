import styles from "../signin/page.module.css"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/utils/authOptions"
import { redirect } from "next/navigation"
import Logout from "./Logout"
import { revalidateAllCouplesAction, revalidateCoupleByIdAction } from "../_actions/revalidate"

export default async function Login() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/signin")
    }

    const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h2>You are logged in</h2>
                <p>Your username is: {session.user.username}</p>
                <p>Your email is: {session.user.email} </p>
                {isAdmin && <>
                    <div style={{
                        border: '2px dashed #d63900',
                        padding: '16px',
                        marginTop: '24px',
                        borderRadius: '8px',
                        backgroundColor: '#fff8f5'
                    }}>
                        <h3 style={{ marginTop: '0' }}>🔧 Admin Cache Control (Server Component)</h3>

                        {/* Form 1: Revalidate All Couples */}
                        <form action={revalidateAllCouplesAction} style={{ marginBottom: '16px' }}>
                            <p>Invalidate the cache for ALL couples. Click will refresh the page.</p>
                            <button type="submit">
                                Revalidate All Couples
                            </button>
                        </form>

                        {/* Form 2: Revalidate a Specific Couple by ID */}
                        <form action={revalidateCoupleByIdAction}>
                            <p>Invalidate the cache for a SPECIFIC couple. Click will refresh the page.</p>
                            <input
                                type="text"
                                // The 'name' attribute is crucial. It becomes the key in formData.
                                name="coupleId"
                                placeholder="Enter Couple ID here"
                                required
                                style={{ marginRight: '8px', padding: '4px' }}
                            />
                            <button type="submit">
                                Revalidate by ID
                            </button>
                        </form>
                    </div>
                </>}
                <Logout />
            </div>
        </main>
    )
}
