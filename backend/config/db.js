import mongoose from "mongoose"
import { config as envConfig } from "dotenv"

envConfig()

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI

    if (!uri) {
      throw new Error("MONGO_URI is not defined in .env file")
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })

    console.log("✅ MongoDB Atlas Connected Successfully")
  } catch (error) {
    console.error("❌ MongoDB Atlas connection failed")
    console.error(error.message)
    process.exit(1) // STOP APP — no fallback
  }
}

export default connectDB
