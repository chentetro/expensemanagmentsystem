import React, { useState, useEffect, useMemo ,useContext} from 'react';
import api from '../services/api';
import PickYearMonth from '../components/PickYearMonth';
import CurrencyPicker from '../components/CurrencyPicker'; // וודאי שזה המיקום הנכון
import TotalBarChart from '../components/TotalBarChart';   // ייבוא קומפוננטת גרף עמודות
import CategoryPieChart from '../components/CategoryPieChart'; // ייבוא קומפוננטת גרף עוגה
import axios from 'axios'; // לייבוא שערי חליפין
import { CostsContext } from '../contexts/CostsContext.jsx';


const StatisticsPage = () => {
    const [categoriesData, setCategoriesData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('ILS'); // מטבע נבחר
    const [exchangeRates, setExchangeRates] = useState({ ILS: 1, USD: 3.6, EUR: 3.9, GBP: 4.5 }); // שערי חליפין
     const { isAuthenticated } = useContext(CostsContext);

    // 1. שליפת שערי חליפין פעם אחת בטעינת הקומפוננטה
    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get('https://open.er-api.com/v6/latest/ILS');
                const data = response.data.rates;
                setExchangeRates({
                    ILS: 1, // הבסיס
                    USD: 1 / data.USD, // ILS per USD
                    EUR: 1 / data.EUR,
                    GBP: 1 / data.GBP
                });
            } catch (error) {
                console.error("Failed to fetch exchange rates, using default values.", error);
            }
        };
        fetchRates();
    }, []);

    const fetchStats = async (filters) => {
        setLoading(true);
        try {
            const response = await api.get(`/reports?month=${filters.month}&year=${filters.year}`);
            setCategoriesData(response.data);
        } catch (error) {
            console.error("Error fetching report:", error);
        } finally {
            setLoading(false);
        }
    };

    // 2. פונקציית העיבוד - מקבלת את כל מה שצריך כדי להמיר ולחשב
    const processData = (data, targetCurrency, rates) => {
        if (!data?.data) return { pieArray: [], total: 0 };

        const pieArray = Object.entries(data.data).map(([name, expenses]) => {
            const convertedCategorySum = expenses.reduce((acc, curr) => {
                const amount = Number(curr.sum) || 0;
                const sourceCurrency = curr.currency;

                // המרה לשקל כבסיס
                const amountInILS = amount * (rates[sourceCurrency] || 1);
                // המרה מהשקל למטבע היעד הנבחר
                const amountInTarget = amountInILS / (rates[targetCurrency] || 1);

                return acc + amountInTarget;
            }, 0);

            return { name, value: convertedCategorySum };
        }).filter(item => item.value > 0);

      const total = pieArray.reduce((acc, item) => acc + item.value, 0);

        return { pieArray, total };
    };

    // 3. שימוש ב-useMemo כדי למנוע חישובים מיותרים
    const { pieArray, total } = useMemo(
        () => processData(categoriesData, selectedCurrency, exchangeRates),
        [categoriesData, selectedCurrency, exchangeRates]

    );

     if (!isAuthenticated) {
        return <p style={{ padding: '20px' }}>Please log in to view your bar and pie.</p>;
    }


    return (
        <div style={{ padding: '20px' }}>
            <h1>Monthly Expense Statistics</h1>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <PickYearMonth onSearch={fetchStats} />
                <CurrencyPicker
                    value={selectedCurrency}
                    onChange={(newCurrency) => setSelectedCurrency(newCurrency)}
                />
            </div>

            {loading && <p>Loading data...</p>}

            {/* הצגת הגרפים המפוצלים */}
            {!loading && categoriesData && (total > 0 || pieArray.length > 0) ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
                    <CategoryPieChart pieData={pieArray} currency={selectedCurrency} />
                    <TotalBarChart total={total} currency={selectedCurrency} />
                </div>
            ) : (
                !loading && categoriesData && (
                    <p style={{ textAlign: 'center', marginTop: '30px' }}>
                        No expenses found for the selected period.
                    </p>
                )
            )}
            
        </div>
    );
};

export default StatisticsPage;