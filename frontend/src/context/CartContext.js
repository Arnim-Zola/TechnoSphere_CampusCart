import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ ADD THIS FUNCTION
  const getCartTotal = () =>
    cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

  // ➕ Add item to cart
  const addToCart = (item) => {
    const qtyToAdd = Number(item.quantity) || 1;   // ✅ ensure number

    setCartItems((prev) => {
      const existing = prev.find(i => i.name === item.name);

      if (existing) {
        return prev.map(i =>
          i.name === item.name
            ? { ...i, quantity: Number(i.quantity) + qtyToAdd } // ✅ numeric addition
            : i
        );
      }

      return [...prev, { ...item, quantity: qtyToAdd }];
    });
  };

  // ❌ remove item
  const removeFromCart = (index) => {
  setCartItems(prev => prev.filter((_, i) => i !== index));
};

  // 🔄 update quantity
 const updateQuantity = (index, quantity) => {
  const qty = Math.max(1, Number(quantity) || 1);

  setCartItems(prev =>
    prev.map((item, i) =>
      i === index
        ? { ...item, quantity: qty, copies: qty }
        : item
    )
  );
};

  // 🧹 clear cart
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
};