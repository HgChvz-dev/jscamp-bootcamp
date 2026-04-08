import styles from './PageTransition.module.css';

export function PageTransition({ children }) {
    return (
        <div className={styles.pageTransition}>
            {children}
        </div>
    )
}