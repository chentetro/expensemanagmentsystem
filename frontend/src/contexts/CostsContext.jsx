/**
 * Context: costs state, auth status, and API helpers.
 */

import React, { createContext, useState, useEffect, useCallback } from 'react';
import expenseApi from '../services/expenseApi';

const CostsContext = createContext();

const CostsProvider = ({ children }) => {
    const [costs, setCosts] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication status on initial load
    const checkAuth = useCallback(async () => {
        try {
            await expenseApi.get('/users/me');
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    // Update auth state after successful login
    const login = () => setIsAuthenticated(true);

    const handleLogout = async () => {
        try {
            await expenseApi.post('/users/logout');
            setIsAuthenticated(false);
            // Route navigation is handled by calling components
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const fetchCosts = useCallback(async () => {
        try {
            const response = await expenseApi.get('/costs/list');
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
            login,
            handleLogout 
        }}>
            {children}
        </CostsContext.Provider>
    );
};

export { CostsContext, CostsProvider };
