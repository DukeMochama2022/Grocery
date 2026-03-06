const express = require("express");

const {
  addCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const upload = require("../middlewares/uploadMiddleware");
const isAdmin = require("../middlewares/adminMiddleware");

const categoryRouter = express.Router();

categoryRouter.post("/create", isAdmin, upload.single("image"), addCategory);
categoryRouter.get("/all", getAllCategories);
categoryRouter.delete("/delete/:id", isAdmin, deleteCategory);
categoryRouter.put("/update/:id", isAdmin,upload.single("image"), updateCategory);
module.exports = { categoryRouter };
