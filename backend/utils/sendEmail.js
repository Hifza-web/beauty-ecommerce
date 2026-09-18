const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (
  email,
  token,
  type = "verify",
  orderDetails = null
) => {
  let emailSubject;
  let emailTitle;
  let emailMessage;
  let buttonText;
  let url;

  if (type === "code") {
    emailSubject = "Your LUMÉRA verification code";
    emailTitle = "Verify your LUMÉRA account";
    emailMessage = `Your verification code is: <strong>${token}</strong>`;
  } else if (type === "reset") {
    emailSubject = "Reset your LUMÉRA password";
    emailTitle = "Reset Your Password";
    emailMessage = "Click the button below to reset your LUMÉRA password.";
    buttonText = "Reset Password";

    const clientUrl =
      process.env.FRONTEND_URL || "http://localhost:3000";

    url = `${clientUrl}/reset-password?token=${token}`;
  } else if (type === "order") {
    emailSubject = "LUMÉRA - Order Confirmation";
    emailTitle = "Thank you for your order!";

    emailMessage = `
      <p>Your LUMÉRA order has been successfully placed.</p>

      <p>
        <strong>Order Total:</strong>
        $${orderDetails?.totalAmount?.toFixed(2) || "0.00"}
      </p>

      <p>
        <strong>Payment Method:</strong>
        ${orderDetails?.paymentMethod || "Cash on Delivery"}
      </p>

      <p>
        <strong>Order Status:</strong>
        ${orderDetails?.orderStatus || "Processing"}
      </p>

      <p>
        We have received your order and will process it shortly.
      </p>
    `;
  } else if (type === "admin-contact") {
    emailSubject = `New Contact Inquiry: ${orderDetails?.subject}`;
    emailTitle = "New Contact Form Submission";
    emailMessage = `
      <p>You have received a new message from <strong>${orderDetails?.firstName} ${orderDetails?.lastName}</strong> (${orderDetails?.email}).</p>
      <p><strong>Subject:</strong> ${orderDetails?.subject}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #9b7777; padding-left: 10px; color: #555;">
        ${orderDetails?.message}
      </blockquote>
    `;
  } else if (type === "admin-order") {
    emailSubject = "New Order Received!";
    emailTitle = "New Order Notification";
    emailMessage = `
      <p>A new order has been placed on LUMÉRA.</p>
      <p><strong>Order Total:</strong> $${orderDetails?.totalAmount?.toFixed(2) || "0.00"}</p>
      <p><strong>Payment Method:</strong> ${orderDetails?.paymentMethod}</p>
      <p>Please check the admin dashboard for more details.</p>
    `;
  } else {
    emailSubject = "Verify your LUMÉRA account";
    emailTitle = "Welcome to LUMÉRA!";
    emailMessage =
      "Please click the button below to verify your email.";
    buttonText = "Verify Email";

    const clientUrl =
      process.env.FRONTEND_URL || "http://localhost:3000";

    url = `${clientUrl}/verify-email?token=${token}`;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: emailSubject,
      html: `
        <h2>${emailTitle}</h2>

        ${emailMessage}

        ${
          type === "code"
            ? "<p>This code will expire in 1 minute.</p>"
            : type === "order"
              ? `
                <p style="margin-top: 25px;">
                  Thank you for choosing <strong>LUMÉRA BEAUTY</strong>.
                </p>
              `
              : (type === "admin-contact" || type === "admin-order")
                ? ""
                : `
                <a
                  href="${url}"
                  style="
                    display: inline-block;
                    padding: 12px 20px;
                    background-color: #9b7777;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                  "
                >
                  ${buttonText}
                </a>

                ${
                  type === "reset"
                    ? "<p>This password reset link will expire in 15 minutes.</p>"
                    : ""
                }
              `
        }
      `,
    });

    console.log(
      type === "code"
        ? "Verification code email sent successfully!"
        : type === "reset"
          ? "Password reset email sent successfully!"
          : type === "order"
            ? "Order confirmation email sent successfully!"
            : (type === "admin-contact" || type === "admin-order")
              ? "Admin notification email sent successfully!"
              : "Verification email sent successfully!"
    );
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw error;
  }
};

module.exports = sendEmail;