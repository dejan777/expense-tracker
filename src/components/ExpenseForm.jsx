import { useState, useEffect } from "react";
import styles from "./ExpenseForm.module.css";
import { categories } from "../constants/categories";

function ExpenseForm({
    addExpense,
    updateExpense,
    editingExpense, 
    setEditingExpense
}) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [expenseType, setExpenseType] = useState("expense");
    const [category, setCategory] = useState("Food");

    useEffect(() => {
        if(editingExpense) {
            setTitle(editingExpense.title);
            setAmount(editingExpense.amount);
            setExpenseType(editingExpense.type);
            setCategory(editingExpense.category);
        } else {
            resetForm();
        }``
    }, [editingExpense]);

    function resetForm() {
        setTitle("");
        setAmount("");
        setExpenseType("expense");
        setCategory("Food");
    }

    function handleAddExpense() {
        if (
            !title.trim() ||
            !amount ||
            isNaN(amount) ||
            Number(amount) <= 0
        ) {
            return;
        }

        const expenseData = {
            title,
            amount : Number(amount),
            type: expenseType,
            category
        };

        const newExpense = {
            id: Date.now(),
            ...expenseData
        };

        if(editingExpense){
            updateExpense({
                ...editingExpense,
                title,
                amount: Number(amount),
                type: expenseType,
                category
            });
            setEditingExpense(null);
        } else {
            addExpense(newExpense);
        }
        resetForm();
    }
    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>
                Add Expense
            </h2>
            <input
                type="text"
                placeholder="Expense title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={styles.input}
            />
            <select
                value={expenseType}
                onChange={(e) => setExpenseType(e.target.value)}
                className={styles.select}
            >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.select}
            >
                {categories.map((category) => (
                    <option
                        key={category}
                        value={category}
                    >
                        {category}
                    </option>
                ))}
            </select>
            <button
                onClick={handleAddExpense}
                className={`${styles.button} ${
                    editingExpense
                        ? styles.editButton
                        : styles.addButton
                }`}
            >
                {editingExpense 
                    ? "Update Transaction"
                    : "Add Transaction"}
            </button>
        </div>
    )
}

export default ExpenseForm;