import React, { useState, useContext } from 'react';
import { CostsContext } from '../contexts/CostsContext.jsx';
import api from '../services/api';

const AddCostForm = () => {
    // צריכת ה-Context מה-Dashboard
    const { fetchCosts } = useContext(CostsContext);
    
    const [isLoading, setIsLoading] = useState(false);
    const [costData, setCostData] = useState({
        description: '', sum: '', category: 'food', currency: 'USD', date: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // התחלת טעינה

        try {
            // המרת ה-sum למספר לפני השליחה
            const payload = { ...costData, sum: Number(costData.sum) };
            
            await api.post('/costs/add', payload);
            
            await fetchCosts(); // רענון הרשימה ב-Dashboard
            
            // איפוס הטופס
            setCostData({ description: '', sum: '', category: 'food', currency: 'USD', date: '' });
            alert('הוצאה נוספה בהצלחה!');
        } catch (error) {
            console.error("Error adding cost:", error);
            alert('חלה שגיאה בהוספת ההוצאה');
        } finally {
            setIsLoading(false); // סיום טעינה
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <input 
                name="description" 
                value={costData.description} 
                onChange={(e) => setCostData({...costData, description: e.target.value})} 
                placeholder="תיאור" 
                required 
            />
            <input 
                name="sum" 
                type="number" 
                value={costData.sum} 
                onChange={(e) => setCostData({...costData, sum: e.target.value})} 
                placeholder="סכום" 
                required 
            />
            <select 
                name="category" 
                value={costData.category} 
                onChange={(e) => setCostData({...costData, category: e.target.value})} 
            >
                <option value="food">אוכל</option>
                <option value="health">בריאות</option>
                <option value="housing">דיור</option>
                <option value="sports">ספורט</option>
                <option value="education">חינוך</option>
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
                {isLoading ? 'שומר...' : 'הוסף הוצאה'}
            </button>
        </form>
    );
};

export default AddCostForm;