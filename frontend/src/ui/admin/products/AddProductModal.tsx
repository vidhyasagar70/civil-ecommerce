import React, { useEffect, useState } from "react";
import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor';
import './AddProductModal.css'
import type { Product } from "../../../api/types/productTypes";
import Swal from "sweetalert2";
import { Plus, X, Save, HelpCircle } from "lucide-react";
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

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
    priceINR: string;
    priceUSD: string;
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
    const { colors } = useAdminTheme();
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
        lifetimePriceINR: "",
        lifetimePriceUSD: "",
        hasMembership: false,
        membershipPrice: "",
        membershipPriceINR: "",
        membershipPriceUSD: "",
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
                            price: sub.price?.toString() || "",
                            priceINR: sub.priceINR?.toString() || "",
                            priceUSD: sub.priceUSD?.toString() || ""
                        }))
                        : [
                            { duration: "1 Year", price: product.price1?.toString() || "", priceINR: product.price1INR?.toString() || "", priceUSD: product.price1USD?.toString() || "" },
                            ...(product.price3 ? [{ duration: "3 Year", price: product.price3.toString(), priceINR: product.price3INR?.toString() || "", priceUSD: product.price3USD?.toString() || "" }] : [])
                        ],
                    subscriptions: [{ duration: "Monthly", price: "", priceINR: "", priceUSD: "" }],
                    hasLifetime: product.hasLifetime || !!product.priceLifetime || !!product.lifetimePrice,
                    lifetimePrice: product.lifetimePrice?.toString() || product.priceLifetime?.toString() || "",
                    lifetimePriceINR: product.lifetimePriceINR?.toString() || product.priceLifetimeINR?.toString() || "",
                    lifetimePriceUSD: product.lifetimePriceUSD?.toString() || product.priceLifetimeUSD?.toString() || "",
                    hasMembership: product.hasMembership || !!product.membershipPrice,
                    membershipPrice: product.membershipPrice?.toString() || "",
                    membershipPriceINR: product.membershipPriceINR?.toString() || "",
                    membershipPriceUSD: product.membershipPriceUSD?.toString() || "",
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
                    subscriptionDurations: [{ duration: "1 Year", price: "", priceINR: "", priceUSD: "" }],
                    subscriptions: [{ duration: "Monthly", price: "", priceINR: "", priceUSD: "" }],
                    hasLifetime: false,
                    lifetimePrice: "",
                    lifetimePriceINR: "",
                    lifetimePriceUSD: "",
                    hasMembership: false,
                    membershipPrice: "",
                    membershipPriceINR: "",
                    membershipPriceUSD: "",
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

    const updateSubscriptionDuration = (index: number, field: 'duration' | 'price' | 'priceINR' | 'priceUSD', value: string) => {
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
            subscriptionDurations: [...prev.subscriptionDurations, { duration: "", price: "", priceINR: "", priceUSD: "" }]
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
    const updateSubscription = (index: number, field: 'duration' | 'price' | 'priceINR' | 'priceUSD', value: string) => {
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
            subscriptions: [...prev.subscriptions, { duration: "Monthly", price: "", priceINR: "", priceUSD: "" }]
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
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-75">
            <div
                className="relative rounded-xl shadow-xl max-w-4xl w-full mx-4 p-6 overflow-y-auto max-h-[90vh] modal-scroll-container transition-colors duration-200"
                style={{ backgroundColor: colors.background.secondary }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-6 text-2xl font-bold transition-colors duration-200"
                    style={{ color: colors.text.secondary }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.text.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.text.secondary}
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <div className="mb-6">
                    <h1
                        className="text-2xl font-bold"
                        style={{ color: colors.text.primary }}
                    >
                        {product ? 'Edit Product' : 'Add New Product'}
                    </h1>
                    <p
                        className="mt-1"
                        style={{ color: colors.text.secondary }}
                    >
                        Add a new software product to your catalog with advanced formatting options
                    </p>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-8">
                    {/* Basic Information */}
                    <div className="space-y-6">
                        <h2
                            className="text-xl font-semibold border-b pb-2 transition-colors duration-200"
                            style={{
                                color: colors.text.primary,
                                borderBottomColor: colors.border.primary
                            }}
                        >
                            Basic Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label
                                    className="block text-sm font-medium"
                                    style={{ color: colors.text.secondary }}
                                >
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    value={newProduct.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="e.g., AutoCAD 2025"
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                    style={{
                                        backgroundColor: colors.background.primary,
                                        borderColor: colors.border.primary,
                                        color: colors.text.primary
                                    }}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    className="block text-sm font-medium"
                                    style={{ color: colors.text.secondary }}
                                >
                                    Version
                                </label>
                                <input
                                    type="text"
                                    value={newProduct.version}
                                    onChange={(e) => handleInputChange('version', e.target.value)}
                                    placeholder="e.g., 2025.1"
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                    style={{
                                        backgroundColor: colors.background.primary,
                                        borderColor: colors.border.primary,
                                        color: colors.text.primary
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                className="block text-sm font-medium"
                                style={{ color: colors.text.secondary }}
                            >
                                Short Description
                            </label>
                            <textarea
                                value={newProduct.shortDescription}
                                onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                                placeholder="Brief product summary (1-2 sentences)..."
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 min-h-[80px] transition-colors duration-200"
                                style={{
                                    backgroundColor: colors.background.primary,
                                    borderColor: colors.border.primary,
                                    color: colors.text.primary
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = colors.interactive.primary;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = colors.border.primary;
                                }}
                                required
                            />
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="space-y-6">
                        <h2
                            className="text-xl font-semibold border-b pb-2 transition-colors duration-200"
                            style={{
                                color: colors.text.primary,
                                borderBottomColor: colors.border.primary
                            }}
                        >
                            Description Section
                        </h2>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">Overall View</label>
                                <RichTextEditor
                                    value={newProduct.description}
                                    onChange={(value) => handleInputChange('description', value)}
                                    placeholder="Detailed product overview with rich formatting..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    className="block text-sm font-medium"
                                    style={{ color: colors.text.secondary }}
                                >
                                    Overall Features
                                </label>
                                <RichTextEditor
                                    value={newProduct.overallFeatures}
                                    onChange={(value) => handleInputChange('overallFeatures', value)}
                                    placeholder="List key features and capabilities with rich formatting..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    className="block text-sm font-medium"
                                    style={{ color: colors.text.secondary }}
                                >
                                    System Requirements
                                </label>
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
                        <h2
                            className="text-xl font-semibold border-b pb-2 transition-colors duration-200"
                            style={{
                                color: colors.text.primary,
                                borderBottomColor: colors.border.primary
                            }}
                        >
                            Category & Brand
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label
                                    className="block text-sm font-medium"
                                    style={{ color: colors.text.secondary }}
                                >
                                    Category
                                </label>
                                <select
                                    value={newProduct.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                    style={{
                                        backgroundColor: colors.background.primary,
                                        borderColor: colors.border.primary,
                                        color: colors.text.primary
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.interactive.primary;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = colors.border.primary;
                                    }}
                                >
                                    {categories.map((category) => (
                                        <option key={category.value} value={category.value}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label
                                    className="block text-sm font-medium"
                                    style={{ color: colors.text.secondary }}
                                >
                                    Brand
                                </label>
                                <select
                                    value={newProduct.brand}
                                    onChange={(e) => handleInputChange('brand', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                    style={{
                                        backgroundColor: colors.background.primary,
                                        borderColor: colors.border.primary,
                                        color: colors.text.primary
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.interactive.primary;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = colors.border.primary;
                                    }}
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
                        <h2
                            className="text-xl font-semibold border-b pb-2 transition-colors duration-200"
                            style={{
                                color: colors.text.primary,
                                borderBottomColor: colors.border.primary
                            }}
                        >
                            Pricing Options
                        </h2>

                        <div className="space-y-4">
                            <p
                                className="text-sm"
                                style={{ color: colors.text.secondary }}
                            >
                                Add different year-based pricing options
                            </p>

                            {/* Pricing Durations */}
                            <div className="space-y-4">
                                <label
                                    className="block text-sm font-medium"
                                    style={{ color: colors.text.secondary }}
                                >
                                    Pricing
                                </label>
                                {newProduct.subscriptionDurations.map((sub, index) => (
                                    <div
                                        key={index}
                                        className="p-4 border rounded-lg transition-colors duration-200"
                                        style={{
                                            borderColor: colors.border.primary,
                                            backgroundColor: colors.background.tertiary
                                        }}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-1"
                                                    style={{ color: colors.text.secondary }}
                                                >
                                                    Duration
                                                </label>
                                                <select
                                                    value={sub.duration}
                                                    onChange={(e) => updateSubscriptionDuration(index, 'duration', e.target.value)}
                                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                                    style={{
                                                        backgroundColor: colors.background.primary,
                                                        borderColor: colors.border.primary,
                                                        color: colors.text.primary
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.borderColor = colors.interactive.primary;
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.borderColor = colors.border.primary;
                                                    }}
                                                >
                                                    <option value="1 Year">1 Year</option>
                                                    <option value="2 Year">2 Year</option>
                                                    <option value="3 Year">3 Year</option>
                                                    <option value="6 Months">6 Months</option>
                                                    <option value="Monthly">Monthly</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-1"
                                                    style={{ color: colors.text.secondary }}
                                                >
                                                    Price INR (₹)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={sub.price}
                                                    onChange={(e) => updateSubscriptionDuration(index, 'price', e.target.value)}
                                                    placeholder="0.00"
                                                    step="0.01"
                                                    min="0"
                                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                                    style={{
                                                        backgroundColor: colors.background.primary,
                                                        borderColor: colors.border.primary,
                                                        color: colors.text.primary
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.borderColor = colors.interactive.primary;
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.borderColor = colors.border.primary;
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-1"
                                                    style={{ color: colors.text.secondary }}
                                                >
                                                    Price USD ($)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={sub.priceUSD}
                                                    onChange={(e) => updateSubscriptionDuration(index, 'priceUSD', e.target.value)}
                                                    placeholder="0.00"
                                                    step="0.01"
                                                    min="0"
                                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                                    style={{
                                                        backgroundColor: colors.background.primary,
                                                        borderColor: colors.border.primary,
                                                        color: colors.text.primary
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.borderColor = colors.interactive.primary;
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.borderColor = colors.border.primary;
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-2">
                                            <button
                                                type="button"
                                                onClick={() => removeSubscriptionDuration(index)}
                                                disabled={newProduct.subscriptionDurations.length === 1}
                                                className="px-3 py-2 border rounded-lg hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                                style={{
                                                    color: colors.status.error,
                                                    borderColor: colors.status.error
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addSubscriptionDuration}
                                    className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:opacity-80 transition-colors duration-200"
                                    style={{
                                        color: colors.interactive.primary,
                                        borderColor: colors.interactive.primary
                                    }}
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
                                    className="rounded focus:ring-2 transition-colors duration-200"
                                    style={{
                                        borderColor: colors.border.primary,
                                        backgroundColor: colors.background.primary,
                                        color: colors.interactive.primary
                                    }}
                                />
                                <label
                                    htmlFor="hasLifetime"
                                    className="text-sm font-medium"
                                    style={{ color: colors.text.secondary }}
                                >
                                    Offer Lifetime License
                                </label>
                            </div>
                            {newProduct.hasLifetime && (
                                <div
                                    className="space-y-4 p-4 border rounded-lg transition-colors duration-200"
                                    style={{
                                        backgroundColor: colors.background.secondary,
                                        borderColor: colors.border.primary
                                    }}
                                >
                                    <h4
                                        className="text-sm font-medium"
                                        style={{ color: colors.text.secondary }}
                                    >
                                        Lifetime Pricing
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-1"
                                                style={{ color: colors.text.secondary }}
                                            >
                                                Lifetime Price INR (₹)
                                            </label>
                                            <input
                                                type="number"
                                                value={newProduct.lifetimePrice}
                                                onChange={(e) => handleInputChange('lifetimePrice', e.target.value)}
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                                style={{
                                                    backgroundColor: colors.background.primary,
                                                    borderColor: colors.border.primary,
                                                    color: colors.text.primary
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = colors.interactive.primary;
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = colors.border.primary;
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-1"
                                                style={{ color: colors.text.secondary }}
                                            >
                                                Lifetime Price USD ($)
                                            </label>
                                            <input
                                                type="number"
                                                value={newProduct.lifetimePriceUSD}
                                                onChange={(e) => handleInputChange('lifetimePriceUSD', e.target.value)}
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                                style={{
                                                    backgroundColor: colors.background.primary,
                                                    borderColor: colors.border.primary,
                                                    color: colors.text.primary
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = colors.interactive.primary;
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = colors.border.primary;
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Membership Option */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="hasMembership"
                                    checked={newProduct.hasMembership}
                                    onChange={(e) => setNewProduct(prev => ({ ...prev, hasMembership: e.target.checked }))}
                                    className="rounded focus:ring-2 transition-colors duration-200"
                                    style={{
                                        borderColor: colors.border.primary,
                                        backgroundColor: colors.background.primary,
                                        color: colors.interactive.primary
                                    }}
                                />
                                <label
                                    htmlFor="hasMembership"
                                    className="text-sm font-medium"
                                    style={{ color: colors.text.secondary }}
                                >
                                    VIP/Premium Membership Option
                                </label>
                            </div>
                            <p
                                className="text-sm"
                                style={{ color: colors.text.secondary }}
                            >
                                Premium membership with exclusive benefits and priority support
                            </p>
                            {newProduct.hasMembership && (
                                <div
                                    className="space-y-4 p-4 border rounded-lg transition-colors duration-200"
                                    style={{
                                        backgroundColor: colors.background.secondary,
                                        borderColor: colors.border.primary
                                    }}
                                >
                                    <h4
                                        className="text-sm font-medium"
                                        style={{ color: colors.text.secondary }}
                                    >
                                        Membership Pricing
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-1"
                                                style={{ color: colors.text.secondary }}
                                            >
                                                Membership Price INR (₹)
                                            </label>
                                            <input
                                                type="number"
                                                value={newProduct.membershipPrice}
                                                onChange={(e) => handleInputChange('membershipPrice', e.target.value)}
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                                style={{
                                                    backgroundColor: colors.background.primary,
                                                    borderColor: colors.border.primary,
                                                    color: colors.text.primary
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = colors.interactive.primary;
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = colors.border.primary;
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-1"
                                                style={{ color: colors.text.secondary }}
                                            >
                                                Membership Price USD ($)
                                            </label>
                                            <input
                                                type="number"
                                                value={newProduct.membershipPriceUSD}
                                                onChange={(e) => handleInputChange('membershipPriceUSD', e.target.value)}
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                                style={{
                                                    backgroundColor: colors.background.primary,
                                                    borderColor: colors.border.primary,
                                                    color: colors.text.primary
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = colors.interactive.primary;
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = colors.border.primary;
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Subscription Plans */}
                    <div className="space-y-6">
                        <h2
                            className="text-xl font-semibold border-b pb-2 transition-colors duration-200"
                            style={{
                                color: colors.text.primary,
                                borderBottomColor: colors.border.primary
                            }}
                        >
                            Subscription Plans
                        </h2>

                        <div className="space-y-4">
                            <p
                                className="text-sm"
                                style={{ color: colors.text.secondary }}
                            >
                                Add recurring subscription plans for your software
                            </p>

                            {/* Subscription Durations */}
                            <div className="space-y-4">
                                <label
                                    className="block text-sm font-medium"
                                    style={{ color: colors.text.secondary }}
                                >
                                    Subscription Plans
                                </label>
                                {newProduct.subscriptions.map((sub, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-lg space-y-4 transition-colors duration-200"
                                        style={{ backgroundColor: colors.background.tertiary }}
                                    >
                                        <div className="flex gap-4 items-center">
                                            <div className="flex-1">
                                                <label
                                                    className="block text-sm font-medium mb-1"
                                                    style={{ color: colors.text.secondary }}
                                                >
                                                    Duration
                                                </label>
                                                <select
                                                    value={sub.duration}
                                                    onChange={(e) => updateSubscription(index, 'duration', e.target.value)}
                                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                                    style={{
                                                        backgroundColor: colors.background.primary,
                                                        borderColor: colors.border.primary,
                                                        color: colors.text.primary
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.borderColor = colors.interactive.primary;
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.borderColor = colors.border.primary;
                                                    }}
                                                >
                                                    <option value="Monthly">Monthly</option>
                                                    <option value="Quarterly">Quarterly</option>
                                                    <option value="Semi-Annual">Semi-Annual</option>
                                                    <option value="Annual">Annual</option>
                                                    <option value="Weekly">Weekly</option>
                                                </select>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeSubscription(index)}
                                                disabled={newProduct.subscriptions.length === 1}
                                                className="px-3 py-2 border rounded-lg hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                                style={{
                                                    color: colors.status.error,
                                                    borderColor: colors.status.error
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-1"
                                                    style={{ color: colors.text.secondary }}
                                                >
                                                    INR (₹)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={sub.price}
                                                    onChange={(e) => updateSubscription(index, 'price', e.target.value)}
                                                    placeholder="0.00"
                                                    step="0.01"
                                                    min="0"
                                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                                    style={{
                                                        backgroundColor: colors.background.primary,
                                                        borderColor: colors.border.primary,
                                                        color: colors.text.primary
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.borderColor = colors.interactive.primary;
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.borderColor = colors.border.primary;
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-1"
                                                    style={{ color: colors.text.secondary }}
                                                >
                                                    USD ($)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={sub.priceUSD || ''}
                                                    onChange={(e) => updateSubscription(index, 'priceUSD', e.target.value)}
                                                    placeholder="0.00"
                                                    step="0.01"
                                                    min="0"
                                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                                    style={{
                                                        backgroundColor: colors.background.primary,
                                                        borderColor: colors.border.primary,
                                                        color: colors.text.primary
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.borderColor = colors.interactive.primary;
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.borderColor = colors.border.primary;
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addSubscription}
                                    className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:opacity-80 transition-colors duration-200"
                                    style={{
                                        color: colors.interactive.primary,
                                        borderColor: colors.interactive.primary
                                    }}
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Subscription Plan
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Media Information */}
                    <div className="space-y-6">
                        <h2
                            className="text-xl font-semibold border-b pb-2 transition-colors duration-200"
                            style={{
                                color: colors.text.primary,
                                borderBottomColor: colors.border.primary
                            }}
                        >
                            Media
                        </h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="block text-sm font-medium"
                                    style={{ color: colors.text.secondary }}
                                >
                                    Main Product Image
                                </label>
                                <input
                                    type="url"
                                    value={newProduct.imageUrl}
                                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                    style={{
                                        backgroundColor: colors.background.tertiary,
                                        borderColor: colors.border.primary,
                                        color: colors.text.primary
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.interactive.primary;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = colors.border.primary;
                                    }}
                                    required
                                />
                                <p
                                    className="text-sm"
                                    style={{ color: colors.text.secondary }}
                                >
                                    Primary product image displayed in listings and product page
                                </p>
                            </div>

                            <div className="space-y-4">
                                <label
                                    className="block text-sm font-medium"
                                    style={{ color: colors.text.secondary }}
                                >
                                    Additional Images
                                </label>
                                {newProduct.additionalImages.map((image, index) => (
                                    <div key={index} className="flex gap-4 items-center">
                                        <div className="flex-1">
                                            <input
                                                type="url"
                                                value={image}
                                                onChange={(e) => updateImageField('additionalImages', index, e.target.value)}
                                                placeholder={`Image ${index + 1} URL - https://example.com/image${index + 1}.jpg`}
                                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                                style={{
                                                    backgroundColor: colors.background.tertiary,
                                                    borderColor: colors.border.primary,
                                                    color: colors.text.primary
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = colors.interactive.primary;
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = colors.border.primary;
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeImageField('additionalImages', index)}
                                            disabled={newProduct.additionalImages.length === 1}
                                            className="px-3 py-2 border rounded-lg hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                            style={{
                                                color: colors.status.error,
                                                borderColor: colors.status.error
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addImageField('additionalImages')}
                                    className="flex items-center gap-2 px-4 py-2 text-yellow-400 border border-yellow-600 rounded-lg hover:bg-yellow-900"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Image
                                </button>
                                <p className="text-sm text-gray-400">Additional product screenshots, interface images, or feature highlights</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label
                                        className="block text-sm font-medium"
                                        style={{ color: colors.text.secondary }}
                                    >
                                        Product Demo Video URL (Optional)
                                    </label>
                                    <input
                                        type="url"
                                        value={newProduct.videoUrl}
                                        onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                                        placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                        style={{
                                            backgroundColor: colors.background.primary,
                                            borderColor: colors.border.primary,
                                            color: colors.text.primary
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = colors.interactive.primary;
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = colors.border.primary;
                                        }}
                                    />
                                    <p
                                        className="text-sm"
                                        style={{ color: colors.text.secondary }}
                                    >
                                        YouTube, Vimeo, or direct video link for product demonstration
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <label
                                        className="block text-sm font-medium"
                                        style={{ color: colors.text.secondary }}
                                    >
                                        Activation Demo Video URL (Optional)
                                    </label>
                                    <input
                                        type="url"
                                        value={newProduct.activationVideoUrl}
                                        onChange={(e) => handleInputChange('activationVideoUrl', e.target.value)}
                                        placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                        style={{
                                            backgroundColor: colors.background.primary,
                                            borderColor: colors.border.primary,
                                            color: colors.text.primary
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = colors.interactive.primary;
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = colors.border.primary;
                                        }}
                                    />
                                    <p
                                        className="text-sm"
                                        style={{ color: colors.text.secondary }}
                                    >
                                        YouTube, Vimeo, or direct video link for activation demonstration
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <HelpCircle
                                className="h-5 w-5"
                                style={{ color: colors.interactive.primary }}
                            />
                            <h2
                                className="text-xl font-semibold"
                                style={{ color: colors.text.primary }}
                            >
                                Frequently Asked Questions
                            </h2>
                        </div>
                        <p
                            className="text-sm"
                            style={{ color: colors.text.secondary }}
                        >
                            Add common questions and answers to help customers understand your product better.
                        </p>

                        {newProduct.faqs.length > 0 ? (
                            <div className="space-y-4">
                                {newProduct.faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="p-4 border rounded-lg transition-colors duration-200"
                                        style={{
                                            backgroundColor: colors.background.secondary,
                                            borderColor: colors.border.primary
                                        }}
                                    >
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label
                                                    className="text-sm font-medium"
                                                    style={{ color: colors.text.secondary }}
                                                >
                                                    FAQ #{index + 1}
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFAQ(index)}
                                                    className="p-1 rounded hover:opacity-80 transition-colors duration-200"
                                                    style={{ color: colors.status.error }}
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="space-y-2">
                                                <label
                                                    className="block text-sm font-medium"
                                                    style={{ color: colors.text.secondary }}
                                                >
                                                    Question
                                                </label>
                                                <input
                                                    type="text"
                                                    value={faq.question}
                                                    onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                                                    placeholder="Enter the question"
                                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200"
                                                    style={{
                                                        backgroundColor: colors.background.primary,
                                                        borderColor: colors.border.primary,
                                                        color: colors.text.primary
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.borderColor = colors.interactive.primary;
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.borderColor = colors.border.primary;
                                                    }}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label
                                                    className="block text-sm font-medium"
                                                    style={{ color: colors.text.secondary }}
                                                >
                                                    Answer
                                                </label>
                                                <textarea
                                                    value={faq.answer}
                                                    onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                                                    placeholder="Enter the answer"
                                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 transition-colors duration-200 min-h-[80px]"
                                                    style={{
                                                        backgroundColor: colors.background.primary,
                                                        borderColor: colors.border.primary,
                                                        color: colors.text.primary
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.borderColor = colors.interactive.primary;
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.borderColor = colors.border.primary;
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="text-center py-8"
                                style={{ color: colors.text.secondary }}
                            >
                                <HelpCircle
                                    className="h-12 w-12 mx-auto mb-4 opacity-50"
                                    style={{ color: colors.text.secondary }}
                                />
                                <p>No FAQs added yet. Click "Add FAQ" to get started.</p>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={addFAQ}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:opacity-80 transition-colors duration-200"
                            style={{
                                color: colors.interactive.primary,
                                borderColor: colors.interactive.primary
                            }}
                        >
                            <Plus className="h-4 w-4" />
                            Add FAQ
                        </button>
                    </div>

                    {/* Form Actions */}
                    <div
                        className="flex flex-col sm:flex-row gap-4 pt-6 border-t transition-colors duration-200"
                        style={{ borderColor: colors.border.primary }}
                    >
                        <button
                            type="submit"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg hover:opacity-90 focus:ring-2 focus:ring-offset-2 transition-all duration-200"
                            style={{
                                backgroundColor: colors.interactive.primary,
                                color: colors.text.inverse
                            }}
                        >
                            <Save className="h-4 w-4" />
                            {product ? 'Update Product' : 'Add Product'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border rounded-lg hover:opacity-80 focus:ring-2 focus:ring-offset-2 transition-all duration-200"
                            style={{
                                color: colors.text.secondary,
                                borderColor: colors.border.primary,
                                backgroundColor: 'transparent'
                            }}
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