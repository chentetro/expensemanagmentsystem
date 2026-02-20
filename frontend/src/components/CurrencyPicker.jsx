import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const CurrencyPicker = ({ selectedCurrency, onChange }) => {
    return (
        <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="currency-select-label">Currency</InputLabel>
            <Select
                labelId="currency-select-label"
                value={selectedCurrency}
                label="Currency"
                onChange={(e) => onChange(e.target.value)}
            >
                <MenuItem value="ILS">ILS</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
            </Select>
        </FormControl>
    );
};

export default CurrencyPicker;