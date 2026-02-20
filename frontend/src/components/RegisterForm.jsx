import React, { useState } from 'react';
import expenseApi from '../services/expenseApi';
import { Alert, Button, Stack, TextField, Typography } from '@mui/material';

const RegisterForm = ({ setIsLogin }) => {
    const [formData, setFormData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        birthday: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Call register endpoint
            await expenseApi.post('/users/add', formData);
            
            alert('Registration successful! Redirecting to login...');
            
            // Navigate instead of refreshing the page
            setIsLogin(true); 
        } catch (err) {
            // Handle specific API/network errors
            if (!err.response) {
                setError('Cannot connect to server. Please make sure it is running.');
                console.error('Network error:', err.message);
                return;
            }
            
            const status = err.response?.status;
            if (status === 409) {
                setError('User already exists (email or ID)');
            } else if (status === 400) {
                setError(err.response?.data?.message || 'Some input data is invalid');
            } else if (status === 500) {
                setError(err.response?.data?.message || 'Server error. Please try again later.');
            } else {
                setError(err.response?.data?.message || 'Registration failed');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Stack component="form" onSubmit={handleRegister} spacing={2} sx={{ width: '100%' }}>
            <Typography variant="h5" textAlign="center">Create New Account</Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField name="id" type="number" label="ID Number" onChange={handleChange} required fullWidth />
            <TextField name="first_name" label="First Name" onChange={handleChange} required fullWidth />
            <TextField name="last_name" label="Last Name" onChange={handleChange} required fullWidth />
            <TextField name="email" type="email" label="Email" onChange={handleChange} required fullWidth />
            <TextField name="password" type="password" label="Password" onChange={handleChange} required fullWidth />
            <TextField
                name="birthday"
                type="date"
                label="Birthday"
                onChange={handleChange}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
            />

            <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
        </Stack>
    );
};

export default RegisterForm;