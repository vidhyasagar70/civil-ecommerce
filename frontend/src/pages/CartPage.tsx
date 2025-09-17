import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';
import { CartItem, CartSummary, CartEmpty } from '../components/Cart';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, summary, isLoading, removeItem, updateQuantity, clearCart } = useCartContext();

  const handleCheckout = () => {
    // Navigate to checkout page (to be implemented)
    console.log('Proceeding to checkout...', { items, summary });
    // For now, just show an alert
    alert('Checkout functionality will be implemented soon!');
  };

  const handleContinueShopping = () => {
    navigate('/'); // Navigate to home page
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600 mt-1">
                {items.length > 0 
                  ? `${summary.itemCount} item${summary.itemCount !== 1 ? 's' : ''} in your cart`
                  : 'Your cart is empty'
                }
              </p>
            </div>
            
            {items.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <CartEmpty onContinueShopping={handleContinueShopping} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Cart Items ({items.length})
                </h2>
                
                <div className="space-y-6">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemoveItem={removeItem}
                    />
                  ))}
                </div>
              </div>

              {/* Additional Cart Features */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Cart Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Instant Download</h4>
                      <p className="text-xs text-gray-500">Get your software immediately</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Genuine License</h4>
                      <p className="text-xs text-gray-500">100% authentic software</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">24/7 Support</h4>
                      <p className="text-xs text-gray-500">Expert help when you need it</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Summary Sidebar */}
            <div className="lg:col-span-1">
              <CartSummary
                summary={summary}
                onCheckout={handleCheckout}
                onContinueShopping={handleContinueShopping}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}

        {/* Recently Viewed or Recommendations */}
        {items.length > 0 && (
          <div className="mt-12">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                You might also like
              </h3>
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                  Recommendations will be shown here based on your cart items
                </p>
                <button
                  onClick={handleContinueShopping}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Browse more software →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
