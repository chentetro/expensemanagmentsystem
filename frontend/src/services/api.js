import axios from 'axios';


// Server address - make sure the port matches your Backend (3000)
const API_URL = 'http://localhost:3000/api';


const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Interceptor for responses
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Global handling - redirect to login
        }
        return Promise.reject(error);
    }
);

export default api;