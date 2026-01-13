import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const LoginPage = () => {
    // 1. State to determine which form to show (true = login, false = register)
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {/* Conditional rendering based on the state */}
            {isLogin ? (
                <>
                    <LoginForm />
                    <p>Don't have an account?</p>
                    <button onClick={() => setIsLogin(false)}>Go to Register</button>
                </>
            ) : (
                <>
                    <RegisterForm setIsLogin={setIsLogin} />
                    <p>Already have an account?</p>
                    <button onClick={() => setIsLogin(true)}>Back to Login</button>
                </>
            )}
        </div>
    );
};

export default LoginPage;