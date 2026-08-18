// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Image from "next/image";
// import { Sparkles, Heart, Star } from "lucide-react";

// export default function About() {
//   return (
//     <>
//       <Navbar />

//       <main className="bg-[#faf2f4]">
//         {/* Hero */}
//         <section className="relative overflow-hidden py-20 md:py-28">
//           <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
//             <div>
//               <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-[#9b7777]">
//                 About Us
//               </p>

//               <h1 className="mb-6 text-5xl font-semibold leading-tight tracking-tight text-[#4b3838] md:text-6xl">
//                 Beauty that feels
//                 <span className="block font-normal italic">
//                   beautifully you.
//                 </span>
//               </h1>

//               <p className="max-w-xl text-base leading-8 text-[#6f5a5a]">
//                 Discover a thoughtfully curated world of beauty, skincare,
//                 and self-care designed to bring elegance and confidence
//                 into your everyday routine.
//               </p>
//             </div>

//             <div className="relative">
//               <div className="h-[430px] rounded-3xl bg-[#ead6d4] p-5">
//                 <div className="relative h-full overflow-hidden rounded-2xl bg-[#f5e5e3]">
//                   <Image
//                     src="/bbb.jpg"
//                     alt="LUMÉRA beauty products styled on a soft background"
//                     fill
//                     priority
//                     sizes="(min-width: 768px) 480px, 100vw"
//                     className="object-cover"
//                   />
//                   <div className="absolute inset-0 bg-black/10" />
//                   <div className="relative flex h-full items-end p-8">
//                     <div>
//                       <p className="mb-2 text-sm uppercase tracking-[0.3em] text-white">
//                         Since day one
//                       </p>
//                       <h3 className="text-3xl font-semibold text-white">
//                         Made for your beauty ritual
//                       </h3>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Our Story */}
//         <section className="mx-auto max-w-6xl px-6 py-20">
//           <div className="grid items-center gap-12 md:grid-cols-2">
//             <div className="order-2 md:order-1">
//               <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-[#9b7777]">
//                 Our Story
//               </p>

//               <h2 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-[#4b3838]">
//                 A little beauty,
//                 <span className="block font-normal italic">
//                   a lot of confidence.
//                 </span>
//               </h2>

//               <p className="mb-5 leading-8 text-[#6f5a5a]">
//                 LUMÉRA was created with a simple idea: beauty should feel
//                 personal, effortless, and enjoyable. We believe the right
//                 products can turn everyday moments into something special.
//               </p>

//               <p className="leading-8 text-[#6f5a5a]">
//                 From skincare essentials to makeup and hair care, we bring
//                 together carefully selected beauty products so you can
//                 create a routine that feels completely yours.
//               </p>

//               <div className="mt-8 flex gap-10 border-t border-[#e6d3d1] pt-6">
//                 <div>
//                   <p className="text-2xl font-semibold text-[#4b3838]">
//                     Quality
//                   </p>
//                   <p className="mt-1 text-sm text-[#806969]">
//                     Carefully selected
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-2xl font-semibold text-[#4b3838]">
//                     Care
//                   </p>
//                   <p className="mt-1 text-sm text-[#806969]">
//                     Made with intention
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="relative order-1 md:order-2">
//               <div className="h-[430px] rounded-3xl bg-[#ead6d4] p-5">
//                 <div className="relative h-full overflow-hidden rounded-2xl bg-[#f5e5e3]">
//                   <Image
//                     src="/story.jpg"
//                     alt="LUMÉRA skincare routine flatlay"
//                     fill
//                     sizes="(min-width: 768px) 480px, 100vw"
//                     className="object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Why LUMÉRA */}
//         <section className="bg-[#f5e5e3] py-20">
//           <div className="mx-auto max-w-6xl px-6">
//             <div className="mb-12 text-center">
//               <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-[#9b7777]">
//                 Why LUMÉRA
//               </p>

//               <h2 className="text-4xl font-semibold tracking-tight text-[#4b3838] md:text-5xl">
//                 Beauty with intention
//               </h2>

//               <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6f5a5a]">
//                 Every detail is chosen to make your beauty experience feel
//                 simple, thoughtful, and special.
//               </p>
//             </div>

//             <div className="grid gap-6 md:grid-cols-3">
//               {[
//                 {
//                   icon: Sparkles,
//                   title: "Curated quality",
//                   desc: "Thoughtfully selected products made to fit beautifully into your everyday routine.",
//                 },
//                 {
//                   icon: Heart,
//                   title: "Made with care",
//                   desc: "We focus on creating a shopping experience that feels personal, calm, and enjoyable.",
//                 },
//                 {
//                   icon: Star,
//                   title: "Timeless beauty",
//                   desc: "Because beauty is about feeling confident in your own unique style.",
//                 },
//               ].map(({ icon: Icon, title, desc }) => (
//                 <div
//                   key={title}
//                   className="group border border-[#dcc1bf] bg-[#faf2f4] p-8 text-center transition-colors duration-300 hover:border-[#c99f9c]"
//                 >
//                   <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#9b7777] transition-colors duration-300 group-hover:bg-[#ead6d4]">
//                     <Icon className="h-5 w-5" strokeWidth={1.5} />
//                   </div>

//                   <h3 className="mb-3 text-xl font-semibold text-[#4b3838]">
//                     {title}
//                   </h3>

//                   <p className="leading-7 text-[#6f5a5a]">{desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </>
//   );
// }