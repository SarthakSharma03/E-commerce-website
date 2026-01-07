import { jsonResponse } from './jsonResponse.js';

export default (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return jsonResponse(res, { message: 'Access denied. Admin only.' }, 403);
  }
};
