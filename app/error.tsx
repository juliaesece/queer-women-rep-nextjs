'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import styles from "./page.module.css";
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className={styles.main}>
      <h2>Something went wrong!</h2>
      Error: {error.message}
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}