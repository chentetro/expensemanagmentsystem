/**
 * Routes: report API endpoints.
 */

import { Router } from 'express';
import { getReport } from './report.controller.js';
import { verifyToken } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, getReport);

export default router;
