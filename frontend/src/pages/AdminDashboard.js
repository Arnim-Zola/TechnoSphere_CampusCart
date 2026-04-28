import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* ─── Design tokens ─────────────────────────────────────────────────────── */
const T = {
  bg:           "#0f0f14",
  surface:      "#1a1a24",
  surfaceAlt:   "#12121a",
  surfaceHover: "#1f1f2e",
  border:       "rgba(255,255,255,0.07)",
  borderAccent: "rgba(124,106,247,0.35)",
  accent:       "#7c6af7",
  accentSoft:   "#a89bf5",
  text:         "#e8e6f0",
  textSub:      "#9995b0",
  textMuted:    "#6b6880",
  font:         "'DM Sans', sans-serif",

  /* Status palette */
  pending:      { fg: "#fb923c", bg: "rgba(251,146,60,0.12)",  border: "rgba(251,146,60,0.28)" },
  printing:     { fg: "#60a5fa", bg: "rgba(96,165,250,0.12)", border: "rgba(96,165,250,0.28)" },
  ready:        { fg: "#34d399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.28)" },
};

/* ─── Status config ─────────────────────────────────────────────────────── */
const STATUS_META = {
  pending:  { label: "Pending",  color: T.pending  },
  printing: { label: "Printing", color: T.printing },
  ready:    { label: "Ready",    color: T.ready    },
};

/* ─── Styles ────────────────────────────────────────────────────────────── */
const S = {
  root: {
    minHeight: "100vh",
    background: T.bg,
    fontFamily: T.font,
    color: T.text,
    boxSizing: "border-box",
  },

  /* Top bar */
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    height: "60px",
    background: T.surface,
    borderBottom: `1px solid ${T.border}`,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  topLeft: { display: "flex", alignItems: "center", gap: "16px" },
  logo: {
    fontSize: "17px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    background: `linear-gradient(120deg, ${T.text} 20%, ${T.accentSoft})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
  },
  livePill: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: T.surfaceAlt,
    border: `1px solid ${T.border}`,
    borderRadius: "20px",
    padding: "3px 10px",
    fontSize: "11px",
    fontWeight: 600,
    color: T.textMuted,
    letterSpacing: "0.04em",
  },
  liveDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: T.ready.fg,
    boxShadow: `0 0 6px ${T.ready.fg}`,
    animation: "pulse 2s ease-in-out infinite",
    flexShrink: 0,
  },
  topRight: { display: "flex", alignItems: "center", gap: "12px" },
  adminBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: T.surfaceAlt,
    border: `1px solid ${T.border}`,
    borderRadius: "20px",
    padding: "5px 12px 5px 6px",
  },
  adminAvatar: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${T.accent}, #5b8af6)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: 800,
    color: "#fff",
    flexShrink: 0,
    letterSpacing: 0,
  },
  adminLabel: { fontSize: "12px", fontWeight: 600, color: T.textSub },
  logoutBtn: (h) => ({
    background: h ? "rgba(248,113,113,0.1)" : "transparent",
    border: `1px solid ${h ? "rgba(248,113,113,0.3)" : T.border}`,
    borderRadius: "8px",
    color: h ? "#f87171" : T.textMuted,
    fontSize: "12px",
    fontWeight: 600,
    padding: "6px 14px",
    cursor: "pointer",
    fontFamily: T.font,
    transition: "all 0.15s",
  }),

  /* Main */
  main: {
    padding: "40px 24px 80px",
    maxWidth: "860px",
    margin: "0 auto",
  },

  /* Page header */
  pageHeader: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "12px",
  },
  eyebrow: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: T.accent,
    marginBottom: "8px",
  },
  pageTitle: {
    fontSize: "clamp(22px, 4vw, 32px)",
    fontWeight: 800,
    letterSpacing: "-0.025em",
    background: `linear-gradient(120deg, ${T.text} 30%, ${T.accentSoft})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
  },
  orderCount: {
    fontSize: "13px",
    color: T.textMuted,
    background: T.surfaceAlt,
    border: `1px solid ${T.border}`,
    borderRadius: "20px",
    padding: "5px 14px",
    fontWeight: 600,
    alignSelf: "flex-start",
  },

  /* Order list */
  orderList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  /* Order card */
  card: (h) => ({
    background: T.surface,
    border: `1px solid ${h ? T.borderAccent : T.border}`,
    borderRadius: "16px",
    padding: "22px 24px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    transform: h ? "translateY(-2px)" : "none",
    boxShadow: h ? "0 12px 40px rgba(0,0,0,0.45)" : "none",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  }),

  /* Card top row */
  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    flexWrap: "wrap",
  },
  cardTopLeft: { display: "flex", alignItems: "center", gap: "12px" },

  /* Order ID chip */
  orderIdChip: {
    background: T.surfaceAlt,
    border: `1px solid ${T.border}`,
    borderRadius: "7px",
    padding: "5px 10px",
    fontSize: "12px",
    fontWeight: 700,
    color: T.accentSoft,
    letterSpacing: "0.06em",
    fontFamily: "monospace",
  },

  /* Status badge */
  statusBadge: (status) => {
    const m = STATUS_META[status] || STATUS_META.pending;
    return {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: m.color.bg,
      border: `1px solid ${m.color.border}`,
      borderRadius: "20px",
      padding: "4px 12px",
      fontSize: "12px",
      fontWeight: 700,
      color: m.color.fg,
      letterSpacing: "0.04em",
    };
  },
  statusDot: (status) => {
    const m = STATUS_META[status] || STATUS_META.pending;
    return {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: m.color.fg,
      flexShrink: 0,
    };
  },

  /* Items section */
  itemsLabel: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: T.textMuted,
    marginBottom: "8px",
  },
  itemRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: `1px solid ${T.border}`,
  },
  itemName: {
    fontSize: "13px",
    color: T.textSub,
    flex: 1,
  },
  itemQty: {
    fontSize: "12px",
    fontWeight: 700,
    color: T.textMuted,
    background: T.surfaceAlt,
    border: `1px solid ${T.border}`,
    borderRadius: "5px",
    padding: "2px 8px",
    minWidth: "32px",
    textAlign: "center",
  },

  /* Action buttons */
  actions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  actionBtn: (variant, h) => {
    const variants = {
      printing: {
        base: { bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.3)", color: "#60a5fa" },
        hover: { bg: "rgba(96,165,250,0.2)", border: "rgba(96,165,250,0.5)", color: "#93c5fd" },
      },
      ready: {
        base: { bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)", color: "#34d399" },
        hover: { bg: "rgba(52,211,153,0.2)", border: "rgba(52,211,153,0.5)", color: "#6ee7b7" },
      },
    };
    const v = variants[variant] || variants.ready;
    const c = h ? v.hover : v.base;
    return {
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: "8px",
      color: c.color,
      fontSize: "12px",
      fontWeight: 700,
      padding: "8px 16px",
      cursor: "pointer",
      fontFamily: T.font,
      letterSpacing: "0.03em",
      transition: "all 0.15s",
    };
  },

  /* Empty state */
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "80px 20px",
    gap: "12px",
    textAlign: "center",
  },
  emptyIcon: { fontSize: "40px", lineHeight: 1 },
  emptyTitle: { fontSize: "18px", fontWeight: 700, color: T.text },
  emptyText: { fontSize: "14px", color: T.textMuted },
};

/* ─── Order card sub-component ──────────────────────────────────────────── */
function OrderCard({ order, onUpdateStatus }) {
  const [cardHover, setCardHover] = useState(false);
  const [btn1Hover, setBtn1Hover] = useState(false);
  const [btn2Hover, setBtn2Hover] = useState(false);

  const shortId = (order._id || order.id || "")
    .toString()
    .slice(-8)
    .toUpperCase();

  const status = order.status || "pending";

  /* Merge stationery + document items for display */
  const allItems = [
    ...(order.stationeryItems || []),
    ...(order.documents || []),
  ];

  return (
    <div
      style={S.card(cardHover)}
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
    >
      {/* Top row: ID + status */}
      <div style={S.cardTop}>
        <div style={S.cardTopLeft}>
          <span style={S.orderIdChip}>#{shortId}</span>
          <span style={S.statusBadge(status)}>
            <span style={S.statusDot(status)} />
            {STATUS_META[status]?.label || status}
          </span>
        </div>
        {order.totalAmount != null && (
          <span style={{ fontSize: "14px", fontWeight: 700, color: T.accentSoft }}>
            ₹{order.totalAmount}
          </span>
        )}
      </div>

      {/* Items list */}
      {allItems.length > 0 && (
        <div>
          <p style={S.itemsLabel}>Items</p>
          {allItems.map((item, i) => (
            <div
              key={i}
              style={{
                ...S.itemRow,
                ...(i === allItems.length - 1 ? { borderBottom: "none" } : {}),
              }}
            >
              <span style={S.itemName}>{item.name || item.filename || "Item"}</span>
              <span style={S.itemQty}>×{item.quantity ?? 1}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action buttons — contextual per status, same updateStatus call */}
      <div style={S.actions}>
        {status === "pending" && (
          <button
            style={S.actionBtn("printing", btn1Hover)}
            onMouseEnter={() => setBtn1Hover(true)}
            onMouseLeave={() => setBtn1Hover(false)}
            onClick={() => onUpdateStatus(order._id || order.id, "printing")}
          >
            ▶ Mark as Printing
          </button>
        )}
        {status === "printing" && (
          <button
            style={S.actionBtn("ready", btn2Hover)}
            onMouseEnter={() => setBtn2Hover(true)}
            onMouseLeave={() => setBtn2Hover(false)}
            onClick={() => onUpdateStatus(order._id || order.id, "ready")}
          >
            ✓ Mark as Ready
          </button>
        )}
        {status === "ready" && (
          <span style={{ fontSize: "12px", color: T.ready.fg, fontWeight: 600 }}>
            ✓ Ready for pickup
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────────────── */
export default function AdminDashboard() {
  // ✅ UNCHANGED — all business logic
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [logoutHover, setLogoutHover] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ UNCHANGED
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${id}`, {
        status: newStatus,
      });
      fetchOrders();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  /* Sort: pending → printing → ready */
  const sorted = [...orders].sort((a, b) => {
    const rank = { pending: 0, printing: 1, ready: 2 };
    return (rank[a.status] ?? 3) - (rank[b.status] ?? 3);
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button:focus-visible { outline: 2px solid #7c6af7; outline-offset: 2px; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>

      <div style={S.root}>

        {/* ── Top bar ── */}
        <header style={S.topBar}>
          <div style={S.topLeft}>
            <h1 style={S.logo}>CampusCart</h1>
            <div style={S.livePill}>
              <span style={S.liveDot} />
              LIVE
            </div>
          </div>
          <div style={S.topRight}>
            <div style={S.adminBadge}>
              <div style={S.adminAvatar}>A</div>
              <span style={S.adminLabel}>Admin</span>
            </div>
            <button
              style={S.logoutBtn(logoutHover)}
              onMouseEnter={() => setLogoutHover(true)}
              onMouseLeave={() => setLogoutHover(false)}
              onClick={() => navigate("/login")}
            >
              Logout
            </button>
          </div>
        </header>

        {/* ── Main ── */}
        <main style={S.main}>
          <div style={S.pageHeader}>
            <div>
              <p style={S.eyebrow}>Admin Panel</p>
              <h2 style={S.pageTitle}>Order Queue</h2>
            </div>
            <span style={S.orderCount}>
              {orders.length} order{orders.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Empty state */}
          {orders.length === 0 && (
            <div style={S.empty}>
              <span style={S.emptyIcon}>📭</span>
              <p style={S.emptyTitle}>No orders yet</p>
              <p style={S.emptyText}>New orders will appear here automatically.</p>
            </div>
          )}

          {/* Order cards */}
          <div style={S.orderList}>
            {sorted.map((order) => (
              <OrderCard
                key={order._id || order.id}
                order={order}
                onUpdateStatus={updateStatus}
              />
            ))}
          </div>
        </main>

      </div>
    </>
  );
}