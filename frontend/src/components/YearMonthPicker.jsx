/**
 * Component: year and month selector for report/charts.
 */

import React, { useState } from 'react';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack
} from '@mui/material';

const YearMonthPicker = ({ onSearch }) => {
    const currentYear = new Date().getFullYear();

    const startYear = 2024;
    const years = [];
    for (let y = currentYear + 2; y >= startYear; y--) {
        years.push(y);
    }

    const [filters, setFilters] = useState({
        month: new Date().getMonth() + 1,
        year: currentYear
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(filters);
    };

    return (
        <Stack
            component="form"
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            onSubmit={handleSubmit}
        >
            <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel id="month-select-label">Month</InputLabel>
                <Select
                    labelId="month-select-label"
                    name="month"
                    value={filters.month}
                    label="Month"
                    onChange={handleChange}
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                    labelId="year-select-label"
                    name="year"
                    value={filters.year}
                    label="Year"
                    onChange={handleChange}
                >
                    {years.map(year => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button type="submit" variant="contained">Show Report</Button>
        </Stack>
    );
};

export default YearMonthPicker;
