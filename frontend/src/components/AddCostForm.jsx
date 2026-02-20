import React, { useState, useContext } from 'react';
import { CostsContext } from '../contexts/CostsContext.jsx';
import expenseApi from '../services/expenseApi';

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
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <input 
                name="description" 
                value={costData.description} 
                onChange={(e) => setCostData({...costData, description: e.target.value})} 
                placeholder="Description" 
                required 
            />
            <input 
                name="sum" 
                type="number" 
                value={costData.sum} 
                onChange={(e) => setCostData({...costData, sum: e.target.value})} 
                placeholder="Amount" 
                required 
            />
            <select 
                name="category" 
                value={costData.category} 
                onChange={(e) => setCostData({...costData, category: e.target.value})} 
            >
                <option value="food">Food</option>
                <option value="health">Health</option>
                <option value="housing">Housing</option>
                <option value="sports">Sports</option>
                <option value="education">Education</option>
            </select>
            <select 
                name="currency" 
                value={costData.currency} 
                onChange={(e) => setCostData({...costData, currency: e.target.value})} 
            >
                <option value="USD">USD</option>
                <option value="EURO">EURO</option>
                <option value="ILS">ILS</option>
                <option value="GBP">GBP</option>
            </select>
            <input 
                name="date" 
                type="date" 
                value={costData.date} 
                onChange={(e) => setCostData({...costData, date: e.target.value})} 
            />

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Add Cost'}
            </button>
        </form>
    );
};

export default AddCostForm;