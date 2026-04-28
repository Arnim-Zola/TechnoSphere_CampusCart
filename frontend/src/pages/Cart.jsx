import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Time slot options ──────────────────────────────────────────────────────
const TIME_SLOTS = [
  "09:00 AM – 09:30 AM",
  "09:30 AM – 10:00 AM",
  "10:00 AM – 10:30 AM",
  "10:30 AM – 11:00 AM",
  "11:00 AM – 11:30 AM",
  "12:00 PM – 12:30 PM",
  "12:30 PM – 01:00 PM",
  "02:00 PM – 02:30 PM",
  "02:30 PM – 03:00 PM",
  "03:00 PM – 03:30 PM",
  "04:00 PM – 04:30 PM",
];

// ─── Cart helper functions (shared convention) ─────────────────────────────
export const addToCart = (setCartItems, product) => {
  setCartItems((prev) => {
    const existing = prev.find((item) => item.productId === product._id);
    if (existing) {
      return prev.map((item) =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...prev, { ...product, productId: product._id, quantity: 1 }];
  });
};

export const removeFromCart = (setCartItems, productId) => {
  setCartItems((prev) => prev.filter((item) => item.productId !== productId));
};

export const updateQuantity = (setCartItems, productId, quantity) => {
  if (quantity < 1) return;
  setCartItems((prev) =>
    prev.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    )
  );
};

export const getTotalPrice = (cartItems) =>
  cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

// ─── Cart Page Component ───────────────────────────────────────────────────
const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slotError, setSlotError] = useState(false);

  const total = getTotalPrice(cartItems);

  const handleProceed = () => {
    if (!selectedSlot) {
      setSlotError(true);
      return;
    }
    setSlotError(false);
    // Pass slot + cart to Checkout via location state
    navigate("/checkout", { state: { cartItems, selectedSlot, total } });
  };

  if (cartItems.length === 0) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.emptyBox}>
          <div style={styles.emptyIcon}>🛒</div>
          <h2 style={styles.emptyTitle}>Your cart is empty</h2>
          <p style={styles.emptyText}>
            Add stationery or print jobs from the dashboard to get started.
          </p>
          <button style={styles.btnPrimary} onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* ── Header ── */}
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>Your Cart</h1>
          <span style={styles.itemCount}>{cartItems.length} item(s)</span>
        </div>

        <div style={styles.layout}>
          {/* ── Left: Items ── */}
          <div style={styles.itemsCol}>
            {cartItems.map((item) => (
              <div key={item.productId} style={styles.itemCard}>
                <img
                  src={item.image || "https://placehold.co/72x72?text=Item"}
                  alt={item.name}
                  style={styles.itemImage}
                />
                <div style={styles.itemInfo}>
                  <p style={styles.itemName}>{item.name}</p>
                  {item.fileName && (
                    <p style={styles.itemMeta}>
                      📄 {item.fileName}
                      {item.pages && ` · ${item.pages} pages`}
                      {item.printType && ` · ${item.printType}`}
                    </p>
                  )}
                  <p style={styles.itemMeta}>
                    ₹{item.price} × {item.quantity} ={" "}
                    <strong>₹{item.price * item.quantity}</strong>
                  </p>
                </div>
                <div style={styles.itemActions}>
                  <div style={styles.qtyRow}>
                    <button
                      style={styles.qtyBtn}
                      onClick={() =>
                        updateQuantity(setCartItems, item.productId, item.quantity - 1)
                      }
                    >
                      −
                    </button>
                    <span style={styles.qtyNum}>{item.quantity}</span>
                    <button
                      style={styles.qtyBtn}
                      onClick={() =>
                        updateQuantity(setCartItems, item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    style={styles.removeBtn}
                    onClick={() => removeFromCart(setCartItems, item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Right: Summary + Slot ── */}
          <div style={styles.summaryCol}>
            {/* Pickup time slot */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Pick-up Time Slot</h3>
              <p style={styles.cardSubtext}>
                Select when you'll collect your order from the library counter.
              </p>
              <select
                style={{
                  ...styles.select,
                  borderColor: slotError ? "#e24b4a" : undefined,
                }}
                value={selectedSlot}
                onChange={(e) => {
                  setSelectedSlot(e.target.value);
                  setSlotError(false);
                }}
              >
                <option value="">-- Choose a slot --</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {slotError && (
                <p style={styles.errorText}>Please select a pick-up slot.</p>
              )}
            </div>

            {/* Order summary */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Order Summary</h3>
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
                <span style={{ ...styles.summaryLabel, fontWeight: 600 }}>
                  Total
                </span>
                <span style={{ ...styles.summaryValue, fontWeight: 700, fontSize: 18 }}>
                  ₹{total}
                </span>
              </div>

              <button style={styles.btnPrimary} onClick={handleProceed}>
                Proceed to Payment →
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
  container: { maxWidth: 1100, margin: "0 auto" },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: "1.5rem",
  },
  pageTitle: { fontSize: 26, fontWeight: 700, margin: 0, color: "#1a1a2e" },
  itemCount: {
    backgroundColor: "#1a1a2e",
    color: "#fff",
    borderRadius: 20,
    padding: "2px 12px",
    fontSize: 13,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 340px",
    gap: 24,
    alignItems: "start",
  },
  itemsCol: { display: "flex", flexDirection: "column", gap: 16 },
  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: "1rem",
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
    border: "1px solid #e8e8e8",
  },
  itemImage: {
    width: 72,
    height: 72,
    objectFit: "cover",
    borderRadius: 8,
    flexShrink: 0,
    backgroundColor: "#f0f0f0",
  },
  itemInfo: { flex: 1 },
  itemName: { fontWeight: 600, fontSize: 15, margin: "0 0 4px", color: "#1a1a2e" },
  itemMeta: { fontSize: 13, color: "#666", margin: "0 0 4px" },
  itemActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 10,
    flexShrink: 0,
  },
  qtyRow: { display: "flex", alignItems: "center", gap: 8 },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "1.5px solid #ccc",
    background: "#fff",
    cursor: "pointer",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  },
  qtyNum: { fontSize: 15, fontWeight: 600, minWidth: 20, textAlign: "center" },
  removeBtn: {
    background: "none",
    border: "none",
    color: "#e24b4a",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
  },
  summaryCol: { display: "flex", flexDirection: "column", gap: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: "1.25rem",
    border: "1px solid #e8e8e8",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1a1a2e",
    margin: "0 0 6px",
  },
  cardSubtext: { fontSize: 13, color: "#888", margin: "0 0 12px" },
  select: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1.5px solid #ddd",
    fontSize: 14,
    color: "#1a1a2e",
    cursor: "pointer",
    outline: "none",
  },
  errorText: { color: "#e24b4a", fontSize: 12, margin: "6px 0 0" },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "6px 0",
  },
  summaryLabel: { fontSize: 14, color: "#555" },
  summaryValue: { fontSize: 14, color: "#1a1a2e" },
  divider: { borderTop: "1px dashed #ddd", margin: "12px 0" },
  btnPrimary: {
    marginTop: 16,
    width: "100%",
    padding: "12px 0",
    backgroundColor: "#1a1a2e",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  },
  emptyBox: {
    maxWidth: 380,
    margin: "6rem auto",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: "2.5rem",
    border: "1px solid #e8e8e8",
  },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 20, fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px" },
  emptyText: { fontSize: 14, color: "#888", margin: "0 0 20px" },
};

export default Cart;
