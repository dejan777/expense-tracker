import styles from "./ExpenseItem.module.css";
import formatCurrency from "../utils/formatCurrency";

function ExpenseItem({expense, openDeleteModal, setEditingExpense}) {
    const formattedAmount = formatCurrency(expense.amount);
   
    return (
        <div className={styles.expenseItem}>
            <div className={styles.info}>
                <h3 className={styles.title}>
                    {expense.title}
                </h3>
                <p className={styles.category}>
                    {expense.category}
                </p>
            </div>
            <div className={styles.actions}>
                <p className={`${styles.amount} ${
                    expense.type === "income"
                        ? styles.income
                        : styles.expense
                }`}>
                    {expense.type === "income" ? "+" : "-"}{formattedAmount}
                </p>
                <button
                    onClick= {() => openDeleteModal(expense)}
                    aria-label="Delete transaction"
                    className={styles.deleteButton}
                >
                    Delete
                </button>
                <button
                    onClick={(e) => setEditingExpense(expense)}
                    aria-label="Edit transaction"
                    className={styles.editButton}
                >
                    Edit
                </button>
            </div>
        </div>
    )
}

export default ExpenseItem;