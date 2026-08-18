"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#2a2030",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Outer Card */}
      <div style={{
        width: "100%",
        maxWidth: "900px",
        backgroundColor: "#1e1826",
        borderRadius: "24px",
        display: "flex",
        overflow: "hidden",
        boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
      }}>

        {/* LEFT - Image Panel */}
      <div style={{
          width: "58%",
          minHeight: "520px",
          backgroundImage: "url('/beauty1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          borderRadius: "18px",
          margin: "12px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px",
          
        }}>
          {/* Top Row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "black", fontWeight: "700", fontSize: "18px", fontFamily: "Georgia, serif", letterSpacing: "2px" }}>
              LUM
              <span className="text-[#d4a6b6]">É</span>RA
            </span>
            <Link href="/" style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#fff",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              textDecoration: "none",
              backdropFilter: "blur(4px)",
            }}>
              Back to website →
            </Link>
          </div>
        </div>

        {/* RIGHT - Form Panel */}
        <div style={{
          width: "58%",
          padding: "40px 44px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
            <div style={{
    width: "90%",
    margin: "0 auto",
  }}>
          <h1 style={{ color: "#ffffff", fontSize: "30px", fontWeight: "700", marginBottom: "6px" }}>
            Create an account
          </h1>
          <p style={{ color: "#a89ab0", fontSize: "14px", marginBottom: "30px" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#d4a8c4", textDecoration: "underline" }}>Log in</Link>
          </p>

          {/* First + Last Name */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{
                flex: 1, padding: "13px 16px",
                backgroundColor: "#2d2438", border: "1.5px solid #d7aba8",
                borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none",
              }}
            />
          </div>
           <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{
                flex: 1, padding: "13px 16px",
                backgroundColor: "#2d2438", border: "1.5px solid transparent",
                borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none",
              }}
            />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%", padding: "13px 16px", marginBottom: "14px",
              backgroundColor: "#2d2438", border: "1.5px solid transparent",
              borderRadius: "10px", color: "#fff", fontSize: "14px",
              outline: "none", boxSizing: "border-box",
            }}
          />

          {/* Password */}
          <div style={{ position: "relative", marginBottom: "18px" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%", padding: "13px 44px 13px 16px",
                backgroundColor: "#2d2438", border: "1.5px solid transparent",
                borderRadius: "10px", color: "#fff", fontSize: "14px",
                outline: "none", boxSizing: "border-box",
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute", right: "14px", top: "50%",
                transform: "translateY(-50%)", background: "none",
                border: "none", cursor: "pointer", color: "#a89ab0", fontSize: "16px",
              }}
            >
              👁
            </button>
          </div>

          {/* Terms */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ accentColor: "#d7aba8", width: "16px", height: "16px" }}
            />
            <span style={{ color: "#a89ab0", fontSize: "13px" }}>
              I agree to the{" "}
              <span style={{ color: "#d7aba8", textDecoration: "underline", cursor: "pointer" }}>
                Terms & Conditions
              </span>
            </span>
          </div>

          {/* Create Account Button */}
          <button style={{
            width: "100%", padding: "14px",
            backgroundColor: "#d7aba8", color: "#fff",
            border: "none", borderRadius: "10px",
            fontSize: "15px", fontWeight: "600", cursor: "pointer",
            marginBottom: "20px",
          }}>
            Create account
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
