"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function VerifyEmailContent() {
  const searchParams = useSearchParams();

  const [email, setEmail] = useState(
    searchParams.get("email") || ""
  );
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleCodeChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

 const handleVerify = async (e: React.FormEvent) => {
  e.preventDefault();

  setMessage("");
  setError("");

  if (!email) {
    setError("Please enter your email address");
    return;
  }

  const verificationCode = code.join("");

  if (verificationCode.length !== 6) {
    setError("Please enter the 6-digit verification code");
    return;
  }

  try {
    const response = await fetch(
      "/api/auth/verify-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: verificationCode,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Email verification failed");
      return;
    }

    setMessage(data.message);
  } catch (error) {
    console.error("Verification error:", error);
    setError("Unable to connect to the server");
  }
};

const handleResend = async () => {
  setMessage("");
  setError("");

  try {
    const response = await fetch(
      "/api/auth/resend-code",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Failed to resend verification code");
      return;
    }

    setCode(["", "", "", "", "", ""]);
    setTimeLeft(60);
    setMessage(data.message);

    inputRefs.current[0]?.focus();
  } catch (error) {
    console.error("Resend code error:", error);
    setError("Unable to connect to the server");
  }
};

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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
            Verify your email
          </h1>
 
          <p className="text-[#a89ab0] text-[14px] leading-[1.6] mb-[28px]">
            Enter the 6-digit code we sent to your email.
          </p>
 
          <form onSubmit={handleVerify}>
            {/* Email */}
            <label className="block text-[#ffffff] text-[13px] mb-[8px]">
              Email
            </label>
 
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-[13px_16px] mb-[22px] bg-[#2d2438] border-[1.5px] border-transparent rounded-[10px] text-[#fff] text-[14px] outline-none box-border"
            />
 
            {/* Verification Code */}
            <label className="block text-[#ffffff] text-[13px] mb-[10px]">
              Verification code
            </label>
 
            <div className="flex gap-[9px] mb-[22px]">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleCodeChange(e.target.value, index)
                  }
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-[48px] h-[52px] text-center bg-[#2d2438] border-[1.5px] border-transparent rounded-[10px] text-[#fff] text-[18px] font-[600] outline-none"
                />
              ))}
            </div>
 
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
 
            {/* Verify Button */}
            <button
              type="submit"
              className="w-full p-[14px] bg-[#d7aba8] text-[#fff] border-none rounded-[10px] text-[15px] font-[600] cursor-pointer mb-[18px]"
            >
              Verify Email
            </button>
 
            {/* Timer */}
            {timeLeft > 0 && (
              <p className="text-center text-[#a89ab0] text-[13px] mb-[12px]">
                Code expires in{" "}
                <span className="text-[#d7aba8] font-[600]">
                  {formatTime()}
                </span>
              </p>
            )}
 
            {/* Resend */}
            {timeLeft <= 0 && (
              <button
                type="button"
                onClick={handleResend}
                className="w-full bg-transparent border-none text-[#d4a8c4] text-[13px] underline cursor-pointer mb-[18px]"
              >
                Resend verification code
              </button>
            )}
          </form>
 
          {/* Login */}
          <div className="text-center text-[#a89ab0] text-[13px]">
            Already verified?{" "}
            <Link
              href="/login"
              className="text-[#d4a8c4] underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#2a2030] flex items-center justify-center p-[24px] text-[#a89ab0]">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
