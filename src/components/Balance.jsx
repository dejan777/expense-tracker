import StatCard from "./StatCard";
import styles from "./Balance.module.css";

function Balance({totalIncome, totalExpense, currentBalance}) {
    return (
        <div className={styles.balanceContainer}>
            <StatCard
                title="Balance"
                value={`$${currentBalance}`}
                color={"#00ff99"}
            />

            <StatCard
                title="Income"
                value={`$${totalIncome}`}
                color={"#00ff99"}
            />

            <StatCard
                title="Expense"
                value={`$${totalExpense}`}
                color={"red"}
            />
        </div>
    )
}

export default Balance;