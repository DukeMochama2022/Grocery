const Order = require("../models/Order");
const Product = require("../models/Product");

// Create a new order
const placeOrder = async (req, res) => {
  try {
    const { items, address, paymentMethod } = req.body;

    if (!address) {
      return res
        .status(400)
        .json({ success: false, message: "Address is required" });
    }
    if (!items || items.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No items provided" });

    // Calculate total
    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      
      if (!product)
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });

      totalAmount += item.quantity * product.offerPrice; // or price
      item.price = product.offerPrice;
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      address,
      paymentMethod,
      totalAmount,
    });

    return res
      .status(201)
      .json({ success: true, message: "Order placed successifully", order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("address").sort({createdAt:-1});
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get orders for logged in user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product", "name images offerPrice")
      .populate("address");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name images offerPrice")
      .populate("address")
      .sort({ createdAt: -1 });

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    validStatuses = ["Pending", "Cancelled", "Processing", "Delivered","Shipped"];

    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }
    const order = await Order.findById(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, order,message:"Status updated successifully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete order (admin)
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  placeOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
