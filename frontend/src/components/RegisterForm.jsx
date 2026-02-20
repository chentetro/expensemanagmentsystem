import React, { useState } from 'react';
import expenseApi from '../services/expenseApi';

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
        <form onSubmit={handleRegister} className="auth-form">
            <h2>Create New Account</h2>
            
            {/* Show error message inline */}
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <input name="id" type="number" placeholder="ID Number" onChange={handleChange} required />
            <input name="first_name" placeholder="First Name" onChange={handleChange} required />
            <input name="last_name" placeholder="Last Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <input name="birthday" type="date" placeholder="Birthday" onChange={handleChange} required />
            
            {/* Disable while loading to prevent duplicate submits */}
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
        </form>
    );
};

export default RegisterForm;