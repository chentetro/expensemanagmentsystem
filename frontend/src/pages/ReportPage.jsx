import React, { useState, useContext } from 'react';
import expenseApi from '../services/expenseApi';
import YearMonthPicker from '../components/YearMonthPicker.jsx';
import { CostsContext } from '../contexts/CostsContext.jsx';
import {
    Alert,
    Box,
    CircularProgress,
    Container,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    Typography
} from '@mui/material';

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
        } finally {
            setLoading(false);
        }
    };

    // 1. If not logged in, show this and stop here
    if (!isAuthenticated) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="info">Please log in to view your reports.</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={2} sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h4" gutterBottom>
                    Monthly Expense Report
                </Typography>
                <YearMonthPicker onSearch={fetchReport} />
                <Divider sx={{ my: 3 }} />

                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                        <CircularProgress />
                    </Box>
                )}

                {reportData && reportData.data ? (
                    <Stack spacing={2}>
                        <Typography variant="h6">Expense Details</Typography>

                        {Object.keys(reportData.data).map((category) => (
                            <Paper key={category} variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="subtitle1" sx={{ textTransform: 'capitalize', mb: 1 }}>
                                    {category}
                                </Typography>
                                {reportData.data[category].length > 0 ? (
                                    <List dense>
                                        {reportData.data[category].map((item, index) => (
                                            <ListItem key={index} divider>
                                                <ListItemText
                                                    primary={`Day ${item.day}: ${item.description}`}
                                                    secondary={`${item.sum} ${item.currency}`}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <Typography variant="body2">No expenses in this category.</Typography>
                                )}
                            </Paper>
                        ))}
                    </Stack>
                ) : (
                    !loading && (
                        <Typography>Select month and year, then click "Show Report".</Typography>
                    )
                )}
            </Paper>
        </Container>
    );
};

export default ReportPage;