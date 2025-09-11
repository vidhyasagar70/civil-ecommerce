import React from 'react';
import { X, Package, Building2, Tag, DollarSign, Calendar, FileText } from 'lucide-react';
import type { Product } from "../../../api/productApi";

interface ProductViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductViewModal: React.FC<ProductViewModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm  bg-opacity-50">
      <div className="relative bg-white rounded-xl shadow-lg max-w-4xl w-full p-6 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-12 h-12 object-contain"
              />
            ) : (
              <Package className="w-8 h-8 text-blue-600" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-gray-500">Version: {product.version}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Product Information
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Name</span>
                <p className="text-gray-900">{product.name}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Version</span>
                <p className="text-gray-900">{product.version}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Description</span>
                <p className="text-gray-900">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Company & Category */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              Company & Category
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Company</span>
                <p className="text-gray-900">{product.company}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Category</span>
                <p className="text-gray-900">{product.category}</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Pricing
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">1-Year License</span>
                <p className="text-gray-900">₹{product.price1.toLocaleString()}</p>
              </div>
              {product.price3 && (
                <div>
                  <span className="text-sm font-medium text-gray-600">3-Year License</span>
                  <p className="text-gray-900">₹{product.price3.toLocaleString()}</p>
                </div>
              )}
              {product.priceLifetime && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Lifetime License</span>
                  <p className="text-gray-900">₹{product.priceLifetime.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Metadata
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Created At</span>
                <p className="text-gray-900">{formatDate(product.createdAt)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Updated At</span>
                <p className="text-gray-900">{formatDate(product.updatedAt)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Product ID</span>
                <p className="text-gray-900 font-mono text-sm">{product._id || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Preview */}
        {product.image && (
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Image Preview
            </h3>
            <div className="flex justify-center">
              <img 
                src={product.image} 
                alt={product.name}
                className="max-w-full h-48 object-contain rounded-lg border"
              />
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;