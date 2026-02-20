import React, { useState, useContext } from 'react';
import { CostsContext } from '../contexts/CostsContext.jsx';
import expenseApi from '../services/expenseApi';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from '@mui/material';

const AddCostForm = () => {
    // Consume context values used by the dashboard
    const { fetchCosts } = useContext(CostsContext);
    
    const [isLoading, setIsLoading] = useState(false);
    const [costData, setCostData] = useState({
        description: '', sum: '', category: 'food', currency: 'USD', date: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading

        try {
            // Convert sum to number before sending
            const payload = { ...costData, sum: Number(costData.sum) };
            
            await expenseApi.post('/costs/add', payload);
            
            await fetchCosts(); // Refresh dashboard list
            
            // Reset the form
            setCostData({ description: '', sum: '', category: 'food', currency: 'USD', date: '' });
            alert('Cost added successfully!');
        } catch (error) {
            console.error("Error adding cost:", error);
            alert('Failed to add cost');
        } finally {
            setIsLoading(false); // End loading
        }
    };

    return (
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
                onChange={(e) => setCostData({ ...costData, description: e.target.value })}
                required
                size="small"
            />
            <TextField
                name="sum"
                type="number"
                label="Amount"
                value={costData.sum}
                onChange={(e) => setCostData({ ...costData, sum: e.target.value })}
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
                    onChange={(e) => setCostData({ ...costData, category: e.target.value })}
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
                    onChange={(e) => setCostData({ ...costData, currency: e.target.value })}
                >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EURO">EURO</MenuItem>
                    <MenuItem value="ILS">ILS</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                </Select>
            </FormControl>

            <TextField
                name="date"
                type="date"
                label="Date"
                value={costData.date}
                onChange={(e) => setCostData({ ...costData, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
                size="small"
            />

            <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Add Cost'}
            </Button>
        </Stack>
    );
};

export default AddCostForm;