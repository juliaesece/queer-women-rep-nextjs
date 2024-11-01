"use client";

import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/navigation'
import styles from "./paginationConductor.module.css";
import { countCouples } from '../utils/countCouples';

export default function PaginationConductor({ supercategory, page, current, totalPages, extraFilter }) {
    const router = useRouter()
    async function getPages(supercategory) {
        try {
          const count = await countCouples(supercategory)
      
          if (count) {
            return Math.ceil(count / 9)
          } else {
            return 3
          }
        }
        catch (e) {
          return 3
        }
      };

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
