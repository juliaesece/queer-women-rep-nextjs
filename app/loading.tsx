import styles from './loading.module.css';

function CardSkeleton() {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default function Loading() {
  // Add fallback UI that will be shown while the route is loading.
  return <CardSkeleton />
}