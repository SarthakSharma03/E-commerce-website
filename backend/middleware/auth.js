import jwt from 'jsonwebtoken'
import { config as envConfig } from 'dotenv'
import { jsonResponse } from './jsonResponse.js'
import User from '../models/userModel.js'

envConfig()

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return jsonResponse(res, { message: 'Unauthorized' }, 401)
    }

    const secret = process.env.JWT_SECRET
    const payload = jwt.verify(token, secret)
    const userId = payload.userId

    const user = await User.findById(userId)
    if (!user) {
      return jsonResponse(res, { message: 'User not found' }, 401)
    }

    req.user = user
    req.userId = user._id.toString()
    return next()
  } catch (error) {
    return jsonResponse(res, { message: 'Unauthorized' }, 401)
  }
}
