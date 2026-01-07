import { Router } from 'express'
import { sendOtp , resetPasswordWithOtp } from '../controllers/otpController.js'
import { asyncWrapper } from '../middleware/asyncWrapper.js'

const router = Router()

router.post('/send', asyncWrapper(sendOtp))
router.post('/reset-password', asyncWrapper(resetPasswordWithOtp))

export default router
