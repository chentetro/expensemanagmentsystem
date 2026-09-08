/**
 * Component: user registration form.
 */

import React, { useState } from 'react';
import { registerUser } from '../services/expenseApi';
import { Alert, Button, Stack, TextField } from '@mui/material';

const INITIAL_FORM_DATA = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birthday: ''
};

const RegisterForm = ({ setIsLogin }) => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await registerUser(formData);

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
            {error && <Alert severity="error">{error}</Alert>}

            <TextField name="id" type="number" label="ID Number" value={formData.id} onChange={handleChange} required fullWidth />
            <TextField name="first_name" label="First Name" value={formData.first_name} onChange={handleChange} required fullWidth />
            <TextField name="last_name" label="Last Name" value={formData.last_name} onChange={handleChange} required fullWidth />
            <TextField name="email" type="email" label="Email" value={formData.email} onChange={handleChange} required fullWidth />
            <TextField name="password" type="password" label="Password" value={formData.password} onChange={handleChange} required fullWidth />
            <TextField
                name="birthday"
                type="date"
                label="Birthday"
                value={formData.birthday}
                onChange={handleChange}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
            />

            <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
        </Stack>
    );
};

export default RegisterForm;