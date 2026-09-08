/**
 * Page: statistics with bar chart and pie chart by category.
 */

import React, { useState, useEffect, useMemo ,useContext} from 'react';
import { getExchangeRates, getMonthlyReport } from '../services/expenseApi';
import YearMonthPicker from '../components/YearMonthPicker';
import CurrencyPicker from '../components/CurrencyPicker';
import TotalBarChart from '../components/TotalBarChart';
import CategoryPieChart from '../components/CategoryPieChart';
import { CostsContext } from '../contexts/CostsContext.jsx';
import {
    Alert,
    Box,
    CircularProgress,
    Container,
    Paper,
    Stack,
    Typography
} from '@mui/material';


const StatisticsPage = () => {
    const [categoriesData, setCategoriesData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('ILS');
    const [exchangeRates, setExchangeRates] = useState({ ILS: 1, USD: 3.6, EUR: 3.9, GBP: 4.5 });
     const { isAuthenticated } = useContext(CostsContext);

    // Fetch exchange rates once on component mount
    useEffect(() => {
        const fetchRates = async () => {
            const rates = await getExchangeRates();
            setExchangeRates(rates);
        };
        fetchRates();
    }, []);

    const fetchStats = async (filters) => {
        setLoading(true);
        try {
            const response = await getMonthlyReport(filters.month, filters.year);
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
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="info">Please log in to view your statistics.</Alert>
            </Container>
        );
    }


    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={2} sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h4" gutterBottom>
                    Monthly Expense Statistics
                </Typography>

                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    alignItems={{ xs: 'stretch', md: 'center' }}
                    sx={{ mb: 3 }}
                >
                    <YearMonthPicker onSearch={fetchStats} />
                    <CurrencyPicker
                        selectedCurrency={selectedCurrency}
                        onChange={(newCurrency) => setSelectedCurrency(newCurrency)}
                    />
                </Stack>

                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                        <CircularProgress />
                    </Box>
                )}

                {!loading && categoriesData && (total > 0 || pieArray.length > 0) ? (
                    <Stack
                        direction={{ xs: 'column', xl: 'row' }}
                        spacing={3}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <CategoryPieChart pieData={pieArray} currency={selectedCurrency} />
                        <TotalBarChart total={total} currency={selectedCurrency} />
                    </Stack>
                ) : (
                    !loading && categoriesData && (
                        <Typography align="center" sx={{ mt: 3 }}>
                            No expenses found for the selected period.
                        </Typography>
                    )
                )}
            </Paper>
        </Container>
    );
};

export default StatisticsPage;