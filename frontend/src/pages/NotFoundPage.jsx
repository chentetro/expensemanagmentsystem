import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timerId = setTimeout(() => {
            navigate('/login');
        }, 5000);

        return () => {
            clearTimeout(timerId);
        };
    }, [navigate]);

    return (
        <div>You will be navigated to the login page in 5 seconds.</div>
    );
};

export default NotFoundPage;
