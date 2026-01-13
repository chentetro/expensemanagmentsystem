// TotalBarChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// מקבל את הסכום הכולל (total) והמטבע (currency) כ-props
const TotalBarChart = ({ total, currency  }) => {
    // הנתונים לגרף עמודה הם פשוט אובייקט אחד
    const data = [{ name: 'Total Expenses', value: total }];

    return (
        <div style={{ width: '400px', height: '300px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <h4>Total Monthly Expenses ({currency})</h4>
            <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toFixed(2)} ${currency}`} /> {/* מציג מטבע ב-tooltip */}
                    <Bar dataKey="value" fill="#82ca9d" label={{ position: 'top' }} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TotalBarChart;