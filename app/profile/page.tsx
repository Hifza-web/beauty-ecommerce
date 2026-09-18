"use client";

import { useEffect, useState } from "react";
import { User, MapPin, Phone, Mail, Package, Heart, LogOut } from "lucide-react";

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingAddress: {
    address: string;
    city: string;
    country: string;
  };
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    country: "Pakistan",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Unable to fetch profile");
          return;
        }

        const userData = data.user;

        setUser(userData);

        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          phone: userData.phone || "",
          address: userData.shippingAddress?.address || "",
          city: userData.shippingAddress?.city || "",
          country: userData.shippingAddress?.country || "Pakistan",
        });
      } catch (error) {
        console.error("Profile error:", error);
        setError("Unable to connect to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You are not logged in.");
      return;
    }

    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            country: formData.country,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update profile");
        return;
      }

      setUser(data.user);
      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Update profile error:", error);
      setError("Unable to connect to the server");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f6] px-6 py-20">
        <div className="mx-auto max-w-6xl text-center text-[#6f5a5a]">
          Loading profile...
        </div>
      </main>
    );
  }

  if (error && !user) {
    return (
      <main className="min-h-screen bg-[#faf7f6] px-6 py-20">
        <div className="mx-auto max-w-6xl text-center text-red-600">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf7f6] px-6 py-16">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#9b7777]">
            My Account
          </p>

          <h1 className="mt-3 text-4xl font-semibold text-[#4b3838] md:text-5xl">
            Welcome, {user?.firstName}
          </h1>

          <p className="mt-3 text-[#806b6b]">
            Manage your personal information and shipping details.
          </p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave}>

          {/* Personal Information */}
          <section className="rounded-3xl border border-[#eadbd9] bg-white p-8 shadow-[0_15px_50px_rgba(75,56,56,0.06)] md:p-10">

            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f1dfdd]">
                <User className="h-5 w-5 text-[#9b7777]" />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#4b3838]">
                  Personal Information
                </h2>

                <p className="text-sm text-[#8f7a7a]">
                  Update your basic account information.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#9b7777]">
                  First Name
                </label>

                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#dcc1bf] bg-white px-4 py-3 text-sm text-[#4b3838] outline-none transition focus:border-[#9b7777] focus:ring-1 focus:ring-[#9b7777]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#9b7777]">
                  Last Name
                </label>

                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#dcc1bf] bg-white px-4 py-3 text-sm text-[#4b3838] outline-none transition focus:border-[#9b7777] focus:ring-1 focus:ring-[#9b7777]"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#9b7777]">
                  <Mail className="h-3.5 w-3.5" />
                  Email Address
                </label>

                <input
                  value={user?.email || ""}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-[#eadbd9] bg-[#faf7f6] px-4 py-3 text-sm text-[#806b6b] outline-none"
                />

                <p className="mt-2 text-xs text-[#9a8585]">
                  Email address cannot be changed here.
                </p>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#9b7777]">
                  <Phone className="h-3.5 w-3.5" />
                  Phone Number
                </label>

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="03XX XXXXXXX"
                  className="w-full rounded-xl border border-[#dcc1bf] bg-white px-4 py-3 text-sm text-[#4b3838] outline-none transition focus:border-[#9b7777] focus:ring-1 focus:ring-[#9b7777]"
                />
              </div>

            </div>
          </section>

          {/* Address Book */}
          <section className="mt-8 rounded-3xl border border-[#eadbd9] bg-white p-8 shadow-[0_15px_50px_rgba(75,56,56,0.06)] md:p-10">

            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f1dfdd]">
                <MapPin className="h-5 w-5 text-[#9b7777]" />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#4b3838]">
                  Address Book
                </h2>

                <p className="text-sm text-[#8f7a7a]">
                  Save your shipping address for faster checkout.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#9b7777]">
                  Shipping Address
                </label>

                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House / Street / Area"
                  className="w-full rounded-xl border border-[#dcc1bf] bg-white px-4 py-3 text-sm text-[#4b3838] outline-none transition focus:border-[#9b7777] focus:ring-1 focus:ring-[#9b7777]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#9b7777]">
                  City
                </label>

                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Your city"
                  className="w-full rounded-xl border border-[#dcc1bf] bg-white px-4 py-3 text-sm text-[#4b3838] outline-none transition focus:border-[#9b7777] focus:ring-1 focus:ring-[#9b7777]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#9b7777]">
                  Country
                </label>

                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#dcc1bf] bg-white px-4 py-3 text-sm text-[#4b3838] outline-none transition focus:border-[#9b7777] focus:ring-1 focus:ring-[#9b7777]"
                />
              </div>

            </div>

            {error && (
              <p className="mt-6 text-sm text-red-600">
                {error}
              </p>
            )}

            {message && (
              <p className="mt-6 text-sm text-green-600">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="mt-8 rounded-full bg-[#4b3838] px-8 py-3.5 text-xs font-semibold tracking-[0.15em] text-white transition hover:-translate-y-1 hover:bg-[#6f5a5a] hover:shadow-lg"
            >
              SAVE CHANGES
            </button>

          </section>

        </form>

        {/* Quick Links */}
        <section className="mt-8 grid gap-4 md:grid-cols-3">

          <a
            href="/orders"
            className="flex items-center gap-4 rounded-2xl border border-[#eadbd9] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Package className="h-5 w-5 text-[#9b7777]" />

            <div>
              <h3 className="font-semibold text-[#4b3838]">
                My Orders
              </h3>

              <p className="text-sm text-[#8f7a7a]">
                View your orders
              </p>
            </div>
          </a>

          <a
            href="/wishlist"
            className="flex items-center gap-4 rounded-2xl border border-[#eadbd9] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Heart className="h-5 w-5 text-[#9b7777]" />

            <div>
              <h3 className="font-semibold text-[#4b3838]">
                My Wishlist
              </h3>

              <p className="text-sm text-[#8f7a7a]">
                View saved products
              </p>
            </div>
          </a>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-4 rounded-2xl border border-[#eadbd9] bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-lg"
          >
            <LogOut className="h-5 w-5 text-[#9b7777]" />

            <div>
              <h3 className="font-semibold text-[#4b3838]">
                Logout
              </h3>

              <p className="text-sm text-[#8f7a7a]">
                Sign out of your account
              </p>
            </div>
          </button>

        </section>

      </div>
    </main>
  );
}