import Product from "../models/productModel.js";
import { jsonResponse } from "../middleware/jsonResponse.js";

export const createProduct = async (req, res) => {
  const productData = req.body;
  const imagePaths = req.files.map((item) => {
    return (
      process.env.SERVER_DOMAIN + "/uploads" + "/productImage/" + item.filename
    );
  });
  productData.images = imagePaths;
  const product = await Product.create(productData);
  return jsonResponse(res, { success: true, data: product }, 201);
};

export const updateProduct = async (req, res) => {
  const updates = { ...req.body };
  const { id } = req.params;
  delete updates.images;
  let newImages = [];
  if (req.files && req.files.length > 0) {
    newImages = req.files.map((item) => {
      return (
        process.env.SERVER_DOMAIN +
        "/uploads" +
        "/productImage/" +
        item.filename
      );
    });
  }

  const updateQuery = { $set: updates };
  if (newImages.length > 0) {
    updateQuery.$push = { images: { $each: newImages } };
  }

  const product = await Product.findByIdAndUpdate(id, updateQuery, {
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
  const { search, sort, page = 1, limit = 12 } = req.query;

  const query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
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
