"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setMessage("");
  setError("");

  if (!email) {
    setError("Please enter your email address");
    return;
  }

  try {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Something went wrong");
      return;
    }

    setMessage(data.message);
  } catch (error) {
    console.error("Forgot password error:", error);
    setError("Unable to connect to server");
  }
};

  return (
    <div className="min-h-screen bg-[#2a2030] flex items-center justify-center p-[24px] font-['Inter',sans-serif]">
      {/* Outer Card */}
      <div className="w-full max-w-[900px] bg-[#1e1826] rounded-[24px] flex flex-col md:flex-row overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.4)]">
        {/* LEFT - Image Panel */}
        <div className="hidden md:flex md:w-[60%] min-h-[520px] bg-[url('/beauty1.jpg')] bg-cover bg-[right_center] bg-no-repeat rounded-[18px] m-[12px] relative flex-col justify-between p-[20px]">
          {/* Top Row */}
          <div className="flex justify-between items-center">
            <span className="text-black font-[700] text-[18px] font-['Georgia',serif] tracking-[2px]">
              LUM
              <span className="text-[#d4a6b6]">É</span>RA
            </span>

            <Link
              href="/"
              className="bg-[rgba(255,255,255,0.2)] text-[#fff] px-[14px] py-[6px] rounded-[20px] text-[12px] no-underline backdrop-blur-[4px]"
            >
              Back to website →
            </Link>
          </div>
        </div>

        {/* RIGHT - Form Panel */}
        <div className="w-full md:w-[58%] p-[32px] md:p-[48px_44px] flex flex-col justify-center">
          <h1 className="text-[#ffffff] text-[30px] font-[700] mb-[8px]">
            Forgot your password?
          </h1>

          <p className="text-[#a89ab0] text-[14px] leading-[1.6] mb-[30px]">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-[13px_16px] mb-[16px] bg-[#2d2438] border-[1.5px] border-transparent rounded-[10px] text-[#fff] text-[14px] outline-none box-border"
            />

            {/* Error */}
            {error && (
              <p className="text-[#ff8f8f] text-[13px] mb-[14px]">
                {error}
              </p>
            )}

            {/* Success */}
            {message && (
              <p className="text-[#9ed6a8] text-[13px] leading-[1.5] mb-[14px]">
                {message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-[14px] bg-[#d7aba8] text-[#fff] border-none rounded-[10px] text-[15px] font-[600] cursor-pointer mb-[20px]"
            >
              Send Reset Link
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              href="/login"
              className="text-[#d4a8c4] text-[13px] underline"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
