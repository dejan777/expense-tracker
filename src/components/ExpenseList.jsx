import ExpenseItem from "./ExpenseItem";
import styles from "./ExpenseList.module.css";

function ExpenseList({expenses, expenseFilter, setExpenseFilter,setEditingExpense, openDeleteModal}) {

    return (
        <div className={styles.expenseList}>
            <h2 className={styles.title}>
                Transactions
            </h2>
            <p className={styles.itemCount}>
                {expenses.length}{" "}
                {expenses.length === 1 ? "item" : "items"} 
            </p>
            <select
                value={expenseFilter}
                onChange={(e) => setExpenseFilter(e.target.value)}
                className={styles.filterSelect}
            >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <div className={styles.transactionsContainer}>
                {expenses.length === 0 ? (
                    <p className={styles.emptyState}>
                        No {expenseFilter} transactions found yet.
                        Add your first transaction!
                    </p>
                ): (
                    expenses.map((expense) => (
                        <ExpenseItem
                            key={expense.id}
                            expense={expense}
                            openDeleteModal={openDeleteModal}
                            setEditingExpense={setEditingExpense}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default ExpenseList;