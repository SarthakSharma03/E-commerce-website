import { jsonResponse } from '../middleware/jsonResponse.js';
import User from '../models/userModel.js';
import Pincode from '../models/pincodeModel.js';
import jwt from 'jsonwebtoken';

export const checkPincode = async (req, res) => {
    const { pincode } = req.body;

    if (!pincode) {
        return jsonResponse(res, { message: 'Pincode is required' }, 400);
    }

    try {
       
        let cachedPincode = await Pincode.findOne({ pincode });

        if (cachedPincode) {
        
            const token = req.headers.authorization?.split(' ')[1];
            if (token) {
                try {
                    const secret = process.env.JWT_SECRET;
                    const payload = jwt.verify(token, secret);
                    const userId = payload.userId;
                    
                    await User.findByIdAndUpdate(userId, { pincode: pincode });
                } catch (err) {
                    console.log("Optional auth failed for pincode save", err.message);
                }
            }

            return jsonResponse(res, {
                success: true,
                message: cachedPincode.isDeliverable ? "Delivery available" : "Delivery not available",
                isDeliverable: cachedPincode.isDeliverable,
                location: cachedPincode.details
            }, 200);
        } else {
          
            return jsonResponse(res, { 
                success: false, 
                message: "Invalid Pincode or Delivery not available",
                isDeliverable: false 
            }, 200);
        }

    } catch (error) {
        console.error("Pincode check error:", error);
        return jsonResponse(res, { message: 'Error checking pincode' }, 500);
    }
};


export const saveUserPincode = async (req, res) => {
   
};

export const getAllPincodes = async (req, res) => {
    try {
        const { page = 1, limit = 50, search = '', state = '', isDeliverable = '' } = req.query;
        
        const query = {};
        
        if (search) {
            query.$or = [
                { pincode: { $regex: search, $options: 'i' } },
                { 'details.name': { $regex: search, $options: 'i' } },
                { 'details.district': { $regex: search, $options: 'i' } },
                { 'details.state': { $regex: search, $options: 'i' } }
            ];
        }
        
        if (state) {
            query['details.state'] = { $regex: state, $options: 'i' };
        }
        
        if (isDeliverable !== '') {
            query.isDeliverable = isDeliverable === 'true';
        }
        
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        
        const pincodes = await Pincode.find(query)
            .sort({ pincode: 1 })
            .skip(skip)
            .limit(limitNum)
            .lean();
        
        const total = await Pincode.countDocuments(query);
        
        return jsonResponse(res, {
            success: true,
            data: pincodes,
            pagination: {
                total,
                totalPages: Math.ceil(total / limitNum),
                currentPage: pageNum,
                limit: limitNum
            }
        });
    } catch (error) {
        console.error('Get all pincodes error:', error);
        return jsonResponse(res, { message: 'Error fetching pincodes' }, 500);
    }
};

export const updatePincodeDeliverable = async (req, res) => {
    try {
        const { id } = req.params;
        const { isDeliverable } = req.body;
        
        if (typeof isDeliverable !== 'boolean') {
            return jsonResponse(res, { message: 'isDeliverable must be a boolean' }, 400);
        }
        
        const pincode = await Pincode.findByIdAndUpdate(
            id,
            { isDeliverable },
            { new: true }
        );
        
        if (!pincode) {
            return jsonResponse(res, { message: 'Pincode not found' }, 404);
        }
        
        return jsonResponse(res, {
            success: true,
            data: pincode
        });
    } catch (error) {
        console.error('Update pincode error:', error);
        return jsonResponse(res, { message: 'Error updating pincode' }, 500);
    }
};

export const getPincodeStats = async (req, res) => {
    try {
        const total = await Pincode.countDocuments();
        const deliverable = await Pincode.countDocuments({ isDeliverable: true });
        const nonDeliverable = await Pincode.countDocuments({ isDeliverable: false });
        
        const states = await Pincode.distinct('details.state');
        
        return jsonResponse(res, {
            success: true,
            stats: {
                total,
                deliverable,
                nonDeliverable,
                statesCount: states.length
            }
        });
    } catch (error) {
        console.error('Get pincode stats error:', error);
        return jsonResponse(res, { message: 'Error fetching statistics' }, 500);
    }
};
