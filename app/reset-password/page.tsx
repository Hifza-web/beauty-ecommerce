"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
     const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
  e.preventDefault();

  setMessage("");
  setError("");

  if (!token) {
    setError("Invalid or missing reset token");
    return;
  }

  if (!password || !confirmPassword) {
    setError("Please fill in both password fields");
    return;
  }

  if (password.length < 8) {
    setError("Password must be at least 8 characters long");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Something went wrong");
      return;
    }

    setMessage(data.message);
  } catch (error) {
    console.error("Reset password error:", error);
    setError("Unable to connect to server");
  }
};
  return (
    <div className="min-h-screen bg-[#2a2030] flex items-center justify-center p-[24px] font-['Inter',sans-serif]">
      {/* Outer Card */}
      <div className="w-full max-w-[900px] bg-[#1e1826] rounded-[24px] flex flex-col md:flex-row overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.4)]">
        {/* LEFT - Image Panel */}
        <div className="hidden md:flex md:w-[60%] min-h-[520px] bg-[url('/beauty1.jpg')] bg-cover bg-[right_center] bg-no-repeat rounded-[18px] m-[12px] relative flex-col justify-between p-[20px]">
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
            Reset your password
          </h1>

          <p className="text-[#a89ab0] text-[14px] leading-[1.6] mb-[30px]">
            Enter your new password below.
          </p>

          <form onSubmit={handleResetPassword}>
            {/* New Password */}
            <div className="relative mb-[16px]">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={password}
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-[13px] pr-[44px] pl-[16px] bg-[#2d2438] border-[1.5px] border-transparent rounded-[10px] text-[#fff] text-[14px] outline-none box-border"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-[14px] top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#a89ab0] text-[16px]"
              >
                👁
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative mb-[18px]">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                minLength={8}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-[13px] pr-[44px] pl-[16px] bg-[#2d2438] border-[1.5px] border-transparent rounded-[10px] text-[#fff] text-[14px] outline-none box-border"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-[14px] top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#a89ab0] text-[16px]"
              >
                👁
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-[#ff8f8f] text-[13px] mb-[14px]">
                {error}
              </p>
            )}

            {/* Success */}
            {message && (
              <p className="text-[#9ed6a8] text-[13px] mb-[14px]">
                {message}
              </p>
            )}

            {/* Reset Button */}
            <button
              type="submit"
              className="w-full p-[14px] bg-[#d7aba8] text-[#fff] border-none rounded-[10px] text-[15px] font-[600] cursor-pointer mb-[20px]"
            >
              Reset Password
            </button>
          </form>

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