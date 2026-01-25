import Product from "../models/productModel.js";
import { jsonResponse } from "../middleware/jsonResponse.js";

export const createProduct = async (req, res) => {
  const productData = req.body;
  // Images are now passed as URLs in req.body.images
  // If no images provided, ensure it is an empty array
  productData.images = productData.images || [];

  const product = await Product.create(productData); 
  return jsonResponse(res, { success: true, data: product }, 201);
};

export const updateProduct = async (req, res) => {
  const updates = { ...req.body };
  const { id } = req.params;

  // Handle images if provided
  if (updates.images) {
    // updates.images is already an array of URLs
  } else {
    // If images not present in body, don't update them (or set to empty if intentional?)
    // Usually PUT might mean full replace, but here we treat it as PATCH-like or partial update
    delete updates.images;
  }

  const product = await Product.findByIdAndUpdate(id, { $set: updates }, {
    new: true,
    runValidators: true,
  });
  if (!product) return jsonResponse(res, { error: "Product not found" }, 404);
  return jsonResponse(res, { success: true, data: product });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return jsonResponse(res, { error: "Product not found" }, 404);
  return jsonResponse(res, { success: true, message: "Product deleted" });
};

export const getProducts = async (req, res) => {
  const { search, sort, page = 1, limit = 12, category, categories } = req.query;

  const query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  if (category) {
    query.category = category;
  }
  if (categories) {
    const list = Array.isArray(categories)
      ? categories
      : String(categories).split(",").map((s) => s.trim()).filter(Boolean);
    if (list.length > 0) {
      query.category = { $in: list };
    }
  }

  let sortOptions = {};
  if (sort) {
    switch (sort) {
      case "price-asc":
        sortOptions = { price: 1 };
        break;
      case "price-desc":
        sortOptions = { price: -1 };
        break;
      case "name-asc":
        sortOptions = { name: 1 };
        break;
      case "name-desc":
        sortOptions = { name: -1 };
        break;
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }
  } else {
    sortOptions = { createdAt: -1 };
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const products = await Product.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNum)
    .lean();

  const total = await Product.countDocuments(query);

  return jsonResponse(res, {
    success: true,
    data: products,
    pagination: {
      totalProducts: total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      limit: limitNum,
    },
  });
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) return jsonResponse(res, { error: "Product not found" }, 404);
  return jsonResponse(res, { success: true, data: product });
};

export const rateProduct = async (req, res) => {
  const { rating } = req.body;
  const { id } = req.params;

  const numericRating = Number(rating);
  if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
    return jsonResponse(res, { error: "Rating must be between 1 and 5" }, 400);
  }

  const product = await Product.findById(id);
  if (!product) {
    return jsonResponse(res, { error: "Product not found" }, 404);
  }

  if (!Array.isArray(product.ratings)) {
    product.ratings = [];
  }

  const existing = product.ratings.find(
    (entry) => entry.user.toString() === req.userId
  );

  if (existing) {
    existing.value = numericRating;
  } else {
    product.ratings.push({
      user: req.userId,
      value: numericRating,
    });
  }

  if (product.ratings.length > 0) {
    const total = product.ratings.reduce((sum, entry) => sum + entry.value, 0);
    product.rating = total / product.ratings.length;
    product.reviews = product.ratings.length;
  } else {
    product.rating = 0;
    product.reviews = 0;
  }

  const updated = await product.save();
  return jsonResponse(res, { success: true, data: updated });
};
