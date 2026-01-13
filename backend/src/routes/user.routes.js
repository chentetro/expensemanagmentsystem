import {Router} from 'express';
import { addUser,loginUser, logoutUser, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
const router=Router();

router.post('/add', addUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', verifyToken, getUser);

export default router;