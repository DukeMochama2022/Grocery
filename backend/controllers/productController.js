const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");
//add aproduct
const addProduct = async (req, res) => {
  try {
    const { name, price, offerPrice, smallDesc, longDesc, weight, category } =
      req.body;

    if (
      !name ||
      !price ||
      !offerPrice ||
      !smallDesc ||
      !longDesc ||
      !weight ||
      !category
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required!" });
    }

    const exists = await Product.findOne({ name });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Product already exists!" });
    }

    //check images
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one product is required" });
    }

    const imagePaths = req.files.map(
      (file) => `/uploads/products/${file.filename}`
    );

    const product = await Product.create({
      name,
      price,
      offerPrice,
      smallDesc,
      longDesc,
      weight,
      category,
      images: imagePaths,
    });

    return res.status(201).json({
      success: true,
      message: "product added successifully.",
      product,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to create product" });
  }
};
//get all products
const allProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    return res
      .status(200)
      .json({ success: true, count: products.length, products });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in creating product" });
  }
};
//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    //deleteing image file if exists
    if (product.images && product.images.length > 0) {
      product.images.forEach((imgPath) => {
        const fullPath = path.join(__dirname, "..", imgPath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
    }

    //delete category from db
    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in deleting product" });
  }
};
//update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    const { name, price, offerPrice, smallDesc, longDesc, weight, category } =
      req.body;

    //update text fields only if updated
    product.name = name || product.name;
    product.price = price || product.price;
    product.offerPrice = offerPrice || product.offerPrice;
    product.smallDesc = smallDesc || product.smallDesc;
    product.longDesc = longDesc || product.longDesc;
    product.weight = weight || product.weight;
    product.category = category || product.category;

    //in new image uploaded ---replace
    if (req.files && req.files.length > 0) {
      //delete old images
      product.images.forEach((imgPath) => {
        const fullPath = path.join(__dirname, "-", imgPath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
    }

    //save new images
    product.images = req.files.map(
      (file) => `/uploads/products/${file.filename}`
    );

    //save updates
    await product.save();
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in updating product" });
  }
};

module.exports = { addProduct, allProducts, deleteProduct, updateProduct };
