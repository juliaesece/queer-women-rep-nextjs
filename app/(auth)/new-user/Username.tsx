"use client"
import { useState, useEffect } from "react"
import { setDBUsername } from "../_actions/setUsername"
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation'
import { getUserByEmail } from "../../utils/getUserByEmail";
import st from "../signin/signin.module.css"

export default function Username({ session }) {
    const [username, setUsername] = useState("")
    const [alert, setAlert] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const router = useRouter()

    useEffect(() => {
        const checkUser = async () => {
            const user = await getUserByEmail(session.user.email)
            if (user.username) router.push('/my-account')
        }

        if (!session) router.push("/signin")
        else checkUser()
    });

    const submitUsername = async (e) => {
        e.preventDefault()

        const res = await setDBUsername(username, session.user.email)
        if (res.error) {
            setAlert("error")
            setErrorMessage(res.error)
        }
        else {
            setAlert("success")
            router.push('/my-account')
        }
    }

    return (
        <form onSubmit={submitUsername}>
            <input type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className={st.input}
            />
            <button type="submit" className={st.gsi_material_button}>Send</button>
            {alert &&
                <Alert severity={alert == "success" ? "success" : "error"}>
                    {alert == "success" ?
                        "Your new username has been added, you will be redirected soon" :
                        `Error: ${errorMessage}`}
                </Alert>}
        </form>
    )
}
