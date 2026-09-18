// "use client";

// import { useState } from "react";

// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   rating: number;
//   category?: string;
// };

// type ProductCardProps = {
//   product: Product;
// };

// export default function ProductCard({ product }: ProductCardProps) {
//   const [wishlist, setWishlist] = useState(false);

//   return (
//     <div className="group">
//       {/* Image */}
//       <div className="relative aspect-[4/5] overflow-hidden bg-[#f3ebe7]">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
//         />

//         {/* Category */}
//         {product.category && (
//           <span className="absolute left-4 top-4 bg-white/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#6d5550] backdrop-blur-sm">
//             {product.category}
//           </span>
//         )}

//         {/* Wishlist */}
//         <button
//           onClick={() => setWishlist(!wishlist)}
//           aria-label="Add to wishlist"
//           className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl text-[#6d5550] shadow-sm backdrop-blur-sm transition hover:bg-white"
//         >
//           {wishlist ? "♥" : "♡"}
//         </button>

//         {/* Add to Bag */}
//         <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-white/95 p-4 transition duration-500 group-hover:translate-y-0">
//           <button className="w-full bg-[#4b3835] py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#6d5550]">
//             Add to Bag
//           </button>
//         </div>
//       </div>

//       {/* Product Information */}
//       <div className="px-1 pt-5">
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <h2 className="text-[15px] font-medium tracking-wide text-[#453633]">
//               {product.name}
//             </h2>

//             <p className="mt-2 text-xs text-[#927d77]">
//               ★ {product.rating}
//             </p>
//           </div>

//           <p className="whitespace-nowrap text-sm font-medium text-[#453633]">
//             ${product.price}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";

// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   rating: number;
//   category?: string;
//   badge?: "NEW" | "BESTSELLER" | "VEGAN";
//   description?: string;
// };

// type ProductCardProps = {
//   product: Product;
//   onQuickView: (product: Product) => void;
//   onWishlist: (product: Product) => void;
//   isFaded?: boolean;
// };

// export default function ProductCard({
//   product,
//   onQuickView,
//   onWishlist,
//   isFaded = false,
// }: ProductCardProps) {
//   const [wishlist, setWishlist] = useState(false);

//   const handleWishlist = () => {
//     setWishlist(!wishlist);
//     onWishlist(product);
//   };

//   return (
//     <div
//       className={`group transition-all duration-500 ${
//         isFaded ? "scale-[0.98] opacity-40" : "opacity-100"
//       }`}
//     >
//       {/* Image */}
//       <div className="relative aspect-[4/5] overflow-hidden bg-[#f3ebe7]">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
//         />

//         {/* Product Badge */}
//         {product.badge && (
//           <span
//             className={`absolute left-4 top-4 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.2em] ${
//               product.badge === "NEW"
//                 ? "bg-[#9b5555] text-white"
//                 : product.badge === "BESTSELLER"
//                 ? "bg-[#453633] text-white"
//                 : "bg-[#71806c] text-white"
//             }`}
//           >
//             {product.badge}
//           </span>
//         )}

//         {/* Wishlist */}
//         <button
//           onClick={handleWishlist}
//           aria-label="Add to wishlist"
//           className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-[#f5e0dc] ${
//             wishlist ? "scale-110" : "scale-100"
//           }`}
//         >
//           <span
//             className={`transition-all duration-300 ${
//               wishlist ? "text-[#b65f67]" : "text-[#6d5550]"
//             }`}
//           >
//             {wishlist ? "♥" : "♡"}
//           </span>
//         </button>

//         {/* Quick View + Add to Bag */}
//         <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-white/95 p-3 backdrop-blur-sm transition duration-500 group-hover:translate-y-0">
//           <div className="grid grid-cols-2 gap-2">
//             <button
//               onClick={() => onQuickView(product)}
//               className="border border-[#453633] py-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[#453633] transition hover:bg-[#f5e0dc]"
//             >
//               Quick View
//             </button>

//             <button className="bg-[#453633] py-3 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#6d5550]">
//               Add to Bag
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Product Information */}
//       <div className="px-1 pt-5">
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <h2 className="text-[15px] font-medium tracking-wide text-[#453633]">
//               {product.name}
//             </h2>

//             <p className="mt-2 text-xs text-[#927d77]">
//               ★ {product.rating}
//             </p>
//           </div>

//           <p className="whitespace-nowrap text-sm font-medium text-[#453633]">
//             ${product.price}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useCart } from "@/components/CartContext";
import Link from "next/link";
import { useWishlist } from "@/components/WishlistContext";
type Product = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  stock: number;
  badge?: "NEW" | "BESTSELLER" | "VEGAN";
  description: string;
  oldPrice?: number;
};

type Props = {
  product: Product;
  onQuickView: (product: Product) => void;
  onWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
};

export default function ProductCard({
  product,
  onQuickView,
  onWishlist,
  onAddToCart,
}: Props) {
  // const [liked, setLiked] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const liked = isInWishlist(product.id);

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }

    onWishlist(product);
  };
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      rating: product.rating,
      description: product.description,
      stock: product.stock,
    });
  };

return (
  <article className="group overflow-hidden rounded-2xl bg-[#faf2f4] shadow-[0_8px_25px_rgba(69,54,51,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(69,54,51,0.14)]">

    {/* PRODUCT IMAGE */}
    <div className="relative aspect-square overflow-hidden bg-[#f7eef1]">

      <Link href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      {/* SALE DISCOUNT */}
      {product.oldPrice && product.oldPrice > product.price && (
        <div className="absolute left-5 top-[58px] z-10">
          <span className="inline-block rounded-full bg-[#b65f67] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white shadow-md">
            {Math.round(
              ((product.oldPrice - product.price) / product.oldPrice) * 100
            )}
            % OFF
          </span>
        </div>
      )}

      {/* PRODUCT BADGE */}
      {product.badge && (
        <div className="absolute left-5 top-5 z-10">
          <span
            className={`inline-block rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] ${
              product.badge === "NEW"
                ? "bg-white text-[#a45b63]"
                : product.badge === "VEGAN"
                  ? "bg-[#eef1e9] text-[#65705b]"
                  : "bg-[#453633] text-white"
            }`}
          >
            {product.badge}
          </span>
        </div>
      )}

      {/* WISHLIST */}
      <button
        type="button"
        aria-label="Add to wishlist"
        onClick={handleWishlist}
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#333] shadow-md transition-all duration-300 hover:scale-105 hover:text-[#D4A6B6]"
      >
        <Heart
          className={`h-5 w-5 transition-all duration-300 ${
            liked
              ? "fill-[#D4A6B6] text-[#D4A6B6]"
              : "text-[#333]"
          }`}
        />
      </button>

      {/* HOVER ACTIONS — SAME AS BEFORE */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full space-y-2 p-5 transition-transform duration-500 ease-out group-hover:translate-y-0">
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="w-full rounded-full bg-[#453633] py-4 text-[11px] uppercase tracking-[0.25em] text-white shadow-sm transition hover:bg-[#b65f67]"
        >
          Add to Bag
        </button>

        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="w-full rounded-full bg-white/95 py-3 text-[11px] uppercase tracking-[0.25em] text-[#453633] shadow-sm backdrop-blur-sm transition hover:bg-[#f5e0dc]"
        >
          Quick View
        </button>
      </div>
    </div>

    {/* PRODUCT INFORMATION — TRENDING PRODUCTS STYLE */}
    <div className="flex flex-col border-t border-[#f0f0f0] bg-[#faf2f4] p-5">

      {/* CATEGORY + RATING */}
      <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-black">
        <span className="uppercase">
          {product.category}
        </span>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-[2px]">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={
                  star <= Math.floor(product.rating)
                    ? "text-[#f59e0b]"
                    : "text-[#d9cbc5]"
                }
              >
                ★
              </span>
            ))}
          </div>

          <span className="font-bold text-gray-900">
            {product.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* PRODUCT NAME */}
      <Link href={`/product/${product.id}`}>
        <h3 className="mt-3 line-clamp-1 text-[17px] font-bold text-gray-900 transition-colors group-hover:text-[#b65f67]">
          {product.name}
        </h3>
      </Link>

      {/* DESCRIPTION */}
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
        {product.description}
      </p>

      {/* DIVIDER */}
      <div className="my-5 border-t border-gray-200" />

      {/* PRICE */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>

          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>

       
      </div>

    </div>
  </article>
);
}
