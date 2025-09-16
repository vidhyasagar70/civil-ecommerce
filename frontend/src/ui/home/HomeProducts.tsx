import React from "react";
import CategoryListing from "../../pages/CategoryListing";

const HomeProducts: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h1
          className="text-2xl sm:text-4xl font-extrabold font-sans mb-7 tracking-tight 
                     text-black-600"
        >
          Featured Software
        </h1>
        <p className="mb-12 text-base sm:text-xl text-gray-600 font-medium font-sans max-w-2xl mx-auto">
          Genuine civil engineering software licenses trusted by thousands of professionals across India
        </p>
      </div>

      {/* Product Grid */}
      <CategoryListing limit={8} />
    </section>
  );
};

export default HomeProducts;
