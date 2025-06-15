"use client";

import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/navigation'
import styles from "./paginationConductor.module.css";


type props = {
    supercategory: string;
    page: string | number;
    current: string;
    totalPages: number;
    extraFilter: string | undefined;
}


export default function PaginationConductor({ supercategory, page, current, totalPages, extraFilter }: props) {
    const router = useRouter()

    let newURL = ""
    if (!current.includes("page")) newURL = supercategory + "/page/"

    let filter = ""
    if (extraFilter) filter = "?filter=" + extraFilter

    return (
        <div className={styles.pagination}>
            <Pagination defaultPage={Number(page)} count={totalPages} onChange={(e, value) => {router.push(newURL + String(value) + filter)}} />
        </div>
    );
}
