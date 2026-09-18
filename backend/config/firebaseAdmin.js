const { initializeApp, getApps, cert } = require("firebase-admin/app");
const path = require("path");
const fs = require("fs");

let serviceAccount = null;

try {
  const jsonPath = path.join(__dirname, "lumera-beauty-firebase-adminsdk-fbsvc-b2dca09fbd.json");
  if (fs.existsSync(jsonPath)) {
    serviceAccount = require(jsonPath);
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    console.warn("No Firebase Service Account found. Notifications may not work.");
  }
} catch (error) {
  console.error("Error loading Firebase credentials:", error.message);
}

// Agar app pehle se initialize nahi hui, toh ab karo
if (!getApps().length && serviceAccount) {
  try {
    initializeApp({
      credential: cert(serviceAccount),
    });
  } catch (error) {
    console.error("Firebase init failed:", error.message);
  }
}

// Naye tareeqay mein admin object export karne ki zaroorat nahi hoti
module.exports = {};
