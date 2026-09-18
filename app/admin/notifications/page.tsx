"use client";

import { useState } from "react";
import api from "@/lib/api";
import { Bell, Send } from "lucide-react";

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

 const handleSendNotification = async () => {
  try {
    if (!title.trim() || !message.trim()) {
      alert("Please enter notification title and message.");
      return;
    }

    const usersResponse = await api.get("/admin/users");

    const users = usersResponse.data.users || [];

    const tokens = users
      .map((user: any) => user.fcmToken)
      .filter((token: string) => token);

    if (tokens.length === 0) {
      alert("No customers have notification tokens.");
      return;
    }

    const response = await api.post("/notifications/send", {
      title,
      message,
      tokens,
    });

    alert(response.data.message);

    setTitle("");
    setMessage("");
  } catch (error: any) {
    console.error("Send notification error:", error);

    alert(
      error.response?.data?.message ||
        "Failed to send notification."
    );
  }
};

  return (
    <div className="min-h-screen bg-[#f8f6f3] text-[#403633]">
      <main className="mx-auto max-w-4xl px-6 py-10 md:px-10">
        {/* HEADER */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b4676d]">
            LUMÉRA BEAUTY
          </p>

          <h1 className="mt-2 font-[Marcellus] text-4xl">
            Notifications
          </h1>

          <p className="mt-2 text-sm text-[#887771]">
            Send promotional notifications to your customers.
          </p>
        </div>

        {/* NOTIFICATION FORM */}
        <div className="rounded-2xl border border-[#e6ddd8] bg-white p-6 shadow-[0_5px_25px_rgba(70,50,45,0.035)] md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3e6e2]">
              <Bell className="h-5 w-5 text-[#b4676d]" />
            </div>

            <div>
              <h2 className="font-[Marcellus] text-2xl">
                Create Notification
              </h2>

              <p className="text-xs text-[#927d77]">
                Create a message for your customers.
              </p>
            </div>
          </div>

          {/* TITLE */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium">
              Notification Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. New Beauty Collection"
              className="w-full rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none transition focus:border-[#b4676d]"
            />
          </div>

          {/* MESSAGE */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Notification Message
            </label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Discover our latest beauty products..."
              rows={5}
              className="w-full resize-none rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none transition focus:border-[#b4676d]"
            />
          </div>

          {/* SEND BUTTON */}
          <button
            onClick={handleSendNotification}
            className="flex items-center gap-2 rounded-xl bg-[#453633] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#b65f67]"
          >
            <Send className="h-4 w-4" />
            Send Notification
          </button>
        </div>
      </main>
    </div>
  );
}