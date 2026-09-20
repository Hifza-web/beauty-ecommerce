const express = require("express");
const Stripe = require("stripe");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe Checkout Session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const {
      userId,
      items,
      shippingAddress,
    } = req.body;

    if (!userId || !items || items.length === 0 || !shippingAddress) {
      return res.status(400).json({
        message: "userId, items and shippingAddress are required",
      });
    }

    const lineItems = [];
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const mongoose = require("mongoose");
      if (!mongoose.Types.ObjectId.isValid(item.id)) {
        return res.status(400).json({
          message: `Your cart contains old or invalid products. Please clear your cart and try again.`,
        });
      }

      const product = await Product.findById(item.id);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.id}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
        });
      }

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      });

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      totalAmount += product.price * item.quantity;
    }

    const frontendUrl = req.headers.origin || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: lineItems,

      mode: "payment",

      metadata: {
        userId: userId.toString(),
        orderItems: JSON.stringify(orderItems),
        totalAmount: totalAmount.toString(),
        shippingAddress: JSON.stringify(shippingAddress),
      },

      success_url:
        `${frontendUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url:
        `${frontendUrl}/checkout/failed`,
    });

    res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);

    res.status(500).json({
      message: "Failed to create Stripe checkout session",
      error: error.message,
    });
  }
});


// Verify Stripe Payment & Create Order
router.post("/verify-payment", async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        message: "sessionId is required",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        message: "Payment has not been completed",
      });
    }

    const existingOrder = await Order.findOne({
      stripeSessionId: session.id,
    });

    if (existingOrder) {
      return res.status(200).json({
        message: "Order already exists",
        order: existingOrder,
      });
    }

    const userId = session.metadata.userId;

    const orderItems = JSON.parse(session.metadata.orderItems);

    const shippingAddress = JSON.parse(
      session.metadata.shippingAddress
    );

    const totalAmount = Number(session.metadata.totalAmount);

    const order = await Order.create({
      user: userId,

      items: orderItems,

      totalAmount,

      shippingAddress,

      paymentMethod: "Card",

      paymentStatus: "Paid",

      orderStatus: "Processing",

      stripeSessionId: session.id,
    });
    

const user = await User.findById(userId);

if (user && user.email) {
  // Send email to Customer
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
      message: "Payment verified and order created successfully",
      order,
    });
  } catch (error) {
    console.error("Payment Verification Error:", error);

    res.status(500).json({
      message: "Failed to verify payment",
      error: error.message,
    });
  }
});

module.exports = router;