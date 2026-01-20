import mongoose from 'mongoose'
import  {config as envConfig} from 'dotenv'
import { MongoMemoryServer } from 'mongodb-memory-server'
envConfig()

let memoryServer = null

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI
    const shouldUseMemoryDb =
      process.env.USE_MEMORY_DB === 'true' || process.env.NODE_ENV !== 'production'

    if (!uri && !shouldUseMemoryDb) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    if (!uri && shouldUseMemoryDb) {
      memoryServer = await MongoMemoryServer.create()
      const memoryUri = memoryServer.getUri()
      await mongoose.connect(memoryUri)
      console.log("MongoDB Connected (in-memory)")
      return
    }

    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
      console.log("MongoDB Connected Successfully")
      return
    } catch (error) {
      if (!shouldUseMemoryDb) throw error

      console.error("MongoDB connection failed:", error.message)
      console.warn("Falling back to in-memory MongoDB for local development.")
      memoryServer = await MongoMemoryServer.create()
      const memoryUri = memoryServer.getUri()
      await mongoose.connect(memoryUri)
      console.log("MongoDB Connected (in-memory)")
      return
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error("Please check your .env file and MongoDB Atlas IP Whitelist settings.");
    process.exit(1);
  }
};

export default connectDB
