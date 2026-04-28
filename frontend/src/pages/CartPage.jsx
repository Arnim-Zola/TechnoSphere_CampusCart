import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

/* ─── Design tokens ────────────────────────────────────────────────────── */
const T = {
  bg:          "#0f0f14",
  surface:     "#1a1a24",
  surfaceAlt:  "#12121a",
  surfaceHover:"#1f1f2e",
  border:      "rgba(255,255,255,0.07)",
  borderAccent:"rgba(124,106,247,0.35)",
  accent:      "#7c6af7",
  accentSoft:  "#a89bf5",
  text:        "#e8e6f0",
  textSub:     "#9995b0",
  textMuted:   "#6b6880",
  danger:      "#f87171",
  dangerSoft:  "rgba(248,113,113,0.12)",
  font:        "'DM Sans', sans-serif",
};

/* ─── Styles ───────────────────────────────────────────────────────────── */
const S = {
  root: {
    minHeight: "100vh",
    background: T.bg,
    fontFamily: T.font,
    color: T.text,
    padding: "48px 24px 80px",
    boxSizing: "border-box",
  },

  /* Header */
  header: { marginBottom: "36px" },
  eyebrow: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: T.accent,
    marginBottom: "8px",
  },
  title: {
    fontSize: "clamp(24px, 4vw, 36px)",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    background: `linear-gradient(120deg, ${T.text} 30%, ${T.accentSoft})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
  },

  /* Two-col layout */
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 340px",
    gap: "24px",
    maxWidth: "1100px",
    margin: "0 auto",
    alignItems: "start",
  },

  /* Item list */
  itemList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  /* Item card */
  itemCard: (hovered) => ({
    background: T.surface,
    border: `1px solid ${hovered ? T.borderAccent : T.border}`,
    borderRadius: "14px",
    padding: "20px 22px",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "16px",
    alignItems: "center",
    transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
    transform: hovered ? "translateY(-2px)" : "none",
    boxShadow: hovered ? "0 10px 36px rgba(0,0,0,0.4)" : "none",
  }),
  itemLeft: { display: "flex", flexDirection: "column", gap: "6px", minWidth: 0 },
  itemRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "10px",
    flexShrink: 0,
  },

  itemName: {
    fontSize: "15px",
    fontWeight: 700,
    color: T.text,
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  itemUnitPrice: {
    fontSize: "12px",
    color: T.textMuted,
  },
  itemTotal: {
    fontSize: "16px",
    fontWeight: 700,
    color: T.accentSoft,
    letterSpacing: "-0.01em",
  },

  /* Stepper */
  stepper: {
    display: "inline-flex",
    alignItems: "center",
    background: T.surfaceAlt,
    border: `1px solid ${T.border}`,
    borderRadius: "8px",
    overflow: "hidden",
  },
  stepperBtn: (disabled) => ({
    background: "transparent",
    border: "none",
    color: disabled ? T.textMuted : T.accentSoft,
    fontSize: "18px",
    fontWeight: 700,
    width: "34px",
    height: "34px",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: T.font,
    lineHeight: 1,
    opacity: disabled ? 0.4 : 1,
    transition: "background 0.15s",
  }),
  stepperVal: {
    fontSize: "14px",
    fontWeight: 700,
    color: T.text,
    minWidth: "34px",
    textAlign: "center",
    userSelect: "none",
  },

  /* Remove button */
  removeBtn: (hovered) => ({
    background: hovered ? T.dangerSoft : "transparent",
    border: `1px solid ${hovered ? "rgba(248,113,113,0.3)" : T.border}`,
    borderRadius: "7px",
    color: hovered ? T.danger : T.textMuted,
    fontSize: "12px",
    fontWeight: 600,
    padding: "5px 10px",
    cursor: "pointer",
    fontFamily: T.font,
    display: "flex",
    alignItems: "center",
    gap: "5px",
    transition: "background 0.15s, color 0.15s, border-color 0.15s",
  }),

  /* Summary card */
  summaryCard: {
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: "16px",
    padding: "28px",
    position: "sticky",
    top: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  summaryTitle: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: T.accent,
    marginBottom: "20px",
  },

  /* Summary rows */
  summaryRows: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "20px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  summaryRowLabel: {
    fontSize: "13px",
    color: T.textMuted,
    maxWidth: "160px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  summaryRowVal: {
    fontSize: "13px",
    fontWeight: 600,
    color: T.textSub,
  },

  divider: {
    height: "1px",
    background: T.border,
    margin: "16px 0",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "24px",
  },
  totalLabel: {
    fontSize: "14px",
    fontWeight: 600,
    color: T.textSub,
  },
  totalAmount: {
    fontSize: "26px",
    fontWeight: 800,
    color: T.accentSoft,
    letterSpacing: "-0.02em",
  },
  totalRupee: {
    fontSize: "15px",
    fontWeight: 600,
    color: T.textMuted,
    verticalAlign: "super",
    marginRight: "2px",
  },

  checkoutBtn: (hovered) => ({
    background: `linear-gradient(135deg, ${T.accent}, #5b8af6)`,
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 700,
    padding: "14px",
    cursor: "pointer",
    fontFamily: T.font,
    letterSpacing: "0.02em",
    width: "100%",
    transition: "opacity 0.15s, transform 0.15s",
    opacity: hovered ? 0.88 : 1,
    transform: hovered ? "scale(0.98)" : "none",
  }),

  itemCount: {
    fontSize: "12px",
    color: T.textMuted,
    marginBottom: "4px",
  },

  /* Empty state */
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    gap: "16px",
    textAlign: "center",
  },
  emptyIcon: { fontSize: "48px", lineHeight: 1 },
  emptyTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: T.text,
  },
  emptyText: {
    fontSize: "14px",
    color: T.textMuted,
  },
  emptyBtn: (hovered) => ({
    marginTop: "8px",
    background: hovered ? `linear-gradient(135deg, ${T.accent}, #5b8af6)` : T.surface,
    border: `1px solid ${hovered ? "transparent" : T.border}`,
    borderRadius: "10px",
    color: hovered ? "#fff" : T.textSub,
    fontSize: "14px",
    fontWeight: 600,
    padding: "12px 28px",
    cursor: "pointer",
    fontFamily: T.font,
    transition: "all 0.2s",
  }),
};

/* ─── Sub-components ────────────────────────────────────────────────────── */
function ItemCard({ item, index, onUpdate, onRemove }) {
  const [cardHover, setCardHover]   = useState(false);
  const [rmHover,   setRmHover]     = useState(false);

  return (
    <div
      style={S.itemCard(cardHover)}
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
    >
      {/* Left: name + unit price */}
      <div style={S.itemLeft}>
        <p style={S.itemName}>{item.name}</p>
        <p style={S.itemUnitPrice}>₹{item.price} per unit</p>

        {/* Stepper */}
        <div style={S.stepper}>
          <button
            style={S.stepperBtn(item.quantity === 1)}
            disabled={item.quantity === 1}
            onClick={() => onUpdate(index, item.quantity - 1)}
          >−</button>
          <span style={S.stepperVal}>{item.quantity}</span>
          <button
            style={S.stepperBtn(false)}
            onClick={() => onUpdate(index, item.quantity + 1)}
          >+</button>
        </div>
      </div>

      {/* Right: item total + remove */}
      <div style={S.itemRight}>
        <span style={S.itemTotal}>₹{item.price * item.quantity}</span>
        <button
          style={S.removeBtn(rmHover)}
          onMouseEnter={() => setRmHover(true)}
          onMouseLeave={() => setRmHover(false)}
          onClick={() => onRemove(index)}
        >
          <span>✕</span> Remove
        </button>
      </div>
    </div>
  );
}

function EmptyState({ onNavigate }) {
  const [btnHover, setBtnHover] = useState(false);
  return (
    <div style={S.empty}>
      <span style={S.emptyIcon}>🛒</span>
      <p style={S.emptyTitle}>Your cart is empty</p>
      <p style={S.emptyText}>Browse categories and add items to get started.</p>
      <button
        style={S.emptyBtn(btnHover)}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        onClick={onNavigate}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────────────── */
const CartPage = () => {
  // ✅ UNCHANGED — all business logic
  const { cartItems, getCartTotal, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const total = getCartTotal();

  const [checkoutHover, setCheckoutHover] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button:focus-visible { outline: 2px solid #7c6af7; outline-offset: 2px; }

        @media (max-width: 720px) {
          .cart-layout { grid-template-columns: 1fr !important; }
          .summary-sticky { position: static !important; }
        }
      `}</style>

      <div style={S.root}>
        {/* Header */}
        <header style={S.header}>
          <p style={S.eyebrow}>CampusCart</p>
          <h1 style={S.title}>Your Cart</h1>
        </header>

        {/* Empty state */}
        {cartItems.length === 0 && (
          <EmptyState onNavigate={() => navigate("/")} />
        )}

        {/* Populated cart */}
        {cartItems.length > 0 && (
          <div style={S.layout} className="cart-layout">

            {/* LEFT — item list */}
            <div style={S.itemList}>
              {cartItems.map((item, index) => (
                <ItemCard
                  key={index}
                  item={item}
                  index={index}
                  onUpdate={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            {/* RIGHT — summary */}
            <div style={S.summaryCard} className="summary-sticky">
              <p style={S.summaryTitle}>Order Summary</p>

              {/* Per-item breakdown */}
              <div style={S.summaryRows}>
                <p style={S.itemCount}>{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</p>
                {cartItems.map((item, i) => (
                  <div key={i} style={S.summaryRow}>
                    <span style={S.summaryRowLabel}>
                      {item.name}
                      {item.quantity > 1 && (
                        <span style={{ color: "#6b6880" }}> ×{item.quantity}</span>
                      )}
                    </span>
                    <span style={S.summaryRowVal}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div style={S.divider} />

              {/* Total */}
              <div style={S.totalRow}>
                <span style={S.totalLabel}>Total</span>
                <span style={S.totalAmount}>
                  <span style={S.totalRupee}>₹</span>{total}
                </span>
              </div>

              {/* Checkout */}
              <button
                style={S.checkoutBtn(checkoutHover)}
                onMouseEnter={() => setCheckoutHover(true)}
                onMouseLeave={() => setCheckoutHover(false)}
                onClick={() => navigate("/payment")}
              >
                Proceed to Checkout →
              </button>
            </div>

          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;