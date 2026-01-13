import React from "react";

// מקבלים את הפרמטרים כאובייקט (Destructuring)
const CurrencyPicker = ({ selectedCurrency, onChange }) => {
    return (
        <select 
            value={selectedCurrency} 
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="ILS">ILS</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="EUR">EUR</option>
        </select>
    );
};

export default CurrencyPicker;