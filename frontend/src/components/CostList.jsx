/**
 * Component: cost list with delete action.
 */

import React, { useContext, useState } from 'react';
import { CostsContext } from '../contexts/CostsContext.jsx';
import { deleteCost } from '../services/expenseApi';
import {
    Alert,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography
} from '@mui/material';

const CostList = () => {
    const { costs, fetchCosts } = useContext(CostsContext);
    const [deletingId, setDeletingId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleDeleteCost = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this expense?');
        if (!confirmed) {
            return;
        }

        setDeletingId(id);
        setErrorMessage('');

        try {
            await deleteCost(id);
            await fetchCosts();
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Unable to delete the expense.');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <Paper variant="outlined">
            {errorMessage && (
                <Alert severity="error" sx={{ m: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            {costs.length > 0 ? (
                <List>
                    {costs.map((cost) => (
                        <ListItem
                            key={cost._id}
                            divider
                            secondaryAction={
                                <Button
                                    color="error"
                                    onClick={() => handleDeleteCost(cost._id)}
                                    disabled={deletingId !== null}
                                    startIcon={deletingId === cost._id ? <CircularProgress size={16} /> : null}
                                >
                                    {deletingId === cost._id ? 'Deleting...' : 'Delete'}
                                </Button>
                            }
                        >
                            <ListItemText
                                primary={`${cost.description} - ${cost.sum} ${cost.currency}`}
                                secondary={`${cost.category} - ${new Date(cost.createdAt).toLocaleDateString()}`}
                                primaryTypographyProps={{ textTransform: 'capitalize' }}
                                secondaryTypographyProps={{ textTransform: 'capitalize' }}
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography sx={{ p: 2 }}>No costs found.</Typography>
            )}
        </Paper>
    );
};

export default CostList;
