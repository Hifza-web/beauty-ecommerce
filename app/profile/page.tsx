"use client";

import { useEffect, useState } from "react";

type User = {
  firstName: string;
  lastName: string;
  email: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Unable to fetch profile");
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error("Profile error:", error);
        setError("Unable to connect to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome, {user?.firstName}!</h1>

      <p>
        <strong>First Name:</strong> {user?.firstName}
      </p>

      <p>
        <strong>Last Name:</strong> {user?.lastName}
      </p>

      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
  style={{
    marginTop: "20px",
    padding: "12px 24px",
    backgroundColor: "#d7aba8",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  }}
>
  Logout
</button>
    </div>
  );
}