
"use client";

import Link from "next/link";

export default function PaymentFailed() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf2f4] px-6">
      <div className="w-full max-w-lg rounded-3xl border border-[#e6ddd8] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8e9e9] text-2xl text-[#b4676d]">
          ×
        </div>

        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b4676d]">
          LUMÉRA
        </p>

        <h1 className="mt-2 font-[Marcellus] text-3xl text-[#403633]">
          Payment Failed
        </h1>

        <p className="mt-4 text-sm leading-6 text-[#887771]">
          Your payment could not be completed. Please try again or choose
          another payment method.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/checkout"
            className="rounded-xl bg-[#b4676d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#9f5960]"
          >
            Try Again
          </Link>

          <Link
            href="/shop"
            className="rounded-xl border border-[#ded4cf] px-6 py-3 text-sm font-medium text-[#403633] transition hover:bg-[#faf7f5]"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
