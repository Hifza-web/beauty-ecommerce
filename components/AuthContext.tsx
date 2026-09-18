
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

type AuthContextType = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  authLoading: boolean;
  userId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("userId");

      if (token && storedUserId) {
        setIsLoggedIn(true);
        setUserId(storedUserId);

        try {
          const res = await api.get("/auth/profile");

          setIsAdmin(res.data.user?.isAdmin === true);
        } catch (error: any) {
          console.error("Failed to fetch user profile:", error);
          setIsAdmin(false);
          
          // Agar token expire ya invalid ho gaya hai, toh auto-logout kar do
          if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            setIsLoggedIn(false);
            setUserId(null);
          }
        }
      }

      setAuthLoading(false);
    };

    checkUser();
  }, []);

  const login = (token: string, id: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);

    setIsLoggedIn(true);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserId(null);

    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        authLoading,
        userId,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

