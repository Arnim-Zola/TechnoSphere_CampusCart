import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    getCartTotal,
    removeFromCart,
    updateQuantity
  } = useCart();

  const navigate = useNavigate();

  const total = getCartTotal();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>

      {/* EMPTY STATE */}
      {cartItems.length === 0 && (
        <p>Cart is empty</p>
      )}

      {/* ITEMS */}
      {cartItems.length > 0 && (
        <>
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                margin: "10px 0",
                padding: "10px",
                borderRadius: "8px"
              }}
            >
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>

              {/* Quantity */}
              <div>
                <button
                  onClick={() => updateQuantity(index, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>

                <span style={{ margin: "0 10px" }}>
                  {item.quantity}
                </span>

                <button
                  onClick={() => updateQuantity(index, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(index)}
                style={{ marginTop: "10px", color: "red" }}
              >
                Remove
              </button>

              {/* Item Total */}
              <p>Item Total: ₹{item.price * item.quantity}</p>
            </div>
          ))}

          {/* TOTAL */}
          <h2>Total: ₹{total}</h2>

          {/* CHECKOUT */}
          <button
            onClick={() => navigate("/checkout")}
            style={{
              padding: "12px 24px",
              marginTop: "20px",
              background: "#2ecc71",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;