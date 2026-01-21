import mongoose from "mongoose";

const pincodeSchema = new mongoose.Schema(
  {
    pincode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    details: {
      district: String,
      state: String,
      country: String,
      name: String,
      deliveryStatus: String
    },
    isDeliverable: {
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Pincode", pincodeSchema);
