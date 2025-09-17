import React, { createContext, useContext, useEffect } from 'react';
import { useCart as useCartApi, useAddToCart as useAddToCartApi, useUpdateCartItem as useUpdateCartItemApi, useRemoveFromCart as useRemoveFromCartApi, useClearCart as useClearCartApi } from '../api/cartApi';
import { useUser } from '../api/userQueries';
import type { CartItem, CartSummary, Product } from '../types/cartTypes';

interface CartContextType {
  items: CartItem[];
  summary: CartSummary;
  isLoading: boolean;
  error: string | null;
  addItem: (product: Product, licenseType: '1year' | '3year' | 'lifetime', quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
  isItemInCart: (productId: string, licenseType: '1year' | '3year' | 'lifetime') => boolean;
  getItemQuantity: (productId: string, licenseType: '1year' | '3year' | 'lifetime') => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: user } = useUser();
  const { data: cartData, isLoading, error } = useCartApi();
  const addToCartMutation = useAddToCartApi();
  const updateCartItemMutation = useUpdateCartItemApi();
  const removeFromCartMutation = useRemoveFromCartApi();
  const clearCartMutation = useClearCartApi();

  // Convert backend cart items to frontend format
  const items: CartItem[] = cartData?.items.map(item => ({
    id: item._id,
    product: item.product,
    licenseType: item.licenseType,
    quantity: item.quantity,
    price: item.price,
    totalPrice: item.totalPrice
  })) || [];

  const summary: CartSummary = cartData?.summary || {
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
    itemCount: 0
  };

  const addItem = async (product: Product, licenseType: '1year' | '3year' | 'lifetime', quantity: number = 1) => {
    if (!user) {
      // Handle guest user or redirect to login
      console.error('User must be logged in to add to cart');
      return;
    }

    try {
      await addToCartMutation.mutateAsync({
        productId: product._id!,
        licenseType,
        quantity
      });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await removeFromCartMutation.mutateAsync(itemId);
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      await updateCartItemMutation.mutateAsync({ itemId, quantity });
    } catch (error) {
      console.error('Failed to update item quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartMutation.mutateAsync();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const getItemCount = () => {
    return summary.itemCount;
  };

  const getTotalPrice = () => {
    return summary.total;
  };

  const isItemInCart = (productId: string, licenseType: '1year' | '3year' | 'lifetime') => {
    return items.some(
      item => item.product._id === productId && item.licenseType === licenseType
    );
  };

  const getItemQuantity = (productId: string, licenseType: '1year' | '3year' | 'lifetime') => {
    const item = items.find(
      item => item.product._id === productId && item.licenseType === licenseType
    );
    return item ? item.quantity : 0;
  };

  const value: CartContextType = {
    items,
    summary,
    isLoading: isLoading || addToCartMutation.isPending || updateCartItemMutation.isPending || removeFromCartMutation.isPending || clearCartMutation.isPending,
    error: error?.message || addToCartMutation.error?.message || updateCartItemMutation.error?.message || removeFromCartMutation.error?.message || clearCartMutation.error?.message || null,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getTotalPrice,
    isItemInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};