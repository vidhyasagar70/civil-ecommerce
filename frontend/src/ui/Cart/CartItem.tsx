import React, { useRef, useCallback, useEffect } from 'react';
import type { CartItem as CartItemType } from '../../types/cartTypes';
import Swal from 'sweetalert2';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  // Refs for direct DOM manipulation
  const quantityDisplayRef = useRef<HTMLSpanElement>(null);
  const totalPriceRef = useRef<HTMLDivElement>(null);
  const decreaseButtonRef = useRef<HTMLButtonElement>(null);
  
  // Store current quantity in ref to avoid re-renders
  const currentQuantityRef = useRef(item.quantity);
  
  // Update refs when item changes from external sources (initial load, etc.)
  useEffect(() => {
    currentQuantityRef.current = item.quantity;
    if (quantityDisplayRef.current) {
      quantityDisplayRef.current.textContent = item.quantity.toString();
    }
    if (totalPriceRef.current) {
      totalPriceRef.current.textContent = `₹${item.totalPrice.toLocaleString()}`;
    }
    if (decreaseButtonRef.current) {
      decreaseButtonRef.current.disabled = item.quantity <= 1;
    }
  }, [item.quantity, item.totalPrice]);

  // Direct DOM update function - NO STATE CHANGE
  const updateUIDirectly = useCallback((newQuantity: number) => {
    const newTotalPrice = newQuantity * item.price;
    
    // Update quantity display
    if (quantityDisplayRef.current) {
      quantityDisplayRef.current.textContent = newQuantity.toString();
    }
    
    // Update total price display
    if (totalPriceRef.current) {
      totalPriceRef.current.textContent = `₹${newTotalPrice.toLocaleString()}`;
    }
    
    // Update decrease button state
    if (decreaseButtonRef.current) {
      decreaseButtonRef.current.disabled = newQuantity <= 1;
    }
    
    // Update the ref
    currentQuantityRef.current = newQuantity;
  }, [item.price]);

  const handleQuantityChange = useCallback(async (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    if (newQuantity > 10) {
      Swal.fire('Maximum Quantity', 'You can only add up to 10 of this item', 'warning');
      return;
    }
    
    // Update UI immediately without re-render
    updateUIDirectly(newQuantity);
    
    // Call API in background (this might cause parent re-render, but this component won't)
    onUpdateQuantity(item.id, newQuantity);
  }, [item.id, onUpdateQuantity, updateUIDirectly]);

  const handleIncrease = useCallback(() => {
    handleQuantityChange(currentQuantityRef.current + 1);
  }, [handleQuantityChange]);

  const handleDecrease = useCallback(() => {
    handleQuantityChange(currentQuantityRef.current - 1);
  }, [handleQuantityChange]);

  const handleRemove = useCallback(() => {
    onRemoveItem(item.id);
  }, [item.id, onRemoveItem]);

  const getLicenseBadgeColor = (licenseType: string) => {
    switch (licenseType) {
      case '1year':
        return 'bg-blue-100 text-blue-800';
      case '3year':
        return 'bg-green-100 text-green-800';
      case 'lifetime':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLicenseLabel = (licenseType: string) => {
    switch (licenseType) {
      case '1year':
        return '1 Year License';
      case '3year':
        return '3 Year License';
      case 'lifetime':
        return 'Lifetime License';
      default:
        return 'License';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {item.product.name}
              </h3>
              <p className="text-sm text-gray-600">{item.product.company}</p>
            </div>
            <button
              onClick={handleRemove}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* License Type Badge */}
          <div className="mb-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getLicenseBadgeColor(item.licenseType)}`}>
              {getLicenseLabel(item.licenseType)}
            </span>
          </div>

          {/* Product Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {item.product.description}
          </p>

          {/* Bottom Row: Quantity and Price */}
          <div className="flex justify-between items-center">
            {/* Quantity Controls */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                ref={decreaseButtonRef}
                onClick={handleDecrease}
                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                disabled={item.quantity <= 1}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span 
                ref={quantityDisplayRef}
                className="px-4 py-2 font-medium min-w-[3rem] text-center"
              >
                {item.quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <div 
                ref={totalPriceRef}
                className="text-lg font-bold text-gray-900"
              >
                ₹{item.totalPrice.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                ₹{item.price.toLocaleString()} each
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;