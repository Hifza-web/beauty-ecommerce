const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();

// Sync Local Cart to Backend
router.post("/sync", async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !Array.isArray(items)) {
      return res.status(400).json({ message: "userId and items array are required" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Merge logic
    for (const localItem of items) {
      const productId = localItem.id; // frontend sends 'id'
      const quantity = localItem.quantity;
      
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          product: productId,
          quantity: quantity
        });
      }
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      message: "Cart synced successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to sync cart",
      error: error.message,
    });
  }
});

// Add Product to Cart
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        message: "userId and productId are required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          product: productId,
          quantity,
        });
      }

      await cart.save();
    }

    await cart.populate("items.product");

    res.status(200).json({
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add product to cart",
      error: error.message,
    });
  }
});
// Get User Cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.params.userId,
    }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        cart: { items: [] },
      });
    }

    res.status(200).json({
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
});
// Update Cart Item Quantity
router.put("/update", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity === undefined) {
      return res.status(400).json({
        message: "userId, productId and quantity are required",
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.product && item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    item.quantity = quantity;

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      message: "Cart quantity updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update cart quantity",
      error: error.message,
    });
  }
});
// Remove Product from Cart
router.delete("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        message: "userId and productId are required",
      });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const itemExists = cart.items.some(
      (item) => item.product.toString() === productId
    );

    if (!itemExists) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      message: "Product removed from cart successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove product from cart",
      error: error.message,
    });
  }
});
// Clear Cart
router.delete("/clear/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to clear cart",
      error: error.message,
    });
  }
});

module.exports = router;