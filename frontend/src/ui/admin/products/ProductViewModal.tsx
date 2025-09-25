import React, { useState } from 'react';
import {
  X,
  Package,
  Building2,
  DollarSign,
  Calendar,
  Image as ImageIcon,
  Star,
  Award,
  Play,
  CheckCircle,
  Circle,
  Tag,
  Users,
  CreditCard,
  HelpCircle,
  Monitor,
  Zap
} from 'lucide-react';
import type { ProductViewModalProps } from './types/ProductViewModal';
import FormButton from '../../../components/Button/FormButton';
import './AddProductModal.css';
const ProductViewModal: React.FC<ProductViewModalProps> = ({ product, isOpen, onClose }) => {

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  if (!isOpen || !product) return null;
  const allImages = [product.image, ...(product.additionalImages || [])].filter(Boolean);
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };



  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
      <div className="relative bg-white rounded-xl shadow-lg max-w-6xl w-full p-6 overflow-y-auto max-h-[90vh] modal-scroll-container">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
            {allImages[0] ? (
              <img
                src={allImages[0]}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="bg-gray-50 rounded-lg p-4">
            {/* Main Image Display */}
            {allImages.length > 0 && (
              <div className="mb-4">
                <img
                  src={allImages[selectedImageIndex]}
                  alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                  className="w-full h-64 object-contain rounded-lg  bg-white"
                />
              </div>
            )}
            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(index)}
                    className={`p-1 border-2 rounded-lg transition-all ${selectedImageIndex === index
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-16 object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>
            )}

            {allImages.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No images available</p>
              </div>
            )}
          </div>
          {/* Product Information */}
          <div className="space-y-6">
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
                  <p className="text-gray-900">₹{product.price1?.toLocaleString()}</p>
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
        </div>

        <div className="mt-6 flex justify-end">
          <FormButton
            type="button"
            variant="primary"
            onClick={onClose}
          >
            Close
          </FormButton>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;