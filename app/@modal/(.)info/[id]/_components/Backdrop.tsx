"use client"

import { useRouter } from 'next/navigation';
import st from "../modal.module.css"

function Backdrop({ origin }: { origin: string }) {
    const router = useRouter();

    const goBack = () => {
        if (origin == "info") router.push("/")
        else router.back()
    }

    return (
        <div className={st.modal_closeBackdrop} onClick={goBack}>
        </div>
    )
}

export default Backdrop