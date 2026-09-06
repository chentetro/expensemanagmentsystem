/**
 * Component: add cost form with category, sum, currency, date.
 */

import React, { useState, useContext } from 'react';
import { CostsContext } from '../contexts/CostsContext.jsx';
import { addCost } from '../services/expenseApi';
import {
    Alert,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from '@mui/material';

const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const INITIAL_COST_STATE = {
    description: '',
    sum: '',
    category: 'food',
    currency: 'USD',
    date: getToday()
};

const AddCostForm = () => {
    // Consume context values used by the dashboard
    const { fetchCosts } = useContext(CostsContext);
    
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [costData, setCostData] = useState(INITIAL_COST_STATE);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCostData((previousData) => ({
            ...previousData,
            [name]: value
        }));
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const amount = Number(costData.sum);
        if (!Number.isFinite(amount) || amount <= 0) {
            setErrorMessage('Amount must be greater than 0.');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        try {
            await addCost({ ...costData, sum: amount });
            
            await fetchCosts();
            
            setCostData({ ...INITIAL_COST_STATE });
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Unable to add the expense.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            <Stack
                component="form"
                onSubmit={handleSubmit}
                direction={{ xs: 'column', md: 'row' }}
                spacing={1.5}
                useFlexGap
                flexWrap="wrap"
                alignItems={{ xs: 'stretch', md: 'center' }}
            >
            <TextField
                name="description"
                label="Description"
                value={costData.description}
                onChange={handleChange}
                required
                size="small"
            />
            <TextField
                name="sum"
                type="number"
                label="Amount"
                value={costData.sum}
                onChange={handleChange}
                inputProps={{ min: 0.01, step: 'any' }}
                required
                size="small"
            />

            <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                    labelId="category-select-label"
                    name="category"
                    label="Category"
                    value={costData.category}
                    onChange={handleChange}
                >
                    <MenuItem value="food">Food</MenuItem>
                    <MenuItem value="health">Health</MenuItem>
                    <MenuItem value="housing">Housing</MenuItem>
                    <MenuItem value="sports">Sports</MenuItem>
                    <MenuItem value="education">Education</MenuItem>
                </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 130 }}>
                <InputLabel id="currency-form-select-label">Currency</InputLabel>
                <Select
                    labelId="currency-form-select-label"
                    name="currency"
                    label="Currency"
                    value={costData.currency}
                    onChange={handleChange}
                >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="ILS">ILS</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                </Select>
            </FormControl>

            <TextField
                name="date"
                type="date"
                label="Date"
                value={costData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                size="small"
            />

            <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Add Cost'}
            </Button>
            </Stack>
        </>
    );
};

export default AddCostForm;