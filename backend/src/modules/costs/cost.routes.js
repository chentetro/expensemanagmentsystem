/**
 * Routes: cost API endpoints (add, delete, update, list).
 */

import { Router } from 'express';
import { addCost, deleteCost, getCosts, updateCost } from './cost.controller.js';
import { verifyToken } from '../../middleware/auth.middleware.js';

const router = Router();

router.post('/add', verifyToken, addCost);
router.delete('/delete/:id', verifyToken, deleteCost);
router.put('/update/:id', verifyToken, updateCost);
router.get('/list', verifyToken, getCosts);

export default router;
