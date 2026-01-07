import { Router } from 'express'
import { register, login, logout, me, updateProfile, updatePassword } from '../controllers/authController.js'
import auth from '../middleware/auth.js'
import { asyncMiddlewareWrapper, asyncWrapper } from '../middleware/asyncWrapper.js'
import validateBody from '../middleware/validateBody.js'
import { userSchema } from '../validation/userValidation.js'
import { loginSchema } from '../validation/loginValidation.js'

const router = Router()

router.post('/register',validateBody(userSchema) ,asyncWrapper(register))
router.post('/login',validateBody(loginSchema), asyncWrapper(login))
router.post('/logout',asyncMiddlewareWrapper(auth), asyncWrapper(logout))
router.get('/me', asyncMiddlewareWrapper(auth), asyncWrapper(me))
router.put('/profile', asyncMiddlewareWrapper(auth), asyncWrapper(updateProfile))
router.put('/password', asyncMiddlewareWrapper(auth), asyncWrapper(updatePassword))

export default router
