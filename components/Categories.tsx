// import { Heart } from "lucide-react";

// const products = [
//   {
//     name: "Luméra Silk Glow Foundation",
//     image: "/foun.png",
//     oldPrice: "$65.00",
//     price: "$45.00",
//   },
//   {
//     name: "Midnight Rose Glow Serum",
//     image: "/ser.png",
//     oldPrice: "$75.00",
//     price: "$55.00",
//   },
//   {
//     name: "Velvet Kiss Lip Clay",
//     image: "/lip.png",
//     oldPrice: "$40.00",
//     price: "$28.00",
//   },
//   {
//     name: "Silk Repair Hair Mask",
//     image: "/hair.png",
//     oldPrice: "$50.00",
//     price: "$35.00",
//   },
// ];

// export default function TrendingProducts() {
//   return (
//     <section className="bg-white px-6 py-20">
//       <div className="mx-auto max-w-7xl">

//         {/* Heading */}
//         <div className="mb-10 text-center">
//           <p className="text-sm text-[#8f6f76]">
//             POPULAR PRODUCTS
//           </p>

//           <h2 className="mt-2 text-4xl font-medium tracking-tight text-[#171717] md:text-5xl">
//             Trending Now
//           </h2>
//         </div>

//         {/* Products */}
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

//           {products.map((product) => (
//             <div key={product.name} className="group">

//               {/* Image */}
//               <div className="relative aspect-square overflow-hidden bg-[#f7eef1]">

//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//                 />

//                 {/* Sale Badge */}
//                 <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-sm text-[#555] shadow-md">
//                   SALE
//                 </span>

//                 {/* Cart Button */}
//                  <button
//                   type="button"
//                   aria-label="Add to wishlist"
//                   className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#333] shadow-md transition hover:text-[#D4A6B6]"
//                 >
//                   <Heart className="h-5 w-5" />
//                 </button>
//               </div>

//               {/* Product Info */}
//               <div className="pt-4">
//                 <h3 className="text-base text-[#171717]">
//                   {product.name}
//                 </h3>

//                 <div className="mt-2 flex items-center gap-2 text-sm">
//                   <span className="text-gray-400 line-through">
//                     {product.oldPrice}
//                   </span>

//                   <span className="font-semibold text-[#333]">
//                     {product.price}
//                   </span>
//                 </div>
//               </div>

//             </div>
//           ))}

//         </div>
//       </div>
//     </section>
//   );
// }


// import Link from "next/link";

// export default function Categories() {
//   return (
//     <section className="bg-white px-6 py-20 border-t border-gray-100">
//       <div className="mx-auto max-w-7xl">

//         {/* Heading */}
//         <div className="mb-12 text-center">
//           <p className="text-sm tracking-[0.2em] text-[#8f6f76] uppercase font-[Marcellus]">
//             Shop by Category
//           </p>
//           <h2 className="mt-2 text-4xl font-medium tracking-tight text-[#171717] md:text-5xl font-[Marcellus]">
//             Our Categories
//           </h2>
//         </div>

//         {/* Grid for 3 Categories */}
//         <div className="grid gap-8 md:grid-cols-3">

//           {/* Category 1: Makeup */}
//           <Link href="/categories/makeup" className="group block">
//             <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#fdf5f7] shadow-sm">
//               <img 
//                 src="/makeup.png" 
//                 alt="Makeup" 
//                 className="h-full w-full object-cover transition duration-700 group-hover:scale-105" 
//               />
//             </div>
//             <div className="mt-5 text-center">
//               <h3 className="text-xl font-semibold text-[#171717] transition group-hover:text-[#D4A6B6]">
//                 Makeup
//               </h3>
//               <p className="mt-1 text-sm text-gray-500">Foundation, Lipsticks & More</p>
//             </div>
//           </Link>

//           {/* Category 2: Skin Care */}
//           <Link href="/categories/skincare" className="group block">
//             <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#fdf5f7] shadow-sm">
//               <img 
//                 src="/skin.png" 
//                 alt="Skin Care" 
//                 className="h-full w-full object-cover transition duration-700 group-hover:scale-105" 
//               />
//             </div>
//             <div className="mt-5 text-center">
//               <h3 className="text-xl font-semibold text-[#171717] transition group-hover:text-[#D4A6B6]">
//                 Skin Care
//               </h3>
//               <p className="mt-1 text-sm text-gray-500">Serums, Moisturizers & Cleansers</p>
//             </div>
//           </Link>

//           {/* Category 3: Hair Care */}
//           <Link href="/categories/haircare" className="group block">
//             <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#fdf5f7] shadow-sm">
//               <img 
//                 src="/hair1.png" 
//                 alt="Hair Care" 
//                 className="h-full w-full object-cover transition duration-700 group-hover:scale-105" 
//               />
//             </div>
//             <div className="mt-5 text-center">
//               <h3 className="text-xl font-semibold text-[#171717] transition group-hover:text-[#D4A6B6]">
//                 Hair Care
//               </h3>
//               <p className="mt-1 text-sm text-gray-500">Masks, Shampoos & Oils</p>
//             </div>
//           </Link>

//         </div>
//       </div>
//     </section>
//   );
// }



// import { Heart, Star, ShoppingCart } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "MAKEUP",
    description: "Discover luminous foundations, beautiful lip colors and everything you need to create your perfect look.",
    image: "/makeup.png",
    slug: "makeup",
  },
  {
    name: "SKIN CARE",
    description: "Nourish, hydrate and reveal naturally radiant skin with our carefully selected skincare essentials.",
    image: "/skin.png",
    slug: "skin-care",
  },
  {
    name: "HAIR CARE",
    description: "Give your hair the care it deserves with nourishing masks, oils and everyday essentials.",
    image: "/hair1.png",
    slug: "hair-care",
  },
  {
    name: "MAKEUP TOOLS",
    description: "Create a flawless finish with our professional brushes, sponges and essential beauty tools.",
    image: "/brush.png",
    slug: "makeup-tools",
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

        {/* Categories */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div key={category.name}
              className="group flex flex-col overflow-hidden rounded-2xl shadow-[0_8px_25px_rgba(69,54,51,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(69,54,51,0.14)]"

            >

              {/* IMAGE */}
              <div className="relative aspect-square overflow-hidden bg-[#f7eef1]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* CATEGORY INFO */}
              <div className="flex flex-1 flex-col border border-t-0 border-[#f0f0f0] bg-[#faf2f4] p-5">

                {/* CATEGORY */}
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6f76]">
                  {category.category}
                </p>

                {/* TITLE */}
                <h3 className="mt-3 font-[Marcellus] text-[20px] text-gray-900 ">
                  {category.name}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
                  {category.description}
                </p>

                {/* BUTTON */}
                <Link
                  href={`/${category.slug}`}
                  className="mt-6 inline-flex w-fit items-center rounded-full border border-[#453633] px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-[#453633] transition duration-300 hover:bg-[#d4a6b6] hover:text-white font-bold"
                >
                  Explore {category.name}
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1 font-bold">
                    →
                  </span>
                </Link>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
