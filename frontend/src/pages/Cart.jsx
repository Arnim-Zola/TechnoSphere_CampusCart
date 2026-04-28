import React from "react";
import { useCart } from "../context/CartContext"; // ✅ FIXED

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal
  } = useCart(); // ✅ FIXED

  return (
    <div>
      <h1>Your Cart</h1>

      {cartItems.length === 0 && <p>Cart is empty</p>}

      {cartItems.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px"
          }}
        >
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
          <p>Quantity: {item.quantity}</p>

          {/* 🔥 Quantity Controls */}
          <button onClick={() => updateQuantity(index, item.quantity - 1)}>
            -
          </button>
          <button onClick={() => updateQuantity(index, item.quantity + 1)}>
            +
          </button>

          {/* 🔥 Remove */}
          <button onClick={() => removeFromCart(index)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ₹{getCartTotal()}</h2>
    </div>
  );
};

export default Cart;