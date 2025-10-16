import React, { createContext, useContext, useMemo, useState } from "react";



const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // initial demo items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Producto A", price: 49.9, quantity: 1 },
    { id: 2, name: "Producto B", price: 89.0, quantity: 2 },
  ]);

  const addItem = (item) => {
    setCartItems((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + (item.quantity || 1) } : p));
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQty = (id, newQty) => {
    setCartItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, newQty) } : p)));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = useMemo(() => cartItems.reduce((s, i) => s + (i.quantity || 0), 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0), [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQty, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
