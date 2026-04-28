import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ConfirmOrder() {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return <h2>Your cart is empty.</h2>;
  }

  return (
    <div className="confirm-container">
      <h1>Confirm Your Order</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {cartItems.map((item, index) => (
          <li key={index} style={{ marginBottom: 10 }}>
            <strong>{item.name}</strong> × {item.quantity}
            <span style={{ marginLeft: 10 }}>
              ₹{item.price * item.quantity}
            </span>
          </li>
        ))}
      </ul>

      <h2>Total: ₹{getCartTotal()}</h2>

      <button
        className="primary-btn"
        onClick={() => navigate("/payment")}
      >
        Proceed to Payment
      </button>
    </div>
  );
}