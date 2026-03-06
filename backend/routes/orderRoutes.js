const express = require("express");
const orderRouter = express.Router();
const userAuth = require("../middlewares/authMiddleware");
const adminAuth = require("../middlewares/adminMiddleware");

const {
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
  deleteOrder,
} = require("../controllers/orderController");

//user order routes
orderRouter.post("/place", userAuth, placeOrder);
orderRouter.get("/my-orders", userAuth, getUserOrders);


//admin order routes
orderRouter.get("/all-orders",adminAuth, getAllOrders);
orderRouter.put("/update/:id", adminAuth, updateOrderStatus);
orderRouter.delete("/delete/:id", adminAuth, deleteOrder);

//hybrid
orderRouter.get("/:id", userAuth, getOrderById);

module.exports = { orderRouter };
