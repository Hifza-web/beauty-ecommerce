"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import api from "@/lib/api";

export type Product = {
  id: string | number; // Updated for MongoDB _id and ProductCard
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  category: string;
  badge?: "NEW" | "BESTSELLER" | "VEGAN";
  description: string;
  stock: number;
  _id?: string;
};

function ShopContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const urlCategory = searchParams.get("category") || "All";
  const urlSearch = searchParams.get("search") || "";
  const urlSort = searchParams.get("sort") || "featured";
  const urlPage = Number(searchParams.get("page")) || 1;
  const urlBadge = searchParams.get("badge") || "";
  const urlSale = searchParams.get("sale") === "true";
  const urlInStock = searchParams.get("inStock") === "true";

  const initialBadges = urlBadge ? urlBadge.split(",") : [];
  if (urlSale) initialBadges.push("sale");

  const [category, setCategory] = useState<string[]>(
    urlCategory === "All" ? [] : urlCategory.split(","),
  );
  const [badge, setBadge] = useState<string[]>(initialBadges);
  const [inStock, setInStock] = useState(urlInStock);
  const [search, setSearch] = useState(urlSearch);
  const [sort, setSort] = useState(urlSort);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [toast, setToast] = useState("");
  const [currentPage, setCurrentPage] = useState(urlPage);

  // Sync state from URL (e.g. when user clicks browser back button)
  useEffect(() => {
    setCategory(urlCategory === "All" ? [] : urlCategory.split(","));
    setSearch(urlSearch);
    setSort(urlSort);
    setCurrentPage(urlPage);

    const newBadges = urlBadge ? urlBadge.split(",") : [];
    if (urlSale) newBadges.push("sale");
    setBadge(newBadges);

    setInStock(urlInStock);
  }, [urlCategory, urlSearch, urlSort, urlPage, urlBadge, urlSale, urlInStock]);

  // Sync state to URL when user interacts
  useEffect(() => {
    const params = new URLSearchParams();

    if (category.length > 0) {
      params.set("category", category.join(","));
    }
    if (search) params.set("search", search);
    if (sort !== "featured") params.set("sort", sort);
    if (badge.length > 0) {
      const regularBadges = badge.filter(b => b !== "sale");
      if (regularBadges.length > 0) {
        params.set("badge", regularBadges.join(","));
      }
      if (badge.includes("sale")) {
        params.set("sale", "true");
      }
    }
    if (inStock) params.set("inStock", "true");
    if (currentPage > 1) params.set("page", currentPage.toString());

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const newUrl = `${pathname}${queryString}`;

    // Only update if the URL actually needs to change, to avoid infinite loops
    const currentQueryString = searchParams.toString()
      ? `?${searchParams.toString()}`
      : "";

    // Sort parameters to compare them reliably regardless of order
    const sortedNew = new URLSearchParams(queryString);
    const sortedCurrent = new URLSearchParams(currentQueryString);
    sortedNew.sort();
    sortedCurrent.sort();

    if (sortedNew.toString() !== sortedCurrent.toString()) {
      router.replace(newUrl, { scroll: false });
    }
  }, [
    category,
    search,
    sort,
    badge,
    inStock,
    currentPage,
    pathname,
    router,
    searchParams,
  ]);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setIsLoading(true);

    const params = new URLSearchParams();
    if (category.length > 0) {
      params.set("category", category.join(","));
    }
    if (search) params.set("search", search);
    if (badge.length > 0) {
      const regularBadges = badge.filter(b => b !== "sale");
      if (regularBadges.length > 0) {
        params.set("badge", regularBadges.join(","));
      }
      if (badge.includes("sale")) {
        params.set("sale", "true");
      }
    }
    if (inStock) params.set("inStock", "true");

    const queryString = params.toString() ? `?${params.toString()}` : "";

    api
      .get(`/products${queryString}`)
      .then((res) => {
        if (!res.data.products) {
          setErrorMsg(
            "API returned successfully, but 'products' array is missing: " +
              JSON.stringify(res.data),
          );
          return;
        }
        const mappedProducts = res.data.products.map((p: any) => ({
          ...p,
          id: p._id,
          category: p.category?.name || "No Category",
        }));
        setProducts(mappedProducts);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setErrorMsg("Failed to fetch products: " + err.message);
      })
      .finally(() => setIsLoading(false));
  }, [category, search, badge, inStock]);

  const productsPerPage = 12;

  const filteredProducts = useMemo(() => {
    // Filtering is now handled by the Backend API!
    let result = [...products];

    // Sort is still handled locally
    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [sort, products]);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

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

    setToast(product.name);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fcf9f6] text-[#453633]">
        {/* SHOP HEADER */}
        {/* <section className="border-b border-[#e7dcd7] bg-[#fcf9f6]"> */}
        <section className="border-b border-[#e7dcd7] bg-[#f3e7e2] shadow-sm">
          {/* <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16"> */}
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
            <div className="text-center">
              {/* Small Label */}
              <div className="mb-5 flex items-center justify-center gap-4">
                <span className="h-px w-10 bg-[#d8c4bd]" />

                <p className="text-xs uppercase tracking-[0.35em] text-[#b65f67]">
                  LUMÉRA BEAUTY
                </p>

                <span className="h-px w-10 bg-[#d8c4bd]" />
              </div>

              {/* Heading */}

              <h1 className="font-[Marcellus] text-6xl font-light leading-[0.95] tracking-tight text-[#40322f] md:text-7xl lg:text-8xl">
                Shop
                <span className="font-[Marcellus] text-[#b65f67]"> All</span>
              </h1>

              {/* Description */}
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#806e68] md:text-lg">
                Discover beauty essentials thoughtfully selected to elevate your
                everyday ritual.
              </p>
            </div>
          </div>
        </section>

        {/* TOOLBAR */}
        <section className="sticky top-0 z-30 border-b border-[#e7dcd7] bg-[#fcf9f6]/95 backdrop-blur-md">
          {/* const [categories, setCategories] = useState<string[]>(["All"]); */}
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 md:px-10">
            {/* SEARCH (Rounded with elegant icon) */}
            <div className="relative w-full lg:w-[280px]">
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search collection..."
                className="w-full rounded-full border border-[#d8c4bd] bg-white px-5 py-3 pr-10 text-sm text-[#453633] outline-none placeholder:text-[#a99690] transition-all hover:border-[#b65f67] focus:border-[#b65f67] focus:ring-1 focus:ring-[#b65f67]"
              />
              <svg
                className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a99690]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* SORT (Custom Styled Dropdown) */}
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.2em] text-black font-bold hidden md:inline">
                Sort By
              </span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none cursor-pointer rounded-full border border-[#d8c4bd] bg-white py-2.5 pl-5 pr-10 text-sm text-[#453633] outline-none transition-all hover:border-[#b65f67] focus:border-[#b65f67]"
                >
                  <option value="featured">Featured</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a99690]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT AREA */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* LEFT SIDEBAR FILTERS */}
            <aside className="w-full lg:w-1/4 shrink-0">
              <div className="sticky top-28 rounded-2xl bg-white p-7 border border-[#e7dcd7] shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-[Marcellus] text-2xl text-[#453633]">
                    Filters
                  </h3>
                  {(badge.length > 0 || inStock) && (
                    <button
                      onClick={() => {
                        setBadge([]);
                        setInStock(false);
                        setCurrentPage(1);
                      }}
                      className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b65f67] hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Availability */}
                <div className="mb-8">
                  <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#a08c86] mb-5">
                    Availability
                  </h4>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`flex items-center justify-center w-5 h-5 rounded border transition-colors ${inStock ? "bg-[#b65f67] border-[#b65f67]" : "border-[#d8c4bd] group-hover:border-[#b65f67]"}`}
                    >
                      {inStock && (
                        <svg
                          className="w-3 h-3 text-white"
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
                      className="hidden"
                      checked={inStock}
                      onChange={(e) => {
                        setInStock(e.target.checked);
                        setCurrentPage(1);
                      }}
                    />
                    <span className="text-sm text-[#453633] group-hover:text-[#b65f67] transition-colors">
                      In Stock Only
                    </span>
                  </label>
                </div>

                <div className="h-px bg-[#e7dcd7] mb-8 w-full" />
                {/* Categories */}
                <div className="mb-8">
                  <h4 className="mb-5 text-[12px] font-bold uppercase tracking-[0.2em] text-[#a08c86]">
                    Categories
                  </h4>

                  <div className="flex flex-col gap-4">
                    {[
                      { label: "All Categories", value: "All" },
                      { label: "Makeup", value: "Makeup" },
                      { label: "Skin Care", value: "Skin Care" },
                      { label: "Hair Care", value: "Hair Care" },
                    ].map((item) => (
                      <label
                        key={item.value}
                        className="flex cursor-pointer items-center gap-3 group"
                      >
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                            item.value === "All"
                              ? category.length === 0
                              : category.includes(item.value)
                                ? "border-[#b65f67]"
                                : "border-[#d8c4bd] group-hover:border-[#b65f67]"
                          }`}
                        >
                          {(item.value === "All" ? category.length === 0 : category.includes(item.value)) && (
                            <div className="h-2.5 w-2.5 rounded-full bg-[#b65f67]" />
                          )}
                        </div>

                        <input
                          type="checkbox"
                          name="categoryFilter"
                          className="hidden"
                          checked={
                            item.value === "All"
                              ? category.length === 0
                              : category.includes(item.value)
                          }
                          onChange={() => {
                            if (item.value === "All") {
                              setCategory([]);
                            } else {
                              setCategory((prev) =>
                                prev.includes(item.value)
                                  ? prev.filter((cat) => cat !== item.value)
                                  : [...prev, item.value],
                              );
                            }
                            setCurrentPage(1);
                          }}
                        />

                        <span
                          className={`text-sm transition-colors ${
                            item.value === "All"
                              ? category.length === 0
                              : category.includes(item.value)
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

                {/* Collections */}
                <div>
                  <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#a08c86] mb-5">
                    Collections
                  </h4>
                  <div className="flex flex-col gap-4">
                    {[
                      { label: "All Collections", value: "" },
                      { label: "Sale", value: "sale" },
                      { label: "Vegan", value: "vegan" },
                      { label: "Bestseller", value: "bestseller" },
                      { label: "New Arrivals", value: "new" },
                    ].map((item) => (
                      <label
                        key={item.value}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                            item.value === ""
                              ? badge.length === 0
                              : badge.includes(item.value)
                                ? "border-[#b65f67]"
                                : "border-[#d8c4bd] group-hover:border-[#b65f67]"
                          }`}
                        >
                          {(item.value === "" ? badge.length === 0 : badge.includes(item.value)) && (
                            <div className="h-2.5 w-2.5 rounded-full bg-[#b65f67]" />
                          )}
                        </div>

                        <input
                          type="checkbox"
                          name="badgeFilter"
                          className="hidden"
                          checked={
                            item.value === ""
                              ? badge.length === 0
                              : badge.includes(item.value)
                          }
                          onChange={() => {
                            if (item.value === "") {
                              setBadge([]);
                            } else {
                              setBadge((prev) =>
                                prev.includes(item.value)
                                  ? prev.filter((b) => b !== item.value)
                                  : [...prev, item.value],
                              );
                            }
                            setCurrentPage(1);
                          }}
                        />

                        <span
                          className={`text-sm transition-colors ${
                            item.value === ""
                              ? badge.length === 0
                              : badge.includes(item.value)
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
              </div>
            </aside>

            {/* PRODUCT GRID CONTAINER */}
            <div className="flex-1 w-full lg:w-3/4">
              {/* ERROR DISPLAY FOR DEBUGGING */}
              {errorMsg && (
                <div className="mb-6 rounded-xl bg-red-50 p-4 border border-red-200 text-red-600 text-center">
                  <p className="font-bold">Debug Error:</p>
                  <p className="font-mono text-sm mt-1">{errorMsg}</p>
                  <p className="mt-2 text-xs">
                    Ensure your backend server is running at
                    http://localhost:5000
                  </p>
                </div>
              )}

              {!isLoading && filteredProducts.length === 0 ? (
                <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
                  <div className="mb-6 text-6xl">☹</div>

                  <h2 className="font-serif text-4xl">No products found</h2>

                  <p className="mt-4 text-base text-[#927d77]">
                    Try a different search or category.
                  </p>

                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory([]);
                      setCurrentPage(1);
                    }}
                    className="mt-8 rounded-full bg-[#453633] px-8 py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-[#b65f67]"
                  >
                    View All Products
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-10 flex items-center justify-between">
                    {(search || category.length > 0) && (
                      <button
                        onClick={() => {
                          setSearch("");
                          setCategory([]);
                          setCurrentPage(1);
                        }}
                        className="text-sm text-[#b65f67] hover:underline"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm text-black font-bold">
                      Showing{" "}
                      <span className="font-medium text-[#453633]">
                        {filteredProducts.length === 0 ? 0 : startIndex + 1}
                        {"–"}
                        {Math.min(
                          startIndex + productsPerPage,
                          filteredProducts.length,
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-[#453633]">
                        {filteredProducts.length}
                      </span>{" "}
                      Products
                    </p>
                  </div>
                  {/* PRODUCTS GRID */}
                  <div className="flex-1">
                    {isLoading ? (
                      <div className="flex h-64 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e7dcd7] border-t-[#b65f67]"></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                        {currentProducts.map((product) => (
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
                </>
              )}
            </div>
          </div>
        </section>

        {/* PAGINATION */}

        {totalPages > 1 && (
          <section className="border-t border-[#e7dcd7] py-12">
            <div className="flex items-center justify-center gap-3">
              {/* PREVIOUS */}
              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="mr-2 text-sm uppercase tracking-[0.15em] text-[#806e68] transition hover:text-[#b65f67]"
                >
                  ← Previous
                </button>
              )}

              {/* PAGE NUMBERS */}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-sm transition ${
                      currentPage === page
                        ? "bg-[#453633] text-white"
                        : "text-[#806e68] hover:bg-[#f5e0dc]"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              {/* NEXT */}
              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="ml-2 text-sm uppercase tracking-[0.15em] text-[#806e68] transition hover:text-[#b65f67]"
                >
                  Next →
                </button>
              )}
            </div>
          </section>
        )}

        {/* QUICK VIEW */}
        {quickView && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#2f2523]/60 px-4 py-6 backdrop-blur-md"
            onClick={() => setQuickView(null)}
          >
            <div
              className="relative flex flex-col md:grid max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/40 bg-[#fcf9f6] shadow-[0_30px_80px_rgba(69,54,51,0.25)] md:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON */}
              <button
                type="button"
                onClick={() => setQuickView(null)}
                aria-label="Close quick view"
                className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#e7dcd7] bg-white/95 text-2xl font-light text-[#453633] shadow-sm transition-all duration-300 hover:rotate-90 hover:bg-[#453633] hover:text-white"
              >
                ×
              </button>

              {/* IMAGE */}
              <div className="relative shrink-0 h-[40vh] md:h-auto md:min-h-[620px] bg-[#f3e7e2]">
                <img
                  src={quickView.image}
                  alt={quickView.name}
                  className="h-full w-full object-cover"
                />

                {/* IMAGE LABEL */}
                <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#806e68] backdrop-blur-sm">
                  LUMÉRA BEAUTY
                </div>
              </div>

              {/* PRODUCT INFORMATION */}
              <div className="flex flex-1 flex-col justify-start md:justify-center overflow-y-auto p-7 sm:p-10 md:p-12 lg:p-14">
                {/* CATEGORY */}
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#b65f67]">
                  {quickView.category}
                </p>

                {/* NAME */}
                <h2 className="mt-4 max-w-md font-serif text-4xl font-light leading-tight text-[#453633] sm:text-5xl">
                  {quickView.name}
                </h2>

                {/* RATING */}
                <div className="mt-5 flex items-center gap-3">
                  <span className="text-sm tracking-[0.12em] text-[#c98b6d]">
                    ★★★★★
                  </span>

                  <span className="text-sm text-[#927d77]">
                    {quickView.rating.toFixed(1)}
                  </span>
                </div>

                {/* PRICE */}
                <div className="mt-6">
                  <span className="font-serif text-3xl text-[#453633]">
                    ${quickView.price.toFixed(2)}
                  </span>
                </div>

                {/* DIVIDER */}
                <div className="my-7 h-px bg-[#e7dcd7]" />

                {/* DESCRIPTION */}
                <p className="max-w-lg text-sm leading-7 text-[#806e68]">
                  {quickView.description}
                </p>

                {/* PRODUCT FEATURES */}
                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[#e7dcd7] bg-white/60 px-4 py-3">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#a08c86]">
                      Quality
                    </p>
                    <p className="mt-1 text-xs text-[#453633]">
                      Premium Beauty
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#e7dcd7] bg-white/60 px-4 py-3">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#a08c86]">
                      Collection
                    </p>
                    <p className="mt-1 text-xs text-[#453633]">LUMÉRA Beauty</p>
                  </div>
                </div>

                {/* ADD TO BAG */}
                <button
                  type="button"
                  onClick={() => {
                    addToCart({
                      id: quickView.id,
                      name: quickView.name,
                      price: quickView.price,
                      image: quickView.image,
                      stock: quickView.stock,
                      category: quickView.category,
                      rating: quickView.rating,
                      description: quickView.description,
                    });

                    setQuickView(null);

                    setToast(`${quickView.name} added to bag`);

                    setTimeout(() => {
                      setToast("");
                    }, 2500);
                  }}
                  className="mt-8 flex w-full items-center justify-center rounded-full bg-[#453633] py-4 text-xs uppercase tracking-[0.2em] text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b65f67] hover:shadow-lg"
                >
                  Add to Bag
                </button>

                {/* SMALL NOTE */}
                <p className="mt-4 text-center text-[10px] uppercase tracking-[0.12em] text-[#a08c86]">
                  Secure checkout · Easy returns
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TOAST */}
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
      </main>
      <Footer />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fcf9f6]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e7dcd7] border-t-[#b65f67]"></div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
