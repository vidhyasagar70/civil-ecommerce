import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAdminTheme } from "../contexts/AdminThemeContext";
import BillingForm from "../ui/checkout/BillingForm";
import OrderSummary from "../ui/checkout/OrderSummary";
import CouponForm from "../ui/checkout/CouponForm";

// Types
interface CartItem {
  id: string | number;
  product: { name: string; price: number };
  quantity: number;
}

interface Summary {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  itemCount: number;
}

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const { colors } = useAdminTheme();

  const rawCartItems: any[] = location.state?.items || [];
  const rawSummary: any = location.state?.summary || {};

  const cartItems: CartItem[] = rawCartItems.map(item => ({
    id: item.id,
    product: {
      name: item.product?.name || "Unknown Product",
      price: Number(item.product?.price) || 0,
    },
    quantity: Number(item.quantity) || 1,
  }));

  const summary: Summary = {
    subtotal: Number(rawSummary.subtotal) || 0,
    tax: Number(rawSummary.tax) || 0,
    discount: Number(rawSummary.discount) || 0,
    total: Number(rawSummary.total) || 0,
    itemCount: Number(rawSummary.itemCount) || cartItems.length,
  };

  // State
  const [formData, setFormData] = useState({ name: "", whatsapp: "", email: "" });
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  

  const normalizePrice = (price: any) =>
    parseFloat(String(price || 0).replace(/[^0-9.]/g, "")) || 0;

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal = normalizePrice(summary.subtotal);
    const tax = normalizePrice(summary.tax);
    const total = subtotal + tax - discount;

    console.log("✅ Order Placed", { billing: formData, cart: cartItems, total, couponCode });
    alert("Order placed successfully!");
  };

  const applyCoupon = () => {
    const subtotal = normalizePrice(summary.subtotal);
    let newDiscount = 0;
    const code = couponCode.trim().toUpperCase();

    if (code === "SAVE10") newDiscount = subtotal * 0.1;
    else if (code === "FLAT50") newDiscount = 50;
    else return alert("Invalid coupon code");

    setDiscount(newDiscount);
    alert(`Coupon applied! Discount: ₹${newDiscount.toFixed(2)}`);
  };

  return (
    <div
      className="min-h-screen py-10 px-4 sm:px-6 md:px-12"
      style={{ backgroundColor: colors.background.primary }}
    >
      {/* Heading */}
      <h1
        className="text-3xl font-bold mb-8 text-center"
        style={{ color: colors.text.primary }}
      >
        Checkout
      </h1>

      <div className="max-w-7xl mx-auto flex flex-col space-y-8">
      
        {/* Coupon Section */}
        <div className="text-sm flex flex-col gap-2">
          <div className="flex items-center gap-2" style={{ color: colors.text.primary }}>
            <span>Have a coupon?</span>
            <button
              type="button"
              className="underline font-medium"
              style={{ color: colors.interactive.primary }}
              onClick={() => setShowCoupon(prev => !prev)}
            >
              Click here to enter your code
            </button>
          </div>
          {showCoupon && (
            <div className="mt-2 max-w-md">
              <CouponForm
                colors={colors}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                applyCoupon={applyCoupon}
              />
            </div>
          )}
        </div>

        {/* Billing Form + Order Summary */}
        <form
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 "
          onSubmit={handleSubmit}
        >
          <BillingForm formData={formData} handleChange={handleChange} colors={colors} />
          <OrderSummary
            cartItems={cartItems}
            summary={{
              subtotal: summary.subtotal,
              tax: summary.tax,
              discount: discount,
              total: summary.total - discount,
              itemCount: summary.itemCount,
            }}
            colors={colors}
            normalizePrice={normalizePrice}
          />
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;