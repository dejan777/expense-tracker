import { useMemo } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import styles from "./ExpenseChart.module.css";
import { chartColors } from "../constants/chartColors";

function ExpenseChart({expenses}) {
    const categoryData = useMemo(() => {
        const filteredExpenses = expenses.filter((e) => e.amount > 0);
        const categoryMap = {};

        filteredExpenses.forEach((expense) => {
            if (categoryMap[expense.category]) {
                categoryMap[expense.category] += expense.amount;
            } else {
                categoryMap[expense.category] = expense.amount;
            }
        });

        return Object.keys(categoryMap).map((key) => ({
            name: key,
            value: categoryMap[key]
        }));
    }, [expenses]);

    if (categoryData.length === 0) {
        return (
            <div className={styles.chartContainer}>
                <h2 className={styles.title}>
                    Expense Analytics
                </h2>
                <p className={styles.emptyState}>
                    No data to display yet.
                </p>
            </div>
        );
    }

    return (
        <div className={styles.chartContainer}>
            <h2 className={styles.title}>
                Expense Analytics
            </h2>
            <p className={styles.subtitle}>
                Breakdown by category
            </p>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={110}
                        label
                        stroke="none"
                    >
                        {categoryData.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={chartColors[index % chartColors.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ExpenseChart;