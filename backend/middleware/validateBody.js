import { jsonResponse } from "./jsonResponse.js"

const validateBody = (schema)=>{
      return async (req,res,next)=>{
            try {
            const requestData=req.body
            await schema.validate(requestData)
            next()
            } catch (error) {
                 const validationErrorMessage=error.errors[0]
        return jsonResponse(res, { error: validationErrorMessage }, 500);
            }
      }
}

export default validateBody