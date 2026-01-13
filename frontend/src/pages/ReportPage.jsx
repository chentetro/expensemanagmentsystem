import React, { useState, useContext } from 'react';
import api from '../services/api';
import PickYearMonth from '../components/PickYearMonth.jsx';
import { CostsContext } from '../contexts/CostsContext.jsx';

const ReportPage = () => {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useContext(CostsContext);

    const fetchReport = async (filters) => {
        setLoading(true);
        try {
            const response = await api.get(`/reports?month=${filters.month}&year=${filters.year}`);
            setReportData(response.data); 
        } catch (error) {
            console.error(error);
            alert('שגיאה בטעינת הדו"ח.');
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
            <h1>דו"ח הוצאות חודשי</h1>
            <PickYearMonth onSearch={fetchReport} />
            <hr />

            {loading && <p>טוען נתונים מהשרת...</p>}

            {reportData && reportData.data ? (
                <div>
                    <h2>פירוט הוצאות</h2>
                    
                    {Object.keys(reportData.data).map((category) => (
                        <div key={category} style={{ marginBottom: '15px' }}>
                            <h3 style={{ textTransform: 'capitalize' }}>{category}</h3>
                            {reportData.data[category].length > 0 ? (
                                <ul>
                                    {reportData.data[category].map((item, index) => (
                                        <li key={index}>
                                            יום {item.day}: {item.description} - <strong>{item.sum} {item.currency}</strong>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>אין הוצאות בקטגוריה זו.</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                !loading && <p>בחר חודש ושנה ולחץ על "הצג דו"ח"</p>
            )}
        </div>
    );
};

export default ReportPage;