import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../api/productApi';
// You may want to import your RatingStar component if you have one.

const CategoryListing: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const category = params.get("category") || "";
  const { data = { products: [], totalPages: 0, currentPage: 0, total: 0 } } = useProducts({ category });
  const products = data.products || [];
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-1">{category}</h1>
      <p className="text-lg text-gray-500 mb-4">
        {products.length} product{products.length !== 1 && 's'} found
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {products.map((product: any) => (
          <div
            key={product._id}
            className="bg-white border rounded-2xl shadow hover:shadow-lg transition p-5 flex flex-col"
          >
            {/* Image */}
            <div
              className="rounded-xl overflow-hidden bg-gray-100 h-52 mb-3 cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {product.category}
              </span>
              <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                {product.company}
              </span>
            </div>

            {/* Name */}
            <h2 className="text-lg font-semibold mb-1">{product.name} {product.version && <span className="text-gray-500 font-normal">({product.version})</span>}</h2>
            
            {/* Description */}
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>

            {/* Stars & Ratings */}
            <div className="flex items-center text-sm mb-2">
              {/* Replace with actual rating stars if you have a RatingStar component */}
              <span className="text-yellow-400 mr-1">
                {'★'.repeat(Math.round(product.rating || 4))}{' '}
              </span>
              <span className="text-gray-500">
                {product.ratingCount ? `(${product.ratingCount})` : ""}
              </span>
            </div>

            {/* Price Block */}
            <div className="text-blue-600 font-semibold text-xl mb-1">
              ₹{product.price1?.toLocaleString()}/<span className="text-sm font-normal">year</span>
            </div>
            <div className="text-gray-500 text-xs mb-4">
              {product.price3 && (
                <>3-year: ₹{product.price3?.toLocaleString()} • </>
              )}
              {product.priceLifetime && (
                <>Lifetime: ₹{product.priceLifetime?.toLocaleString()}</>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 mt-auto">
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="w-full border border-gray-300 text-gray-700 font-medium rounded-lg py-2 hover:bg-gray-50 transition"
              >
                View Details
              </button>
              <button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg py-2 font-semibold hover:from-blue-600 hover:to-purple-600 transition"
                // Implement Add to Cart functionality
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryListing;
