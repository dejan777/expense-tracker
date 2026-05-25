import { useEffect, useState } from "react";

function useExpenses() {
    const [expenses, setExpenses] = useState(() => {
        const savedExpenses =
            localStorage.getItem("expenses");

        return savedExpenses
            ? JSON.parse(savedExpenses)
            : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "expenses",
            JSON.stringify(expenses)
        );
    }, [expenses]);

    function addExpense(newExpense) {
        setExpenses((prev) => [
            ...prev,
            newExpense
        ]);
    }

    function updateExpense(updatedExpense) {
        setExpenses((prev) =>
            prev.map((expense) =>
                expense.id === updatedExpense.id
                    ? updatedExpense
                    : expense
            )
        );
    }

    function deleteExpense(id) {
        setExpenses((prev) =>
            prev.filter((expense) => expense.id !== id)
        );
    }

    return {
        expenses,
        addExpense,
        updateExpense,
        deleteExpense
    };
}

export default useExpenses;