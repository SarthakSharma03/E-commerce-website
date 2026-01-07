import { Router } from 'express';
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToPaid } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';
import { asyncMiddlewareWrapper, asyncWrapper } from '../middleware/asyncWrapper.js';

const router = Router();

router.post('/', asyncMiddlewareWrapper(auth), asyncWrapper(addOrderItems));
router.get('/myorders', asyncMiddlewareWrapper(auth), asyncWrapper(getMyOrders));
router.get('/:id', asyncMiddlewareWrapper(auth), asyncWrapper(getOrderById));
router.put('/:id/pay', asyncMiddlewareWrapper(auth), asyncWrapper(updateOrderToPaid));
router.get('/', asyncMiddlewareWrapper(auth), isAdmin, asyncWrapper(getOrders));

export default router;