import React, { useEffect, useContext } from 'react';
import AddCostForm from '../components/AddCostForm.jsx';
import CostList from '../components/CostList.jsx';
import { CostsContext } from '../contexts/CostsContext.jsx';

const DashboardPage = () => {
    const { fetchCosts, isAuthenticated } = useContext(CostsContext);

    useEffect(() => {
        if (isAuthenticated && fetchCosts) {
            fetchCosts();
        }
    }, [fetchCosts, isAuthenticated]);

    if (!isAuthenticated) {
        return <p style={{ padding: '20px' }}>Please log in to view your dashboard.</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Expense Management</h1>

            <section style={{ marginBottom: '30px' }}>
                <AddCostForm />
            </section>

            <section>
                <CostList />
            </section>
        </div>
    );
};

export default DashboardPage;
