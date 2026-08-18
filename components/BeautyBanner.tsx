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


export default function BeautyBanner() {
  return (
    <section 
    //   className="relative w-full h-[700px] bg-fixed bg-contain bg-no-repeat bg-right"
    // className="relative w-full h-[580px] bg-fixed bg-contain bg-no-repeat bg-right bg-[#6eafb6]"
    // className="relative w-full h-[550px] bg-fixed bg-cover bg-right"
    className="relative w-full h-[700px] bg-fixed bg-[length:100vw_auto] bg-right bg-no-repeat"



      style={{ backgroundImage: "url('/beauty1.jpg')" }}
    >
      {/* Overlay aur Text yahan rahega */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
          
          <div className="max-w-lg">
            <p className="text-sm uppercase tracking-[3px] text-white mb-4 font-[Marcellus]">
              Beauty & Care
            </p>

            <h2 className="text-4xl md:text-5xl font-[Marcellus] font-semibold text-white leading-tight mb-6">
        {/* <h2 className="text-5xl font-[Marcellus] leading-none lg:text-6xl"> */}
            
              Glow That's Uniquely Yours
            </h2>

            <p className="text-white/90 text-base md:text-lg mb-8 font-[Marcellus]">
              Discover products that bring out your natural beauty.
            </p>

            <button className="bg-white text-gray-900 px-7 py-3 text-sm font-medium hover:bg-gray-100 transition">
              Shop Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
