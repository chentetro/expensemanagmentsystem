import React, { useState, useContext } from 'react'; // הוספנו useContext
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { CostsContext } from '../contexts/CostsContext.jsx'; // ייבוא ה-Context שלך

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { login } = useContext(CostsContext); // חילוץ פונקציית ה-login מה-Context
    const navigator = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/users/login', credentials);
            
            if (response.status === 200) {
                // השלב הקריטי: מעדכנים את ה-Context שהתחברנו בהצלחה
                login(); 
                
                // עכשיו אפשר לעבור לדף הבית - ה-Navbar כבר התעדכן ברקע
                navigator('/dashboard');
            }
        } catch (err) {
            const status = err.response?.status;
            if (status === 401) {
                setError('אימייל או סיסמה לא נכונים');
            } else if (status === 404) {
                setError('משתמש לא נמצא, אולי כדאי להירשם?');
            } else if (status === 500) {
                setError('יש תקלה בשרת, נסו שוב מאוחר יותר');
            } else {
                setError('קרתה שגיאה לא צפויה');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="auth-form">
            <h2>התחברות</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'מתחבר...' : 'Login'}
            </button>
        </form>
    );
};

export default LoginForm;