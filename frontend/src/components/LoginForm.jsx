import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import expenseApi from '../services/expenseApi';
import { CostsContext } from '../contexts/CostsContext.jsx';

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
        <form onSubmit={handleLogin} className="auth-form">
            <h2>Login</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

export default LoginForm;