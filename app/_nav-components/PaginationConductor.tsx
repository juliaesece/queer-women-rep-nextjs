"use client";

import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/navigation'
import styles from "./paginationConductor.module.css";
import { useEffect } from 'react';

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

    const parsedPage = Number(page)

    useEffect(() => {
        const prefetchVisible = (entries, observer) => {
            if (!entries.some(entry => entry.isIntersecting == true)) return

            if (parsedPage >= 1 && parsedPage <= 4) { // If on first pages, more appear + the last one
                for (let i = 1; i < 6; i++) {
                    if (i == parsedPage) continue
                    router.prefetch(newURL + String(i) + filter)
                }
                router.prefetch(newURL + String(totalPages) + filter)
            } else if (parsedPage >= (totalPages - 4) && parsedPage <= totalPages) {
                // If on last pages, more appear + the first one
                for (let i = (totalPages - 4); i <= totalPages; i++) {
                    if (i == parsedPage) continue
                    router.prefetch(newURL + String(i) + filter)
                }
                router.prefetch(newURL + "1" + filter)

            } else { // If on intermediate one, we see 1st one, the ones around current one, and then last one
                router.prefetch(newURL + "1" + filter)
                router.prefetch(newURL + String(parsedPage - 1) + filter)
                router.prefetch(newURL + String(parsedPage + 1) + filter)
                router.prefetch(newURL + String(totalPages) + filter)
            }
        }

        const options = {
            root: null,
            rootMargin: "0px",
            scrollMargin: "0px",
            threshold: 0.5,
        };

        const observer = new IntersectionObserver(prefetchVisible, options);
        observer.observe(document.querySelector("#paginationConductor"));
        return () => {
            observer.disconnect();
        };
    }, [])

    return (
        <div className={styles.pagination} id="paginationConductor">
            <Pagination defaultPage={parsedPage} count={totalPages} onChange={(e, value) => { router.push(newURL + String(value) + filter) }} />
        </div>
    );
}