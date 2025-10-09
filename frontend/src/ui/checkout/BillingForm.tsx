import React from "react";
import FormInput from "../../components/Input/FormInput";

interface BillingFormProps {
  formData: { name: string; whatsapp: string; email: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  colors: any;
}

const BillingForm: React.FC<BillingFormProps> = ({ formData, handleChange, colors }) => {
  return (
   <div
className="space-y-10 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-shadow duration-200"
  style={{
    backgroundColor: colors.background.secondary,
    color: colors.text.primary,
    border: `1px solid ${colors.border.primary}`, // ✅ subtle border
  }}
>
      <h2 className="text-2xl font-semibold">Billing details</h2>

      {/* Name */}
      <FormInput
        label="Name"
        name="name"
        type="text"
        required
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
      />

      {/* WhatsApp */}
      <FormInput
        label="WhatsApp Number"
        name="whatsapp"
        type="tel"
        required
        value={formData.whatsapp}
        onChange={handleChange}
        placeholder="Enter your WhatsApp number"
      />

      {/* Email */}
      <FormInput
        label="Email Address"
        name="email"
        type="email"
        required
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
      />

      {/* Checkbox */}
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="create-account" className="rounded" />
        <label htmlFor="create-account" className="text-sm">
          Create an account?
        </label>
      </div>
    </div>
  );
};

export default BillingForm;
