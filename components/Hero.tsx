"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {

const originalImages = ["/img11.png", "/img2.png", "/img3.png"];
// yahan: Hum pehli image ko aakhir mein bhi daal rahe hain loop ko smooth banane ke liye
const images = [...originalImages, originalImages[0]];

const [currentIndex, setCurrentIndex] = useState(0);
const [isTransitioning, setIsTransitioning] = useState(true);

// Har 4 second baad agli image par slide karega
useEffect(() => {
  const timer = setInterval(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, 4000);

  return () => clearInterval(timer);
}, []);

// Jab aakhri image slide ho jaye, toh chupke se (bina dikhaye) wapas pehli image par reset kar dega
useEffect(() => {
  if (currentIndex === images.length - 1) {
    const resetTimer = setTimeout(() => {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }, 1000); // 1000ms = Slide ka time
    return () => clearTimeout(resetTimer);
  }
}, [currentIndex, images.length]);
  return (

<section className="sticky top-0 h-[750px]">
  <div className="h-full w-full overflow-hidden bg-[#eadcdf]">

    {/* Hero Image Slider (Infinite Loop) */}
    <div className="absolute inset-0 overflow-hidden">
      <div
        className={`flex h-full w-full ${isTransitioning ? "transition-transform duration-1000 ease-in-out" : ""
          }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="relative h-full w-full shrink-0">
            <img
              src={src}
              alt={`LUMÉRA beauty collection`}
              className="absolute inset-0 h-full w-full object-cover object-right"
            />
          </div>
        ))}
      </div>
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/10" />

    {/* Hero Content */}
    <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-1 md:grid-cols-2 items-center px-6 lg:px-8">
      <div className="text-white w-full max-w-[280px] sm:max-w-sm md:max-w-lg lg:max-w-xl">

        <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em]">
          New Collection
        </p>

        <h1 className="text-5xl font-[Marcellus] leading-none lg:text-6xl">
          The New Beauty
          <br />
          Collection
        </h1>

        <h4 className="mt-6 font-[Marcellus] max-w-md text-[23px] leading-7 text-white/90 md:text-lg">
          Discover beauty essentials carefully selected
          to enhance your everyday glow
        </h4>

        <Link
          href="/shop"
          className="mt-8 inline-block bg-white px-8 py-4 text-sm font-medium uppercase tracking-wide text-black transition hover:text-[#D4A6B6]"
        >
          Shop Now
        </Link>

      </div>
    </div>
  </div>
</section>
  );
}