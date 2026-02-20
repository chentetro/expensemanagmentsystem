import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const expenseApi = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

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
