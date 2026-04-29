import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Simple print-to-PDF receipt — no external dependencies needed
const Receipt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const receiptRef = useRef(null);

  const {
    order = {},
    cartItems = [],
    total = 0,
    paymentMethod = "",
  } = location.state || {};

  // Friendly label for payment method
  const paymentLabels = {
    upi: "UPI",
    card: "Debit / Credit Card",
    netbanking: "Net Banking",
    cash: "Pay at Counter",
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    const role = sessionStorage.getItem("role");

    if (role === "admin") {
      navigate("/admin");
    } else if (role) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  if (!order._id && !cartItems.length) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.emptyBox}>
          <p style={{ color: "#888" }}>No receipt to display.</p>
          <button style={styles.btnPrimary} onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Print-only styles injected into head via a style tag */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #receipt-printable, #receipt-printable * { visibility: visible; }
          #receipt-printable { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div style={styles.wrapper}>
        {/* Action buttons (hidden on print) */}
        <div className="no-print" style={styles.actions}>
          <button style={styles.btnPrimary} onClick={handlePrint}>
            🖨️ Print / Save as PDF
          </button>
          <button style={styles.btnSecondary} onClick={handleBack}>
            Back to Home
          </button>
        </div>

        {/* ── Printable Receipt ── */}
        <div id="receipt-printable" ref={receiptRef} style={styles.receipt}>
          {/* Header */}
          <div style={styles.receiptHeader}>
            <div style={styles.logoRow}>
              <div style={styles.logoBadge}>CC</div>
              <div>
                <h2 style={styles.logoName}>CampusCart</h2>
                <p style={styles.logoSub}>College Library · Print & Stationery</p>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={styles.successBadge}>✓ Order Confirmed</div>
            </div>
          </div>

          <div style={styles.divider} />

          {/* Order Meta */}
          <div style={styles.metaGrid}>
            <div style={styles.metaItem}>
              <p style={styles.metaLabel}>Order ID</p>
              <p style={styles.metaValue}>
                #{order._id ? order._id.toString().slice(-8).toUpperCase() : "PREVIEW"}
              </p>
            </div>
            <div style={styles.metaItem}>
              <p style={styles.metaLabel}>Date</p>
              <p style={styles.metaValue}>
                {new Date().toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div style={styles.metaItem}>
              <p style={styles.metaLabel}>Payment</p>
              <p style={styles.metaValue}>
                {paymentLabels[paymentMethod] || paymentLabels[order.paymentMethod] || "—"}
              </p>
            </div>
          </div>

          <div style={styles.divider} />

          {/* Items table */}
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.th, textAlign: "left" }}>Item</th>
                <th style={{ ...styles.th, textAlign: "center" }}>Qty</th>
                <th style={{ ...styles.th, textAlign: "right" }}>Unit Price</th>
                <th style={{ ...styles.th, textAlign: "right" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, idx) => (
                <tr key={item.productId || idx} style={idx % 2 === 0 ? styles.rowEven : {}}>
                  <td style={{ ...styles.td, textAlign: "left" }}>
                    <p style={{ margin: 0, fontWeight: 500 }}>{item.name}</p>
                    {item.fileName && (
                      <p style={{ margin: 0, fontSize: 11, color: "#888" }}>
                        📄 {item.fileName}
                        {item.pages && ` · ${item.pages} pages`}
                        {item.printType && ` · ${item.printType}`}
                      </p>
                    )}
                  </td>
                  <td style={{ ...styles.td, textAlign: "center" }}>{item.quantity}</td>
                  <td style={{ ...styles.td, textAlign: "right" }}>₹{item.price}</td>
                  <td style={{ ...styles.td, textAlign: "right", fontWeight: 600 }}>
                    ₹{item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total */}
          <div style={styles.totalRow}>
            <span style={styles.totalLabel}>Total Paid</span>
            <span style={styles.totalValue}>₹{total || order.totalAmount}</span>
          </div>

          <div style={styles.divider} />

          {/* Transaction ID */}
          {order.transactionId && (
            <p style={styles.txnText}>
              Transaction ID: <strong>{order.transactionId}</strong>
            </p>
          )}

          {/* Footer note */}
          <div style={styles.footer}>
            <p style={styles.footerText}>
              Please show this receipt at the library counter.
            </p>
            <p style={styles.footerText}>
              For queries, contact the library staff.
            </p>
          </div>

          {/* Barcode placeholder (visual only) */}
          <div style={styles.barcodePlaceholder}>
            <div style={styles.barcodeLines}>
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.barcodeLine,
                    width: i % 3 === 0 ? 3 : i % 5 === 0 ? 5 : 2,
                  }}
                />
              ))}
            </div>
            <p style={styles.barcodeLabel}>
              {order._id
                ? order._id.toString().slice(-12).toUpperCase()
                : "ORDER-PREVIEW"}
            </p>
          </div>
        </div>
      </div>
    </>
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
  actions: {
    maxWidth: 620,
    margin: "0 auto 1.5rem",
    display: "flex",
    gap: 12,
  },
  receipt: {
    maxWidth: 620,
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: 16,
    border: "1px solid #e8e8e8",
    padding: "2rem",
  },
  receiptHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  logoRow: { display: "flex", gap: 12, alignItems: "center" },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#1a1a2e",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 16,
    letterSpacing: 1,
  },
  logoName: { margin: 0, fontSize: 18, fontWeight: 700, color: "#1a1a2e" },
  logoSub: { margin: 0, fontSize: 12, color: "#888" },
  successBadge: {
    display: "inline-block",
    backgroundColor: "#eaf3de",
    color: "#3b6d11",
    borderRadius: 20,
    padding: "4px 12px",
    fontSize: 13,
    fontWeight: 600,
  },
  divider: { borderTop: "1px dashed #ddd", margin: "16px 0" },
  metaGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: 12,
  },
  metaItem: {},
  metaLabel: { margin: 0, fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: 0.5 },
  metaValue: { margin: "4px 0 0", fontSize: 13, fontWeight: 600, color: "#1a1a2e" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
    marginBottom: 0,
  },
  th: {
    padding: "8px 4px",
    fontSize: 11,
    fontWeight: 600,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    borderBottom: "1.5px solid #eee",
  },
  td: { padding: "10px 4px", verticalAlign: "top" },
  rowEven: { backgroundColor: "#fafafa" },
  totalRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 24,
    alignItems: "center",
    margin: "12px 0 0",
    padding: "12px 4px",
    borderTop: "2px solid #1a1a2e",
  },
  totalLabel: { fontSize: 14, fontWeight: 600, color: "#555" },
  totalValue: { fontSize: 22, fontWeight: 800, color: "#1a1a2e" },
  txnText: { fontSize: 12, color: "#aaa", margin: "0 0 8px", textAlign: "center" },
  footer: {
    backgroundColor: "#f5f5f0",
    borderRadius: 8,
    padding: "10px 14px",
    textAlign: "center",
  },
  footerText: { margin: "2px 0", fontSize: 12, color: "#888" },
  barcodePlaceholder: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },
  barcodeLines: { display: "flex", gap: 2, height: 50, alignItems: "stretch" },
  barcodeLine: {
    backgroundColor: "#1a1a2e",
    borderRadius: 1,
  },
  barcodeLabel: { fontSize: 10, color: "#aaa", letterSpacing: 2, margin: 0 },
  btnPrimary: {
    padding: "11px 20px",
    backgroundColor: "#1a1a2e",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  btnSecondary: {
    padding: "11px 20px",
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

export default Receipt;
