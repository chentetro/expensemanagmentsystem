// CategoryPieChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#A284D8']; // הוספתי עוד צבע

// מקבל את מערך הנתונים (pieData) והמטבע (currency) כ-props
const CategoryPieChart = ({ pieData, currency  }) => {

    // אם אין נתונים, נציג הודעה פשוטה
    if (!pieData || pieData.length === 0) {
        return (
            <div style={{ width: '400px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc', borderRadius: '8px' }}>
                <p>No expenses data for this period.</p>
            </div>
        );
    }

    return (
        <div style={{ width: '400px', height: '300px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <h4>Expenses by Category ({currency})</h4>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%" // מרכז הגרף בציר X
                        cy="50%" // מרכז הגרף בציר Y
                        outerRadius={80} // גודל הרדיוס החיצוני
                        fill="#8884d8"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} // מציג שם ואחוז על הפלח
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(2)} ${currency}`} /> {/* מציג מטבע ב-tooltip */}
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryPieChart;