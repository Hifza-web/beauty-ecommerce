"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { io } from "socket.io-client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isAdmin, authLoading } = useAuth();
  const router = useRouter();
  const [newOrder, setNewOrder] = useState<any>(null);
const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    console.log("AdminLayout useEffect is running! isLoggedIn:", isLoggedIn, "isAdmin:", isAdmin);

    if (!isAdmin) {
      router.replace("/");
      return; // Code ko yahan rokna zaroori hai
    }

    // Socket.io connection for Admin
    console.log("Attempting to connect to socket at http://localhost:5000...");
    const socket = io("http://localhost:5000", {
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("🟢 SUCCESS: Socket connected for Admin! ID:", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.log("🔴 ERROR: Socket connection failed!", error);
    });

    socket.on("newOrder", (data) => {
  console.log("New order notification:", data);
  setNewOrder(data);
  setShowOrderModal(true);
});

    return () => {
      socket.disconnect();
    };
  }, [authLoading, isLoggedIn, isAdmin, router]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f6f3]">
        <p className="text-sm text-[#927d77]">
          Checking admin access...
        </p>
      </div>
    );
  }

  if (!isLoggedIn || !isAdmin) {
    return null;
  }

  return (
  <>
    {children}

    {showOrderModal && newOrder && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="w-[90%] max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
          <div className="mb-4 text-4xl">🔔</div>

          <h2 className="mb-3 text-2xl font-semibold text-[#4b3838]">
            New Order
          </h2>

          <p className="mb-2 text-[#6f5b57]">
            {newOrder.message}
          </p>

          <p className="mb-6 text-lg font-semibold text-[#b65f67]">
            Amount: ${newOrder.totalAmount}
          </p>

          <button
            onClick={() => {
              setShowOrderModal(false);
              setNewOrder(null);
            }}
            className="rounded-lg bg-[#4b3838] px-8 py-3 text-sm font-medium text-white transition hover:bg-[#6b5050]"
          >
            OK
          </button>
        </div>
      </div>
    )}
  </>
);
}