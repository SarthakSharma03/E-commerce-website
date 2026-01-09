import express from 'express'
import path from 'path'
import cors from 'cors'
import {config as envConfig} from 'dotenv'
import  connectDB from '../config/db.js'
import authRoute from '../routes/authRoute.js'
import adminRoute from '../routes/adminRoute.js'
import productRoute from '../routes/productRoute.js'
import orderRoute from '../routes/orderRoute.js'
import wishlistRoute from '../routes/wishlistRoute.js'
import otpRoute from '../routes/otpRoute.js'
import { jsonResponse } from '../middleware/jsonResponse.js'
import adminInitialize from '../utils/adminInitialize.js'

envConfig()


connectDB().then(async () => {
  await adminInitialize();
  app.listen(PORT,()=>{
    console.log(`Server running on @ PORT:${PORT}`);
  })
});

const app=express()
const PORT=process.env.PORT || 3000

app.use(cors())
app.use("/uploads", express.static(path.join("uploads")));

app.use(express.json())

app.use((req,_,next)=>{
    const reqUrl=req.url
    const method =req.method
    console.log(`Request @ ${reqUrl} METHOD:${method}`)
    next()
})

app.use('/auth',authRoute)
app.use('/admin/products',adminRoute)
app.use('/products', productRoute)
app.use('/orders', orderRoute)
app.use('/wishlist', wishlistRoute)
app.use('/otp',otpRoute)

app.use((_,res)=>{
    return jsonResponse(res, { message: "route not found" }, 404)
})

app.use((err,_, res) => {
  console.error(err)
  return jsonResponse(res, { message: 'Internal Server Error' }, 500)
})



