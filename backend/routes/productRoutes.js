const express = require("express");
const Product = require("../models/Product");
const upload = require("../utils/upload");

const router = express.Router();

// Create Product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
});
// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});
// Search Products
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    });

    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to search products",
      error: error.message,
    });
  }
});
// Filter Products by Category
// Filter Products
router.get("/filter", async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;

    const filter = {};

    // Category filter
    if (category) {
      filter.category = {
        $regex: `^${category}$`,
        $options: "i",
      };
    }

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const products = await Product.find(filter);

    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to filter products",
      error: error.message,
    });
  }
});
// Upload Product Image
router.post("/upload-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }

    res.status(200).json({
      message: "Image uploaded successfully",
      image: `/uploads/products/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to upload image",
      error: error.message,
    });
  }
});
// Get Single Product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
});
// Update Product
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
});
// Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
});


module.exports = router;