import { Heart, Star, ShoppingCart } from "lucide-react";

const products = [
  {
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
    category: "SKIN CARE",
    name: " Defense Sunscreen (SPF 50)",
    description: "Broad-spectrum UVA/UVB protection with a lightweight, non-greasy matte finish for everyday wear.",
    rating: "4.8",
    reviews: 95,
    image: "/sunscreen.jpg",
    oldPrice: "$75.00",
    price: "$55.00",
  },
  {
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


export default function TrendingProducts() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-sm text-[#8f6f76] font-[Marcellus]">SHOP BY CATEGORY</p>
          <h2 className="mt-2 text-4xl font-medium font-[Marcellus] tracking-tight text-[#171717] md:text-5xl">
            Our Categories
          </h2>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.name} className="group flex flex-col">
              
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
                  aria-label="Add to wishlist"
                  className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#333] shadow-md transition hover:text-[#D4A6B6]"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              {/* Product Info (Screenshot Style) */}
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