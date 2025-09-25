import React, { useEffect, useState } from "react";
import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor';
import './AddProductModal.css'
import type { Product } from "../../../api/types/productTypes";
import Swal from "sweetalert2";
import { Plus, X, Save, HelpCircle } from "lucide-react";

const categories = [
    { value: "design-tools", label: "Design Tools" },
    { value: "cad-software", label: "CAD Software" },
    { value: "office-suite", label: "Office Suite" },
    { value: "security-tools", label: "Security Tools" },
    { value: "creative-software", label: "Creative Software" },
    { value: "productivity-tools", label: "Productivity Tools" },
    { value: "development-tools", label: "Development Tools" },
];

const brands = [
    { value: "autodesk", label: "Autodesk" },
    { value: "adobe", label: "Adobe" },
    { value: "microsoft", label: "Microsoft" },
    { value: "jetbrains", label: "JetBrains" },
    { value: "corel", label: "Corel" },
    { value: "vmware", label: "VMware" },
];

interface SubscriptionDuration {
    duration: string;
    price: string;
}

interface FAQ {
    question: string;
    answer: string;
}

interface AddProductModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (form: any) => void;
    product?: Product | null;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
    open, onClose, onSave, product
}) => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        version: "",
        shortDescription: "",
        description: "",
        overallFeatures: "",
        requirements: "",
        category: categories[0].value,
        brand: brands[0].value,
        subscriptionDurations: [{ duration: "1 Year", price: "" }] as SubscriptionDuration[],
        subscriptions: [{ duration: "Monthly", price: "" }] as SubscriptionDuration[],
        hasLifetime: false,
        lifetimePrice: "",
        hasMembership: false,
        membershipPrice: "",
        imageUrl: "",
        additionalImages: [""] as string[],
        videoUrl: "",
        activationVideoUrl: "",
        status: "active",
        isBestSeller: false,
        faqs: [] as FAQ[],
    });

    useEffect(() => {
        if (open) {
            if (product) {
                // Editing existing product - map all fields properly
                setNewProduct({
                    name: product.name || "",
                    version: product.version || "",
                    shortDescription: product.shortDescription || "",
                    description: product.description || "",
                    overallFeatures: product.overallFeatures || "",
                    requirements: product.requirements || "",
                    category: product.category || categories[0].value,
                    brand: product.brand || product.company || brands[0].value,
                    subscriptionDurations: product.subscriptionDurations && product.subscriptionDurations.length > 0
                        ? product.subscriptionDurations.map(sub => ({
                            duration: sub.duration,
                            price: sub.price?.toString() || ""
                        }))
                        : [
                            { duration: "1 Year", price: product.price1?.toString() || "" },
                            ...(product.price3 ? [{ duration: "3 Year", price: product.price3.toString() }] : [])
                        ],
                    subscriptions: [{ duration: "Monthly", price: "" }],
                    hasLifetime: product.hasLifetime || !!product.priceLifetime || !!product.lifetimePrice,
                    lifetimePrice: product.lifetimePrice?.toString() || product.priceLifetime?.toString() || "",
                    hasMembership: product.hasMembership || !!product.membershipPrice,
                    membershipPrice: product.membershipPrice?.toString() || "",
                    imageUrl: product.imageUrl || product.image || "",
                    additionalImages: (product.additionalImages && product.additionalImages.length > 0) ? product.additionalImages : [""],
                    videoUrl: product.videoUrl || "",
                    activationVideoUrl: product.activationVideoUrl || "",
                    status: product.status || "active",
                    isBestSeller: product.isBestSeller || false,
                    faqs: product.faqs || [],
                });
            } else {
                // Reset for new product
                setNewProduct({
                    name: "",
                    version: "",
                    shortDescription: "",
                    description: "",
                    overallFeatures: "",
                    requirements: "",
                    category: categories[0].value,
                    brand: brands[0].value,
                    subscriptionDurations: [{ duration: "1 Year", price: "" }],
                    subscriptions: [{ duration: "Monthly", price: "" }],
                    hasLifetime: false,
                    lifetimePrice: "",
                    hasMembership: false,
                    membershipPrice: "",
                    imageUrl: "",
                    additionalImages: [""],
                    videoUrl: "",
                    activationVideoUrl: "",
                    status: "active",
                    isBestSeller: false,
                    faqs: [],
                });
            }
        }
    }, [open, product]);

    if (!open) return null;

    // Helper functions
    const handleInputChange = (field: string, value: string) => {
        setNewProduct(prev => ({ ...prev, [field]: value }));
    };

    const updateSubscriptionDuration = (index: number, field: 'duration' | 'price', value: string) => {
        setNewProduct(prev => ({
            ...prev,
            subscriptionDurations: prev.subscriptionDurations.map((sub, i) =>
                i === index ? { ...sub, [field]: value } : sub
            )
        }));
    };

    const addSubscriptionDuration = () => {
        setNewProduct(prev => ({
            ...prev,
            subscriptionDurations: [...prev.subscriptionDurations, { duration: "", price: "" }]
        }));
    };

    const removeSubscriptionDuration = (index: number) => {
        setNewProduct(prev => ({
            ...prev,
            subscriptionDurations: prev.subscriptionDurations.filter((_, i) => i !== index)
        }));
    };

    const updateImageField = (field: 'additionalImages', index: number, value: string) => {
        setNewProduct(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const addImageField = (field: 'additionalImages') => {
        setNewProduct(prev => ({
            ...prev,
            [field]: [...prev[field], ""]
        }));
    };

    const removeImageField = (field: 'additionalImages', index: number) => {
        setNewProduct(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const addFAQ = () => {
        setNewProduct(prev => ({
            ...prev,
            faqs: [...prev.faqs, { question: "", answer: "" }]
        }));
    };

    const removeFAQ = (index: number) => {
        setNewProduct(prev => ({
            ...prev,
            faqs: prev.faqs.filter((_, i) => i !== index)
        }));
    };

    const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
        setNewProduct(prev => ({
            ...prev,
            faqs: prev.faqs.map((faq, i) =>
                i === index ? { ...faq, [field]: value } : faq
            )
        }));
    };

    // Subscription management functions (separate from pricing)
    const updateSubscription = (index: number, field: 'duration' | 'price', value: string) => {
        setNewProduct(prev => ({
            ...prev,
            subscriptions: prev.subscriptions.map((sub, i) =>
                i === index ? { ...sub, [field]: value } : sub
            )
        }));
    };

    const addSubscription = () => {
        setNewProduct(prev => ({
            ...prev,
            subscriptions: [...prev.subscriptions, { duration: "Monthly", price: "" }]
        }));
    };

    const removeSubscription = (index: number) => {
        setNewProduct(prev => ({
            ...prev,
            subscriptions: prev.subscriptions.filter((_, i) => i !== index)
        }));
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await Swal.fire({
            title: product ? 'Update Product?' : 'Create New Product?',
            text: product
                ? `Are you sure you want to update "${newProduct.name}"?`
                : `Are you sure you want to create "${newProduct.name}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: product ? 'Yes, update it!' : 'Yes, create it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            customClass: {
                popup: 'rounded-xl',
                confirmButton: 'px-4 py-2 rounded-lg',
                cancelButton: 'px-4 py-2 rounded-lg'
            }
        });

        if (result.isConfirmed) {
            // Transform new product structure to match current backend expectations
            const productData = {
                name: newProduct.name,
                version: newProduct.version,
                description: newProduct.description,
                category: newProduct.category,
                company: newProduct.brand,
                price1: newProduct.subscriptionDurations[0]?.price ? Number(newProduct.subscriptionDurations[0].price) : 0,
                price3: newProduct.subscriptionDurations[1]?.price ? Number(newProduct.subscriptionDurations[1].price) : undefined,
                priceLifetime: newProduct.hasLifetime && newProduct.lifetimePrice ? Number(newProduct.lifetimePrice) : undefined,
                image: newProduct.imageUrl,
                additionalImages: newProduct.additionalImages.filter(img => img.trim() !== ""),
                // Store additional fields as metadata (will be properly supported when backend is updated)
                shortDescription: newProduct.shortDescription,
                overallFeatures: newProduct.overallFeatures,
                requirements: newProduct.requirements,
                membershipPrice: newProduct.hasMembership && newProduct.membershipPrice ? Number(newProduct.membershipPrice) : undefined,
                videoUrl: newProduct.videoUrl,
                activationVideoUrl: newProduct.activationVideoUrl,
                status: newProduct.status,
                isBestSeller: newProduct.isBestSeller,
                faqs: newProduct.faqs,
            };

            onSave(productData);

            // Show success message
            Swal.fire({
                title: product ? 'Updated!' : 'Created!',
                text: product
                    ? `"${newProduct.name}" has been successfully updated.`
                    : `"${newProduct.name}" has been successfully created.`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                customClass: {
                    popup: 'rounded-xl'
                }
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
            <div className="relative bg-white rounded-xl shadow-lg max-w-4xl w-full mx-4 p-6 overflow-y-auto max-h-[90vh] modal-scroll-container">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-6 text-2xl font-bold text-gray-400 hover:text-gray-600"
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">{product ? 'Edit Product' : 'Add New Product'}</h1>
                    <p className="text-gray-600 mt-1">Add a new software product to your catalog with advanced formatting options</p>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-8">
                    {/* Basic Information */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Basic Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    value={newProduct.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="e.g., AutoCAD 2025"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Version</label>
                                <input
                                    type="text"
                                    value={newProduct.version}
                                    onChange={(e) => handleInputChange('version', e.target.value)}
                                    placeholder="e.g., 2025.1"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Short Description</label>
                            <textarea
                                value={newProduct.shortDescription}
                                onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                                placeholder="Brief product summary (1-2 sentences)..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                                required
                            />
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Description Section</h2>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Overall View</label>
                                <RichTextEditor
                                    value={newProduct.description}
                                    onChange={(value) => handleInputChange('description', value)}
                                    placeholder="Detailed product overview with rich formatting..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Overall Features</label>
                                <RichTextEditor
                                    value={newProduct.overallFeatures}
                                    onChange={(value) => handleInputChange('overallFeatures', value)}
                                    placeholder="List key features and capabilities with rich formatting..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">System Requirements</label>
                                <RichTextEditor
                                    value={newProduct.requirements}
                                    onChange={(value) => handleInputChange('requirements', value)}
                                    placeholder="List system requirements with rich formatting..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Category & Brand */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Category & Brand</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    value={newProduct.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {categories.map((category) => (
                                        <option key={category.value} value={category.value}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Brand</label>
                                <select
                                    value={newProduct.brand}
                                    onChange={(e) => handleInputChange('brand', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {brands.map((brand) => (
                                        <option key={brand.value} value={brand.value}>
                                            {brand.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Options */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Pricing Options</h2>

                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">Add different year-based pricing options</p>

                            {/* Pricing Durations */}
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700">Pricing</label>
                                {newProduct.subscriptionDurations.map((sub, index) => (
                                    <div key={index} className="flex gap-4 items-end">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                            <select
                                                value={sub.duration}
                                                onChange={(e) => updateSubscriptionDuration(index, 'duration', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="1 Year">1 Year</option>
                                                <option value="2 Year">2 Year</option>
                                                <option value="3 Year">3 Year</option>
                                                <option value="6 Months">6 Months</option>
                                                <option value="Monthly">Monthly</option>
                                            </select>
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                            <input
                                                type="number"
                                                value={sub.price}
                                                onChange={(e) => updateSubscriptionDuration(index, 'price', e.target.value)}
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeSubscriptionDuration(index)}
                                            disabled={newProduct.subscriptionDurations.length === 1}
                                            className="px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addSubscriptionDuration}
                                    className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Duration
                                </button>
                            </div>

                            {/* Lifetime License */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="hasLifetime"
                                    checked={newProduct.hasLifetime}
                                    onChange={(e) => setNewProduct(prev => ({ ...prev, hasLifetime: e.target.checked }))}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="hasLifetime" className="text-sm font-medium text-gray-700">Offer Lifetime License</label>
                            </div>
                            {newProduct.hasLifetime && (
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Lifetime Price ($)</label>
                                    <input
                                        type="number"
                                        value={newProduct.lifetimePrice}
                                        onChange={(e) => handleInputChange('lifetimePrice', e.target.value)}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            )}

                            {/* Membership Option */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="hasMembership"
                                    checked={newProduct.hasMembership}
                                    onChange={(e) => setNewProduct(prev => ({ ...prev, hasMembership: e.target.checked }))}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="hasMembership" className="text-sm font-medium text-gray-700">VIP/Premium Membership Option</label>
                            </div>
                            <p className="text-sm text-gray-500">Premium membership with exclusive benefits and priority support</p>
                            {newProduct.hasMembership && (
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Membership Price ($)</label>
                                    <input
                                        type="number"
                                        value={newProduct.membershipPrice}
                                        onChange={(e) => handleInputChange('membershipPrice', e.target.value)}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Subscription Plans */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Subscription Plans</h2>

                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">Add recurring subscription plans for your software</p>

                            {/* Subscription Durations */}
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700">Subscription Plans</label>
                                {newProduct.subscriptions.map((sub, index) => (
                                    <div key={index} className="flex gap-4 items-end">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                            <select
                                                value={sub.duration}
                                                onChange={(e) => updateSubscription(index, 'duration', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="Monthly">Monthly</option>
                                                <option value="Quarterly">Quarterly</option>
                                                <option value="Semi-Annual">Semi-Annual</option>
                                                <option value="Annual">Annual</option>
                                                <option value="Weekly">Weekly</option>
                                            </select>
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                            <input
                                                type="number"
                                                value={sub.price}
                                                onChange={(e) => updateSubscription(index, 'price', e.target.value)}
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeSubscription(index)}
                                            disabled={newProduct.subscriptions.length === 1}
                                            className="px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addSubscription}
                                    className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Subscription Plan
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Media Information */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Media</h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Main Product Image</label>
                                <input
                                    type="url"
                                    value={newProduct.imageUrl}
                                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                <p className="text-sm text-gray-500">Primary product image displayed in listings and product page</p>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700">Additional Images</label>
                                {newProduct.additionalImages.map((image, index) => (
                                    <div key={index} className="flex gap-4 items-center">
                                        <div className="flex-1">
                                            <input
                                                type="url"
                                                value={image}
                                                onChange={(e) => updateImageField('additionalImages', index, e.target.value)}
                                                placeholder={`Image ${index + 1} URL - https://example.com/image${index + 1}.jpg`}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeImageField('additionalImages', index)}
                                            disabled={newProduct.additionalImages.length === 1}
                                            className="px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addImageField('additionalImages')}
                                    className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Image
                                </button>
                                <p className="text-sm text-gray-500">Additional product screenshots, interface images, or feature highlights</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Product Demo Video URL (Optional)</label>
                                    <input
                                        type="url"
                                        value={newProduct.videoUrl}
                                        onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                                        placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <p className="text-sm text-gray-500">YouTube, Vimeo, or direct video link for product demonstration</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Activation Demo Video URL (Optional)</label>
                                    <input
                                        type="url"
                                        value={newProduct.activationVideoUrl}
                                        onChange={(e) => handleInputChange('activationVideoUrl', e.target.value)}
                                        placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <p className="text-sm text-gray-500">YouTube, Vimeo, or direct video link for activation demonstration</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <HelpCircle className="h-5 w-5 text-blue-600" />
                            <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
                        </div>
                        <p className="text-sm text-gray-600">Add common questions and answers to help customers understand your product better.</p>

                        {newProduct.faqs.length > 0 ? (
                            <div className="space-y-4">
                                {newProduct.faqs.map((faq, index) => (
                                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-gray-700">FAQ #{index + 1}</label>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFAQ(index)}
                                                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Question</label>
                                                <input
                                                    type="text"
                                                    value={faq.question}
                                                    onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                                                    placeholder="Enter the question"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Answer</label>
                                                <textarea
                                                    value={faq.answer}
                                                    onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                                                    placeholder="Enter the answer"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No FAQs added yet. Click "Add FAQ" to get started.</p>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={addFAQ}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50"
                        >
                            <Plus className="h-4 w-4" />
                            Add FAQ
                        </button>
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                        <button
                            type="submit"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                        >
                            <Save className="h-4 w-4" />
                            {product ? 'Update Product' : 'Add Product'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;