import styles from './gridskeleton.module.css';

export default function GridSkeleton() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className={styles.gridItem}>
          <div className={styles.imageArea}></div>
          <div className={styles.textArea}>
            <div className={styles.title}></div>
            <div className={styles.subtitle}></div>
          </div>
        </div>
      ))}
    </div>
  );
}