import express from 'express'
import path from 'path'
import cors from 'cors'
import {config as envConfig} from 'dotenv'
import { fileURLToPath } from 'url'
import  connectDB from '../config/db.js'
import authRoute from '../routes/authRoute.js'
import adminRoute from '../routes/adminRoute.js'
import productRoute from '../routes/productRoute.js'
import orderRoute from '../routes/orderRoute.js'
import wishlistRoute from '../routes/wishlistRoute.js'
import contactRoute from  '../routes/contactRoute.js'
import otpRoute from '../routes/otpRoute.js'
import pincodeRoute from '../routes/pincodeRoute.js'
import { jsonResponse } from '../middleware/jsonResponse.js'
import adminInitialize from '../utils/adminInitialize.js'
import { startCronJobs } from '../utils/cronJobs.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


envConfig({ path: path.join(__dirname, '../../.env') })

const app=express()
const PORT=process.env.PORT || 3000

app.use(cors())
app.use("/uploads", express.static(path.join(__dirname, '../../uploads')));

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
app.use('/contact',contactRoute)
app.use('/pincode', pincodeRoute)

app.use((_,res)=>{
    return jsonResponse(res, { message: "route not found" }, 404)
})

app.use((err, req, res, next) => {
  console.error(err)
  return jsonResponse(res, { message: 'Internal Server Error' }, 500)
})

connectDB().then(async () => {
  await adminInitialize();
  startCronJobs(); 
  app.listen(PORT,()=>{
    console.log(`Server running on @ PORT:${PORT}`);
  })
});


