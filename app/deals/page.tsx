
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import api from "@/lib/api";

type Product = {
  id: string | number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  category: string;
  stock: number;
  badge?: "NEW" | "BESTSELLER" | "VEGAN";
  description: string;
};

function DealsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [toast, setToast] = useState("");
  
  const [discountFilter, setDiscountFilter] = useState(searchParams.get("discount") || "all");
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "all");
  const [priceFilter, setPriceFilter] = useState(searchParams.get("price") || "all");
  const [inStockOnly, setInStockOnly] = useState(searchParams.get("inStock") === "true");

  useEffect(() => {
    setDiscountFilter(searchParams.get("discount") || "all");
    setCategoryFilter(searchParams.get("category") || "all");
    setPriceFilter(searchParams.get("price") || "all");
    setInStockOnly(searchParams.get("inStock") === "true");
  }, [searchParams]);

  const updateURL = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.keys(newParams).forEach(key => {
      const val = newParams[key];
      if (val === null || val === "all" || val === "false") {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const [timeLeft, setTimeLeft] = useState({
  days: 2,
  hours: 14,
  minutes: 5,
  seconds: 30,
});

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      let { days, hours, minutes, seconds } = prev;

      if (seconds > 0) {
        seconds--;
      } else {
        seconds = 59;

        if (minutes > 0) {
          minutes--;
        } else {
          minutes = 59;

          if (hours > 0) {
            hours--;
          } else {
            hours = 23;

            if (days > 0) {
              days--;
            }
          }
        }
      }

      return { days, hours, minutes, seconds };
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        const allProducts = res.data.products || [];

        const dealProducts = allProducts
          .filter(
            (p: any) =>
              p.oldPrice &&
              Number(p.oldPrice) > Number(p.price)
          )
          .map((p: any) => ({
            ...p,
            id: p._id,
            category: p.category?.name || "Beauty",
          }));

        setProducts(dealProducts);
      })
      .catch((err) => {
        console.error("Failed to fetch deals:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
      category: product.category,
      rating: product.rating,
      description: product.description,
    });

    setToast(`${product.name} added to bag`);

    setTimeout(() => setToast(""), 2500);
  };
  const filteredProducts = products.filter((product) => {
  // DISCOUNT FILTER
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100,
        )
      : 0;

  if (discountFilter === "up20" && discount > 20) {
    return false;
  }

  if (
    discountFilter === "30-40" &&
    (discount < 30 || discount > 40)
  ) {
    return false;
  }

  if (discountFilter === "50" && discount !== 50) {
    return false;
  }

  // CATEGORY FILTER
  if (
    categoryFilter !== "all" &&
    product.category.toLowerCase() !== categoryFilter.toLowerCase()
  ) {
    return false;
  }

  // PRICE FILTER
  if (priceFilter === "under20" && product.price >= 20) {
    return false;
  }

  if (priceFilter === "under50" && product.price >= 50) {
    return false;
  }

  // AVAILABILITY FILTER
  if (inStockOnly && product.stock <= 0) {
    return false;
  }

  return true;
});

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fcf9f6] text-[#453633]">

        {/* DEALS HERO */}
        {/* <section className="border-b border-[#e7dcd7] bg-[#f3e7e2]"> */}
        <section className="border-b border-[#5a2028] bg-[#5a2028]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
            <div className="text-center">

              <div className="mb-5 flex items-center justify-center gap-4">
                <span className="h-px w-10 bg-[#d8c4bd]" />

                <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                  LUMÉRA BEAUTY
                </p>

                <span className="h-px w-10 bg-[#d8c4bd]" />
              </div>

              <h1 className="font-[Marcellus] text-6xl font-light leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
                Special
                <span className="text-[#b65f67]"> Deals</span>
              </h1>
              {/* COUNTDOWN TIMER */}
<div className="mt-8 flex flex-col items-center">
  <p className="mb-4 text-[25px] font-semibold uppercase tracking-[0.25em] text-white">
    OFFER Ends In
  </p>

  <div className="flex items-center gap-2 sm:gap-4">
    {/* DAYS */}
    <div className="flex min-w-[68px] flex-col items-center rounded-xl border border-[#d8c4bd] bg-white/10 px-3 py-3 shadow-sm backdrop-blur-sm sm:min-w-[82px]">
      <span className="font-[Marcellus] text-2xl text-white sm:text-3xl">
        {String(timeLeft.days).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/70">
        Days
      </span>
    </div>

    <span className="pb-5 text-xl text-white">:</span>

    {/* HOURS */}
    <div className="flex min-w-[68px] flex-col items-center rounded-xl border border-[#d8c4bd] bg-white/10 px-3 py-3 shadow-sm backdrop-blur-sm sm:min-w-[82px]">
      <span className="font-[Marcellus] text-2xl text-white sm:text-3xl">
        {String(timeLeft.hours).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/70">
        Hours
      </span>
    </div>

    <span className="pb-5 text-xl text-white">:</span>

    {/* MINUTES */}
    <div className="flex min-w-[68px] flex-col items-center rounded-xl border border-[#d8c4bd] bg-white/10 px-3 py-3 shadow-sm backdrop-blur-sm sm:min-w-[82px]">
      <span className="font-[Marcellus] text-2xl text-white sm:text-3xl">
        {String(timeLeft.minutes).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/70">
        Minutes
      </span>
    </div>

    <span className="pb-5 text-xl text-white">:</span>

    {/* SECONDS */}
    <div className="flex min-w-[68px] flex-col items-center rounded-xl border border-[#d8c4bd] bg-white/10 px-3 py-3 shadow-sm backdrop-blur-sm sm:min-w-[82px]">
      <span className="font-[Marcellus] text-2xl text-[#b65f67] sm:text-3xl">
        {String(timeLeft.seconds).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/70">
        Seconds
      </span>
    </div>
  </div>
</div>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
                Discover beautiful essentials at special prices,
                thoughtfully selected just for you.
              </p>

            </div>
          </div>
        </section>
               
        {/* DEALS CONTENT */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">

          <div className="mb-12 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#b65f67]">
              Limited Offers
            </p>

            <h2 className="mt-3 font-[Marcellus] text-4xl text-[#453633] md:text-5xl">
              Shop Our Deals
            </h2>
          </div>
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* LEFT SIDEBAR FILTERS */}
<aside className="w-full shrink-0 lg:w-1/4">
  <div className="sticky top-28 rounded-2xl border border-[#e7dcd7] bg-white p-7 shadow-sm">

    {/* FILTER HEADER */}
    <div className="mb-8 flex items-center justify-between">
      <h3 className="font-[Marcellus] text-2xl text-[#453633]">
        Filters
      </h3>

      <button
        type="button"
        onClick={() => {
          setDiscountFilter("all");
          setCategoryFilter("all");
          setPriceFilter("all");
          setInStockOnly(false);
          router.push(pathname, { scroll: false });
        }}
        className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b65f67] hover:underline"
      >
        Clear All
      </button>
    </div>

    {/* DISCOUNT */}
    <div className="mb-8">
      <h4 className="mb-5 text-[12px] font-bold uppercase tracking-[0.2em] text-[#a08c86]">
        Discount
      </h4>

      <div className="flex flex-col gap-4">
        {[
          { label: "All Discounts", value: "all" },
          { label: "Up to 20% OFF", value: "up20" },
          { label: "30% - 40% OFF", value: "30-40" },
          { label: "Half Price (50% OFF)", value: "50" },
        ].map((item) => (
          <label
            key={item.value}
            className="flex cursor-pointer items-center gap-3 group"
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                discountFilter === item.value
                  ? "border-[#b65f67]"
                  : "border-[#d8c4bd] group-hover:border-[#b65f67]"
              }`}
            >
              {discountFilter === item.value && (
                <div className="h-2.5 w-2.5 rounded-full bg-[#b65f67]" />
              )}
            </div>

            <input
              type="radio"
              name="discountFilter"
              value={item.value}
              checked={discountFilter === item.value}
              onChange={() => { setDiscountFilter(item.value); updateURL({ discount: item.value }); }}
              className="hidden"
            />

            <span
              className={`text-sm ${
                discountFilter === item.value
                  ? "font-medium text-[#b65f67]"
                  : "text-[#453633] group-hover:text-[#b65f67]"
              }`}
            >
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </div>

    <div className="mb-8 h-px w-full bg-[#e7dcd7]" />

    {/* CATEGORY */}
    <div className="mb-8">
      <h4 className="mb-5 text-[12px] font-bold uppercase tracking-[0.2em] text-[#a08c86]">
        Categories
      </h4>

      <div className="flex flex-col gap-4">
        {[
          { label: "All Categories", value: "all" },
          { label: "Makeup", value: "makeup" },
          { label: "Skin Care", value: "skin care" },
          { label: "Hair Care", value: "hair care" },
        ].map((item) => (
          <label
            key={item.value}
            className="flex cursor-pointer items-center gap-3 group"
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                categoryFilter === item.value
                  ? "border-[#b65f67]"
                  : "border-[#d8c4bd] group-hover:border-[#b65f67]"
              }`}
            >
              {categoryFilter === item.value && (
                <div className="h-2.5 w-2.5 rounded-full bg-[#b65f67]" />
              )}
            </div>

            <input
              type="radio"
              name="categoryFilter"
              value={item.value}
              checked={categoryFilter === item.value}
              onChange={() => { setCategoryFilter(item.value); updateURL({ category: item.value }); }}
              className="hidden"
            />

            <span
              className={`text-sm ${
                categoryFilter === item.value
                  ? "font-medium text-[#b65f67]"
                  : "text-[#453633] group-hover:text-[#b65f67]"
              }`}
            >
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </div>

    <div className="mb-8 h-px w-full bg-[#e7dcd7]" />

    {/* PRICE */}
    <div className="mb-8">
      <h4 className="mb-5 text-[12px] font-bold uppercase tracking-[0.2em] text-[#a08c86]">
        Price
      </h4>

      <div className="flex flex-col gap-4">
        {[
          { label: "All Prices", value: "all" },
          { label: "Under $20", value: "under20" },
          { label: "Under $50", value: "under50" },
        ].map((item) => (
          <label
            key={item.value}
            className="flex cursor-pointer items-center gap-3 group"
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                priceFilter === item.value
                  ? "border-[#b65f67]"
                  : "border-[#d8c4bd] group-hover:border-[#b65f67]"
              }`}
            >
              {priceFilter === item.value && (
                <div className="h-2.5 w-2.5 rounded-full bg-[#b65f67]" />
              )}
            </div>

            <input
              type="radio"
              name="priceFilter"
              value={item.value}
              checked={priceFilter === item.value}
              onChange={() => { setPriceFilter(item.value); updateURL({ price: item.value }); }}
              className="hidden"
            />

            <span
              className={`text-sm ${
                priceFilter === item.value
                  ? "font-medium text-[#b65f67]"
                  : "text-[#453633] group-hover:text-[#b65f67]"
              }`}
            >
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </div>

    <div className="mb-8 h-px w-full bg-[#e7dcd7]" />

    {/* AVAILABILITY */}
    <div>
      <h4 className="mb-5 text-[12px] font-bold uppercase tracking-[0.2em] text-[#a08c86]">
        Availability
      </h4>

      <label className="flex cursor-pointer items-center gap-3 group">
        <div
          className={`flex h-5 w-5 items-center justify-center rounded border ${
            inStockOnly
              ? "border-[#b65f67] bg-[#b65f67]"
              : "border-[#d8c4bd] group-hover:border-[#b65f67]"
          }`}
        >
          {inStockOnly && (
            <svg
              className="h-3 w-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>

        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => { setInStockOnly(e.target.checked); updateURL({ inStock: e.target.checked ? "true" : "false" }); }}
          className="hidden"
        />

        <span className="text-sm text-[#453633] group-hover:text-[#b65f67]">
          In Stock Only
        </span>
      </label>

      <p className="mt-3 text-xs leading-5 text-[#a08c86]">
        Show only deals that are currently available.
      </p>
    </div>

  </div>
</aside>
<div className="flex-1 w-full lg:w-3/4">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e7dcd7] border-t-[#b65f67]" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <div className="mb-6 text-5xl">♡</div>

              <h2 className="font-[Marcellus] text-3xl text-[#453633]">
                No Deals Available
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-[#927d77]">
                There are currently no products on sale.
                Please check back soon for special offers.
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex min-h-[400px] w-full flex-col items-center justify-center text-center">
              <h2 className="font-[Marcellus] text-2xl text-[#453633]">
                No Matches Found
              </h2>
              <p className="mt-2 text-sm text-[#927d77]">
                Try adjusting or clearing your filters to see more deals.
              </p>
            </div>
          ) : (
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
          )}
          </div>
</div>
        </section>

        {/* QUICK VIEW */}
        {quickView && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#2f2523]/60 px-4 py-6 backdrop-blur-md"
            onClick={() => setQuickView(null)}
          >
            <div
              className="relative flex flex-col md:grid max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-[#fcf9f6] shadow-2xl md:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setQuickView(null)}
                className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl text-[#453633] shadow"
              >
                ×
              </button>

              <div className="relative shrink-0 h-[40vh] md:h-auto md:min-h-[600px] bg-[#f3e7e2]">
                <img
                  src={quickView.image}
                  alt={quickView.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-start md:justify-center overflow-y-auto p-8 md:p-12">

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#b65f67]">
                  {quickView.category}
                </p>

                <h2 className="mt-4 font-[Marcellus] text-4xl text-[#453633]">
                  {quickView.name}
                </h2>

                <div className="mt-5">
                  {quickView.oldPrice && (
                    <span className="mr-3 text-lg text-gray-400 line-through">
                      ${quickView.oldPrice}
                    </span>
                  )}

                  <span className="font-[Marcellus] text-3xl text-[#453633]">
                    ${quickView.price}
                  </span>
                </div>

                <p className="mt-6 text-sm leading-7 text-[#806e68]">
                  {quickView.description}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart(quickView);
                    setQuickView(null);
                  }}
                  className="mt-8 w-full rounded-full bg-[#453633] py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#b65f67]"
                >
                  Add to Bag
                </button>

              </div>
            </div>
          </div>
        )}

        {/* TOAST */}
        {toast && (
          <div className="fixed bottom-7 right-7 z-[60] rounded-2xl border border-[#e7dcd7] bg-white px-5 py-4 shadow-xl">
            <p className="text-sm font-medium text-[#453633]">
              {toast}
            </p>
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}

export default function DealsPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e7dcd7] border-t-[#b65f67]"></div></div>}>
      <DealsContent />
    </Suspense>
  );
}
