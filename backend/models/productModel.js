import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: [
      "computer",
      "phone",
      "smartWatch",
      "camera",
      "Camera",
      "headphone",
      "Headphone",
      "gaming",
      "Gaming",
      "Woman’s Fashion",
      "Men’s Fashion",
      "Electronics",
      "Home & Lifestyle",
      "Medicine",
      "Sports & Outdoor",
      "Baby’s & Toys",
      "Groceries & Pets",
      "Health & Beauty"
    ] 
  },
  images: { type: [String], required: true },
  stock: { type: Number, default: 0 },
  oldPrice: { type: Number },
  discount: { type: Number, default: 0 },
  isNewArrival: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  ratings: {
    type: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        value: { type: Number, required: true, min: 1, max: 5 },
      },
    ],
    default: [],
  },
}, { timestamps: true });

productSchema.index({ name: 1 });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
