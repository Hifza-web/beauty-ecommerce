const express = require("express");
const mongoose = require("mongoose");
const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

const router = express.Router();

// Sync Local Wishlist to Backend
router.post("/sync", async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !Array.isArray(items)) {
      return res.status(400).json({ message: "userId and items array are required" });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    // Merge logic
    for (const localItem of items) {
      const productId = localItem.id;
      
      const alreadyExists = wishlist.products.some(
        (id) => id.toString() === productId
      );

      if (!alreadyExists) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();
    await wishlist.populate("products");

    res.status(200).json({
      message: "Wishlist synced successfully",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to sync wishlist",
      error: error.message,
    });
  }
});

// Add Product to Wishlist
router.post("/add", async (req, res) => {
  try {
    const { userId, productId } = req.body;

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

    let wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $addToSet: { products: productId } },
      { new: true, upsert: true }
    ).populate("products");

    res.status(200).json({
      message: "Product added to wishlist successfully",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add product to wishlist",
      error: error.message,
    });
  }
});
// Get User Wishlist
router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      user: req.params.userId,
    }).populate("products");

    if (!wishlist) {
      return res.status(200).json({
        wishlist: { products: [] },
      });
    }

    res.status(200).json({
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch wishlist",
      error: error.message,
    });
  }
});
// Remove Product from Wishlist
router.delete("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        message: "userId and productId are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid userId or productId" });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { products: productId } },
      { new: true }
    ).populate("products");

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json({
      message: "Product removed from wishlist successfully",
      wishlist,
    });
  } catch (error) {
    console.error("wishlistRoutes REMOVE Error:", error);
    res.status(500).json({
      message: "Failed to remove product from wishlist",
      error: error.message,
    });
  }
});
// Clear Wishlist
router.delete("/clear/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      user: req.params.userId,
    });

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist not found",
      });
    }

    wishlist.products = [];

    await wishlist.save();

    res.status(200).json({
      message: "Wishlist cleared successfully",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to clear wishlist",
      error: error.message,
    });
  }
});

module.exports = router;