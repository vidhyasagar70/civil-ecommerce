import React from 'react';
import type { CartSummary as CartSummaryType } from '../../types/cartTypes';
import FormButton from '../Button/FormButton';

interface CartSummaryProps {
  summary: CartSummaryType;
  onCheckout: () => void;
  onContinueShopping: () => void;
  isLoading?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ 
  summary, 
  onCheckout, 
  onContinueShopping, 
  isLoading = false 
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
      
      {/* Summary Details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({summary.itemCount} items)</span>
          <span className="font-medium">₹{summary.subtotal.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (GST)</span>
          <span className="font-medium">₹{summary.tax.toLocaleString()}</span>
        </div>
        
        {summary.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600">Discount</span>
            <span className="font-medium text-green-600">-₹{summary.discount.toLocaleString()}</span>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-bold text-gray-900">₹{summary.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <FormButton
          variant="primary"
          className="w-full py-3 text-lg"
          onClick={onCheckout}
          disabled={isLoading || summary.itemCount === 0}
        >
          {isLoading ? 'Processing...' : 'Proceed to Checkout'}
        </FormButton>
        
        <button
          onClick={onContinueShopping}
          className="w-full py-3 text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Continue Shopping
        </button>
      </div>

      {/* Trust Indicators */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure Checkout
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Instant Download
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Genuine License
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
