import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

/* ─── Design tokens ─────────────────────────────────────────────────────── */
const T = {
  bg:          "#0f0f14",
  surface:     "#1a1a24",
  surfaceAlt:  "#12121a",
  border:      "rgba(255,255,255,0.07)",
  borderAccent:"rgba(124,106,247,0.3)",
  borderDanger:"rgba(248,113,113,0.3)",
  accent:      "#7c6af7",
  accentSoft:  "#a89bf5",
  text:        "#e8e6f0",
  textSub:     "#9995b0",
  textMuted:   "#6b6880",
  danger:      "#f87171",
  dangerBg:    "rgba(248,113,113,0.08)",
  success:     "#34d399",
  font:        "'DM Sans', sans-serif",
};

/* ─── Styles ────────────────────────────────────────────────────────────── */
const S = {
  root: {
    minHeight: "100vh",
    background: T.bg,
    fontFamily: T.font,
    color: T.text,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    boxSizing: "border-box",
  },

  /* Outer card */
  card: {
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: "20px",
    padding: "36px 32px",
    width: "100%",
    maxWidth: "460px",
    boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },

  /* Header */
  headerBlock: { marginBottom: "28px" },
  eyebrow: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: T.accent,
    marginBottom: "8px",
  },
  title: {
    fontSize: "26px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    background: `linear-gradient(120deg, ${T.text} 30%, ${T.accentSoft})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
  },
  subtitle: {
    fontSize: "13px",
    color: T.textMuted,
    marginTop: "6px",
  },

  divider: {
    height: "1px",
    background: T.border,
    margin: "20px 0",
  },

  sectionLabel: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: T.accent,
    marginBottom: "14px",
  },

  /* Order summary rows */
  summaryRows: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "16px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: "8px",
  },
  summaryName: {
    fontSize: "13px",
    color: T.textSub,
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  summaryQty: {
    fontSize: "12px",
    color: T.textMuted,
    marginLeft: "4px",
  },
  summaryAmt: {
    fontSize: "13px",
    fontWeight: 600,
    color: T.textSub,
    flexShrink: 0,
  },

  /* Total row */
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: T.surfaceAlt,
    border: `1px solid ${T.borderAccent}`,
    borderRadius: "10px",
    padding: "14px 16px",
  },
  totalLabel: {
    fontSize: "13px",
    fontWeight: 600,
    color: T.textSub,
  },
  totalAmount: {
    fontSize: "24px",
    fontWeight: 800,
    color: T.accentSoft,
    letterSpacing: "-0.02em",
  },
  totalRupee: {
    fontSize: "14px",
    fontWeight: 600,
    color: T.textMuted,
    verticalAlign: "super",
    marginRight: "2px",
  },

  /* Payment method chip */
  methodChip: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: T.surfaceAlt,
    border: `1px solid ${T.border}`,
    borderRadius: "10px",
    padding: "14px 16px",
  },
  methodIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    background: "rgba(124,106,247,0.15)",
    border: `1px solid rgba(124,106,247,0.25)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  },
  methodLabel: {
    fontSize: "13px",
    color: T.textMuted,
  },
  methodValue: {
    fontSize: "15px",
    fontWeight: 700,
    color: T.text,
  },
  methodBadge: {
    marginLeft: "auto",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: T.success,
    background: "rgba(52,211,153,0.1)",
    border: "1px solid rgba(52,211,153,0.2)",
    borderRadius: "20px",
    padding: "3px 10px",
  },

  /* Error block */
  errorBlock: {
    background: T.dangerBg,
    border: `1px solid ${T.borderDanger}`,
    borderRadius: "10px",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "0",
  },
  errorIcon: { fontSize: "16px", flexShrink: 0 },
  errorText: {
    fontSize: "13px",
    fontWeight: 600,
    color: T.danger,
  },

  /* Pay button */
  payBtn: (hovered, loading) => ({
    background: loading
      ? T.surfaceAlt
      : `linear-gradient(135deg, ${T.accent}, #5b8af6)`,
    border: loading ? `1px solid ${T.border}` : "none",
    borderRadius: "11px",
    color: loading ? T.textMuted : "#fff",
    fontSize: "15px",
    fontWeight: 700,
    padding: "15px",
    cursor: loading ? "not-allowed" : "pointer",
    fontFamily: T.font,
    letterSpacing: "0.02em",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "opacity 0.15s, transform 0.15s",
    opacity: hovered && !loading ? 0.88 : 1,
    transform: hovered && !loading ? "scale(0.985)" : "none",
  }),

  /* Spinner */
  spinner: {
    width: "16px",
    height: "16px",
    border: `2px solid rgba(255,255,255,0.2)`,
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
    flexShrink: 0,
  },

  /* Trust note */
  trustNote: {
    textAlign: "center",
    fontSize: "12px",
    color: T.textMuted,
    marginTop: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
  },
};

/* ─── Component ─────────────────────────────────────────────────────────── */
const PaymentPage = () => {
  // ✅ UNCHANGED — all business logic
  const { cartItems, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const total         = getCartTotal();
  const paymentMethod = "UPI";

  // ✅ UNCHANGED — handlePay is identical
  const handlePay = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        user: "student",
        stationeryItems: cartItems,
        documents: [],
        status: "pending",
        totalAmount: total,
        paymentMethod,
      };
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to place order");
      }
      const data = await response.json();
      console.log("Order saved:", data);
      clearCart();
      navigate("/receipt", {
        state: { order: data, cartItems, total, paymentMethod },
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const [btnHover, setBtnHover] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        button:focus-visible { outline: 2px solid #7c6af7; outline-offset: 2px; }
      `}</style>

      <div style={S.root}>
        <div style={S.card}>

          {/* ── Header ── */}
          <div style={S.headerBlock}>
            <p style={S.eyebrow}>CampusCart · Checkout</p>
            <h1 style={S.title}>Payment</h1>
            <p style={S.subtitle}>Review your order and complete payment</p>
          </div>

          <div style={S.divider} />

          {/* ── Order Summary ── */}
          <div style={{ marginBottom: "20px" }}>
            <p style={S.sectionLabel}>
              Order Summary · {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
            </p>

            {cartItems.length > 0 && (
              <div style={S.summaryRows}>
                {cartItems.map((item, i) => (
                  <div key={i} style={S.summaryRow}>
                    <span style={S.summaryName}>
                      {item.name}
                      {item.quantity > 1 && (
                        <span style={S.summaryQty}>×{item.quantity}</span>
                      )}
                    </span>
                    <span style={S.summaryAmt}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={S.totalRow}>
              <span style={S.totalLabel}>Total to pay</span>
              <span style={S.totalAmount}>
                <span style={S.totalRupee}>₹</span>{total}
              </span>
            </div>
          </div>

          <div style={S.divider} />

          {/* ── Payment Method ── */}
          <div style={{ marginBottom: "24px" }}>
            <p style={S.sectionLabel}>Payment Method</p>
            <div style={S.methodChip}>
              <div style={S.methodIcon}>💳</div>
              <div>
                <p style={S.methodLabel}>Paying via</p>
                <p style={S.methodValue}>{paymentMethod}</p>
              </div>
              <span style={S.methodBadge}>SELECTED</span>
            </div>
          </div>

          {/* ── Error ── */}
          {error && (
            <>
              <div style={S.errorBlock}>
                <span style={S.errorIcon}>⚠️</span>
                <span style={S.errorText}>{error}</span>
              </div>
              <div style={{ height: "16px" }} />
            </>
          )}

          {/* ── Pay button ── */}
          <button
            style={S.payBtn(btnHover, loading)}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            onClick={handlePay}
            disabled={loading}
          >
            {loading && <span style={S.spinner} />}
            {loading ? "Processing…" : `Pay ₹${total}`}
          </button>

          {/* Trust note */}
          <p style={S.trustNote}>
            <span>🔒</span> Secured · Orders are confirmed instantly
          </p>

        </div>
      </div>
    </>
  );
};

export default PaymentPage;