import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Payment methods
const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", icon: "📱" },
  { id: "card", label: "Card", icon: "💳" },
  { id: "netbanking", label: "Net Banking", icon: "🏦" },
  { id: "cash", label: "Pay at Counter", icon: "💵" },
];

const Checkout = () => {
  const navigate = useNavigate();

  // ✅ CORRECT Cart usage
  const { cartItems, getCartTotal, clearCart } = useCart();
  const total = getCartTotal();

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 

  const handlePay = () => {
    setLoading(true);

    setTimeout(() => {
      clearCart();

      navigate("/receipt", {
        state: {
          order: {
            _id: "ORD" + Date.now(),
            transactionId: "TXN" + Date.now(),
          },
          cartItems,
          total,
          paymentMethod,
        },
      });
    }, 1000);
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
          {/* LEFT SIDE */}
          <div style={styles.formCol}>
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
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <span>{method.icon}</span>
                    <span>{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Payment Details</h3>

              {paymentMethod === "upi" && (
                <input
                  style={styles.input}
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              )}

              {paymentMethod === "card" && (
                <>
                  <input
                    style={styles.input}
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <input
                    style={styles.input}
                    placeholder="Name on Card"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </>
              )}
            </div>

            {error && <p style={styles.errorText}>{error}</p>}
          </div>

          {/* RIGHT SIDE */}
          <div style={styles.summaryCol}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Order Recap</h3>

              

              {cartItems.map((item, i) => (
                <div key={i} style={styles.summaryRow}>
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}

              <h2>Total: ₹{total}</h2>

              <button style={styles.btnPrimary} onClick={handlePay}>
                {loading ? "Processing..." : `Pay ₹${total}`}
              </button>

              <button
                style={styles.btnSecondary}
                onClick={() => navigate("/cart")}
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles (same as yours, shortened)
const styles = {
  wrapper: { padding: "2rem" },
  container: { maxWidth: 1000, margin: "0 auto" },
  layout: { display: "flex", gap: 20 },
  formCol: { flex: 1 },
  summaryCol: { width: 300 },
  card: { background: "#fff", padding: 20, borderRadius: 10 },
  methodGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  methodBtn: { padding: 10, cursor: "pointer" },
  methodBtnActive: { background: "#ddd" },
  input: { width: "100%", marginBottom: 10, padding: 10 },
  summaryRow: { display: "flex", justifyContent: "space-between" },
  btnPrimary: { marginTop: 10, padding: 10, background: "#000", color: "#fff" },
  btnSecondary: { marginTop: 10, padding: 10 },
  emptyBox: { textAlign: "center", marginTop: "100px" },
};

export default Checkout;