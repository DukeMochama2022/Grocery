const express = require("express");
const isAdmin = require("../middlewares/adminMiddleware");
const productUploadMiddleware = require("../middlewares/productUpload");
const {
  addProduct,
  allProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const productRouter = express.Router();

productRouter.post(
  "/create",
  isAdmin,
  productUploadMiddleware.array("images", 4),
  addProduct
);
productRouter.get("/all",allProducts);
productRouter.put(
  "/update/:id",
  isAdmin,
  productUploadMiddleware.array("images", 4),
  updateProduct
);
productRouter.delete("/delete/:id", isAdmin, deleteProduct);
module.exports = { productRouter };
