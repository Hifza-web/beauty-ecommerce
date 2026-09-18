importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyARXvFARPLIHQgGT_-KLdaVGvS2tjzxTNI",
  authDomain: "lumera-beauty.firebaseapp.com",
  projectId: "lumera-beauty",
  storageBucket: "lumera-beauty.firebasestorage.app",
  messagingSenderId: "764028123463",
  appId: "1:764028123463:web:dad5a8eef399ffe723f462",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Background message received:",
    payload
  );

  const notificationTitle =
    payload.notification?.title || "LUMÉRA Beauty";

  const notificationOptions = {
    body:
      payload.notification?.body ||
      "You have a new notification from LUMÉRA.",
    icon: "/icon.png",
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});