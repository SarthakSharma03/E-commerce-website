import mongoose from 'mongoose'
import  {config as envConfig} from 'dotenv'
envConfig()
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI 
    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error("Please check your .env file and MongoDB Atlas IP Whitelist settings.");
    process.exit(1);
  }
};

export default connectDB
