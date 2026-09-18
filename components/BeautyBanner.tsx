// export default function BeautyBanner() {
//   return (
//     <section className="fixed top-0 -z-10 w-full h-[750px]">
//       <div className="relative w-full h-full overflow-hidden">
//         <img
//           src="/beauty1.jpg"
//           alt="Beauty Collection"
//           className="w-full h-full object-cover"
//         />

//         <div className="absolute inset-0 flex items-center">
//           <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
//             <div className="max-w-lg">
//               <p className="text-sm uppercase tracking-[3px] text-white mb-4">
//                 Beauty & Care
//               </p>

//               <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
//                 Beauty Made Beautiful
//               </h2>

//               <p className="text-white/90 text-base md:text-lg mb-8">
//                 Discover products that bring out your natural beauty.
//               </p>

//               <button className="bg-white text-gray-900 px-7 py-3 text-sm font-medium hover:bg-gray-100 transition">
//                 Shop Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import Link from "next/link";
export default function BeautyBanner() {
  return (
    <section 
      /* Mobile par height 500px aur Desktop par 700px, aur bg-cover se white space khatam */
      className="relative w-full h-[500px] md:h-[700px] bg-fixed bg-cover bg-[80%] md:bg-right bg-no-repeat bg-[#6eafb6]"
      style={{ backgroundImage: "url('/beauty1.jpg')" }}
    >
      
      {/* Mobile par thora sa dark shadow taky text clear nazr aye, Desktop par transparent */}
      <div className="absolute inset-0 bg-black/10 md:bg-transparent [clip-path:inset(0)]">
        
        {/* Fixed Text Container */}
        <div className="fixed top-0 left-0 w-full h-screen flex items-center pointer-events-none">
          
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pointer-events-auto">
            <div className="max-w-lg mt-8 md:mt-0">
              
              <p className="text-sm uppercase tracking-[3px] text-white mb-4 font-[Marcellus] drop-shadow-md">
                Beauty & Care
              </p>
              
              <h2 className="text-4xl md:text-5xl font-[Marcellus] font-semibold text-white leading-tight mb-6 drop-shadow-lg">
                Glow That's Uniquely Yours
              </h2>
              
              <p className="text-white/90 text-base md:text-lg mb-8 font-[Marcellus] drop-shadow-md">
                Discover products that bring out your natural beauty.
              </p>
              
               <Link
          href="/shop"
          className="mt-8 rounded-md inline-block bg-white px-8 py-4 text-sm font-medium uppercase tracking-wide text-black transition hover:text-[#D4A6B6]"
        >
          Shop Now
        </Link>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
