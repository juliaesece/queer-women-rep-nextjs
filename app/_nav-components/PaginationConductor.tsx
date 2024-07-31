"use client";

import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/navigation'
import styles from "./paginationConductor.module.css";
import { usePathname } from 'next/navigation'

export default function PaginationConductor({ supercategory, page, current, totalPages }) {
    const router = useRouter()


    let newURL = ""
    if (!current.includes("page")) newURL = supercategory + "/page/"


    return (
        <div className={styles.pagination}>
            <Pagination defaultPage={Number(page)} count={totalPages} onChange={(e, value) => {router.push(newURL + String(value))}} />
        </div>
    );
}
