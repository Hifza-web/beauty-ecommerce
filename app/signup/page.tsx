"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleSignup = async () => {
    setMessage("");
    setError("");

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }
       if (password.length < 8) {
  setError("Password must be at least 8 characters long");
  return;
}
    if (!agreed) {
      setError("Please agree to the Terms & Conditions");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
        return;
      }

     router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("Signup error:", error);
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
        <div className="hidden md:flex md:w-[58%] min-h-[520px] bg-[url('/beauty1.jpg')] bg-cover bg-[right_center] bg-no-repeat rounded-[18px] m-[12px] relative flex-col justify-between p-[20px]">
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
        <div className="w-full md:w-[58%] p-[32px] md:p-[40px_44px] flex flex-col justify-center">
          <div className="w-[90%] mx-auto">
            <h1 className="text-[#ffffff] text-[30px] font-[700] mb-[6px]">
              Create an account
            </h1>
            <p className="text-[#a89ab0] text-[14px] mb-[30px]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#d4a8c4] underline"
              >
                Log in
              </Link>
            </p>

            {/* First + Last Name */}
            <div className="flex gap-[12px] mb-[14px]">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="flex-1 p-[13px_16px] bg-[#2d2438] border-[1.5px] border-[#d7aba8] rounded-[10px] text-[#fff] text-[14px] outline-none"
              />
            </div>
            <div className="flex gap-[12px] mb-[14px]">
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="flex-1 p-[13px_16px] bg-[#2d2438] border-[1.5px] border-transparent rounded-[10px] text-[#fff] text-[14px] outline-none"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-[13px_16px] mb-[14px] bg-[#2d2438] border-[1.5px] border-transparent rounded-[10px] text-[#fff] text-[14px] outline-none box-border"
            />

            {/* Password */}
            <div className="relative mb-[18px]">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                minLength={8}
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

            {/* Terms */}
            <div className="flex items-center gap-[10px] mb-[22px]">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="accent-[#d7aba8] w-[16px] h-[16px]"
              />
              <span className="text-[#a89ab0] text-[13px]">
                I agree to the{" "}
                <span className="text-[#d7aba8] underline cursor-pointer">
                  Terms & Conditions
                </span>
              </span>
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
            {/* Create Account Button */}
            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full p-[14px] bg-[#d7aba8] text-[#fff] border-none rounded-[10px] text-[15px] font-[600] cursor-pointer mb-[20px]"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
