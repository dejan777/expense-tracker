import styles from "./Header.module.css";

function Header({darkMode}) {
    return (
        <div className={styles.header}>
            <h1 className={`${styles.title} ${
                darkMode ? styles.dark : styles.light
            }`}>
                Expense Tracker
            </h1>
            <p className={styles.subtitle}>
                Track your income and expenses
            </p>
        </div>
    )
}

export default Header;