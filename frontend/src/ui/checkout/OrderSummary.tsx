import React from "react";
import FormButton from "../../components/Button/FormButton";

interface CartItem {
  id: string | number;
  product: { name: string; price: number | string };
  quantity: number;
}

interface Summary {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  itemCount: number;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  summary: Summary;
  colors: any;
  normalizePrice: (price: any) => number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems, summary, colors, normalizePrice }) => {
  
  const handlePlaceOrder = () => {
    alert("Your order has been placed successfully!");
  };

  return (
<div
  className="space-y-6 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-shadow duration-200"
  style={{
    backgroundColor: colors.background.secondary,
    color: colors.text.primary,
    border: `1px solid ${colors.border.primary}`,
  }}
>
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text.primary }}>Your order</h2>

      <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
        <span>Product</span>
        <span>Subtotal</span>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="flex justify-between py-2 text-sm">
            <span style={{ color: colors.text.primary }}>{item.product.name} × {Number(item.quantity) || 1}</span>
            <span className="font-medium text-blue-800">₹{normalizePrice(summary.subtotal).toFixed(2)}</span>
          </div>
        ))
      )}

      <hr className="my-4" style={{ borderColor: colors.border.primary }} />

      {/* Breakdown */}
      <div className="flex justify-between text-sm mb-2" style={{ color: colors.text.secondary }}>
        <span>Subtotal</span>
        <span>₹{normalizePrice(summary.subtotal).toFixed(2)}</span>
      </div>

      {summary.tax > 0 && (
        <div className="flex justify-between text-sm mb-2" style={{ color: colors.text.secondary }}>
          <span>Tax</span>
          <span>₹{normalizePrice(summary.tax).toFixed(2)}</span>
        </div>
      )}

      {summary.discount > 0 && (
        <div className="flex justify-between text-sm mb-2" style={{ color: "red" }}>
          <span>Discount</span>
          <span>-₹{normalizePrice(summary.discount).toFixed(2)}</span>
        </div>
      )}

      <div className="flex justify-between text-lg font-bold mb-6" style={{ color: colors.text.primary }}>
        <span>Total</span>
        <span className="text-yellow-600">₹{normalizePrice(summary.total).toFixed(2)}</span>
      </div>

      <div className="bg-gray-100 p-4 rounded-md mb-4 text-sm text-gray-600 leading-relaxed">
        <strong>PhonePe Payment Solutions</strong>
        <br />
        All UPI apps, Debit and Credit Cards, and NetBanking accepted | Powered by PhonePe
      </div>

      <p className="text-xs text-gray-500 mb-6 leading-snug">
        Your personal data will be used to process your order, support your experience, and for purposes described in our{" "}
        <a href="/privacy-policy" className="text-yellow-600 underline">privacy policy</a>.
      </p>

<FormButton
  type="button"
  variant="primary"
  className="w-full py-3 text-lg transition duration-300 ease-in-out 
             bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-md 
             hover:shadow-lg"
  onClick={handlePlaceOrder}
>
  PLACE ORDER
</FormButton>
    </div>
  );
};

export default OrderSummary;
