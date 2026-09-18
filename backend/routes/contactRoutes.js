const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      subject,
      message,
    } = req.body;

    // Check required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Save contact message
    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      subject,
      message,
    });

    // Send email notification to Admin
    const sendEmail = require("../utils/sendEmail");
    if (process.env.EMAIL_USER) {
      await sendEmail(process.env.EMAIL_USER, null, "admin-contact", {
        firstName,
        lastName,
        email,
        subject,
        message,
      });
    }

    res.status(201).json({
      message: "Your message has been sent successfully",
      contact: {
        id: contact._id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
      },
    });
  } catch (error) {
    console.error("Contact form error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;