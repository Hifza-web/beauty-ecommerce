const { initializeApp, getApps, cert } = require("firebase-admin/app");
const path = require("path");

const serviceAccount = require(
  path.join(__dirname, "lumera-beauty-firebase-adminsdk-fbsvc-b2dca09fbd.json")
);

// Agar app pehle se initialize nahi hui, toh ab karo
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

// Naye tareeqay mein admin object export karne ki zaroorat nahi hoti
module.exports = {};
