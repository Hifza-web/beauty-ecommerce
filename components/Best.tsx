"use client";

import { Heart, Star, ShoppingCart, CheckCircle } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";

const products = [
  {
    id: "6a9174bcb75f580fbde43e41",
    category: "MAKEUP",
    name: "Hydrating Silk Primer",
    description: "Blurs pores and smooths skin texture for a flawless, long-lasting makeup base.",
    rating: "4.9",
    reviews: 128,
    image: "/primer.jpg",
    oldPrice: "$65.00",
    price: "$45.00",
  },
  {
    id: "6a9174bcb75f580fbde43e42",
    category: "SKIN CARE",
    name: "Defense Sunscreen (SPF 50)",
    description: "Broad-spectrum UVA/UVB protection with a lightweight, non-greasy matte finish for everyday wear.",
    rating: "4.8",
    reviews: 95,
    image: "/sunscreen.jpg",
    oldPrice: "$75.00",
    price: "$55.00",
  },
  {
    id: "6a9174bcb75f580fbde43e43",
    category: "MAKEUP",
    name: "Rosewater Setting Spray",
    description: "Locks in your makeup all day while refreshing and hydrating the skin with a fine, soothing mist.",
    rating: "4.7",
    reviews: 210,
    image: "/settingspray.jpg",
    oldPrice: "$50.00",
    price: "$35.00",
  },
  {
    id: "6a9174bcb75f580fbde43e44",
    category: "MAKEUP",
    name: "Golden Hour Highlighter",
    description: "A finely milled, buildable glow that melts seamlessly into the skin for a radiant, luxury finish.",
    rating: "4.9",
    reviews: 342,
    image: "/highliter.jpg",
    oldPrice: "$55.00",
    price: "$39.00",
  },
];

export default function Best() {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [toast, setToast] = useState("");
  const [liveProducts, setLiveProducts] = useState(products);

  useEffect(() => {
    api.get("/products")
      .then(res => {
        const dbProducts = res.data.products || [];
        const updated = products.map(p => {
          const match = dbProducts.find((dbP: any) => dbP.name === p.name);
          if (match) {
            return { ...p, id: match._id };
          }
          return p;
        });
        setLiveProducts(updated);
      })
      .catch(err => console.error("Failed to sync best products", err));
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace("$", "")),
      image: product.image,
      category: product.category,
      description: product.description,
      rating: parseFloat(product.rating),
    });
    showToast(`${product.name} added to cart`);
  };

  const handleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price.replace("$", "")),
        image: product.image,
      });
      showToast(`${product.name} added to wishlist`);
    }
  };

  const toastTitle = toast.toLowerCase().includes("wishlist")
    ? toast.toLowerCase().includes("removed")
      ? "Removed from Wishlist"
      : "Added to Wishlist"
    : "Added to Bag";

  const toastMessage = toast
    .replace(/ added to cart/i, "")
    .replace(/ added to wishlist/i, "")
    .replace(/ removed from wishlist/i, "");

  return (
    <section className="bg-white px-6 py-20 relative">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-sm text-[#8f6f76] font-[Marcellus]">BEST SELLERS</p>
          <h2 className="mt-2 text-4xl font-medium font-[Marcellus] tracking-tight text-[#171717] md:text-5xl">
            Customer Favorites
          </h2>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {liveProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-2xl shadow-[0_8px_25px_rgba(69,54,51,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(69,54,51,0.14)]"
            >
              {/* Image & Top Badges */}
              <div className="relative aspect-square overflow-hidden bg-[#f7eef1]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-sm text-[#555] shadow-md">
                  SALE
                </span>
                <button
                  type="button"
                  onClick={() => handleWishlist(product)}
                  aria-label="Add to wishlist"
                  className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#333] shadow-md transition hover:text-[#D4A6B6]"
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-[#D4A6B6] text-[#D4A6B6]" : ""}`} />
                </button>
              </div>

              {/* Product Info */}
              <div className="flex flex-col border border-t-0 border-[#f0f0f0] bg-[#faf2f4] p-5">

                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-black">
                  <span className="uppercase">{product.category}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                    <span className="font-bold text-gray-900">{product.rating}</span>
                    <span className="text-gray-400">({product.reviews})</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-3 text-[17px] font-bold text-gray-900 line-clamp-1">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2">
                  {product.description}
                </p>

                {/* Divider */}
                <div className="my-5 border-t border-gray-200" />

                {/* Price & Cart Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d4a6b6] text-white shadow-md transition hover:bg-[#d09eb0] cursor-pointer"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/shop"
            className="rounded-full border border-[#453633] px-8 py-4 text-sm uppercase tracking-[0.18em] text-[#453633] transition duration-300 hover:bg-[#d4a6b6] hover:text-white"
          >
            View All Products
          </Link>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-7 right-7 z-[60] flex items-center gap-4 rounded-2xl border border-[#e7dcd7] bg-white px-5 py-4 shadow-[0_10px_35px_rgba(69,54,51,0.15)]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3e7e2] text-[#b65f67]">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div className="pr-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#a08c86]">
              {toastTitle}
            </p>
            <p className="mt-1 text-sm font-medium text-[#453633]">{toastMessage}</p>
          </div>
        </div>
      )}
    </section>
  );
}