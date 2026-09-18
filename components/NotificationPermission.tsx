"use client";

import { useEffect } from "react";
import { requestNotificationPermission , listenForForegroundNotifications  } from "@/lib/firebase-messaging";
import { useAuth } from "@/components/AuthContext";

export default function NotificationPermission() {
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) {
      return;
    }

    const setupNotifications = async () => {
      await requestNotificationPermission(userId);
       listenForForegroundNotifications();
    };

    setupNotifications();
  }, [userId]);

  return null;
}