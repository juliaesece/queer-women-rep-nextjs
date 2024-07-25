"use client";

import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/navigation'
import styles from "./paginationConductor.module.css";
import { usePathname } from 'next/navigation'

export default function PaginationConductor() {
    const router = useRouter()
    const pathname = usePathname()
    console.log("_____________")
    console.log("pathname", pathname)
    const supercategory = pathname.split("/")[1]
    console.log("supercategory", supercategory)

    let newUrl = ""
    if (pathname.includes("/page/")) newUrl = ""
    else newUrl = `${supercategory ?? "home"}/page/`
    console.log("pushing", newUrl)

    return (
        <div className={styles.pagination}>
            <Pagination count={7} onChange={(e, value) => router.push(newUrl + value)} />
        </div>  
    );
}
