'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      if (existingItem) {
        return currentItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...currentItems, item];
    });
  };

  const removeItem = (itemId: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}