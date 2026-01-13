import React, { useEffect, useContext } from 'react';
import AddCostForm from '../components/AddCostForm.jsx';
import Costlist from '../components/Costlist.jsx';
import { CostsContext } from '../contexts/CostsContext.jsx';

const Dashboard = () => {
    const { fetchCosts, isAuthenticated } = useContext(CostsContext);

    useEffect(() => {
        // Only fetch if authenticated and function exists
        if (isAuthenticated && fetchCosts) {
            fetchCosts();
        }
    }, [fetchCosts, isAuthenticated]);

    // FIX: Added 'return' here
    if (!isAuthenticated) {
        return <p style={{ padding: '20px' }}>Please log in to view your dashboard.</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>ניהול הוצאות</h1>
            
            <section style={{ marginBottom: '30px' }}>
                <AddCostForm />
            </section>

            <section>
                <Costlist />
            </section>
        </div>
    );
};

export default Dashboard;