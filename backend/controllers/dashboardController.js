const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");

const statistics = async (req, res) => {
  try {

    const revenueResult = await Order.aggregate([
      {
          $group: {
              _id: null,
              totalRevenue: { $sum: "$totalAmount" }
          }
      }
  ]);

    const stats = {
      users:await User.countDocuments(),
      products:await Product.countDocuments(),
      categories:await Category.countDocuments(),
      orders:await Order.countDocuments(),
      totalRevenue:revenueResult[0]?.totalRevenue ||0
    }
    return res.status(200).json({ success: true, stats: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = { statistics };
