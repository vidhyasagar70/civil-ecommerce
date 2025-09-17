import React, { createContext, useContext, ReactNode } from 'react';
import { useCart } from '../hooks/useCart';
import type { CartItem, CartSummary } from '../types/cartTypes';
import type { Product } from '../types/cartTypes';

interface CartContextType {
  // State
  items: CartItem[];
  summary: CartSummary;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addItem: (product: Product, licenseType: '1year' | '3year' | 'lifetime', quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // Utilities
  getItemCount: () => number;
  getTotalPrice: () => number;
  isItemInCart: (productId: string, licenseType: '1year' | '3year' | 'lifetime') => boolean;
  getItemQuantity: (productId: string, licenseType: '1year' | '3year' | 'lifetime') => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const cart = useCart();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
