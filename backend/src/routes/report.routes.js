import { Router } from 'express';
import { getReport } from '../controllers/report.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js'; // ייבוא המאבטח

const router = Router();

// הגנה על הנתיב - רק משתמש עם טוקן יכול לבקש דוח
router.get('/', verifyToken, getReport);

export default router;