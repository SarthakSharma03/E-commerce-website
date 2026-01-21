import { Router } from 'express';
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToPaid, initiatePayment, verifyPayment, updateOrderStatus } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';
import { asyncMiddlewareWrapper, asyncWrapper } from '../middleware/asyncWrapper.js';
import validateBody from '../middleware/validateBody.js';
import { orderSchema } from '../validation/orderValidation.js';

const router = Router();

router.post('/', asyncMiddlewareWrapper(auth) ,validateBody(orderSchema) , asyncWrapper(addOrderItems));
router.get('/myorders', asyncMiddlewareWrapper(auth), asyncWrapper(getMyOrders));
router.post('/verify', asyncMiddlewareWrapper(auth), asyncWrapper(verifyPayment)); 
router.get('/:id', asyncMiddlewareWrapper(auth), asyncWrapper(getOrderById));
router.put('/:id/pay', asyncMiddlewareWrapper(auth), asyncWrapper(updateOrderToPaid));
router.put('/:id/status', asyncMiddlewareWrapper(auth), isAdmin, asyncWrapper(updateOrderStatus));
router.post('/:id/initiate', asyncMiddlewareWrapper(auth), asyncWrapper(initiatePayment));
router.get('/', asyncMiddlewareWrapper(auth), isAdmin, asyncWrapper(getOrders));

export default router;
