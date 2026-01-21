import express from 'express';
import { checkPincode, getAllPincodes, updatePincodeDeliverable, getPincodeStats } from '../controllers/pincodeController.js';
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';
import { asyncWrapper, asyncMiddlewareWrapper } from '../middleware/asyncWrapper.js';

const router = express.Router();

// user route
router.post('/check', asyncWrapper(checkPincode));

// Admin routes
router.get('/admin/all', asyncMiddlewareWrapper(auth), isAdmin, asyncWrapper(getAllPincodes));
router.get('/admin/stats', asyncMiddlewareWrapper(auth), isAdmin, asyncWrapper(getPincodeStats));
router.put('/admin/:id/deliverable', asyncMiddlewareWrapper(auth), isAdmin, asyncWrapper(updatePincodeDeliverable));

export default router;
