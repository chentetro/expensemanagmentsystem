import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import expenseApi from '../services/expenseApi';
import { CostsContext } from '../contexts/CostsContext.jsx';
import { Alert, Button, Stack, TextField } from '@mui/material';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { login } = useContext(CostsContext);
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
            const response = await expenseApi.post('/users/login', credentials);
            
            if (response.status === 200) {
                // Update auth context after successful login
                login(); 
                
                // Navigate to dashboard after context updates
                navigator('/dashboard');
            }
        } catch (err) {
            const status = err.response?.status;
            if (status === 401) {
                setError('Incorrect email or password');
            } else if (status === 404) {
                setError('User not found, please register first');
            } else if (status === 500) {
                setError('Server error, please try again later');
            } else {
                setError('Unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Stack component="form" onSubmit={handleLogin} spacing={2} sx={{ width: '100%' }}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
                name="email"
                type="email"
                label="Email"
                value={credentials.email}
                onChange={handleChange}
                required
                fullWidth
            />
            <TextField
                name="password"
                type="password"
                label="Password"
                value={credentials.password}
                onChange={handleChange}
                required
                fullWidth
            />

            <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
            </Button>
        </Stack>
    );
};

export default LoginForm;