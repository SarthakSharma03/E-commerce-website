import express from 'express'
import { getProducts, getProductById } from '../controllers/productController.js'
import { asyncWrapper } from '../middleware/asyncWrapper.js'

const router = express.Router()

router.get('/', asyncWrapper(getProducts))
router.get('/:id', asyncWrapper(getProductById))

export default router
