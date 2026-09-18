"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import socket from "@/lib/socket";

export default function SocketTest() {
  const { userId } = useAuth();
  useEffect(() => {
    if (userId) {
  socket.emit("joinUserRoom", userId);
}
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("notification", (message) => {
      console.log("Real-time notification:", message);
    });
    socket.on("newOrder", (data) => {
  console.log("New order notification:", data.message);
});
socket.on("orderStatusUpdated", (data) => {
  console.log("Order status updated:", data.message);
});

    return () => {
      socket.off("connect");
      socket.off("notification");
       socket.off("newOrder");
       socket.off("orderStatusUpdated");
    };
  }, [userId]);

  const sendTestNotification = () => {
    socket.emit("sendNotification", "New order received!");
  };

  return (
    <button
      onClick={sendTestNotification}
      className="fixed bottom-5 right-5 z-50 rounded-full bg-[#b65f67] px-5 py-3 text-sm font-medium text-white shadow-lg"
    >
      Test Notification
    </button>
  );
}