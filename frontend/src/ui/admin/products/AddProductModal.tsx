import React from "react";
import FormInput from '../../../components/Input/FormInput';
import FormTextarea from '../../../components/Textarea/FormTextarea';
import FormSelect from '../../../components/Select/FormSelect';
import FormButton from '../../../components/Button/FormButton';
import './AddProductModal.css'

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
}

const AddProductModal: React.FC<AddProductModalProps> = ({
    open, onClose, onSave,
}) => {
    const [form, setForm] = React.useState({
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

    React.useEffect(() => {
        if (open) {
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
    }, [open]);

    if (!open) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
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
                <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
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
                                required
                            />
                            <FormInput
                                label="3 Year License"
                                name="price3"
                                value={form.price3}
                                onChange={handleChange}
                                placeholder="0"
                                type="number"
                            />
                            <FormInput
                                label="Lifetime License"
                                name="priceLifetime"
                                value={form.priceLifetime}
                                onChange={handleChange}
                                placeholder="0"
                                type="number"
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
                            Save Product
                        </FormButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;