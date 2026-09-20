"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      router.push("/checkout");
    } else {
      router.push("/login?redirect=/checkout");
    }
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#fcf9f6] text-[#453633]">
        <section className="border-b border-[#e7dcd7] bg-[#f3e7e2]">
          <div className="mx-auto max-w-7xl px-6 py-20 text-center md:px-10">
            <p className="text-xs uppercase tracking-[0.35em] text-[#b65f67]">
              LUMÉRA BEAUTY
            </p>

            <h1 className="mt-5 font-serif text-5xl font-light md:text-6xl">
              Your Cart
            </h1>
          </div>
        </section>

        <section className="flex min-h-[500px] flex-col items-center justify-center px-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f3e7e2]">
            <ShoppingBag className="h-8 w-8 text-[#b65f67]" />
          </div>

          <h2 className="mt-7 font-serif text-4xl">Your cart is empty</h2>

          <p className="mt-3 max-w-md text-base leading-7 text-[#927d77]">
            Looks like you haven't added anything to your bag yet.
          </p>

          <Link
            href="/shop"
            className="mt-8 rounded-full bg-[#453633] px-8 py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-[#b65f67]"
          >
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fcf9f6] text-[#453633]">
        {/* HEADER */}
        <section className="border-b border-[#e7dcd7] bg-[#f3e7e2]">
          <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-[#b65f67]">
                LUMÉRA BEAUTY
              </p>

              <h1 className="mt-4 font-serif text-5xl font-light md:text-6xl">
                Your Cart
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#806e68]">
                Review your beauty essentials before continuing to checkout.
              </p>
            </div>
          </div>
        </section>

        {/* CART */}
        <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            {/* PRODUCTS */}
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-[#e7dcd7] pb-5">
                <h2 className="font-serif text-2xl">Shopping Bag</h2>

                <p className="text-sm text-[#927d77]">
                  {cart.length} {cart.length === 1 ? "item" : "items"}
                </p>
              </div>
              <div className="space-y-5">
                {cart.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="group relative flex flex-row items-start gap-4 rounded-2xl border border-[#e7dcd7] bg-white p-4 shadow-[0_8px_30px_rgba(69,54,51,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(69,54,51,0.12)] sm:gap-5 sm:p-5"
                    >
                      {/* PRODUCT IMAGE */}
                      <div className="h-28 w-24 sm:h-36 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-[#f3e7e2]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          {/* TOP ROW: CATEGORY & TOTAL */}
                          <div className="flex items-start justify-between gap-4">
                            {item?.category ? (
                              <p className="text-[10px] uppercase tracking-[0.25em] text-[#b65f67]">
                                {item.category}
                              </p>
                            ) : (
                              <div />
                            )}

                            {/* TOTAL */}
                            <div className="shrink-0 text-right">
                              <p className="text-[10px] uppercase tracking-[0.15em] text-[#a08c86] sm:hidden">
                                Total
                              </p>
                              <p className="text-lg font-medium text-[#453633]">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>

                          {/* NAME */}
                          <h3 className="font-[Marcellus] text-2xl text-[#453633]">
                            {item.name}
                          </h3>

                          {/* RATING */}
                          {item?.rating && (
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-sm tracking-wide text-[#c98b6d]">
                                ★★★★★
                              </span>
                              <span className="text-xs text-[#927d77]">
                                {item.rating.toFixed(1)}
                              </span>
                            </div>
                          )}

                          {/* DESCRIPTION */}
                          {item?.description && (
                            <p className="mt-2 max-w-lg text-sm leading-5 text-[#927d77] line-clamp-2">
                              {item.description}
                            </p>
                          )}

                          {/* UNIT PRICE */}
                          <p className="mt-2 text-sm font-medium text-[#806e68]">
                            ${item.price.toFixed(2)}{" "}
                            <span className="text-xs font-normal">each</span>
                          </p>
                        </div>

                        {/* BOTTOM ACTIONS */}
                        <div className="mt-4 flex flex-wrap items-center gap-6">
                          {/* QUANTITY */}
                          <div className="flex items-center rounded-full border border-[#d8c4bd] bg-[#fcf9f6] cursor-pointer">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity === 1}
                              className="flex h-9 w-9 items-center justify-center text-[#806e68] transition hover:text-[#b65f67] disabled:cursor-not-allowed disabled:opacity-40 "
                            >
                              <Minus className="h-4 w-4 cursor-pointer" />
                            </button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if (item.quantity >= item.stock) {
                                  return;
                                }

                                updateQuantity(item.id, item.quantity + 1);
                              }}
                              disabled={item.quantity >= item.stock}
                              className="flex h-9 w-9 items-center justify-center text-[#806e68] transition hover:text-[#b65f67] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          {/* REMOVE */}
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#927d77] transition hover:text-[#b65f67] cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/shop"
                className="mt-8 inline-flex text-sm uppercase tracking-[0.15em] text-[#806e68] transition hover:text-[#b65f67]"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* SUMMARY */}
            <aside className="h-fit rounded-2xl border border-[#e7dcd7] bg-white p-7 shadow-[0_10px_35px_rgba(69,54,51,0.06)]">
              <h2 className="font-serif text-2xl">Order Summary</h2>

              <div className="mt-7 space-y-4 border-b border-[#e7dcd7] pb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#927d77]">Subtotal</span>

                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#927d77]">Shipping</span>

                  <span className="text-[#65705b]">Free</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-serif text-xl">Total</span>

                <span className="text-xl font-medium">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-8 flex w-full items-center justify-center rounded-full bg-[#453633] py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-[#b65f67]"
              >
                Proceed to Checkout
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-[#a08c86]">
                Secure checkout · Easy returns
              </p>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
