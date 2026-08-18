
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrendingProducts from "@/components/TrendingProducts";
import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import BeautyBanner from "@/components/BeautyBanner";
import Best from "@/components/Best";
import Reviews from "@/components/reviews";

export default function Home() {

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section className="relative z-20 bg-white pt-10 pb-20">
          <TrendingProducts />
          <Categories />
          <BeautyBanner />
          <Best/>
          <Reviews/>
        </section>
      </main>
      <Footer />
    </>
  );
}
