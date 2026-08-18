// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export default function About() {
//   return (
//     <>
//       <Navbar />

//      <main className="bg-[#faf2f4] py-16">
//   <section className="mx-auto max-w-4xl px-6 text-center">
//     <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#9b7777]">
//       About Us
//     </p>

//     <h1 className="mb-6 text-4xl font-semibold text-[#4b3838] md:text-5xl">
//       Welcome to LUMÉRA
//     </h1>

//     <p className="mx-auto max-w-2xl text-base leading-8 text-[#6f5a5a]">
//       LUMÉRA is a beauty destination created to make everyday beauty feel
//       simple, elegant, and special. We believe that beauty is not about
//       following every trend, but about finding products that make you feel
//       confident and comfortable.
//     </p>
//   </section>
//   <section className="mx-auto mt-16 grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
//   <div>
//     <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#9b7777]">
//       Our Story
//     </p>

//     <h2 className="mb-5 text-3xl font-semibold text-[#4b3838]">
//       Beauty with a Touch of Elegance
//     </h2>

//     <p className="mb-4 leading-8 text-[#6f5a5a]">
//       At LUMÉRA, we believe beauty should feel effortless and enjoyable.
//       Our collection is carefully selected for those who appreciate quality,
//       simplicity, and timeless elegance.
//     </p>

//     <p className="leading-8 text-[#6f5a5a]">
//       From everyday essentials to special beauty moments, LUMÉRA is here to
//       help you discover products that fit beautifully into your routine.
//     </p>
//   </div>

//   <div className="flex justify-center">
//     <div className="flex h-80 w-full max-w-md items-center justify-center bg-[#ead6d4]">
//       <span className="text-2xl font-medium tracking-widest text-[#7d5c5c]">
//         LUMÉRA
//       </span>
//     </div>
//   </div>
// </section>
// <section className="mx-auto mt-16 max-w-6xl px-6 pb-16">
//   <div className="mb-10 text-center">
//     <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#9b7777]">
//       What We Believe
//     </p>

//     <h2 className="text-3xl font-semibold text-[#4b3838]">
//       Our Values
//     </h2>
//   </div>

//   <div className="grid gap-6 md:grid-cols-3">
//     <div className="bg-white p-8 text-center shadow-sm">
//       <h3 className="mb-3 text-xl font-semibold text-[#4b3838]">
//         Quality
//       </h3>

//       <p className="leading-7 text-[#6f5a5a]">
//         We believe in choosing beauty products with care and attention to
//         quality.
//       </p>
//     </div>

//     <div className="bg-white p-8 text-center shadow-sm">
//       <h3 className="mb-3 text-xl font-semibold text-[#4b3838]">
//         Simplicity
//       </h3>

//       <p className="leading-7 text-[#6f5a5a]">
//         We make discovering and enjoying beauty products simple and
//         effortless.
//       </p>
//     </div>

//     <div className="bg-white p-8 text-center shadow-sm">
//       <h3 className="mb-3 text-xl font-semibold text-[#4b3838]">
//         Elegance
//       </h3>

//       <p className="leading-7 text-[#6f5a5a]">
//         We celebrate timeless beauty, thoughtful choices, and elegant
//         experiences.
//       </p>
//     </div>
//   </div>
// </section>
// </main>

//       <Footer />
//     </>
//   );
// }

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Heart, Gem } from "lucide-react";

export default function About() {
  return (
    <>
      <Navbar />

     <main className="bg-[#faf2f4] py-16">
          <section className="mx-auto max-w-4xl px-6 text-center">
    {/* <p className="mb-3 text-[28px] uppercase font-semibold tracking-[0.3em] text-[#9b7777]">
      About Us
    </p> */}

    <h1 className="mb-6 text-4xl font-semibold text-[#4b3838] md:text-5xl">
      About Us
    </h1>

    <p className="mx-auto max-w-2xl text-base leading-8 text-[#6f5a5a]">
      LUM
              <span className="text-[#d4a6b6]">É</span>RA
       is a beauty destination created to make everyday beauty feel
      simple, elegant, and special. We believe that beauty is not about
      following every trend, but about finding products that make you feel
      confident and comfortable.
    </p>
  </section>
<section className="relative overflow-hidden bg-[#faf2f4] py-25">
  <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
    
    <div>
      {/* <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#9b7777]">
        Welcome to LUMÉRA
      </p> */}

      <h1 className="mb-6 text-5xl font-semibold leading-tight text-[#4b3838] md:text-6xl">
        Beauty that feels
        <span className="block italic font-normal">
          beautifully you.
        </span>
      </h1>

      <p className="max-w-xl text-base leading-8 text-[#6f5a5a]">
        Discover a thoughtfully curated world of beauty, skincare, and
        self-care designed to bring elegance and confidence into your
        everyday routine.
      </p>
    </div>

  <div className="relative">
  <div className="h-[430px] rounded-3xl bg-[#ead6d4] p-5">
    <div className="relative h-full overflow-hidden rounded-2xl bg-[#f5e5e3]">

      <img
        src="/b1.png"
        alt="LUMÉRA beauty products"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative flex h-full items-end p-8">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-white">
            Beauty, Curated for You
          </p>

          <h3 className="text-3xl font-semibold text-white">
            Simple, thoughtful, beautifully yours.
          </h3>
        </div>
      </div>

    </div>
  </div>
</div>

  </div>
</section>
  <section className="mx-auto max-w-6xl px-6 py-20">
  <div className="grid items-center gap-12 md:grid-cols-2">

    {/* <div className="relative">
      <div className="h-[430px] rounded-3xl bg-[#ead6d4] p-5">
        <div className="flex h-full items-end rounded-2xl bg-[#f5e5e3] p-8">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#9b7777]">
              Since Day One
            </p>

            <h3 className="text-3xl font-semibold text-[#4b3838]">
              Made for your beauty ritual
            </h3>
          </div>
        </div>
      </div>
    </div> */}
    <div className="relative">
  <div className="h-[430px] rounded-3xl bg-[#ead6d4] p-5">
    <div className="relative h-full overflow-hidden rounded-2xl bg-[#f5e5e3]">

      <img
        src="/bbb.jpg"
        alt="LUMÉRA beauty products"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative flex h-full items-end p-8">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-white">
            Since Day One
          </p>

          <h3 className="text-3xl font-semibold text-white">
            Made for your beauty ritual
          </h3>
        </div>
      </div>

    </div>
  </div>
</div>

    <div>
      <p className="mb-3 text-[17px] uppercase tracking-[0.3em] text-[#9b7777]">
        Our Story
      </p>

      <h2 className="mb-6 text-4xl font-semibold leading-tight text-[#4b3838]">
        A little beauty,
        <span className="block italic font-normal">
          a lot of confidence.
        </span>
      </h2>

      <p className="mb-5 leading-8 text-[#6f5a5a]">
        LUM
              <span className="text-[#d4a6b6]">É</span>RA
         was created with a simple idea: beauty should feel personal,
        effortless, and enjoyable. We believe the right products can turn
        everyday moments into something special.
      </p>

      <p className="leading-8 text-[#6f5a5a]">
        From skincare essentials to makeup and hair care, we bring together
        carefully selected beauty products so you can create a routine that
        feels completely yours.
      </p>

      <div className="mt-8 flex gap-8">
        <div>
          <p className="text-2xl font-semibold text-[#4b3838]">Quality</p>
          <p className="mt-1 text-sm text-[#806969]">
            Carefully selected
          </p>
        </div>

        <div>
          <p className="text-2xl font-semibold text-[#4b3838]">Care</p>
          <p className="mt-1 text-sm text-[#806969]">
            Made with intention
          </p>
        </div>
      </div>
    </div>

  </div>
</section>
{/* <section className="bg-[#f5e5e3] py-20">
  <div className="mx-auto max-w-6xl px-6">

    <div className="mb-12 text-center">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#9b7777] font-bold">
        Why LUMÉRA
      </p>

      <h2 className="text-4xl font-semibold text-[#4b3838] md:text-5xl">
        Beauty with intention
      </h2>

      <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6f5a5a]">
        Every detail is chosen to make your beauty experience feel simple,
        thoughtful, and special.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-3">

      <div className="border border-[#dcc1bf] bg-[#faf2f4] p-8 text-center">
        <span className="mb-5 block text-3xl">✦</span>

        <h3 className="mb-3 text-xl font-semibold text-[#4b3838]">
          Curated Quality
        </h3>

        <p className="leading-7 text-[#6f5a5a]">
          Thoughtfully selected products made to fit beautifully into your
          everyday routine.
        </p>
      </div>

      <div className="border border-[#dcc1bf] bg-[#faf2f4] p-8 text-center">
        <span className="mb-5 block text-3xl">♡</span>

        <h3 className="mb-3 text-xl font-semibold text-[#4b3838]">
          Made with Care
        </h3>

        <p className="leading-7 text-[#6f5a5a]">
          We focus on creating a shopping experience that feels personal,
          calm, and enjoyable.
        </p>
      </div>

      <div className="border border-[#dcc1bf] bg-[#faf2f4] p-8 text-center">
        <span className="mb-5 block text-3xl">✧</span>

        <h3 className="mb-3 text-xl font-semibold text-[#4b3838]">
          Timeless Beauty
        </h3>

        <p className="leading-7 text-[#6f5a5a]">
          Because beauty is about feeling confident in your own unique
          style.
        </p>
      </div>

    </div>
  </div>
</section> */}
<section className="bg-[#f5e5e3] py-20">
  <div className="mx-auto max-w-6xl px-6">

    <div className="mb-12 text-center">
      <p className="mb-3 text-[20px] uppercase tracking-[0.3em] text-[#9b7777] ">
        Why 
        LUM
              <span className="text-[#d4a6b6]">É</span>RA
      </p>

      <h2 className="text-4xl font-semibold text-[#4b3838] md:text-5xl">
        Beauty with intention
      </h2>

      <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6f5a5a]">
        Every detail is chosen to make your beauty experience feel simple,
        thoughtful, and special.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-3">

      {/* <div className="border border-[#dcc1bf] bg-[#faf2f4] p-8 text-center "> */}
      <div className="border border-[#dcc1bf] bg-[#faf2f4] p-8 text-center rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
        <Gem className="mx-auto mb-5 h-8 w-8 text-[#9b7777]" strokeWidth={1.5} />

        <h3 className="mb-3 text-xl font-semibold text-[#4b3838]">
          Curated Quality
        </h3>

        <p className="leading-7 text-[#6f5a5a]">
          Thoughtfully selected products made to fit beautifully into your
          everyday routine.
        </p>
      </div>

      {/* <div className="border border-[#dcc1bf] bg-[#faf2f4] p-8 text-center"> */}
      <div className="border border-[#dcc1bf] bg-[#faf2f4] p-8 text-center rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
        <Heart className="mx-auto mb-5 h-8 w-8 text-[#9b7777]" strokeWidth={1.5} />

        <h3 className="mb-3 text-xl font-semibold text-[#4b3838]">
          Made with Care
        </h3>

        <p className="leading-7 text-[#6f5a5a]">
          We focus on creating a shopping experience that feels personal,
          calm, and enjoyable.
        </p>
      </div>

      {/* <div className="border border-[#dcc1bf] bg-[#faf2f4] p-8 text-center"> */}
      <div className="border border-[#dcc1bf] bg-[#faf2f4] p-8 text-center rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
        <Sparkles className="mx-auto mb-5 h-8 w-8 text-[#9b7777]" strokeWidth={1.5} />

        <h3 className="mb-3 text-xl font-semibold text-[#4b3838]">
          Timeless Beauty
        </h3>

        <p className="leading-7 text-[#6f5a5a]">
          Because beauty is about feeling confident in your own unique
          style.
        </p>
      </div>

    </div>
  </div>
</section>
</main>

      <Footer />
    </>
  );
}