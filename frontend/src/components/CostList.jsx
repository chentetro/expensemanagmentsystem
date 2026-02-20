import React, { useContext } from 'react';
import { CostsContext } from '../contexts/CostsContext.jsx';
import expenseApi from '../services/expenseApi';

const CostList = () => {
    const { costs, fetchCosts } = useContext(CostsContext);

    const removecost = async (id) => {
        try {
            await expenseApi.delete(`costs/delete/${id}`);
            fetchCosts();
            alert('Cost deleted successfully');
        } catch (error) {
            console.error('Error deleting cost:', error);
            alert('Failed to delete cost: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <ul>
            {costs.length > 0 ? costs.map((cost) => (
                <li key={cost._id}>
                    {cost.description} - {cost.sum} - {cost.currency} -({cost.category}- {new Date(cost.createdAt).toLocaleDateString()})
                    <button onClick={() => removecost(cost._id)}>Delete</button>
                </li>
            )) : <p>No costs found.</p>}
        </ul>
    );
};

export default CostList;
