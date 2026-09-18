import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyARXvFARPLIHQgGT_-KLdaVGvS2tjzxTNI",
  authDomain: "lumera-beauty.firebaseapp.com",
  projectId: "lumera-beauty",
  storageBucket: "lumera-beauty.firebasestorage.app",
  messagingSenderId: "764028123463",
  appId: "1:764028123463:web:dad5a8eef399ffe723f462",
  measurementId: "G-V7QVCMTHGC",
};

const app = initializeApp(firebaseConfig);

export const getFirebaseMessaging = async () => {
  if (typeof window === "undefined") {
    return null;
  }

  const supported = await isSupported();

  if (!supported) {
    return null;
  }

  return getMessaging(app);
};

export default app;