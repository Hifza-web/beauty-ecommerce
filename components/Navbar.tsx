"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import { useAuth } from "@/components/AuthContext";
import api from "@/lib/api";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const router = useRouter();

  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { isLoggedIn, logout } = useAuth();

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => {
        if (res.data.categories) setCategories(res.data.categories);
      })
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="border-t border-[#d9d8b8] bg-[#faf2f4]">
      <nav className="mx-auto max-w-7xl px-6 py-4">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 lg:gap-20">
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
                // className="text-[15px] text-[#55534d] transition hover:text-[#4d5832]"
                className="group relative text-[15px] text-[#55534d] transition hover:text-[#4d5832] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-[#b65f67] after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
              >
                SHOP ALL
              </Link>
              <Link
                href="/deals"
                // className="text-[15px] font-semibold text-[#b65f67] transition hover:text-[#8f454d]"
                className="group relative text-[15px] font-semibold text-[#b65f67] transition hover:text-[#8f454d] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-[#b65f67] after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
              >
                DEALS
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setCategoryMenuOpen(true)}
                onMouseLeave={() => setCategoryMenuOpen(false)}
              >
                <button
                  type="button"
                  // className="text-[15px] text-[#55534d] uppercase transition hover:text-[#4d5832]"
                  className="group relative text-[15px] text-[#55534d] transition hover:text-[#4d5832] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-[#b65f67] after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
                >
                  CATEGORIES
                </button>

                <div
                  className={`absolute left-1/2 top-full z-50 mt-6 w-[650px] -translate-x-1/2 rounded-2xl border border-[#e7dcd7] bg-white p-8 shadow-[0_15px_50px_rgba(69,54,51,0.15)] transition-all duration-300 ease-out ${
                    categoryMenuOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  }`}
                >
                  <div className="mb-6 border-b border-[#e7dcd7] pb-4">
                    <p className="font-[Marcellus] text-2xl text-[#453633]">
                      Shop by Category
                    </p>

                    <p className="mt-1 text-sm text-[#927d77]">
                      Discover your beauty essentials
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {categories.map((cat) => (
                      <Link
                        key={cat._id}
                        href={`/${cat.name.toLowerCase().replace(/ /g, "-")}`}
                        onClick={() => setCategoryMenuOpen(false)}
                        className="rounded-xl border border-[#eee3df] bg-[#fcf9f6] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#b65f67] hover:bg-[#f3e7e2]"
                      >
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#453633]">
                          {cat.name}
                        </p>

                        <p className="mt-2 text-xs text-[#a08c86]">
                          Explore collection →
                        </p>
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/shop"
                    onClick={() => setCategoryMenuOpen(false)}
                    className="mt-7 block rounded-full bg-[#453633] py-3 text-center text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#b65f67]"
                  >
                    View All Products
                  </Link>
                </div>
              </div>

              <Link
                href="/about"
                // className="text-[15px] text-[#55534d] transition hover:text-[#4d5832]"
                className="group relative text-[15px] text-[#55534d] transition hover:text-[#4d5832] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-[#b65f67] after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
              >
                ABOUT
              </Link>

              <Link
                href="/contact"
                // className="text-[15px] text-[#55534d] transition hover:text-[#4d5832]"
                className="group relative text-[15px] text-[#55534d] transition hover:text-[#4d5832] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-[#b65f67] after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
              >
                CONTACT
              </Link>
            </div>

            {/* Search Bar Removed from here */}
          </div>

          {/* Col 3 — Right icons + mobile button, right edge */}
          <div className="flex items-center justify-end gap-4 lg:gap-5">
            {/* Desktop & Mobile: Search, Wishlist, Cart, Profile */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
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
                  d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
                />
              </svg>
            </button>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative text-[#4d5832] transition hover:scale-110"
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

              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b65f67] px-1 text-[10px] font-semibold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="relative text-[#4d5832] transition hover:scale-110"
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

              {/* CART COUNT */}
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b65f67] px-1 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {isLoggedIn && (
              <div className="relative">
                <button
                  type="button"
                  aria-label="Account menu"
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="relative text-[#4d5832] transition hover:scale-110"
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
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </button>
                {accountOpen && (
                  <div className="absolute right-0 top-9 z-50 w-48 rounded-xl border border-[#e7dcd7] bg-white p-2 shadow-lg">
                    <Link
                      href="/profile"
                      onClick={() => setAccountOpen(false)}
                      className="block rounded-lg px-4 py-3 text-sm text-[#453633] transition hover:bg-[#faf2f4] hover:text-[#b65f67]"
                    >
                      My Profile
                    </Link>

                    <Link
                      href="/orders"
                      onClick={() => setAccountOpen(false)}
                      className="block rounded-lg px-4 py-3 text-sm text-[#453633] transition hover:bg-[#faf2f4] hover:text-[#b65f67]"
                    >
                      My Orders
                    </Link>
                  </div>
                )}
              </div>
            )}
            {/* Sign In / Log Out (Desktop) */}
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="hidden items-center gap-2 rounded-full border border-[#d8d6b8] px-5 py-2.5 text-sm font-medium text-[#b65f67] transition hover:bg-[#faf2f4] lg:flex"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Log Out
              </button>
            ) : (
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
            )}

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
            {/* Mobile Search Bar Removed */}

            <Link
              href="/shop"
              className="block py-2 text-[#55534d] font-bold"
              onClick={() => setMenuOpen(false)}
            >
              SHOP ALL
            </Link>
            <Link
              href="/deals"
              className="block py-2 font-bold text-[#b65f67]"
              onClick={() => setMenuOpen(false)}
            >
              DEALS
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/${cat.name.toLowerCase().replace(/ /g, "-")}`}
                className="block py-2 text-[#55534d] font-bold uppercase"
                onClick={() => setMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}

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
            {isLoggedIn && (
              <Link
                href="/orders"
                className="block py-2 font-bold text-[#55534d]"
                onClick={() => setMenuOpen(false)}
              >
                MY ORDERS
              </Link>
            )}

            <div className="my-2 flex flex-col gap-3 border-t border-[#e8e5d5] pt-3">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 py-2 font-medium text-[#b65f67]"
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Log Out
                </button>
              ) : (
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
              )}
            </div>
          </div>
        )}
      </nav>

      {/* SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm pt-20 px-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-10">
            <div className="p-4 border-b border-[#e8e5d5] flex items-center justify-between bg-[#fcf9f6]">
              <h2 className="text-lg font-[Marcellus] text-[#453633]">
                Search Products
              </h2>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-[#a08c86] hover:text-[#b65f67] transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="p-6">
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a08c86]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for lipstick, serum, vegan..."
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-[#d8c4bd] rounded-xl outline-none focus:border-[#b65f67] transition-colors bg-[#fcf9f6] text-[#453633] placeholder:text-[#a08c86]"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#b65f67] text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-[#a05259] transition-colors shadow-md"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
