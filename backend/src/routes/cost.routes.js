import { Router } from 'express';
import { addCost,deleteCost,updateCost,getCosts} from '../controllers/cost.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
const router = Router();

router.post('/add', verifyToken, addCost);
router.delete('/delete/:id', verifyToken, deleteCost);
router.put ('/update/:id', verifyToken, updateCost);
router.get('/list', verifyToken, getCosts);

export default router;