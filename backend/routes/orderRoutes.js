module.exports = (io) => {
  const express = require("express");
  const Order = require("../models/Order");
  const Product = require("../models/Product");
  const generateInvoice = require("../utils/generateInvoice");
  const User = require("../models/User");
  const sendEmail = require("../utils/sendEmail");
  const { getMessaging } = require("firebase-admin/messaging");
  require("../config/firebaseAdmin");

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
        const mongoose = require("mongoose");
        if (!mongoose.Types.ObjectId.isValid(item.productId)) {
          return res.status(400).json({
            message: `Your cart contains old or invalid products. Please clear your cart and try again.`,
          });
        }

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

      // Deduct stock for each ordered item
      for (const item of orderItems) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      }
      io.emit("newOrder", {
        message: "New order received!",
        orderId: order._id,
        totalAmount: order.totalAmount,
      });

      const user = await User.findById(userId);
      // Firebase push notification for new order
      if (user && user.fcmToken) {
        await getMessaging().send({
          token: user.fcmToken,
          notification: {
            title: "LUMÉRA Beauty - Order Placed",
            body: "Your order has been placed successfully.",
          },
        });
      }

      if (user && user.email) {
        await sendEmail(user.email, null, "order", {
          totalAmount: order.totalAmount,
          paymentMethod: order.paymentMethod,
          orderStatus: order.orderStatus,
        });
      }

      // Send email notification to Admin
      if (process.env.EMAIL_USER) {
        await sendEmail(process.env.EMAIL_USER, null, "admin-order", {
          totalAmount: order.totalAmount,
          paymentMethod: order.paymentMethod,
          orderStatus: order.orderStatus,
        });
      }

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
  // Get All Orders - Admin
  router.get("/", async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("user")
        .populate("items.product")
        .sort({ createdAt: -1 });

      res.status(200).json({
        orders,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch all orders",
        error: error.message,
      });
    }
  });
  // Generate Invoice
  router.get("/:id/invoice", async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate("user")
        .populate("items.product");

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      generateInvoice(order, res);
    } catch (error) {
      console.error("Invoice Generation Error:", error);

      res.status(500).json({
        message: "Failed to generate invoice",
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
        { new: true, runValidators: true },
      ).populate("items.product");

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      // Real-time website notification
      io.to(`user_${order.user}`).emit("orderStatusUpdated", {
        orderId: order._id,
        status: order.orderStatus,
        message: `Your order status has been updated to ${order.orderStatus}.`,
      });

      // Firebase push notification
      const user = await User.findById(order.user);

      if (user && user.fcmToken) {
        await getMessaging().send({
          token: user.fcmToken,
          notification: {
            title: "LUMÉRA Beauty - Order Update",
            body: `Your order status is now ${order.orderStatus}.`,
          },
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
      // Firebase push notification for cancelled order
      const user = await User.findById(order.user);

      if (user && user.fcmToken) {
        await getMessaging().send({
          token: user.fcmToken,
          notification: {
            title: "LUMÉRA Beauty - Order Cancelled",
            body: "Your LUMÉRA order has been cancelled.",
          },
        });
      }

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

  return router;
};
