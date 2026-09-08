/**
 * Service: axios API client with auth and interceptors.
 */
import axios from 'axios';

// משתמש בכתובת מ-Render, ואם היא לא קיימת (למשל בעבודה מקומית) משתמש ב-localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const expenseApi = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const addCost = (data) => expenseApi.post('/costs/add', data);
export const deleteCost = (id) => expenseApi.delete(`/costs/delete/${id}`);
export const loginUser = async (credentials) => expenseApi.post('/users/login', credentials);
export const registerUser = async (userData) => expenseApi.post('/users/add', userData);
export const getMonthlyReport = (month, year) =>
    expenseApi.get('/reports', { params: { month, year } });

expenseApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Global handling - redirect to login
        }
        return Promise.reject(error);
    }
);

export default expenseApi;
