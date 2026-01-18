import express from 'express'
import { getProducts, getProductById, rateProduct } from '../controllers/productController.js'
import { asyncWrapper, asyncMiddlewareWrapper } from '../middleware/asyncWrapper.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', asyncWrapper(getProducts))
router.get('/:id', asyncWrapper(getProductById))
router.post('/:id/rate', asyncMiddlewareWrapper(auth), asyncWrapper(rateProduct))

export default router
