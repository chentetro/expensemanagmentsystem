/**
 * Controller: cost request handlers for CRUD operations.
 */

import logger from '../../config/logger.js';
import asyncHandler from '../../utils/asyncHandler.js';
import {
    createCost,
    editCost,
    listCosts,
    removeCost
} from './cost.service.js';
import {
    validateCreateCostInput,
    validateUpdateCostInput
} from './cost.validator.js';

export const addCost = asyncHandler(async (req, res) => {
    const userid = Number(req.user.userid);
    const payload = validateCreateCostInput(req.body);
    const cost = await createCost(userid, payload);

    logger.info(
        { method: 'POST', url: '/api/costs/add', status: 201, userid },
        'Cost item added successfully'
    );

    res.status(201).json(cost);
});

export const deleteCost = asyncHandler(async (req, res) => {
    const userid = Number(req.user.userid);
    const { id } = req.params;

    await removeCost(userid, id);

    logger.info(
        { method: 'DELETE', url: `/api/costs/delete/${id}`, status: 200, userid },
        'Cost deleted and report cache cleared'
    );

    res.status(200).json({ message: 'Cost deleted successfully' });
});

export const updateCost = asyncHandler(async (req, res) => {
    const userid = Number(req.user.userid);
    const { id } = req.params;
    const payload = validateUpdateCostInput(req.body);
    const updatedCost = await editCost(userid, id, payload);

    logger.info(
        { method: 'PUT', url: `/api/costs/update/${id}`, status: 200, userid },
        'Cost updated and report cache cleared'
    );

    res.status(200).json(updatedCost);
});

export const getCosts = asyncHandler(async (req, res) => {
    const userid = Number(req.user.userid);
    const costs = await listCosts(userid);

    logger.info(
        { method: 'GET', url: '/api/costs/list', status: 200, userid },
        'Fetched costs successfully'
    );

    res.status(200).json(costs);
});
