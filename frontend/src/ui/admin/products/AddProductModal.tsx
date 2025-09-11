import React, { useEffect, useState } from "react";
import FormInput from '../../../components/Input/FormInput';
import FormTextarea from '../../../components/Textarea/FormTextarea';
import FormSelect from '../../../components/Select/FormSelect';
import FormButton from '../../../components/Button/FormButton';
import './AddProductModal.css'
import type { Product } from "../../../api/productApi";
import Swal from "sweetalert2";

const categories = [
    { value: "CAD Software", label: "CAD Software" },
    { value: "BIM Software", label: "BIM Software" },
    { value: "Design Software", label: "Design Software" },
    { value: "Rendering", label: "Rendering" },
    { value: "Simulation", label: "Simulation" },
    { value: "Structural Analysis", label: "Structural Analysis" },
];

const companies = [
    { value: "Autodesk", label: "Autodesk" },
    { value: "Microsoft", label: "Microsoft" },
    { value: "Trimble", label: "Trimble" },
    { value: "Adobe", label: "Adobe" },
    { value: "ANSYS", label: "ANSYS" },
];

interface AddProductModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (form: any) => void;
    product?: Product | null;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
    open, onClose, onSave, product
}) => {
    const [form, setForm] = useState({
        name: "",
        version: "",
        description: "",
        category: categories[0].value,
        company: companies[0].value,
        price1: "",
        price3: "",
        priceLifetime: "",
        image: "",
    });

    useEffect(() => {
        if (open) {
            if (product) {
                // Editing existing product
                setForm({
                    name: product.name || "",
                    version: product.version || "",
                    description: product.description || "",
                    category: product.category || categories[0].value,
                    company: product.company || companies[0].value,
                    price1: product.price1?.toString() || "",
                    price3: product.price3?.toString() || "",
                    priceLifetime: product.priceLifetime?.toString() || "",
                    image: product.image || "",
                });
            } else {
                // Creating new product
                setForm({
                    name: "",
                    version: "",
                    description: "",
                    category: categories[0].value,
                    company: companies[0].value,
                    price1: "",
                    price3: "",
                    priceLifetime: "",
                    image: "",
                });
            }
        }
    }, [open, product]);

    if (!open) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Show confirmation dialog
        const result = await Swal.fire({
            title: product ? 'Update Product?' : 'Create New Product?',
            text: product
                ? `Are you sure you want to update "${form.name}"?`
                : `Are you sure you want to create "${form.name}"?`,
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
            const productData = {
                ...form,
                price1: Number(form.price1),
                price3: form.price3 ? Number(form.price3) : undefined,
                priceLifetime: form.priceLifetime ? Number(form.priceLifetime) : undefined,
            };

            onSave(productData);

            // Show success message
            Swal.fire({
                title: product ? 'Updated!' : 'Created!',
                text: product
                    ? `"${form.name}" has been successfully updated.`
                    : `"${form.name}" has been successfully created.`,
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
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ">
            <div className="relative bg-white rounded-xl shadow-lg max-w-xl w-full p-6 overflow-y-auto max-h-[90vh] modal-scroll-container">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-6 text-2xl font-bold text-gray-400"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4">
                    {product ? "Edit Product" : "Add New Product"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="p-4 border rounded-lg">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <FormInput
                                    label="Product Name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g., AutoCAD 2024"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <FormInput
                                    label="Version"
                                    name="version"
                                    value={form.version}
                                    onChange={handleChange}
                                    placeholder="e.g., 2024.1"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <FormTextarea
                                label="Description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Product description..."
                                required
                            />
                        </div>
                    </div>

                    {/* Category & Company */}
                    <div className="p-4 border rounded-lg">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <FormSelect
                                    label="Category"
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    options={categories}
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <FormSelect
                                    label="Company"
                                    name="company"
                                    value={form.company}
                                    onChange={handleChange}
                                    options={companies}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="p-4 border rounded-lg">
                        <label className="block font-medium mb-2">Pricing (₹)</label>
                        <div className="flex gap-4">
                            <FormInput
                                label="1 Year License"
                                name="price1"
                                value={form.price1}
                                onChange={handleChange}
                                placeholder="0"
                                type="number"
                                min="0"
                                step="0.01"
                                required
                            />
                            <FormInput
                                label="3 Year License"
                                name="price3"
                                value={form.price3}
                                onChange={handleChange}
                                placeholder="0"
                                type="number"
                                min="0"
                                step="0.01"
                            />
                            <FormInput
                                label="Lifetime License"
                                name="priceLifetime"
                                value={form.priceLifetime}
                                onChange={handleChange}
                                placeholder="0"
                                type="number"
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>

                    {/* Media Section */}
                    <div className="p-4 border rounded-lg">
                        <FormInput
                            label="Image URL"
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3">
                        <FormButton type="button" variant="secondary" onClick={onClose}>
                            Cancel
                        </FormButton>
                        <FormButton type="submit" variant="primary">
                            {product ? "Update Product" : "Save Product"}
                        </FormButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;