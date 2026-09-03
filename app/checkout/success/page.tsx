"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle2, ShoppingBag } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center bg-[#fcf9f6] text-[#453633] px-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#e6f2ec] text-[#4caf50] shadow-sm mb-8 animate-bounce-slow">
          <CheckCircle2 className="h-12 w-12" />
        </div>

        <h1 className="font-[Marcellus] text-5xl md:text-6xl text-center">
          Thank you for your order!
        </h1>

        <p className="mt-5 max-w-lg text-center text-base leading-7 text-[#806e68]">
          Your order has been successfully placed. We're getting your beauty essentials ready to be shipped. 
          You will receive an email confirmation shortly.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 rounded-full bg-[#453633] px-8 py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-[#b65f67]"
          >
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center rounded-full border border-[#d8c4bd] bg-white px-8 py-4 text-sm uppercase tracking-[0.18em] text-[#453633] transition hover:border-[#b65f67] hover:text-[#b65f67]"
          >
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
