export default function Reviews() {
  const testimonials = [
    {
      name: "JENNIFER LEWIS",
      text: "The Midnight Rose Serum is an absolute game-changer! My skin has never felt this hydrated and glowing. The luxury packaging is just a beautiful bonus.",
      image: "/a.jpeg",
    },
    {
      name: "ALICIA HEART",
      text: "I've finally found my perfect match with the LUMÉRA Silk Glow Foundation. It blends flawlessly and lasts all day without feeling heavy.",
      image: "/a.jpeg",
    },
    {
      name: "JUAN CARLOS",
      text: "Every product I've tried from LUMÉRA feels incredibly premium. The attention to detail and the quality of the ingredients are truly unmatched.",
      image: "/a.jpeg",
    },
  ];

  return (
    <section className="w-full bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-[35px] font-serif text-gray-900 font-[Marcellus]">
            What Our Customers Say
          </h2>

          <div className="w-12 h-[1px] bg-[#9c6b6e] mx-auto mt-8"></div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">

          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="text-center flex flex-col items-center"
            >
              {/* Quote */}
              <div className="text-6xl text-[#d4a6b6] font-serif leading-none mb-4">
                “
              </div>

              {/* Review */}
              <p className="text-gray-800 text-lg leading-8 max-w-sm font-[Marcellus] font-bold">
                {testimonial.text}
              </p>

              {/* Customer Image */}
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover mt-7"
              />

              {/* Customer Name */}
              <p className="text-gray-800 text-sm tracking-[3px] font-medium mt-5">
                {testimonial.name}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}