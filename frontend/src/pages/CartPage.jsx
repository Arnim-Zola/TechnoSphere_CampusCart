import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const {
    cartItems,
    getCartTotal,
    removeFromCart,
    updateQuantity
  } = useCart();

  const navigate = useNavigate();

  return (
    <>
      <div className="cp-root">
        <div className="cp-inner">

          {/* HEADER */}
          <div className="cp-header">
            <p className="cp-eyebrow">Order Review</p>
            <h1 className="cp-title">Your Cart</h1>
            <p className="cp-subtitle">
              {cartItems.length === 0
                ? "No items added yet"
                : `${cartItems.length} item${cartItems.length !== 1 ? "s" : ""} ready for checkout`}
            </p>
          </div>

          {/* EMPTY STATE */}
          {cartItems.length === 0 && (
            <div className="cp-empty">
              <div className="cp-empty-icon">🛒</div>
              <p className="cp-empty-title">Cart is empty</p>
              <p className="cp-empty-sub">Add items from any service to begin</p>
            </div>
          )}

          {/* CART ITEMS */}
          {cartItems.length > 0 && (
            <>
              <ul className="cp-list">
                {cartItems.map((item, index) => (
                  <li key={index} className="cp-item">

                    {/* TOP ROW */}
                    <div className="cp-item-top">
                      <div className="cp-item-left">
                        <div className="cp-item-dot" />
                        <div className="cp-item-info">
                          <div className="cp-item-name">{item.name}</div>
                          {item.file && (
                            <div className="cp-item-meta">
                              {item.file.name} · {item.pages} {item.pages === 1 ? "page" : "pages"} · {item.quantity} {item.quantity === 1 ? "copy" : "copies"}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="cp-item-price">₹{item.price * item.quantity}</span>
                    </div>

                    {/* BOTTOM ROW */}
                    <div className="cp-item-bottom">
                      <div className="cp-qty-stepper">
                        <button
                          className="cp-qty-btn"
                          disabled={item.quantity === 1}
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >−</button>
                        <div className="cp-qty-val">{item.quantity}</div>
                        <button
                          className="cp-qty-btn"
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >+</button>
                      </div>

                      <button
                        className="cp-remove-btn"
                        onClick={() => removeFromCart(index)}
                      >
                        Remove
                      </button>
                    </div>

                  </li>
                ))}
              </ul>

              {/* ORDER SUMMARY */}
              <div className="cp-summary">
                <div className="cp-summary-row">
                  <span className="cp-summary-label">Items</span>
                  <span className="cp-summary-val">{cartItems.length}</span>
                </div>
                <div className="cp-summary-divider" />
                <div className="cp-summary-row">
                  <span className="cp-summary-total-label">Order Total</span>
                  <span className="cp-summary-total-val">
                    <span className="cp-summary-currency">₹</span>
                    {getCartTotal()}
                  </span>
                </div>
              </div>

              {/* CHECKOUT */}
              <button
                className="cp-checkout-btn"
                onClick={() => navigate("/payment")}
              >
                Proceed to Payment
              </button>
            </>
          )}

        </div>
      </div>
    </>
  );
}