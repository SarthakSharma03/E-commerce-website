import express from 'express'
import { createProduct, updateProduct, deleteProduct, getProducts, getProductById } from '../controllers/productController.js'
import auth from '../middleware/auth.js'
import isAdmin from '../middleware/isAdmin.js'
import upload from '../middleware/upload.js'
import validateBody from '../middleware/validateBody.js'
import { productSchema } from '../validation/productValidation.js'
import { asyncWrapper } from '../middleware/asyncWrapper.js'

const router = express.Router()

router.use(auth)

router.post('/' ,isAdmin , upload.array("image",5),validateBody(productSchema),asyncWrapper(createProduct));
router.put('/:id', isAdmin, upload.array("image",5), asyncWrapper(updateProduct));
router.delete('/:id', isAdmin, asyncWrapper(deleteProduct));

router.get('/', isAdmin, asyncWrapper(getProducts));
router.get('/:id', isAdmin, asyncWrapper(getProductById)); 

export default router
