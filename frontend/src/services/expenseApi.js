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

const DEFAULT_EXCHANGE_RATES = { ILS: 1, USD: 3.6, EUR: 3.9, GBP: 4.5 };

export const getExchangeRates = async () => {
    try {
        const response = await axios.get('https://open.er-api.com/v6/latest/ILS');
        const data = response.data.rates;

        return {
            ILS: 1,
            USD: 1 / data.USD,
            EUR: 1 / data.EUR,
            GBP: 1 / data.GBP
        };
    } catch (error) {
        console.error('Failed to fetch exchange rates, using default values.', error);
        return DEFAULT_EXCHANGE_RATES;
    }
};

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
