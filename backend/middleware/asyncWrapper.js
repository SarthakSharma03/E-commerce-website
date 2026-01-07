import { jsonResponse } from "./jsonResponse.js";

export const asyncWrapper = (controller) => {
    return async (req, res) => {
        try {
           
            await controller(req, res);
        } catch (error) {
            return jsonResponse(res, { error: error.message }, 500);
        }
    };
};

export const asyncMiddlewareWrapper = (middleware) => {
    return async (req, res, next) => {
        try {
            await middleware(req, res, next);
            next();
        } catch (error) {
            return jsonResponse(res, { error: error.message }, 500);
        }
    };
};
