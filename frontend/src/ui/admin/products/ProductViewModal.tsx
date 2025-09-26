import React, { useState } from 'react';
import {
    X,
    Package,
    Building2,
    DollarSign,
    Calendar,
    Star,
    Award,
    Play,
    CheckCircle,
    Circle,
    Tag,
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

    const allImages = [product.imageUrl || product.image, ...(product.additionalImages || [])].filter(Boolean);

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const renderHTMLContent = (htmlContent?: string) => {
        if (!htmlContent) return <p className="text-gray-400">No content available</p>;
        return <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="prose prose-invert max-w-none text-gray-300" />;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
                    <div className="flex items-center space-x-3">
                        <h2 className="text-2xl font-bold text-white">Product Details</h2>
                        {product.isBestSeller && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500 text-black">
                                <Award className="w-4 h-4 mr-1" />
                                Best Seller
                            </span>
                        )}
                        {product.status && (
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.status === 'active' ? 'bg-green-600 text-green-100' :
                                product.status === 'inactive' ? 'bg-red-600 text-red-100' :
                                    'bg-yellow-600 text-yellow-100'
                                }`}>
                                {product.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                                {product.status === 'inactive' && <Circle className="w-3 h-3 mr-1" />}
                                {product.status === 'draft' && <Circle className="w-3 h-3 mr-1" />}
                                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Header Section with Basic Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                                <img
                                    src={allImages[selectedImageIndex] || product.imageUrl || product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {allImages.length > 1 && (
                                <div className="flex space-x-2 overflow-x-auto pb-2">
                                    {allImages.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${selectedImageIndex === index ? 'border-yellow-500' : 'border-gray-600'
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${product.name} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Basic Product Info */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-3xl font-bold text-white">{product.name}</h3>
                                <p className="text-lg text-gray-300 mt-1">Version {product.version}</p>
                                {product.shortDescription && (
                                    <p className="text-gray-400 mt-2">{product.shortDescription}</p>
                                )}
                            </div>

                            {/* Rating and Tags */}
                            {(product.rating || (product.tags && product.tags.length > 0)) && (
                                <div className="space-y-3">
                                    {product.rating && (
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-5 h-5 ${star <= product.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-gray-300">{product.rating}</span>
                                            {product.ratingCount && (
                                                <span className="text-gray-400">({product.ratingCount} reviews)</span>
                                            )}
                                        </div>
                                    )}

                                    {product.tags && product.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {product.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-600 text-gray-200"
                                                >
                                                    <Tag className="w-3 h-3 mr-1" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Brand/Company Info */}
                            <div className="bg-gray-700 rounded-lg p-4">
                                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                                    <Building2 className="w-5 h-5 mr-2" />
                                    Brand & Category
                                </h4>
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-sm font-medium text-gray-400">Brand:</span>
                                        <span className="ml-2 text-white">{product.brand || product.company}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-400">Category:</span>
                                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-sm bg-yellow-500 text-black">
                                            {product.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Section */}
                    {(product.videoUrl || product.activationVideoUrl) && (
                        <div className="bg-gray-700 rounded-lg p-6 mb-8">
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                <Play className="w-6 h-6 mr-2" />
                                Videos
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {product.videoUrl && (
                                    <div>
                                        <h4 className="font-medium text-gray-300 mb-2">Product Demo</h4>
                                        <div className="aspect-video bg-gray-600 rounded-lg overflow-hidden">
                                            <iframe
                                                src={product.videoUrl}
                                                className="w-full h-full"
                                                allowFullScreen
                                                title="Product Demo"
                                            />
                                        </div>
                                    </div>
                                )}
                                {product.activationVideoUrl && (
                                    <div>
                                        <h4 className="font-medium text-gray-300 mb-2">Activation Guide</h4>
                                        <div className="aspect-video bg-gray-600 rounded-lg overflow-hidden">
                                            <iframe
                                                src={product.activationVideoUrl}
                                                className="w-full h-full"
                                                allowFullScreen
                                                title="Activation Guide"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Rich Text Content Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Description */}
                        <div className="bg-gray-700 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                <Package className="w-6 h-6 mr-2" />
                                Description
                            </h3>
                            {renderHTMLContent(product.description)}
                        </div>

                        {/* Overall Features */}
                        {product.overallFeatures && (
                            <div className="bg-gray-700 rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <Zap className="w-6 h-6 mr-2" />
                                    Features
                                </h3>
                                {renderHTMLContent(product.overallFeatures)}
                            </div>
                        )}

                        {/* Requirements */}
                        {product.requirements && (
                            <div className="bg-gray-700 rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <Monitor className="w-6 h-6 mr-2" />
                                    System Requirements
                                </h3>
                                {renderHTMLContent(product.requirements)}
                            </div>
                        )}
                    </div>

                    {/* Pricing Section */}
                    <div className="bg-gray-700 rounded-lg p-6 mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                            <DollarSign className="w-6 h-6 mr-2" />
                            Pricing Plans
                        </h3>

                        {/* Subscription Plans */}
                        {product.subscriptionDurations && product.subscriptionDurations.length > 0 && (
                            <div className="mb-6">
                                <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                                    <CreditCard className="w-5 h-5 mr-2" />
                                    Subscription Plans
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {product.subscriptionDurations.map((sub, index) => (
                                        <div key={index} className="bg-gray-600 rounded-lg p-4 border border-gray-500">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-white">₹{sub.price?.toLocaleString()}</div>
                                                <div className="text-sm text-gray-300">{sub.duration}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Legacy Pricing (backward compatibility) */}
                        {(!product.subscriptionDurations || product.subscriptionDurations.length === 0) && (
                            <div className="mb-6">
                                <h4 className="text-lg font-medium text-white mb-3">License Plans</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {product.price1 && (
                                        <div className="bg-gray-600 rounded-lg p-4 border border-gray-500">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-white">₹{product.price1.toLocaleString()}</div>
                                                <div className="text-sm text-gray-300">1-Year License</div>
                                                {product.oldPrice1 && (
                                                    <div className="text-sm text-gray-400 line-through">₹{product.oldPrice1.toLocaleString()}</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {product.price3 && (
                                        <div className="bg-gray-600 rounded-lg p-4 border border-gray-500">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-white">₹{product.price3.toLocaleString()}</div>
                                                <div className="text-sm text-gray-300">3-Year License</div>
                                                {product.oldPrice3 && (
                                                    <div className="text-sm text-gray-400 line-through">₹{product.oldPrice3.toLocaleString()}</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {product.priceLifetime && (
                                        <div className="bg-gray-600 rounded-lg p-4 border border-gray-500">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-white">₹{product.priceLifetime.toLocaleString()}</div>
                                                <div className="text-sm text-gray-300">Lifetime License</div>
                                                {product.oldPriceLifetime && (
                                                    <div className="text-sm text-gray-400 line-through">₹{product.oldPriceLifetime.toLocaleString()}</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Special Pricing */}
                        {(product.hasLifetime || product.hasMembership) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {product.hasLifetime && product.lifetimePrice && (
                                    <div className="bg-green-600 rounded-lg p-4 border border-green-500">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-white">₹{product.lifetimePrice.toLocaleString()}</div>
                                            <div className="text-sm text-green-100">Lifetime Access</div>
                                        </div>
                                    </div>
                                )}
                                {product.hasMembership && product.membershipPrice && (
                                    <div className="bg-purple-600 rounded-lg p-4 border border-purple-500">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-white">₹{product.membershipPrice.toLocaleString()}</div>
                                            <div className="text-sm text-purple-100">Membership</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* FAQs Section */}
                    {product.faqs && product.faqs.length > 0 && (
                        <div className="bg-gray-700 rounded-lg p-6 mb-8">
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                <HelpCircle className="w-6 h-6 mr-2" />
                                Frequently Asked Questions
                            </h3>
                            <div className="space-y-4">
                                {product.faqs.map((faq, index) => (
                                    <div key={index} className="bg-gray-600 rounded-lg p-4 border border-gray-500">
                                        <h4 className="font-medium text-white mb-2">{faq.question}</h4>
                                        <p className="text-gray-300">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Metadata */}
                    <div className="bg-gray-700 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                            <Calendar className="w-6 h-6 mr-2" />
                            Metadata
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <span className="text-sm font-medium text-gray-400">Created At</span>
                                <p className="text-white">{formatDate(product.createdAt)}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-400">Updated At</span>
                                <p className="text-white">{formatDate(product.updatedAt)}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-400">Product ID</span>
                                <p className="text-white font-mono text-sm">{product._id || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 px-6 py-4 flex justify-end">
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