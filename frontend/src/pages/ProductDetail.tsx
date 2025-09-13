import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetail } from '../api/productApi';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProductDetail(id);
  const [selectedLicense, setSelectedLicense] = useState<'1year' | '3year' | 'lifetime'>('1year');
  const [mainImage, setMainImage] = useState<string | null>(null);

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  // License options for display/switching
  const licenseOptions = [
    {
      key: '1year',
      label: '1 Year',
      price: product.price1,
      subtitle: 'Most Popular',
      style: selectedLicense === '1year' ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-200',
      savings: product.oldPrice1 
        ? `${Math.round((1 - product.price1 / product.oldPrice1) * 100)}%`
        : null,
      oldPrice: product.oldPrice1,
    },
    {
      key: '3year',
      label: '3 Year',
      price: product.price3,
      subtitle: 'Save 30%',
      style: selectedLicense === '3year' ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-200',
      savings: product.oldPrice3
        ? `${Math.round((1 - product.price3 / product.oldPrice3) * 100)}%`
        : '30%',
      oldPrice: product.oldPrice3,
    },
    {
      key: 'lifetime',
      label: 'Lifetime',
      price: product.priceLifetime,
      subtitle: 'Best Value',
      style: selectedLicense === 'lifetime' ? 'border-green-600 ring-2 ring-green-300' : 'border-gray-200',
      savings: product.oldPriceLifetime
        ? `${Math.round((1 - product.priceLifetime / product.oldPriceLifetime) * 100)}%`
        : '60%',
      oldPrice: product.oldPriceLifetime,
    },
  ].filter(opt => !!opt.price);

  const selectedLicenseObj = licenseOptions.find(opt => opt.key === selectedLicense) || licenseOptions[0];

  // Images
  const images = [product.image, ...(product.additionalImages || [])];
  const currentMainImage = mainImage || product.image;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Section: Image + Info */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Gallery */}
        <div className="md:w-2/5 flex flex-col items-center">
          <div className="bg-gray-100 rounded-2xl overflow-hidden w-full aspect-square mb-4 flex items-center justify-center">
            <img
              src={currentMainImage}
              className="w-full h-full object-contain"
              alt={product.name}
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 mt-2">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`w-20 h-20 rounded-xl overflow-hidden bg-gray-100 cursor-pointer border ${img === currentMainImage ? 'border-blue-400' : 'border-transparent'}`}
                onClick={() => setMainImage(img)}
              >
                <img src={img} className="object-cover w-full h-full" alt={`thumb-${idx}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info and Actions */}
        <div className="md:w-3/5 flex flex-col gap-5">
          {/* Badges and Title */}
          <div className="flex gap-2 mb-1">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-lg">{product.category}</span>
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-lg">{product.company}</span>
          </div>
          <h1 className="text-3xl font-extrabold mb-2">{product.name}</h1>
          <div className="text-gray-600 mb-2 text-base">{product.description}</div>

          {/* Rating, reviews, special tags */}
          <div className="flex gap-6 items-center text-base mb-2">
            <span className="flex items-center gap-1 text-yellow-400">
              {'★'.repeat(Math.floor(product.rating || 4))}
              <span className="text-gray-600 ml-1">{(product.rating || 4.0).toFixed(1)}</span>
              <span className="text-gray-500 ml-1">({product.ratingCount || 0} reviews)</span>
            </span>
            <span className="text-green-700 font-semibold">Instant Download</span>
            <span className="text-blue-700 font-semibold">Genuine License</span>
          </div>

          {/* License Options Selector */}
          <div>
            <h2 className="font-bold mb-1">Choose License Duration</h2>
            <div className="flex gap-2">
              {licenseOptions.map(opt => (
                <button
                  key={opt.key}
                  className={`flex-1 px-4 py-4 rounded-lg border ${opt.style} bg-white transition cursor-pointer`}
                  onClick={() => setSelectedLicense(opt.key as typeof selectedLicense)}
                >
                  <div className="font-semibold text-blue-700 text-lg">{opt.label}</div>
                  <div className="text-2xl font-bold text-gray-900 my-1">
                    ₹{opt.price?.toLocaleString()}
                  </div>
                  <div className={`text-xs mt-1 ${opt.subtitle === 'Best Value' ? 'text-green-700 font-bold' : 'text-blue-600'}`}>{opt.subtitle}</div>
                  {opt.oldPrice && (
                    <div className="text-xs text-green-600 font-semibold mt-0.5">
                      Save {opt.savings}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price Block */}
          <div className="bg-blue-50 rounded-xl px-6 py-5 flex items-center justify-between mb-2">
            <div>
              <div className="text-blue-700 font-extrabold text-3xl">
                ₹{selectedLicenseObj.price?.toLocaleString()}
              </div>
              <div className="text-gray-500 text-xs">
                {selectedLicenseObj.label} license • GST included
              </div>
            </div>
            {selectedLicenseObj.oldPrice && (
              <div className="flex flex-col items-end">
                <span className="line-through text-gray-400 text-sm">₹{selectedLicenseObj.oldPrice?.toLocaleString()}</span>
                <span className="text-green-500 text-xs">
                  Save {selectedLicenseObj.savings}
                </span>
              </div>
            )}
          </div>

          {/* Trust/Security Tags */}
          <div className="flex gap-3 mb-5">
            <span className="flex items-center bg-green-100 text-green-700 px-3 py-2 rounded-lg text-xs font-medium">
              100% Genuine License
            </span>
            <span className="flex items-center bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-xs font-medium">
              Authorized Vendor
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl py-4 text-lg hover:from-blue-700 hover:to-purple-700 transition">
              Add to Cart
            </button>
            <button className="w-full border border-blue-200 rounded-xl py-3 text-blue-700 font-semibold transition hover:bg-blue-50">
              Buy Now - Instant Access
            </button>
            <div className="flex justify-between gap-2">
              <button className="flex-1 border rounded-xl py-2 text-gray-600 flex items-center justify-center hover:bg-gray-50">♡ Wishlist</button>
              <button className="flex-1 border rounded-xl py-2 text-gray-600 flex items-center justify-center hover:bg-gray-50">Support</button>
            </div>
            <div className="flex justify-between text-xs text-gray-500 pt-2">
              <span className="flex items-center gap-1">🔒 Secure</span>
              <span className="flex items-center gap-1">⚡ Instant</span>
              <span className="flex items-center gap-1">💬 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section: Tabs */}
      <div className="mt-12">
        <div className="border-b flex gap-6 text-lg">
          <button className="pb-2 border-b-2 border-blue-500 font-semibold text-blue-600">Overview</button>
          <button className="pb-2 text-gray-400 hover:text-blue-500 transition">Features</button>
          <button className="pb-2 text-gray-400 hover:text-blue-500 transition">Reviews</button>
        </div>
        {/* Tab body – Overview example */}
        <div className="py-7 grid md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <h2 className="text-xl font-bold mb-4">What's Included</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-500 font-bold">✔</span> Real-time 3D Rendering
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 font-bold">✔</span> Material Library
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 font-bold">✔</span> Animation Tools
              </li>
              {/* TODO: Dynamically map features from product.features if available */}
            </ul>
          </div>
          {/* Product Info Sidebar */}
          <div className="bg-gray-50 rounded-xl p-5 shadow col-span-1">
            <h3 className="font-semibold mb-3">Product Details</h3>
            <div className="flex flex-col text-sm text-gray-700 gap-2">
              <div className="flex justify-between"><span>Category</span><span className="font-medium">{product.category}</span></div>
              <div className="flex justify-between"><span>Company</span><span className="font-medium">{product.company}</span></div>
              <div className="flex justify-between"><span>Version</span><span className="font-medium">{product.version}</span></div>
              {/* Add more details as available */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
