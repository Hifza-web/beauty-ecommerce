"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-t border-[#d9d8b8] bg-[#faf2f4]">
      <nav className="mx-auto max-w-7xl px-6 py-4">
        {/* 3-column grid: logo LEFT | nav+search CENTER | icons RIGHT */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-20">

          {/* Col 1 — Logo, left edge */}
          <Link
            href="/"
            className="shrink-0 text-2xl font-bold tracking-tight text-black"
          >
            LUM
              <span className="text-[#d4a6b6]">É</span>RA
          </Link>
          

          {/* Col 2 — Center: nav links + search bar */}
          <div className="hidden items-center justify-center gap-5 lg:flex">
            {/* Nav Links */}
            <div className="flex items-center gap-6 font-bold whitespace-nowrap">
              <Link
                href="/shop"
                className="text-[15px] text-[#55534d] transition hover:text-[#4d5832]"
              >
                SHOP ALL
              </Link>

              <Link
                href="/makeup"
                className="text-[15px] text-[#55534d] transition hover:text-[#4d5832]"
              >
                MAKEUP
              </Link>

              <Link
                href="/skin care"
                className="text-[15px] text-[#55534d] transition hover:text-[#4d5832]"
              >
                SKIN CARE
              </Link>

              <Link
                href="/hair care"
                className="text-[15px] text-[#55534d] transition hover:text-[#4d5832]"
              >
                HAIR CARE
              </Link>

              <Link
                href="/about"
                className="text-[15px] text-[#55534d] transition hover:text-[#4d5832]"
              >
                ABOUT
              </Link>

              <Link
                href="/contact"
                className="text-[15px] text-[#55534d] transition hover:text-[#4d5832]"
              >
                CONTACT
              </Link>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-xs">
              <div className="flex h-10 items-center rounded-full border border-[#d8d6b8] bg-white px-4">
                <svg
                  className="mr-2 h-4 w-4 shrink-0 text-[#9b9a91]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm text-[#55534d] outline-none placeholder:text-[#aaa9a1]"
                />
              </div>
            </div>
          </div>

          {/* Col 3 — Right icons + mobile button, right edge */}
          <div className="flex items-center justify-end gap-4 lg:gap-5">
            {/* Desktop & Mobile: Wishlist, Cart */}
            {/* Sign In is Desktop only, Mobile is in dropdown */}
            <button
              type="button"
              aria-label="Wishlist"
              className="text-[#4d5832] transition hover:scale-110 cursor-pointer"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Shopping cart"
              className="relative text-[#4d5832] transition hover:scale-110 cursor-pointer"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.95-1.55L21 7H6"
                />
                <circle cx="10" cy="20" r="1.2" />
                <circle cx="18" cy="20" r="1.2" />
              </svg>
            </button>

            <Link
              href="/login"
              className="hidden items-center gap-2 rounded-full border border-[#d8d6b8] px-5 py-2.5 text-sm font-medium text-[#35352f] transition hover:bg-[#f3f1df] lg:flex"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"
                />
                <circle cx="9" cy="7" r="4" />
              </svg>
              Sign In
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="text-2xl text-[#4d5832] lg:hidden"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-4 space-y-3 border-t border-[#e8e5d5] pt-4 lg:hidden">
            {/* Search Bar for Mobile */}
            <div className="mb-4 w-full">
              <div className="flex h-10 items-center rounded-full border border-[#d8d6b8] bg-white px-4">
                <svg
                  className="mr-2 h-4 w-4 shrink-0 text-[#9b9a91]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm text-[#55534d] outline-none placeholder:text-[#aaa9a1]"
                />
              </div>
            </div>

            <Link
              href="/shop"
              className="block py-2 text-[#55534d] font-bold"
              onClick={() => setMenuOpen(false)}
            >
              SHOP ALL
            </Link>

            <Link
              href="/makeup"
              className="block py-2 text-[#55534d] font-bold"
              onClick={() => setMenuOpen(false)}
            >
              MAKEUP
            </Link>

            <Link
              href="/skin care"
              className="block py-2 text-[#55534d] font-bold"
              onClick={() => setMenuOpen(false)}
            >
              SKIN CARE
            </Link>

            <Link
              href="/hair care"
              className="block py-2 text-[#55534d] font-bold"
              onClick={() => setMenuOpen(false)}
            >
              HAIR CARE
            </Link>

            <Link
              href="/about"
              className="block py-2 text-[#55534d] font-bold"
              onClick={() => setMenuOpen(false)}
            >
              ABOUT
            </Link>

            <Link
              href="/contact"
              className="block py-2 text-[#55534d] font-bold"
              onClick={() => setMenuOpen(false)}
            >
              CONTACT
            </Link>

            <div className="my-2 flex flex-col gap-3 border-t border-[#e8e5d5] pt-3">
              <Link
                href="/login"
                className="flex items-center gap-2 py-2 font-medium text-[#4d5832]"
                onClick={() => setMenuOpen(false)}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"
                  />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}