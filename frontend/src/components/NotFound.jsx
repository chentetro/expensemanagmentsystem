import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Set a timer to navigate after 5 seconds
        const timerId = setTimeout(() => {
            navigate("/login");
        }, 5000);

        // Cleanup function: clears the timer if the component unmounts
        return () => {
            clearTimeout(timerId);
        };
    }, [navigate]); // Added navigate to dependency array for best practice

    // The component UI
    return (
        <div>You will be navigated to the login page in 5 seconds.</div>
    );
};

export default NotFound;