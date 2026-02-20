import React, { useState } from 'react';
import api from '../services/api';

const RegisterForm = ({ setIsLogin }) => {
    const [formData, setFormData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        birthday: ''
    });

    const [error, setError] = useState(''); // מצב להצגת שגיאות
    const [isLoading, setIsLoading] = useState(false); // מצב טעינה

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(''); // ניקוי שגיאה בזמן הקלדה
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // קריאה ל-Endpoint של הוספת משתמש חדש
            await api.post('/users/add', formData);
            
            alert('נרשמת בהצלחה! מעביר אותך להתחברות...');
            
            // סעיף 1: ניווט במקום רענון דף
            setIsLogin(true); 
        } catch (err) {
            // סעיף 3: טיפול בשגיאות ספציפיות
            // בדיקה אם זו שגיאת רשת (השרת לא זמין)
            if (!err.response) {
                setError('לא ניתן להתחבר לשרת. אנא ודא שהשרת פועל.');
                console.error('Network error:', err.message);
                return;
            }
            
            const status = err.response?.status;
            if (status === 409) {
                setError('המשתמש (אימייל או ת"ז) כבר קיים במערכת');
            } else if (status === 400) {
                setError(err.response?.data?.message || 'חלק מהנתונים שהזנת אינם תקינים');
            } else if (status === 500) {
                setError(err.response?.data?.message || 'שגיאת שרת. אנא נסה שוב מאוחר יותר.');
            } else {
                setError(err.response?.data?.message || 'שגיאה בתהליך ההרשמה');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleRegister} className="auth-form">
            <h2>יצירת חשבון חדש</h2>
            
            {/* הצגת הודעת שגיאה בתוך הממשק */}
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <input name="id" type="number" placeholder="ID Number" onChange={handleChange} required />
            <input name="first_name" placeholder="First Name" onChange={handleChange} required />
            <input name="last_name" placeholder="Last Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <input name="birthday" type="date" placeholder="Birthday" onChange={handleChange} required />
            
            {/* כפתור שמשנה את המלל בזמן טעינה ומונע לחיצות כפולות */}
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'יוצר חשבון...' : 'Create Account'}
            </button>
        </form>
    );
};

export default RegisterForm;