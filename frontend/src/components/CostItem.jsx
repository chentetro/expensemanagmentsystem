/**
 * Component: individual cost row with delete action.
 */

import React from 'react';
import {
    Button,
    CircularProgress,
    ListItem,
    ListItemText
} from '@mui/material';

const CostItem = ({ cost, onDelete, isDeleting }) => (
    <ListItem
        divider
        secondaryAction={
            <Button
                color="error"
                onClick={() => onDelete(cost._id)}
                disabled={isDeleting}
                startIcon={isDeleting ? <CircularProgress size={16} /> : null}
            >
                {isDeleting ? 'Deleting...' : 'Delete'}
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
);

export default React.memo(CostItem);
