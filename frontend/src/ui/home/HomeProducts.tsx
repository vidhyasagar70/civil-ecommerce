import React from "react";
import CategoryListing from "../../pages/CategoryListing";

const HomeProducts: React.FC = () => {
  return (
         <section className="w-full bg-gradient-to-r from-indigo-50 to-violet-50 rounded-3xl shadow-sm py-14 px-6 md:px-20">

      {/* Section Heading */}
      <div className="text-center mb-10">
         <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Featured Software
        </h2>
       <p className="text-gray-600 mt-3 text-lg">
          Genuine civil engineering software licenses trusted by thousands of professionals across India
        </p>
      </div>

      {/* Product Grid */}
      <CategoryListing limit={6} showCount={false}/>
    </section>
  );
};

export default HomeProducts;
