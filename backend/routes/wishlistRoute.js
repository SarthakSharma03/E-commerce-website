import { Router } from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlistController.js';
import auth from '../middleware/auth.js';
import { asyncMiddlewareWrapper, asyncWrapper } from '../middleware/asyncWrapper.js';

const router = Router();

router.get('/', asyncMiddlewareWrapper(auth), asyncWrapper(getWishlist));
router.post('/', asyncMiddlewareWrapper(auth), asyncWrapper(addToWishlist));
router.delete('/:productId', asyncMiddlewareWrapper(auth), asyncWrapper(removeFromWishlist));

export default router;
