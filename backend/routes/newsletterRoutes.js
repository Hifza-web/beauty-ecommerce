const express = require("express");
const Newsletter = require("../models/Newsletter");

const router = express.Router();

// Subscribe to newsletter
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const existingSubscriber = await Newsletter.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({
        message: "This email is already subscribed.",
      });
    }

    await Newsletter.create({ email });

    res.status(201).json({
      message: "Successfully subscribed to our newsletter!",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    res.status(500).json({
      message: "Failed to subscribe to newsletter",
      error: error.message,
    });
  }
});

module.exports = router;