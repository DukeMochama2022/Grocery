const Category = require("../models/Category");
const fs = require("fs");
const path = require("path");

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    //check name
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Category name is required!" });
    }

    //check image

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required!" });
    }

    //check if category exists
    const exists = await Category.findOne({ name });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }

    const category = await Category.create({
      name,
      image: `/uploads/categories/${req.file.filename}`,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create category",
    });
  }
};

//get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ success: true, categories });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories.",
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found." });
    }

    //deleteing image file if exists
    if (category.image) {
      const imagePath = path.join(__dirname, "..", category.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    //delete category from db
    await Category.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories.",
      error: error.message,
    });
  }
};


//update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // find category
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // update name if provided
    if (name) {
      category.name = name;
    }

    // update image if new image uploaded
    if (req.file) {
      // delete old image
      if (category.image) {
        const oldImagePath = path.join(__dirname, "..", category.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // save new image
      category.image = `/uploads/categories/${req.file.filename}`;
    }

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: error.message,
    });
  }
};

module.exports = updateCategory;


module.exports = { addCategory, getAllCategories, deleteCategory,updateCategory  };
