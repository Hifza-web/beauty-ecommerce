"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Heart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import api from "@/lib/api";

export type Product = {
  id: string; // Updated to string for MongoDB
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  badge?: "NEW" | "BESTSELLER" | "VEGAN";
  description: string;
  _id?: string;
};

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params?.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      api.get(`/products/${productId}`)
        .then((res) => {
          if (res.data.product) {
            setProduct({
              ...res.data.product,
              id: res.data.product._id
            });
          }
        })
        .catch(err => console.error("Error fetching product:", err))
        .finally(() => setIsLoading(false));
    }
  }, [productId]);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Use product image if found, else default
  const images = product
    ? [product.image, "/1-2.jpg", "/1-3.jpg", "/1-4.jpg"]
    : ["/1.jpg"];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  // const [liked, setLiked] = useState(false);
  const liked = product ? isInWishlist(product.id) : false;
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"cart" | "wishlist">("cart");

  // Update selected image when product changes (e.g. initial load)
  useEffect(() => {
    if (product) setSelectedImage(product.image);
  }, [product]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fcf9f6]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e7dcd7] border-t-[#b65f67]"></div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fcf9f6] text-[#453633]">
        <div className="text-center">
          <h1 className="font-[Marcellus] text-3xl">Product not found</h1>
          <Link
            href="/shop"
            className="mt-5 inline-block text-[#b65f67] hover:underline"
          >
            ← Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcf9f6] text-[#453633]">
      {/* TOP */}
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
        {/* BACK */}
        <Link
          href="/shop"
          className="inline-flex text-xs uppercase tracking-[0.2em] text-[#806e68] transition hover:text-[#b65f67]"
        >
          ← Back to Shop
        </Link>

        {/* PRODUCT AREA */}
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* LEFT - IMAGE GALLERY */}
          <div>
            {/* MAIN IMAGE */}
            <div className="group relative overflow-hidden rounded-2xl bg-[#f3e7e2]">
              <div className="aspect-square overflow-hidden">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              {/* IMAGE LABEL */}
              {product.badge && (
                <div className="absolute left-5 top-5">
                  <span className="bg-[#453633] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* THUMBNAILS */}
            <div className="mt-5 flex gap-3">
              {images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`h-20 w-20 overflow-hidden rounded-xl bg-[#f3e7e2] transition ${
                    selectedImage === image
                      ? "ring-2 ring-[#b65f67] ring-offset-2"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT - DETAILS */}
          <div className="flex flex-col justify-center">
            {/* CATEGORY */}
            <p className="text-sm uppercase tracking-[0.3em] text-[#b65f67]">
              {product.category}
            </p>

            {/* TITLE */}
            <h1 className="mt-1 max-w-xl font-[Marcellus] text-4xl font-light leading-tight md:text-5xl">
              {product.name}
            </h1>

            {/* RATING */}
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <div className="text-[#c98b6d] text-sm">★★★★★</div>

              <span className="text-sm font-medium">{product.rating}</span>

              <span className="text-sm text-[#927d77]">· 24 reviews</span>
            </div>

            {/* PRICE */}
            <p className="mt-4 text-2xl font-medium">${product.price}.00</p>

            {/* DESCRIPTION */}
            <div className="mt-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#453633]">
                About this product
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-7 text-[#665550]">
                {product.description ||
                  "A soft beauty product with a beautiful natural glow. Designed to add a subtle touch of elegance while keeping you feeling comfortable and beautifully nourished."}
              </p>
            </div>

            {/* PRODUCT INFO */}

            {/* QUANTITY + WISHLIST */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-14 items-center rounded-full border border-[#d8c4bd] bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="flex h-14 w-12 items-center justify-center text-[#806e68] transition hover:text-[#b65f67]"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="w-8 text-center text-sm">{quantity}</span>

                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="flex h-14 w-12 items-center justify-center text-[#806e68] transition hover:text-[#b65f67]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (liked) {
                    removeFromWishlist(product.id);

                    setToastType("wishlist");
                    setToast(`${product.name} removed from wishlist`);
                  } else {
                    addToWishlist({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    });

                    setToastType("wishlist");
                    setToast(`${product.name} added to wishlist`);
                  }

                  setTimeout(() => {
                    setToast("");
                  }, 2500);
                }}
                aria-label="Add to wishlist"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d8c4bd] bg-white transition hover:border-[#b65f67]"
              >
                <Heart
                  className={`h-5 w-5 ${
                    liked ? "fill-[#d4a6b6] text-[#d4a6b6]" : "text-[#453633]"
                  }`}
                />
              </button>
            </div>

            {/* ADD TO BAG */}
            <button
              type="button"
              onClick={() => {
                addToCart(
  {
    id: product.id,
    name: product.name,
    price: product.price,
    image: selectedImage,
    category: product.category,
    rating: product.rating,
    description: product.description,
  },
  quantity
);
                setToastType("cart");
                setToast(`${product.name} added to bag`);

                setTimeout(() => {
                  setToast("");
                }, 2500);
              }}
              className="mt-5 w-full rounded-full bg-[#453633] py-5 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-[#b65f67]"
            >
              Add to Bag
            </button>

            {/* SERVICE INFO */}
            <div className="mt-7 space-y-4 border-t border-[#e7dcd7] pt-7">
              <div className="flex items-center gap-4">
                <Truck className="h-5 w-5 text-[#b65f67]" />

                <div>
                  <p className="text-sm font-medium">
                    Available and ready to ship
                  </p>
                  <p className="mt-1 text-xs text-[#927d77]">
                    Carefully packed and prepared for delivery.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <ShieldCheck className="h-5 w-5 text-[#b65f67]" />

                <div>
                  <p className="text-sm font-medium">
                    Free shipping on your order
                  </p>
                  <p className="mt-1 text-xs text-[#927d77]">
                    Enjoy complimentary delivery.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <RotateCcw className="h-5 w-5 text-[#b65f67]" />

                <div>
                  <p className="text-sm font-medium">Easy returns</p>
                  <p className="mt-1 text-xs text-[#927d77]">
                    Shop with confidence and peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toast && (
        <div className="fixed bottom-7 right-7 z-[60] flex items-center gap-4 rounded-2xl border border-[#e7dcd7] bg-white px-5 py-4 shadow-[0_10px_35px_rgba(69,54,51,0.15)]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3e7e2] text-[#b65f67]">
            ✓
          </div>

          <div className="pr-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#a08c86]">
              {toast.toLowerCase().includes("wishlist")
                ? toast.toLowerCase().includes("removed")
                  ? "Removed from Wishlist"
                  : "Added to Wishlist"
                : "Added to Bag"}
            </p>

            <p className="mt-1 text-sm font-medium text-[#453633]">
              {toast
                .replace(/ added to cart/i, "")
                .replace(/ added to wishlist/i, "")
                .replace(/ removed from wishlist/i, "")
                .replace(/ added to bag/i, "")}
            </p>
          </div>
        </div>
      )}
      {/* BENEFITS */}
    </main>
  );
}
