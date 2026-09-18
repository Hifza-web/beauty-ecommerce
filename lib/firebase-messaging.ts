import { getToken, onMessage } from "firebase/messaging";
import { getFirebaseMessaging } from "./firebase";
import api from "@/lib/api";

export const requestNotificationPermission = async (userId: string) => {
  try {
    if (typeof window === "undefined") {
      return null;
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission was not granted.");
      return null;
    }

    const messaging = await getFirebaseMessaging();

    if (!messaging) {
      console.log("Firebase Messaging is not supported.");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey:
        "BLCv2HuTVSt1tJns4YbA5PLbHPHQneZTeoj1sDyTMdFA5IuFsrVOzV_l33WU7sl1P-aieyNK11MV4D2mFLoG5_s",
    });

    console.log("FCM Token:", token);

    if (token && userId) {
      await api.post("/notifications/save-token", {
        userId,
        token,
      });

      console.log("FCM token saved to database.");
    }

    return token;
  } catch (error) {
    console.error("Failed to get notification permission:", error);
    return null;
  }
};

// Yeh dekhein, naya function bilkul alag (bahar) hai
export const listenForForegroundNotifications = async () => {
  try {
    const messaging = await getFirebaseMessaging();
    if (messaging) {
      onMessage(messaging, (payload) => {
        console.log("Foreground message received:", payload);
        
        if (Notification.permission === "granted" && payload.notification) {
          navigator.serviceWorker.getRegistration().then((registration) => {
            if (registration) {
              registration.showNotification(payload.notification.title || "Notification", {
                body: payload.notification.body,
              });
            } else {
              new Notification(payload.notification.title || "Notification", {
                body: payload.notification.body,
              });
            }
          });
        }
      });
    }
  } catch (error) {
    console.error("Error setting up foreground listener:", error);
  }
};
