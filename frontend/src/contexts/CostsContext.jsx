import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const CostsContext = createContext();

const CostsProvider = ({ children }) => {
    const [costs, setCosts] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // פונקציה לבדיקת סטטוס התחברות (טובה לטעינה ראשונית)
    const checkAuth = useCallback(async () => {
        try {
            await api.get('/users/me');
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    // פונקציה לעדכון מצב מחובר (תקראי לה מדף ה-Login)
    const login = () => setIsAuthenticated(true);

    const handleLogout = async () => {
        try {
            await api.post('/users/logout');
            setIsAuthenticated(false);
            // שימי לב: ה-navigate יבוצע בקומפוננטה שקוראת ל-logout או כאן אם תעבירי אותו
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const fetchCosts = useCallback(async () => {
        try {
            const response = await api.get('/costs/list');
            setCosts(response.data);
        } catch (error) {
            console.error('Error fetching costs:', error);
        }
    }, []);

    return (
        <CostsContext.Provider value={{ 
            costs, 
            setCosts, 
            fetchCosts, 
            isAuthenticated, 
            login, // ייצוא פונקציית ה-login
            handleLogout 
        }}>
            {children}
        </CostsContext.Provider>
    );
};

export { CostsContext, CostsProvider };
