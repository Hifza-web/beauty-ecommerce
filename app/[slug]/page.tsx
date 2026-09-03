"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import api from "@/lib/api";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import ProductCard from "@/components/ProductCard";

export type Product = {
  id: string | number; // string for MongoDB _id
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  badge?: "NEW" | "BESTSELLER" | "VEGAN";
  description: string;
  _id?: string;
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Format slug back to Category Name
  let categoryName = "Shop";
  if (slug === "makeup") categoryName = "Makeup";
  else if (slug === "skin-care") categoryName = "Skin Care";
  else if (slug === "hair-care") categoryName = "Hair Care";

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [toast, setToast] = useState("");
  const [quickView, setQuickView] = useState<Product | null>(null);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If slug doesn't match our valid categories, just stop loading and return empty
    if (categoryName === "Shop") {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    api
      .get(`/products/filter?category=${encodeURIComponent(categoryName)}`)
      .then((res) => {
        if (res.data.products) {
          const mappedProducts = res.data.products.map((p: any) => ({
            ...p,
            id: p._id,
          }));
          setFilteredProducts(mappedProducts);
        }
      })
      .catch((err) => console.error("Error fetching category products:", err))
      .finally(() => setIsLoading(false));
  }, [categoryName]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setToast(`${product.name} added to cart`);
    setTimeout(() => setToast(""), 2500);
  };

  const handleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      setToast(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      setToast(`${product.name} added to wishlist`);
    }
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fcf9f6] text-[#453633]">

        {/* ================= CATEGORY HERO ================= */}
        <section className="border-b border-[#e7dcd7] bg-[#f3e7e2]">
          <div className="mx-auto max-w-7xl px-6 py-20 text-center md:px-10 md:py-28">

            <p className="text-xs uppercase tracking-[0.35em] text-[#b65f67]">
              LUMÉRA BEAUTY
            </p>

            <h1 className="mt-5 font-serif text-5xl font-light capitalize md:text-6xl">
              {categoryName}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#806e68]">
              Discover our curated collection of beauty essentials designed
              to enhance your natural beauty and create your perfect look.
            </p>

          </div>
        </section>

        {/* ================= PRODUCTS SECTION ================= */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">

          {/* TOP ROW */}
          <div className="mb-10 flex flex-col gap-4 border-b border-[#e7dcd7] pb-6 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#b65f67]">
                Explore Collection
              </p>

              <h2 className="mt-2 font-serif text-3xl">
                Makeup Essentials
              </h2>
            </div>

            <p className="text-sm text-[#927d77]">
              {filteredProducts.length} Products
            </p>

          </div>

          {/* ================= PRODUCT GRID ================= */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e7dcd7] border-t-[#b65f67]"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickView}
                    onWishlist={handleWishlist}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-[#927d77]">
                No products found for this category.
              </div>
            )}
          </div>

          {/* ================= CONTINUE SHOPPING ================= */}
          <div className="mt-16 text-center">

            <Link
              href="/shop"
              className="inline-flex rounded-full border border-[#453633] px-8 py-4 text-sm uppercase tracking-[0.16em] text-[#453633] transition hover:bg-[#453633] hover:text-white"
            >
              View All Products
            </Link>

          </div>

        </section>

      </main>

      {/* QUICK VIEW MODAL */}
      {quickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setQuickView(null)}
          />
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <button
              onClick={() => setQuickView(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#453633] shadow-sm backdrop-blur-sm transition hover:bg-white hover:scale-105"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="relative h-[300px] w-full bg-[#f3e7e2] md:h-[600px] md:w-1/2">
                <img
                  src={quickView.image}
                  alt={quickView.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12">
                <p className="text-xs uppercase tracking-[0.2em] text-[#b65f67]">
                  {quickView.category}
                </p>

                <h2 className="mt-3 font-[Marcellus] text-3xl md:text-4xl text-black">
                  {quickView.name}
                </h2>

                <p className="mt-4 text-2xl font-medium text-[#453633]">
                  ${quickView.price.toFixed(2)}
                </p>

                <p className="mt-6 leading-relaxed text-[#806e68]">
                  {quickView.description}
                </p>

                <button
                  onClick={() => {
                    handleAddToCart(quickView);
                    setQuickView(null);
                  }}
                  className="mt-8 w-full bg-[#453633] py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#b65f67]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-7 right-7 z-[60] flex items-center gap-4 rounded-2xl border border-[#e7dcd7] bg-white px-5 py-4 shadow-[0_10px_35px_rgba(69,54,51,0.15)]">
          {/* CHECK ICON */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3e7e2] text-[#b65f67]">
            ✓
          </div>

          {/* MESSAGE */}
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
                .replace(/ removed from wishlist/i, "")}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}