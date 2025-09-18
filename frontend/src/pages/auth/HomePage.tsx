import React from "react";
import ExclusiveOffers from "../../ui/home/ExclusiveOffers";
import HeroSection from "../../ui/home/HeroSection";
import HomeProducts from "../../ui/home/HomeProducts";
import MarqueeBanner from "../../ui/home/MarqueeBanner";
import Reviews from "../../ui/home/Reviews";
import WhyChooseUs from "../../ui/home/WhyChooseUs";
import Footer from "../../components/Footer/Footer";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
    

      {/* Main Content */}
      <main className="flex-grow">
        <section className="px-4 sm:px-6 lg:px-8">
          <MarqueeBanner />
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <HeroSection />
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <HomeProducts />
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <ExclusiveOffers />
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <WhyChooseUs />
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <Reviews />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
