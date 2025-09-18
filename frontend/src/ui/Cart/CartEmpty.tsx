import React from 'react';
import FormButton from '../../components/Button/FormButton';

interface CartEmptyProps {
  onContinueShopping: () => void;
}

const CartEmpty: React.FC<CartEmptyProps> = ({ onContinueShopping }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Empty Cart Icon */}
      <div className="mb-8">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5 6m0 0h8.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
          </svg>
        </div>
      </div>

      {/* Empty Cart Message */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Looks like you haven't added any software to your cart yet.
        Start exploring our amazing collection of premium software!
      </p>

      {/* Action Button */}
      <FormButton
        variant="primary"
        className="px-8 py-3 text-lg"
        onClick={onContinueShopping}
      >
        Start Shopping
      </FormButton>

      {/* Additional Links */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 text-sm">
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          View Popular Software
        </button>
        <span className="hidden sm:inline text-gray-300">•</span>
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          Browse Categories
        </button>
        <span className="hidden sm:inline text-gray-300">•</span>
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          Check Deals
        </button>
      </div>
    </div>
  );
};

export default CartEmpty;
