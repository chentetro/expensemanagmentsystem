/**
 * Component: cost list with delete action.
 */

import React, { useContext } from 'react';
import { CostsContext } from '../contexts/CostsContext.jsx';
import expenseApi from '../services/expenseApi';
import { Button, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const CostList = () => {
    const { costs, fetchCosts } = useContext(CostsContext);

    const removecost = async (id) => {
        try {
            await expenseApi.delete(`costs/delete/${id}`);
            fetchCosts();
        } catch (error) {
            console.error('Error deleting cost:', error);
        }
    };

    return (
        <Paper variant="outlined">
            {costs.length > 0 ? (
                <List>
                    {costs.map((cost) => (
                        <ListItem
                            key={cost._id}
                            divider
                            secondaryAction={
                                <Button color="error" onClick={() => removecost(cost._id)}>
                                    Delete
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
