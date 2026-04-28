import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BASE_URL = "http://localhost:5000/api";

// ─── Payment methods ───────────────────────────────────────────────────────
const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", icon: "📱" },
  { id: "card", label: "Card", icon: "💳" },
  { id: "netbanking", label: "Net Banking", icon: "🏦" },
  { id: "cash", label: "Pay at Counter", icon: "💵" },
];

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Data passed from Cart page
  const { cartItems = [], selectedSlot = "", total = 0 } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Retrieve logged-in user token
  const token = localStorage.getItem("token");

  const validatePayment = () => {
    if (paymentMethod === "upi" && !upiId.includes("@")) {
      return "Please enter a valid UPI ID (e.g. name@upi).";
    }
    if (paymentMethod === "card") {
      if (cardNumber.replace(/\s/g, "").length !== 16)
        return "Card number must be 16 digits.";
      if (!cardName.trim()) return "Enter card holder name.";
      if (!cardExpiry.match(/^\d{2}\/\d{2}$/)) return "Expiry format: MM/YY";
      if (cardCvv.length !== 3) return "CVV must be 3 digits.";
    }
    return null;
  };

  const handlePay = async () => {
    const validationError = validatePayment();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setLoading(true);

    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || "",
          // Print-specific fields (only if present)
          ...(item.fileName && {
            fileName: item.fileName,
            pages: item.pages,
            printType: item.printType,
            fileUrl: item.fileUrl,
          }),
        })),
        totalAmount: total,
        pickupSlot: selectedSlot,
        paymentMethod,
        // For real payment gateway: attach transactionId here
        transactionId: `TXN_${Date.now()}`,
      };

      const res = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message || "Order failed.");

      // Navigate to receipt with full order data
      navigate("/receipt", {
        state: {
          order: data.order,
          cartItems,
          selectedSlot,
          total,
          paymentMethod,
        },
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems.length) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.emptyBox}>
          <p style={{ color: "#888" }}>No items to checkout.</p>
          <button style={styles.btnPrimary} onClick={() => navigate("/cart")}>
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>Checkout</h1>

        <div style={styles.layout}>
          {/* ── Left: Payment form ── */}
          <div style={styles.formCol}>
            {/* Payment method selector */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Payment Method</h3>
              <div style={styles.methodGrid}>
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    style={{
                      ...styles.methodBtn,
                      ...(paymentMethod === method.id
                        ? styles.methodBtnActive
                        : {}),
                    }}
                    onClick={() => {
                      setPaymentMethod(method.id);
                      setError("");
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{method.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>
                      {method.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment details */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Payment Details</h3>

              {paymentMethod === "upi" && (
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>UPI ID</label>
                  <input
                    style={styles.input}
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              )}

              {paymentMethod === "card" && (
                <>
                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Card Number</label>
                    <input
                      style={styles.input}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        const v = e.target.value
                          .replace(/\D/g, "")
                          .replace(/(.{4})/g, "$1 ")
                          .trim();
                        setCardNumber(v);
                      }}
                    />
                  </div>
                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Card Holder Name</label>
                    <input
                      style={styles.input}
                      placeholder="Name on card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  <div style={styles.row}>
                    <div style={{ ...styles.fieldGroup, flex: 1 }}>
                      <label style={styles.label}>Expiry</label>
                      <input
                        style={styles.input}
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => {
                          let v = e.target.value.replace(/\D/g, "");
                          if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
                          setCardExpiry(v);
                        }}
                      />
                    </div>
                    <div style={{ ...styles.fieldGroup, flex: 1 }}>
                      <label style={styles.label}>CVV</label>
                      <input
                        style={styles.input}
                        placeholder="•••"
                        maxLength={3}
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === "netbanking" && (
                <p style={styles.infoText}>
                  You will be redirected to your bank's portal after confirming.
                </p>
              )}

              {paymentMethod === "cash" && (
                <p style={styles.infoText}>
                  Pay ₹{total} at the library counter during pick-up. Please show
                  your receipt.
                </p>
              )}
            </div>

            {error && <p style={styles.errorText}>{error}</p>}
          </div>

          {/* ── Right: Order recap ── */}
          <div style={styles.summaryCol}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Order Recap</h3>

              <div style={styles.slotBadge}>
                <span style={{ fontSize: 16 }}>🕐</span>
                <div>
                  <p style={styles.slotLabel}>Pick-up Slot</p>
                  <p style={styles.slotValue}>{selectedSlot}</p>
                </div>
              </div>

              <div style={styles.divider} />

              {cartItems.map((item) => (
                <div key={item.productId} style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>
                    {item.name} × {item.quantity}
                  </span>
                  <span style={styles.summaryValue}>
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}

              <div style={styles.divider} />
              <div style={styles.summaryRow}>
                <span style={{ ...styles.summaryLabel, fontWeight: 700 }}>
                  Total
                </span>
                <span
                  style={{
                    ...styles.summaryValue,
                    fontWeight: 800,
                    fontSize: 20,
                    color: "#1a1a2e",
                  }}
                >
                  ₹{total}
                </span>
              </div>

              <button
                style={{ ...styles.btnPrimary, opacity: loading ? 0.7 : 1 }}
                onClick={handlePay}
                disabled={loading}
              >
                {loading ? "Processing..." : `Pay ₹${total}`}
              </button>

              <button
                style={styles.btnSecondary}
                onClick={() => navigate("/cart")}
                disabled={loading}
              >
                ← Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Styles ────────────────────────────────────────────────────────────────
const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f0",
    padding: "2rem 1rem",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: { maxWidth: 1050, margin: "0 auto" },
  pageTitle: { fontSize: 26, fontWeight: 700, color: "#1a1a2e", marginBottom: "1.5rem" },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: 24,
    alignItems: "start",
  },
  formCol: { display: "flex", flexDirection: "column", gap: 16 },
  summaryCol: {},
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: "1.25rem",
    border: "1px solid #e8e8e8",
  },
  cardTitle: { fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: "0 0 14px" },
  methodGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  methodBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    padding: "12px 8px",
    border: "1.5px solid #ddd",
    borderRadius: 10,
    background: "#fafafa",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  methodBtnActive: {
    borderColor: "#1a1a2e",
    background: "#1a1a2e10",
  },
  fieldGroup: { marginBottom: 14 },
  row: { display: "flex", gap: 12 },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1.5px solid #ddd",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', sans-serif",
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 1.6,
    margin: 0,
    padding: "10px 14px",
    backgroundColor: "#f5f5f0",
    borderRadius: 8,
  },
  errorText: {
    color: "#e24b4a",
    fontSize: 13,
    fontWeight: 500,
    margin: "0",
  },
  slotBadge: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    backgroundColor: "#f0f0f5",
    borderRadius: 8,
    padding: "10px 14px",
    marginBottom: 16,
  },
  slotLabel: { margin: 0, fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 },
  slotValue: { margin: 0, fontWeight: 600, fontSize: 14, color: "#1a1a2e" },
  divider: { borderTop: "1px dashed #ddd", margin: "12px 0" },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "6px 0",
  },
  summaryLabel: { fontSize: 14, color: "#555" },
  summaryValue: { fontSize: 14, color: "#1a1a2e" },
  btnPrimary: {
    marginTop: 16,
    width: "100%",
    padding: "13px 0",
    backgroundColor: "#1a1a2e",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
  btnSecondary: {
    marginTop: 10,
    width: "100%",
    padding: "11px 0",
    backgroundColor: "transparent",
    color: "#888",
    border: "1px solid #ddd",
    borderRadius: 8,
    fontSize: 14,
    cursor: "pointer",
  },
  emptyBox: {
    maxWidth: 320,
    margin: "6rem auto",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: "2rem",
    border: "1px solid #e8e8e8",
  },
};

export default Checkout;
