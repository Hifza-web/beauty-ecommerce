"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Reviews() {
  const allTestimonials = [
    {
      name: "JENNIFER LEWIS",
      text: "The Midnight Rose Serum is an absolute game-changer! My skin has never felt this hydrated and glowing.",
      image: "/a.jpeg",
    },
    {
      name: "ALICIA HEART",
      text: "I've finally found my perfect match with the LUMÉRA Silk Glow Foundation. It blends flawlessly and lasts all day.",
      image: "/a.jpeg",
    },
    {
      name: "JUAN CARLOS",
      text: "Every product I've tried from LUMÉRA feels incredibly premium. The attention to detail is truly unmatched.",
      image: "/a.jpeg",
    },
    {
      name: "EMILY CHEN",
      text: "I am obsessed with the Velvet Matte Lipstick. It doesn't dry out my lips and the color payoff is fantastic!",
      image: "/a.jpeg",
    },
    {
      name: "SOPHIA LOREN",
      text: "The customer service is just as premium as the products. Fast shipping and gorgeous unboxing experience.",
      image: "/a.jpeg",
    },
    {
      name: "DAVID MILLER",
      text: "Bought a skincare set for my wife, and she hasn't stopped raving about it. Definitely coming back for more.",
      image: "/a.jpeg",
    },
  ];

  const reviewGroups = [
    allTestimonials.slice(0, 3), 
    allTestimonials.slice(3, 6),
  ];

  // Infinite Loop Trick: 
  // [Aakhri Slide ka duplicate, Pehli Slide, Doosri Slide, Pehli Slide ka duplicate]
  const extendedGroups = [
    reviewGroups[reviewGroups.length - 1], 
    ...reviewGroups,
    reviewGroups[0],
  ];

  // Index 1 par asal pehli slide hai
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Auto slide har 5 sec baad
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Jab slider fake slides par pohnch jaye toh chupke se wapis asli slide par jump karwana
  useEffect(() => {
    if (currentIndex === extendedGroups.length - 1) {
      // Last fake slide par aya hai, 700ms (animation khtam hone k) baad chupke se pehli asal slide (Index 1) par le jao
      const timeout = setTimeout(() => {
        setIsTransitioning(false); // animation band karo
        setCurrentIndex(1); // wapis 1st par
      }, 700);
      return () => clearTimeout(timeout);
    }
    
    if (currentIndex === 0) {
      // First fake slide par aya hai, chupke se aakhri asal slide par le jao
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(extendedGroups.length - 2);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, extendedGroups.length]);

  // Dots ke liye asal index nikalna
  const realIndex = 
    currentIndex === 0 ? reviewGroups.length - 1 
    : currentIndex === extendedGroups.length - 1 ? 0 
    : currentIndex - 1;

  return (
    <section className="w-full bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-[35px] font-serif text-gray-900 font-[Marcellus]">
            What Our Customers Say
          </h2>
          <div className="w-12 h-[1px] bg-[#9c6b6e] mx-auto mt-8"></div>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden w-full">
          
          <div 
            className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`} 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {extendedGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="w-full shrink-0 px-2 md:px-4">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                  {group.map((testimonial, index) => (
                    <div key={index} className="text-center flex flex-col items-center">
                      <div className="text-6xl text-[#d4a6b6] font-serif leading-none mb-4">“</div>
                      <p className="text-gray-800 text-lg leading-8 max-w-sm font-[Marcellus] font-bold">
                        {testimonial.text}
                      </p>
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mt-7 shadow-sm"
                      />
                      <p className="text-gray-800 text-sm tracking-[3px] font-medium mt-5">
                        {testimonial.name}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Left Arrow Button */}
        <button 
          onClick={handlePrev} 
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md text-gray-600 hover:text-[#d4a6b6] transition-colors z-10 hidden md:block"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow Button */}
        <button 
          onClick={handleNext} 
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md text-gray-600 hover:text-[#d4a6b6] transition-colors z-10 hidden md:block"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slider Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {reviewGroups.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(index + 1);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                realIndex === index ? "bg-[#9c6b6e] w-6" : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
