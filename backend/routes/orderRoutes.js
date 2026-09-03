const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");

const router = express.Router();

// Create Order
router.post("/create", async (req, res) => {
  try {
    const {
      userId,
      items,
      shippingAddress,
      paymentMethod = "Cash on Delivery",
    } = req.body;

    if (!userId || !items || items.length === 0 || !shippingAddress) {
      return res.status(400).json({
        message: "userId, items and shippingAddress are required",
      });
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.productId}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
        });
      }

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      totalAmount += product.price * item.quantity;
    }

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    await order.populate("items.product");

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
});
// Get User Orders
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user orders",
      error: error.message,
    });
  }
});
// Get Single Order
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
});
// Update Order Status
router.put("/:id/status", async (req, res) => {
  try {
    const { orderStatus } = req.body;

    if (!orderStatus) {
      return res.status(400).json({
        message: "orderStatus is required",
      });
    }

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true, runValidators: true }
    ).populate("items.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
});
// Cancel Order
router.put("/:id/cancel", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (
      order.orderStatus === "Shipped" ||
      order.orderStatus === "Delivered" ||
      order.orderStatus === "Cancelled"
    ) {
      return res.status(400).json({
        message: `Order cannot be cancelled because its status is ${order.orderStatus}`,
      });
    }

    order.orderStatus = "Cancelled";

    await order.save();

    await order.populate("items.product");

    res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel order",
      error: error.message,
    });
  }
});

module.exports = router;