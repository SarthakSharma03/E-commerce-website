import { jsonResponse } from "./jsonResponse.js"

const validateBody = (schema)=>{
      return async (req,res,next)=>{
            try {
            const requestData=req.body
            await schema.validate(requestData, { abortEarly: false })
            next()
            } catch (error) {
                 const validationErrorMessage=error.errors?.[0] || 'Invalid request body'
        return jsonResponse(res, { error: validationErrorMessage }, 400);
            }
      }
}

export default validateBody
