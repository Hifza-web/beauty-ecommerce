const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (email, token, type = "verify") => {
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
    url = `http://localhost:3000/reset-password?token=${token}`;
  } else {
    emailSubject = "Verify your LUMÉRA account";
    emailTitle = "Welcome to LUMÉRA!";
    emailMessage = "Please click the button below to verify your email.";
    buttonText = "Verify Email";
    url = `http://localhost:3000/verify-email?token=${token}`;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: emailSubject,
      html: `
        <h2>${emailTitle}</h2>

        <p>${emailMessage}</p>

        ${
          type === "code"
            ? "<p>This code will expire in 1 minute.</p>"
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
          : "Verification email sent successfully!"
    );
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw error;
  }
};

module.exports = sendEmail;