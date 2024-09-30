"use client"

import { signOut } from "next-auth/react"
import st from "../signin/signin.module.css"


export default function Logout() {

    return (
        <button
            onClick={() => signOut()}
            className={st.gsi_material_button} >
            Sign out
        </button>
    )

}
