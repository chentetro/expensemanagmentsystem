/**
 * Page: dashboard with add-cost form and cost list.
 */

import React, { useEffect, useContext } from 'react';
import AddCostForm from '../components/AddCostForm.jsx';
import CostList from '../components/CostList.jsx';
import { CostsContext } from '../contexts/CostsContext.jsx';
import { Alert, Container, Paper, Stack, Typography } from '@mui/material';

const DashboardPage = () => {
    const { fetchCosts, isAuthenticated } = useContext(CostsContext);

    useEffect(() => {
        if (isAuthenticated && fetchCosts) {
            fetchCosts();
        }
    }, [fetchCosts, isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="info">Please log in to view your dashboard.</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack spacing={3}>
                <Typography variant="h4">Expense Management</Typography>

                <Paper elevation={2} sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Add New Expense
                    </Typography>
                    <AddCostForm />
                </Paper>

                <Paper elevation={2} sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Recent Expenses
                    </Typography>
                    <CostList />
                </Paper>
            </Stack>
        </Container>
    );
};

export default DashboardPage;
