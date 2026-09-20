const express = require("express");
const router = express.Router();
// Purana admin nikal dein aur naya getMessaging add karein
const { getMessaging } = require("firebase-admin/messaging");
require("../config/firebaseAdmin"); // Sirf initialize karne ke liye
const User = require("../models/User");


router.post("/save-token", async (req, res) => {
  try {
    const { userId, token } = req.body;

    if (!userId || !token) {
      return res.status(400).json({
        message: "User ID and token are required.",
      });
    }

    await User.findByIdAndUpdate(userId, {
      fcmToken: token,
    });

    return res.status(200).json({
      message: "FCM token saved successfully.",
    });
  } catch (error) {
    console.error("Save FCM token error:", error);

    return res.status(500).json({
      message: "Failed to save FCM token.",
    });
  }
});

// Send notification to one or multiple customers
router.post("/send", async (req, res) => {
  try {
    const { title, message, tokens } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        message: "Notification title and message are required.",
      });
    }

    if (!tokens || !Array.isArray(tokens) || tokens.length === 0) {
      return res.status(400).json({
        message: "No customer notification tokens found.",
      });
    }

    let response = { successCount: 0, failureCount: tokens.length };
    try {
      response = await getMessaging().sendEachForMulticast({
        tokens,
        notification: {
          title,
          body: message,
        },
      });
    } catch (firebaseErr) {
      console.warn("Firebase notification sending failed (non-critical):", firebaseErr.message);
    }

    return res.status(200).json({
      message: "Notification processing completed.",
      successCount: response.successCount,
      failureCount: response.failureCount,
    });
  } catch (error) {
    console.error("Notification error:", error);

    return res.status(500).json({
      message: "Failed to send notification.",
      error: error.message,
    });
  }
});

module.exports = router;