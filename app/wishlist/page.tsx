
"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "@/components/WishlistContext";
import { useCart } from "@/components/CartContext";
import { useState, useEffect } from "react";


export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [toast, setToast] = useState("");
  const [dbProducts, setDbProducts] = useState<any[]>([]);

  useEffect(() => {
    import("@/lib/api").then(({ default: api }) => {
      api.get("/products")
        .then((res) => {
          if (res.data.products) {
            setDbProducts(res.data.products);
          }
        })
        .catch((err) => console.error("Failed to fetch products for wishlist:", err));
    });
  }, []);

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  return (
    <>
      <Navbar />
    <main className="min-h-screen bg-[#fcf9f6] text-[#453633]">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#e7dcd7] bg-[#f3e7e2]">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#ead4d0] opacity-50 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#ead4d0] opacity-40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 text-center md:px-10 md:py-20">

          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#d8c4bd]" />

            <p className="text-[14px] uppercase tracking-[0.4em] text-[#b65f67]">
              LUMÉRA BEAUTY
            </p>

            <span className="h-px w-10 bg-[#d8c4bd]" />
          </div>

          <h1 className="font-[Marcellus] text-5xl font-light md:text-7xl">
            My{" "}
            <span className="text-[#b65f67]">
              Wishlist
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#806e68] md:text-base">
            A little collection of everything you love.
            Keep your favorite beauty essentials close.
          </p>

         
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
        

        {wishlist.length === 0 ? (

          /* EMPTY STATE */
          <div className="mx-auto flex min-h-[430px] max-w-2xl flex-col items-center justify-center rounded-3xl border border-[#e7dcd7] bg-white px-6 py-16 text-center shadow-[0_10px_40px_rgba(69,54,51,0.05)]">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f3e7e2]">
              <Heart className="h-9 w-9 text-[#c58c9a]" />
            </div>

            <p className="mt-7 text-[10px] uppercase tracking-[0.35em] text-[#b65f67]">
              Nothing saved yet
            </p>

            <h2 className="mt-3 font-[Marcellus] text-4xl font-light md:text-5xl">
              Your wishlist is empty
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#927d77]">
              Discover something beautiful and save your favorite
              products here. Your next beauty essential might be
              waiting for you.
            </p>

            <Link
              href="/shop"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#453633] px-8 py-4 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-[#b65f67]"
            >
              Explore Products

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        ) : (

          <>
            {/* TOP ROW */}
            <div className="mb-10 flex flex-col gap-4 border-b border-[#e7dcd7] pb-6 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <p className="text-[12px] uppercase tracking-[0.3em] text-[#b65f67]">
                  Your Collection
                </p>

                <h2 className="mt-1 font-[Marcellus] text-3xl font-light">
                  Saved Beauty Essentials
                </h2>
              </div>

              
            </div>

            {/* PRODUCTS */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

              {wishlist.map((product) => {

                // Now we find the matching product from the live database
                const fullProduct = dbProducts.find(
                  (item) => String(item._id) === String(product.id) || String(item.id) === String(product.id)
                );

                return (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-2xl border border-[#e7dcd7] bg-white shadow-[0_8px_30px_rgba(69,54,51,0.04)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(69,54,51,0.10)]"
                  >

                    {/* IMAGE */}
                    <div className="relative overflow-hidden bg-[#f3e7e2]">

                      <Link href={`/product/${product.id}`}>
                        <div className="aspect-[4/5]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />
                        </div>
                      </Link>

                      {/* SAVED BADGE */}
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-white/90 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-[#b65f67] shadow-sm backdrop-blur-sm">
                          Saved
                        </span>
                      </div>

                      {/* REMOVE */}
                      <button
                        type="button"
                        onClick={() => {
                          removeFromWishlist(product.id);
                          showToast(
                            `${product.name} removed from wishlist`
                          );
                        }}
                        aria-label={`Remove ${product.name} from wishlist`}
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#806e68] shadow-sm backdrop-blur-sm transition hover:bg-[#453633] hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* DETAILS */}
                    <div className="p-5">

                      {/* CATEGORY */}
                      {fullProduct?.category && (
                        // <p className="text-[9px] uppercase tracking-[0.25em] text-[#b65f67]">
                        <p className="text-sm uppercase tracking-[0.2em] text-[#b65f67]">
                          {fullProduct.category.name || fullProduct.category}
                        </p>
                      )}

                      {/* NAME + PRICE */}
                      <div className="mt-2 flex items-start justify-between gap-4">

                        <Link
                          href={`/product/${product.id}`}
                          className="min-w-0"
                        >
                          <h3 className="font-[Marcellus] text-xl leading-snug transition-colors group-hover:text-[#b65f67]">
                            {product.name}
                          </h3>
                        </Link>

                        <p className="shrink-0 text-base font-medium">
                          ${product.price}
                        </p>
                      </div>

                      {/* RATING */}
                      {fullProduct?.rating && (
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-sm tracking-wide text-[#c98b6d]">
                            ★★★★★
                          </span>

                          <span className="text-xs text-[#927d77]">
                            {fullProduct.rating}
                          </span>
                        </div>
                      )}

                      {/* ACTIONS */}
                      <div className="mt-5 flex gap-2">

                        <button
                          type="button"
                          onClick={() => {
                            addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              stock: fullProduct?.stock || 0,
                              category: fullProduct?.category?.name || fullProduct?.category,
                              description: fullProduct?.description,
                              rating: fullProduct?.rating,
                            });
                            
                            removeFromWishlist(product.id);

                            showToast(
                              `${product.name} added to bag`
                            );
                          }}
                          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#453633] py-3.5 text-[10px] uppercase tracking-[0.16em] text-white transition hover:bg-[#b65f67]"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Add to Bag
                        </button>

                        <Link
                          href={`/product/${product.id}`}
                          className="flex items-center justify-center rounded-full border border-[#d8c4bd] px-4 text-[#806e68] transition hover:border-[#b65f67] hover:text-[#b65f67]"
                          aria-label={`View ${product.name}`}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Link>

                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* BOTTOM SHOP CTA */}
          {/* CONTINUE SHOPPING */}
<div className="mt-20 border-t border-[#e7dcd7] pt-16">
  <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#e7dcd7] bg-white px-8 py-10 md:flex-row md:px-12">
    
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-[#b65f67]">
        Keep exploring
      </p>

      <h2 className="mt-2 font-[Marcellus] text-3xl text-[#453633]">
        Find something you’ll love
      </h2>

      <p className="mt-2 text-sm text-[#806e68]">
        Discover more beauty essentials from LUMÉRA.
      </p>
    </div>

    <Link
      href="/shop"
      className="shrink-0 rounded-full bg-[#453633] px-8 py-4 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-[#b65f67]"
    >
      Continue Shopping
    </Link>

  </div>
</div>
          </>
        )}
      </section>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-7 right-7 z-[60] flex max-w-[calc(100vw-2rem)] items-center gap-4 rounded-2xl border border-[#e7dcd7] bg-white px-5 py-4 shadow-[0_10px_35px_rgba(69,54,51,0.15)]">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f3e7e2] text-[#b65f67]">
            ✓
          </div>

          <div className="pr-2">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#a08c86]">
              Wishlist Updated
            </p>

            <p className="mt-1 text-sm font-medium text-[#453633]">
              {toast}
            </p>
          </div>
        </div>
      )}
    </main>
     <Footer />
     </>
  );
}

