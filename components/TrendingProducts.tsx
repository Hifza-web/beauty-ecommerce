"use client";

import { Heart, Star, ShoppingCart, CheckCircle } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import { useState } from "react";

const products = [
  {
    id: "6a9174bbb75f580fbde43e3d",
    category: "MAKEUP",
    name: "Luméra Silk Glow Foundation",
    description: "A weightless, long-wear foundation that provides medium coverage and a luminous glow.",
    rating: "4.9",
    reviews: 128,
    image: "/foun.png",
    oldPrice: "$65.00",
    price: "$45.00",
  },
  {
    id: "6a9174bbb75f580fbde43e3e",
    category: "SKIN CARE",
    name: "Midnight Rose Glow Serum",
    description: "Deeply hydrates and plumps the skin overnight with pure rose extracts.",
    rating: "4.8",
    reviews: 95,
    image: "/ser.png",
    oldPrice: "$75.00",
    price: "$55.00",
  },
  {
    id: "6a9174bbb75f580fbde43e3f",
    category: "LIPS",
    name: "Velvet Kiss Lip Clay",
    description: "A soft-matte, comfortable lip clay that blurs lines and stays all day.",
    rating: "4.7",
    reviews: 210,
    image: "/lip.png",
    oldPrice: "$40.00",
    price: "$28.00",
  },
  {
    id: "6a9174bcb75f580fbde43e40",
    category: "HAIR CARE",
    name: "Silk Repair Hair Mask",
    description: "Intensively repairs and smooths damaged hair, leaving it silky soft.",
    rating: "4.9",
    reviews: 84,
    image: "/hair.png",
    oldPrice: "$50.00",
    price: "$35.00",
  },
];

export default function TrendingProducts() {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [toast, setToast] = useState("");

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
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-7 right-7 z-[60] flex items-center gap-4 rounded-2xl border border-[#e7dcd7] bg-white px-5 py-4 shadow-[0_10px_35px_rgba(69,54,51,0.15)]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3e7e2] text-[#b65f67]">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div className="pr-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#a08c86]">
              {toastTitle}
            </p>
            <p className="mt-1 text-sm font-medium text-[#453633]">
              {toastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-sm text-[#8f6f76] font-[Marcellus]">POPULAR PRODUCTS</p>
          <h2 className="mt-2 text-4xl font-medium font-[Marcellus] tracking-tight text-[#171717] md:text-5xl">
            Trending Now
          </h2>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col">

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

                {/* Divider Line */}
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
      </div>
    </section>
  );
}
