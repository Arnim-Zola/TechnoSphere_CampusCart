import React, { createContext, useContext, useState } from "react";

// Create context
export const CartContext = createContext();

// Custom hook
export const useCart = () => {
  return useContext(CartContext);
};

// Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ FIXED: Add item with correct quantity
  const addToCart = (product) => {
    setCartItems((prev) => [
      ...prev,
      {
        name: product.name,
        price: product.price,
        quantity: Number(product.quantity) || 1, // 🔥 FIX HERE
        image: product.image
      }
    ]);
  };

  // Remove item
  const removeFromCart = (index) => {
    setCartItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // Update quantity
  const updateQuantity = (index, quantity) => {
    if (quantity < 1) return;

    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity } : item
      )
    );
  };

  // Total calculation
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};