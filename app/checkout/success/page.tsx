
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { useCart } from "@/components/CartContext";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { clearCart } = useCart();

  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setIsVerifying(false);
        return;
      }

      try {
        const res = await api.post("/stripe/verify-payment", {
          sessionId,
        });

        if (res.status === 200 || res.status === 201) {
          clearCart();
        }
      } catch (err: any) {
        console.error("Payment verification failed:", err);

        setError(
          err.response?.data?.message ||
            "Payment verification failed. Please check your order."
        );
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, clearCart]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center bg-[#fcf9f6] text-[#453633] px-6">
        {isVerifying ? (
          <>
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#f3e7e2] text-[#b65f67]">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e7dcd7] border-t-[#b65f67]" />
            </div>

            <h1 className="mt-8 font-[Marcellus] text-4xl text-center">
              Verifying your payment...
            </h1>

            <p className="mt-4 max-w-lg text-center text-[#806e68]">
              Please wait while we confirm your payment and create your order.
            </p>
          </>
        ) : error ? (
          <>
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-500">
              <CheckCircle2 className="h-12 w-12" />
            </div>

            <h1 className="mt-8 font-[Marcellus] text-4xl text-center">
              Payment Verification Issue
            </h1>

            <p className="mt-4 max-w-lg text-center text-[#806e68]">
              {error}
            </p>

            <Link
              href="/orders"
              className="mt-8 rounded-full bg-[#453633] px-8 py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-[#b65f67]"
            >
              View My Orders
            </Link>
          </>
        ) : (
          <>
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#e6f2ec] text-[#4caf50] shadow-sm mb-8 animate-bounce-slow">
              <CheckCircle2 className="h-12 w-12" />
            </div>

            <h1 className="font-[Marcellus] text-5xl md:text-6xl text-center">
              Thank you for your order!
            </h1>

            <p className="mt-5 max-w-lg text-center text-base leading-7 text-[#806e68]">
              Your payment has been successfully completed and your order has
              been placed. We're getting your beauty essentials ready to be
              shipped.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/orders"
                className="flex items-center justify-center gap-2 rounded-full bg-[#453633] px-8 py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-[#b65f67]"
              >
                View My Orders
              </Link>

              <Link
                href="/shop"
                className="flex items-center justify-center gap-2 rounded-full border border-[#d8c4bd] bg-white px-8 py-4 text-sm uppercase tracking-[0.18em] text-[#453633] transition hover:border-[#b65f67] hover:text-[#b65f67]"
              >
                <ShoppingBag className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

