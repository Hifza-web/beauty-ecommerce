"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {useEffect, useState } from "react";
import { Lock, Truck, CreditCard, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { userId } = useAuth();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("cod"); // Changed default to COD for Week 2
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
    useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await fetch("/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) return;

        const user = data.user;

        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
        setAddress(user.shippingAddress?.address || "");
        setCity(user.shippingAddress?.city || "");
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, []);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!userId) {
      setErrorMsg("You must be logged in to place an order.");
      router.push("/login?redirect=/checkout");
      return;
    }

    if (cart.length === 0) {
      setErrorMsg("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        userId,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          fullName: `${firstName} ${lastName}`.trim(),
          address,
          city,
          postalCode,
          phone, // Add phone if backend order schema gets updated, or just append to address
        },
        paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Card",
      };
      if (paymentMethod === "card") {
        const stripeRes = await api.post("/stripe/create-checkout-session", {
          userId,
          items: cart,
          shippingAddress: {
            fullName: `${firstName} ${lastName}`.trim(),
            address,
            city,
            postalCode,
            phone,
          },
        });

        if (stripeRes.data.url) {
          window.location.href = stripeRes.data.url;
          return;
        }
      }
      const res = await api.post("/orders/create", orderPayload);

      if (res.status === 201 || res.status === 200) {
        clearCart(); // Empties frontend & backend cart
        router.push("/checkout/success");
      }
    } catch (err: any) {
      console.error("Order creation failed:", err);
      setErrorMsg(err.response?.data?.message || "Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#fcf9f6] text-[#453633]">
          <section className="border-b border-[#e7dcd7] bg-[#f3e7e2]">
            <div className="mx-auto max-w-7xl px-6 py-16 text-center md:px-10 md:py-20">
              <p className="text-xs uppercase tracking-[0.35em] text-[#b65f67]">
                LUMÉRA BEAUTY
              </p>

              <h1 className="mt-4 font-[Marcellus] text-5xl font-light md:text-6xl">
                Checkout
              </h1>
            </div>
          </section>

          <section className="flex min-h-[500px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f3e7e2]">
              <ShoppingBag className="h-8 w-8 text-[#b65f67]" />
            </div>

            <h2 className="mt-7 font-[Marcellus] text-4xl">
              Your cart is empty
            </h2>

            <p className="mt-3 max-w-md text-[#927d77]">
              Add some beauty essentials before continuing to checkout.
            </p>

            <Link
              href="/shop"
              className="mt-8 rounded-full bg-[#453633] px-8 py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-[#b65f67]"
            >
              Continue Shopping
            </Link>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fcf9f6] text-[#453633]">
        {/* HEADER */}
        <section className="border-b border-[#e7dcd7] bg-[#f3e7e2]">
          <div className="mx-auto max-w-7xl px-6 py-16 text-center md:px-10 md:py-20">
            <p className="text-sm uppercase tracking-[0.3em] text-[#b65f67] font-bold">
              LUMÉRA BEAUTY
            </p>

            <h1 className="mt-4 font-[Marcellus] text-5xl font-light md:text-6xl">
              Checkout
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#806e68]">
              Complete your details and place your beauty order.
            </p>
          </div>
        </section>

        {/* CHECKOUT */}
        <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
          {errorMsg && (
            <div className="mb-8 rounded-xl bg-red-50 p-4 text-center text-sm font-medium text-red-600">
              {errorMsg}
            </div>
          )}
          <form
            className="grid gap-12 lg:grid-cols-[1fr_380px]"
            onSubmit={handlePlaceOrder}
          >
            {/* LEFT */}
            <div className="space-y-10">
              {/* CONTACT */}
              <section className="rounded-2xl border border-[#e7dcd7] bg-white p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3e7e2] text-sm">
                    1
                  </div>

                  <h2 className="font-[Marcellus] text-2xl">
                    Contact Information
                  </h2>
                </div>

                <div className="mt-7">
                  <label className="text-xs uppercase tracking-[0.15em] text-[#806e68] font-bold">
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="mt-2 w-full rounded-xl border border-[#d8c4bd] bg-[#fcf9f6] px-4 py-3.5 text-sm outline-none transition focus:border-[#b65f67]"
                  />
                </div>
              </section>

              {/* SHIPPING */}
              <section className="rounded-2xl border border-[#e7dcd7] bg-white p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3e7e2] text-sm">
                    2
                  </div>

                  <h2 className="font-[Marcellus] text-2xl">
                    Shipping Address
                  </h2>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-[#806e68] font-bold">
                      First Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="mt-2 w-full rounded-xl border border-[#d8c4bd] bg-[#fcf9f6] px-4 py-3.5 text-sm outline-none transition focus:border-[#b65f67]"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-[#806e68] font-bold">
                      Last Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="mt-2 w-full rounded-xl border border-[#d8c4bd] bg-[#fcf9f6] px-4 py-3.5 text-sm outline-none transition focus:border-[#b65f67]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs uppercase tracking-[0.15em] text-[#806e68] font-bold">
                      Address <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street address"
                      className="mt-2 w-full rounded-xl border border-[#d8c4bd] bg-[#fcf9f6] px-4 py-3.5 text-sm outline-none transition focus:border-[#b65f67]"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-[#806e68] font-bold">
                      City <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="mt-2 w-full rounded-xl border border-[#d8c4bd] bg-[#fcf9f6] px-4 py-3.5 text-sm outline-none transition focus:border-[#b65f67]"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-[#806e68] font-bold">
                      Postal Code <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="Postal code"
                      className="mt-2 w-full rounded-xl border border-[#d8c4bd] bg-[#fcf9f6] px-4 py-3.5 text-sm outline-none transition focus:border-[#b65f67]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs uppercase tracking-[0.15em] text-[#806e68] font-bold">
                      Phone Number <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 0000000"
                      className="mt-2 w-full rounded-xl border border-[#d8c4bd] bg-[#fcf9f6] px-4 py-3.5 text-sm outline-none transition focus:border-[#b65f67]"
                    />
                  </div>
                </div>
              </section>

              {/* DELIVERY */}
              <section className="rounded-2xl border border-[#e7dcd7] bg-white p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3e7e2] text-sm">
                    3
                  </div>

                  <h2 className="font-[Marcellus] text-2xl">Delivery Method</h2>
                </div>

                <div className="mt-7 rounded-xl border-2 border-[#b65f67] bg-[#fcf9f6] p-5">
                  <div className="flex items-center gap-4">
                    <Truck className="h-5 w-5 text-[#b65f67]" />

                    <div className="flex-1">
                      <p className="text-sm font-medium">Standard Delivery</p>

                      <p className="mt-1 text-xs text-[#927d77]">
                        Carefully packed and delivered to your address.
                      </p>
                    </div>

                    <span className="text-sm font-medium text-[#65705b]">
                      FREE
                    </span>
                  </div>
                </div>
              </section>

              {/* PAYMENT */}
              <section className="rounded-2xl border border-[#e7dcd7] bg-white p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3e7e2] text-sm">
                    4
                  </div>

                  <h2 className="font-[Marcellus] text-2xl">Payment Method</h2>
                </div>

                <div className="mt-7 space-y-4">
                  <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-[#d8c4bd] p-5 transition hover:border-[#b65f67]">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="accent-[#b65f67]"
                    />

                    <CreditCard className="h-5 w-5 text-[#b65f67]" />

                    <div>
                      <p className="text-sm font-medium">Credit / Debit Card</p>

                      <p className="mt-1 text-xs text-[#927d77]">
                        Secure online payment
                      </p>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-[#d8c4bd] p-5 transition hover:border-[#b65f67]">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-[#b65f67]"
                    />

                    <ShoppingBag className="h-5 w-5 text-[#b65f67]" />

                    <div>
                      <p className="text-sm font-medium">Cash on Delivery</p>

                      <p className="mt-1 text-xs text-[#927d77]">
                        Pay when your order arrives
                      </p>
                    </div>
                  </label>
                </div>
              </section>
            </div>

            {/* RIGHT — ORDER SUMMARY */}
            <aside className="h-fit rounded-2xl border border-[#e7dcd7] bg-white p-7 shadow-[0_10px_35px_rgba(69,54,51,0.06)] lg:sticky lg:top-6">
              <h2 className="font-[Marcellus] text-2xl">Your Order</h2>

              <div className="mt-7 space-y-5 border-b border-[#e7dcd7] pb-7">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-[#f3e7e2]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />

                      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#453633] px-1 text-[10px] text-white">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{item.name}</p>

                      <p className="mt-1 text-xs text-[#927d77]">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#927d77]">Subtotal</span>

                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#927d77]">Shipping</span>

                  <span className="text-[#65705b]">Free</span>
                </div>

                <div className="flex items-center justify-between border-t border-[#e7dcd7] pt-5">
                  <span className="font-[Marcellus] text-xl font-bold">
                    Total
                  </span>

                  <span className="text-xl font-medium">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#453633] py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-[#b65f67] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Lock className="h-4 w-4" />
                {isSubmitting
                  ? "Placing Order..."
                  : paymentMethod === "card"
                    ? "Pay with Stripe"
                    : "Place Order"}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-[#a08c86]">
                Your information is protected and securely processed.
              </p>

              <Link
                href="/cart"
                className="mt-5 block text-center text-xs uppercase tracking-[0.15em] text-[#806e68] transition hover:text-[#b65f67]"
              >
                ← Back to Cart
              </Link>
            </aside>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}
