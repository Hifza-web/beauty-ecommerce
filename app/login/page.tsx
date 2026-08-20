"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    setMessage("");
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }
       localStorage.setItem("token", data.token);
      setMessage("Login successful!");

      console.log("Login response:", data);
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
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
          <h1 className="text-[#ffffff] text-[30px] font-[700] mb-[6px]">
            Welcome back
          </h1>
          <p className="text-[#a89ab0] text-[14px] mb-[30px]">
            Log in to your LUMÉRA account.{" "}
            <Link
              href="/signup"
              className="text-[#d4a8c4] underline"
            >
              Sign up
            </Link>
          </p>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-[13px_16px] mb-[14px] bg-[#2d2438] border-[1.5px] border-transparent rounded-[10px] text-[#fff] text-[14px] outline-none box-border"
          />

          {/* Password */}
          <div className="relative mb-[10px]">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-[13px] pr-[44px] pl-[16px] bg-[#2d2438] border-[1.5px] border-transparent rounded-[10px] text-[#fff] text-[14px] outline-none box-border"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[14px] top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#a89ab0] text-[16px]"
            >
              👁
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-[24px]">
            <Link
              href="/forgot-password"
              className="text-[#d4a8c4] text-[13px] no-underline"
            >
              Forgot password?
            </Link>
          </div>
          {error && (
            <p className="text-[#ff8f8f] text-[13px] mb-[14px]">
              {error}
            </p>
          )}

          {message && (
            <p className="text-[#9ed6a8] text-[13px] mb-[14px]">
              {message}
            </p>
          )}
          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full p-[14px] bg-[#d7aba8] text-[#fff] border-none rounded-[10px] text-[15px] font-[600] cursor-pointer mb-[20px]"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
