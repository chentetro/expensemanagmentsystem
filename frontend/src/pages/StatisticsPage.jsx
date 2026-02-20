import React, { useState, useEffect, useMemo ,useContext} from 'react';
import expenseApi from '../services/expenseApi';
import YearMonthPicker from '../components/YearMonthPicker';
import CurrencyPicker from '../components/CurrencyPicker';
import TotalBarChart from '../components/TotalBarChart';
import CategoryPieChart from '../components/CategoryPieChart';
import axios from 'axios';
import { CostsContext } from '../contexts/CostsContext.jsx';


const StatisticsPage = () => {
    const [categoriesData, setCategoriesData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('ILS');
    const [exchangeRates, setExchangeRates] = useState({ ILS: 1, USD: 3.6, EUR: 3.9, GBP: 4.5 });
     const { isAuthenticated } = useContext(CostsContext);

    // Fetch exchange rates once on component mount
    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get('https://open.er-api.com/v6/latest/ILS');
                const data = response.data.rates;
                setExchangeRates({
                    ILS: 1,
                    USD: 1 / data.USD,
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
            const response = await expenseApi.get(`/reports?month=${filters.month}&year=${filters.year}`);
            setCategoriesData(response.data);
        } catch (error) {
            console.error("Error fetching report:", error);
        } finally {
            setLoading(false);
        }
    };

    // Process report data and convert values to selected currency
    const processData = (data, targetCurrency, rates) => {
        if (!data?.data) return { pieArray: [], total: 0 };

        const pieArray = Object.entries(data.data).map(([name, expenses]) => {
            const convertedCategorySum = expenses.reduce((acc, curr) => {
                const amount = Number(curr.sum) || 0;
                const sourceCurrency = curr.currency;

                // Convert source currency to ILS as base
                const amountInILS = amount * (rates[sourceCurrency] || 1);
                // Convert from ILS to selected target currency
                const amountInTarget = amountInILS / (rates[targetCurrency] || 1);

                return acc + amountInTarget;
            }, 0);

            return { name, value: convertedCategorySum };
        }).filter(item => item.value > 0);

      const total = pieArray.reduce((acc, item) => acc + item.value, 0);

        return { pieArray, total };
    };

    // Memoize processed chart data
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
                <YearMonthPicker onSearch={fetchStats} />
                <CurrencyPicker
                    value={selectedCurrency}
                    onChange={(newCurrency) => setSelectedCurrency(newCurrency)}
                />
            </div>

            {loading && <p>Loading data...</p>}

            {/* Render both charts */}
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