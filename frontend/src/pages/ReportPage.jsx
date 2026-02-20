import React, { useState, useContext } from 'react';
import expenseApi from '../services/expenseApi';
import YearMonthPicker from '../components/YearMonthPicker.jsx';
import { CostsContext } from '../contexts/CostsContext.jsx';

const ReportPage = () => {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useContext(CostsContext);

    const fetchReport = async (filters) => {
        setLoading(true);
        try {
            const response = await expenseApi.get(`/reports?month=${filters.month}&year=${filters.year}`);
            setReportData(response.data); 
        } catch (error) {
            console.error(error);
            alert('Error loading report.');
        } finally {
            setLoading(false);
        }
    };

    // 1. If not logged in, show this and stop here
    if (!isAuthenticated) {
        return <p style={{ padding: '20px' }}>Please log in to view your reports.</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Monthly Expense Report</h1>
            <YearMonthPicker onSearch={fetchReport} />
            <hr />

            {loading && <p>Loading data from server...</p>}

            {reportData && reportData.data ? (
                <div>
                    <h2>Expense Details</h2>
                    
                    {Object.keys(reportData.data).map((category) => (
                        <div key={category} style={{ marginBottom: '15px' }}>
                            <h3 style={{ textTransform: 'capitalize' }}>{category}</h3>
                            {reportData.data[category].length > 0 ? (
                                <ul>
                                    {reportData.data[category].map((item, index) => (
                                        <li key={index}>
                                            Day {item.day}: {item.description} - <strong>{item.sum} {item.currency}</strong>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No expenses in this category.</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                !loading && <p>Select month and year, then click "Show Report"</p>
            )}
        </div>
    );
};

export default ReportPage;