import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Design tokens ─────────────────────────────────────────────────────── */
const T = {
  bg:          "#0f0f14",
  surface:     "#1a1a24",
  surfaceAlt:  "#12121a",
  surfaceHover:"#1f1f2e",
  border:      "rgba(255,255,255,0.07)",
  borderAccent:"rgba(124,106,247,0.4)",
  accent:      "#7c6af7",
  accentSoft:  "#a89bf5",
  text:        "#e8e6f0",
  textSub:     "#9995b0",
  textMuted:   "#6b6880",
  success:     "#34d399",
  successBg:   "rgba(52,211,153,0.08)",
  successBorder:"rgba(52,211,153,0.25)",
  font:        "'DM Sans', sans-serif",
};

/* ─── Category definitions ──────────────────────────────────────────────── */
const CATEGORIES = [
  {
    type: "writing",
    icon: "✏️",
    title: "Writing Essentials",
    desc: "Pens, pencils & mechanical pencils",
    accent: "#7c6af7",
  },
  {
    type: "correction",
    icon: "🖊️",
    title: "Correction & Marking",
    desc: "Whiteners, correction tape & highlighters",
    accent: "#5b8af6",
  },
  {
    type: "paper",
    icon: "📋",
    title: "Paper Products",
    desc: "Notebooks, loose sheets & sticky notes",
    accent: "#a78bfa",
  },
  {
    type: "measuring",
    icon: "📐",
    title: "Measuring Tools",
    desc: "Scales, protractors & compasses",
    accent: "#818cf8",
  },
  {
    type: "office",
    icon: "🗂️",
    title: "Office & Utility",
    desc: "Erasers, sharpeners, glue & staplers",
    accent: "#6ea8fe",
  },
  {
    type: "__report",   // sentinel — handled separately in click logic
    icon: "🖨️",
    title: "Print & Report",
    desc: "Upload PDFs and configure print jobs",
    accent: "#c084fc",
  },
];

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
  logo: {
    fontSize: "17px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    background: `linear-gradient(120deg, ${T.text} 20%, ${T.accentSoft})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
  },
  userBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: T.surfaceAlt,
    border: `1px solid ${T.border}`,
    borderRadius: "20px",
    padding: "5px 12px 5px 6px",
  },
  userAvatar: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${T.accent}, #5b8af6)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: 700,
    color: "#fff",
    flexShrink: 0,
  },
  userLabel: {
    fontSize: "12px",
    fontWeight: 600,
    color: T.textSub,
  },

  /* Main */
  main: {
    padding: "48px 32px 80px",
    maxWidth: "1080px",
    margin: "0 auto",
  },

  /* Page header */
  pageHeader: { marginBottom: "40px" },
  eyebrow: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: T.accent,
    marginBottom: "10px",
  },
  pageTitle: {
    fontSize: "clamp(24px, 4vw, 36px)",
    fontWeight: 800,
    letterSpacing: "-0.025em",
    background: `linear-gradient(120deg, ${T.text} 30%, ${T.accentSoft})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
  },
  pageSubtitle: {
    fontSize: "14px",
    color: T.textMuted,
    marginTop: "8px",
  },

  /* Grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "18px",
  },

  /* Category card */
  card: (hovered, accentColor) => ({
    background: T.surface,
    border: `1px solid ${hovered ? accentColor + "55" : T.border}`,
    borderRadius: "16px",
    padding: "26px 24px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease",
    transform: hovered ? "translateY(-4px)" : "none",
    boxShadow: hovered ? `0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px ${accentColor}22` : "none",
    background: hovered ? T.surfaceHover : T.surface,
    userSelect: "none",
  }),

  cardIconWrap: (accentColor) => ({
    width: "44px",
    height: "44px",
    borderRadius: "11px",
    background: accentColor + "18",
    border: `1px solid ${accentColor}30`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    flexShrink: 0,
  }),

  cardTitle: {
    fontSize: "15px",
    fontWeight: 700,
    color: T.text,
    margin: 0,
  },
  cardDesc: {
    fontSize: "12px",
    color: T.textMuted,
    lineHeight: 1.5,
    margin: 0,
  },
  cardArrow: (hovered, accentColor) => ({
    fontSize: "14px",
    color: hovered ? accentColor : T.textMuted,
    transition: "color 0.2s, transform 0.2s",
    transform: hovered ? "translateX(3px)" : "none",
    alignSelf: "flex-end",
    marginTop: "auto",
  }),
};

/* ─── Notification styles (dark-themed, slide-in) ───────────────────────── */
const NS = {
  container: {
    position: "fixed",
    top: "72px",
    right: "20px",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "flex-end",
    pointerEvents: "none",
  },
  toast: {
    minWidth: "280px",
    maxWidth: "340px",
    background: "#1e1e2e",
    border: "1px solid rgba(52,211,153,0.3)",
    borderRadius: "12px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.55)",
    padding: "14px 16px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "12px",
    pointerEvents: "all",
    animation: "slideInRight 0.25s ease",
  },
  toastLeft: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },
  toastDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: T.success,
    flexShrink: 0,
    marginTop: "4px",
    boxShadow: `0 0 8px ${T.success}`,
  },
  toastMessage: {
    fontSize: "13px",
    lineHeight: 1.5,
    color: T.text,
    fontFamily: T.font,
  },
  toastClose: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: T.textMuted,
    fontSize: "14px",
    padding: "0 2px",
    borderRadius: "4px",
    fontFamily: T.font,
    flexShrink: 0,
    lineHeight: 1,
    transition: "color 0.15s",
  },
};

/* ─── Card component ────────────────────────────────────────────────────── */
function CategoryCard({ cat, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={S.card(hovered, cat.accent)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={cat.title}
    >
      <div style={S.cardIconWrap(cat.accent)}>
        {cat.icon}
      </div>
      <div>
        <p style={S.cardTitle}>{cat.title}</p>
        <p style={S.cardDesc}>{cat.desc}</p>
      </div>
      <span style={S.cardArrow(hovered, cat.accent)}>→</span>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate();

  // ✅ UNCHANGED — all notification logic
  const [notifications, setNotifications] = useState([]);
  const shownOrderIdsRef = useRef(new Set());
  const timeoutsRef = useRef([]);

  useEffect(() => {
    const fetchReadyOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        if (!response.ok) return;

        const data = await response.json();
        const orders = Array.isArray(data) ? data : [];

        orders
          .filter(
            (order) =>
              order?.status === "ready" &&
              order?.user?.toString().toLowerCase() === "student"
          )
          .forEach((order) => {
            const orderId = order._id || order.id;
            if (!orderId) return;
            if (shownOrderIdsRef.current.has(orderId.toString())) return;

            shownOrderIdsRef.current.add(orderId.toString());

            const message = `Your order #${orderId
              .toString()
              .slice(-8)
              .toUpperCase()} is ready for pickup`;

            setNotifications((prev) => [
              ...prev,
              { id: orderId.toString(), message },
            ]);

            const timeout = window.setTimeout(() => {
              setNotifications((prev) =>
                prev.filter((n) => n.id !== orderId.toString())
              );
            }, 10000);

            timeoutsRef.current.push(timeout);
          });
      } catch (error) {
        console.error("Unable to fetch ready orders:", error);
      }
    };

    fetchReadyOrders();
    const intervalId = window.setInterval(fetchReadyOrders, 3000);

    return () => {
      window.clearInterval(intervalId);
      timeoutsRef.current.forEach(window.clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  // ✅ UNCHANGED
  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // ✅ UNCHANGED navigation logic
  const handleNavigation = (type) => {
    navigate(`/category/${type}`);
  };

  const handleCardClick = (cat) => {
    if (cat.type === "__report") {
      navigate("/report");
    } else {
      handleNavigation(cat.type);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button:focus-visible { outline: 2px solid #7c6af7; outline-offset: 2px; }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div style={S.root}>

        {/* ── Top bar ── */}
        <header style={S.topBar}>
          <h1 style={S.logo}>CampusCart</h1>
          <div style={S.userBadge}>
            <div style={S.userAvatar}>S</div>
            <span style={S.userLabel}>Student</span>
          </div>
        </header>

        {/* ── Notifications (dark-themed, logic unchanged) ── */}
        <div style={NS.container}>
          {notifications.map((notification) => (
            <div key={notification.id} style={NS.toast}>
              <div style={NS.toastLeft}>
                <span style={NS.toastDot} />
                <span style={NS.toastMessage}>{notification.message}</span>
              </div>
              <button
                onClick={() => dismissNotification(notification.id)}
                style={NS.toastClose}
                aria-label="Close notification"
              >✕</button>
            </div>
          ))}
        </div>

        {/* ── Main content ── */}
        <main style={S.main}>
          <div style={S.pageHeader}>
            <p style={S.eyebrow}>Dashboard</p>
            <h2 style={S.pageTitle}>What do you need today?</h2>
            <p style={S.pageSubtitle}>
              Browse categories, place orders, and track pickups — all in one place.
            </p>
          </div>

          <div style={S.grid}>
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.type}
                cat={cat}
                onClick={() => handleCardClick(cat)}
              />
            ))}
          </div>
        </main>

      </div>
    </>
  );
}