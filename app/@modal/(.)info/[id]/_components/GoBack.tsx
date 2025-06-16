"use client"

import { useRouter } from 'next/navigation';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import st from "../modal.module.css"

function GoBack({ origin }: { origin: string }) {
    const router = useRouter();

    const goBack = () => {
        if (origin == "info") router.push("/")
        else router.back()
    }

    return (
        <div className={st.modal_closeButton} onClick={goBack}>
            <IconButton size="large">
                <CloseIcon />
            </IconButton>
        </div>
    )
}

export default GoBack