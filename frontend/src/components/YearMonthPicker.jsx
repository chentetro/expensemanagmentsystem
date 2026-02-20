import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div>
                <label>Month: </label>
                <select name="month" value={filters.month} onChange={handleChange}>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>Year: </label>
                <select name="year" value={filters.year} onChange={handleChange}>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <button type="submit" style={{ marginLeft: '10px' }}>Show Report</button>
            </div>
        </form>
    );
};

export default YearMonthPicker;
