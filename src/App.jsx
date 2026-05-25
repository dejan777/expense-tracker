import { useEffect, useState } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import styles from "./App.module.css";
import useExpenses from "./hooks/useExpenses";

function App() {
  const [expenseFilter, setExpenseFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : true;
  })
  const [deleteTarget, setDeleteTarget] = useState(null);
  const {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense
  } = useExpenses();

  const totalIncome = expenses
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = 
      expenseFilter === "all"
        ? true
        : expense.type === expenseFilter;

    return matchesSearch && matchesFilter;
  })

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  function openDeleteModal(expense) {
    setDeleteTarget(expense);
  }

  function confirmDelete() {
    deleteExpense(deleteTarget.id)
    
    if(
      editingExpense &&
      editingExpense.id === deleteTarget.id
    ) {
      setEditingExpense(null);
    }
    setDeleteTarget(null);
  }

  function cancelDelete() {
    setDeleteTarget(null);
  }

  return (
    <div className={`${styles.app} ${
      darkMode ? styles.dark : styles.light
    }`}>
      <div className={styles.container}> 
        <Header darkMode={darkMode}/>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className={`${styles.themeButton} ${
            darkMode
              ? styles.darkButton
              : styles.lightButton
          }`}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
        <Balance 
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          currentBalance={currentBalance}
        />
        <ExpenseChart 
          expenses={expenses} 
        />
        <ExpenseForm 
          addExpense={addExpense}
          updateExpense={updateExpense}
          editingExpense={editingExpense}
          setEditingExpense={setEditingExpense}
        />
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <ExpenseList 
          expenses={filteredExpenses}
          expenseFilter={expenseFilter}
          setExpenseFilter={setExpenseFilter}
          setEditingExpense={setEditingExpense}
          openDeleteModal={openDeleteModal}
        />
      </div>
      {deleteTarget && (
        <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <h3 className={styles.modalTitle}>
              Delete this transaction?
          </h3>
          <div className={styles.modalActions}>
            <button
              onClick={confirmDelete}
              className={styles.confirmButton}
            >
              Yes
            </button>

            <button
              onClick={cancelDelete}
              className={styles.cancelButton}
            >
              No
            </button>
          </div>
        </div>
        </div>
      )}
    </div>
  )
}

export default App;