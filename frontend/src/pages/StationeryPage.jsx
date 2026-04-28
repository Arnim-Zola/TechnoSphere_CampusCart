import { useParams } from "react-router-dom";
import CartAccessButton from "../components/CartAccessButton";
import { useCart } from "../context/CartContext";
import { useState } from "react";

/* ─── Inline styles as JS objects ──────────────────────────────────────── */
const S = {
  root: {
    minHeight: "100vh",
    background: "#0f0f14",
    color: "#e8e6f0",
    fontFamily: "'DM Sans', sans-serif",
    padding: "40px 24px 80px",
    boxSizing: "border-box",
  },

  /* Header */
  header: {
    marginBottom: "40px",
  },
  headerTop: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "18px",
    flexWrap: "wrap",
    marginBottom: "14px",
  },
  eyebrow: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#7c6af7",
    marginBottom: "8px",
  },
  title: {
    fontSize: "clamp(26px, 5vw, 40px)",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    margin: 0,
    background: "linear-gradient(120deg, #e8e6f0 30%, #a89bf5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#6b6880",
  },

  /* Grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },

  /* Card */
  card: {
    background: "#1a1a24",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    padding: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    cursor: "default",
  },
  cardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
    borderColor: "rgba(124,106,247,0.35)",
  },

  itemName: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#e8e6f0",
    margin: 0,
  },
  price: {
    fontSize: "13px",
    color: "#a89bf5",
    fontWeight: 500,
  },

  /* Selects */
  selectRow: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  select: {
    background: "#12121a",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "#c8c4dc",
    fontSize: "13px",
    padding: "8px 10px",
    outline: "none",
    cursor: "pointer",
    appearance: "none",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237c6af7' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    paddingRight: "30px",
  },

  /* Quantity row */
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: "0",
    background: "#12121a",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    width: "fit-content",
  },
  qtyBtn: {
    background: "transparent",
    border: "none",
    color: "#a89bf5",
    fontSize: "18px",
    fontWeight: 700,
    width: "36px",
    height: "36px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.15s",
    lineHeight: 1,
  },
  qtyNum: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#e8e6f0",
    minWidth: "32px",
    textAlign: "center",
    userSelect: "none",
  },

  /* Add to cart button */
  addBtn: {
    marginTop: "auto",
    background: "linear-gradient(135deg, #7c6af7, #5b8af6)",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "13px",
    fontWeight: 600,
    padding: "10px 16px",
    cursor: "pointer",
    transition: "opacity 0.15s, transform 0.15s",
    letterSpacing: "0.02em",
  },
  addBtnHover: {
    opacity: 0.88,
    transform: "scale(0.98)",
  },

  /* Footer total */
  totalBar: {
    marginTop: "40px",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    background: "#1a1a24",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "10px",
    padding: "12px 20px",
  },
  totalLabel: {
    fontSize: "13px",
    color: "#6b6880",
    fontWeight: 500,
  },
  totalAmount: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#a89bf5",
  },

  /* Toast */
  toast: {
    position: "fixed",
    bottom: "28px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#1e1e2e",
    border: "1px solid rgba(124,106,247,0.4)",
    borderRadius: "10px",
    padding: "12px 22px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#a89bf5",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    zIndex: 9999,
    whiteSpace: "nowrap",
    animation: "fadeSlideUp 0.25s ease",
  },

  /* Empty state */
  empty: {
    color: "#4a4760",
    fontSize: "15px",
    padding: "40px 0",
  },
};

/* ─── Price lookup (unchanged logic) ──────────────────────────────────── */
function getPrice(item) {
  if (item === "Mechanical Pencil") return 50;
  if (["Notebook", "Loose Sheets", "Sticky Notes"].includes(item)) return 30;
  if (["Scale", "Protractor", "Compass"].includes(item)) return 40;
  if (["Eraser", "Sharpener"].includes(item)) return 5;
  if (["Glue Stick", "Stapler"].includes(item)) return 25;
  return 10;
}

/* ─── Hover-aware card ─────────────────────────────────────────────────── */
function ProductCard({ item, qty, onChangeQty, onAdd, children }) {
  const [hovered, setHovered] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  return (
    <div
      style={{ ...S.card, ...(hovered ? S.cardHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        <p style={S.itemName}>{item}</p>
        <p style={S.price}>₹{getPrice(item)} each</p>
      </div>

      {children && <div style={S.selectRow}>{children}</div>}

      {/* Quantity */}
      <div style={S.qtyRow}>
        <button style={S.qtyBtn} onClick={() => onChangeQty(item, qty - 1)}>
          −
        </button>
        <span style={S.qtyNum}>{qty}</span>
        <button style={S.qtyBtn} onClick={() => onChangeQty(item, qty + 1)}>
          +
        </button>
      </div>

      {/* Add to cart */}
      <button
        style={{ ...S.addBtn, ...(btnHover ? S.addBtnHover : {}) }}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        onClick={() => onAdd(item)}
      >
        Add to Cart
      </button>
    </div>
  );
}

/* ─── Main page ────────────────────────────────────────────────────────── */
export default function StationeryPage() {
  const { type: category } = useParams();
  const { addToCart } = useCart();

  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState("");
  const [categoryTotal, setCategoryTotal] = useState(0);

  const [penType, setPenType] = useState("");
  const [penColor, setPenColor] = useState("");
  const [pencilType, setPencilType] = useState("");
  const [mechSize, setMechSize] = useState("");

  const categories = {
    writing: ["Pen", "Pencil", "Mechanical Pencil"],
    correction: ["Whitener", "Correction Tape", "Highlighter"],
    paper: ["Notebook", "Loose Sheets", "Sticky Notes"],
    measuring: ["Scale", "Protractor", "Compass"],
    office: ["Eraser", "Sharpener", "Glue Stick", "Stapler"],
  };

  const items = categories[category] || [];

  // ✅ FIXED: always store number
  const changeQty = (item, value) => {
    const num = Math.max(1, Number(value));
    setQuantities((p) => ({ ...p, [item]: num }));
  };

  const showMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  const handleAdd = (item) => {
    const qty = quantities[item] || 1; // ✅ FIXED

    let name = item;
    let price = 10;

    if (item === "Pen") {
      if (!penType || !penColor) return showMsg("Select pen type & color");
      name = `${penType} Pen (${penColor})`;
      price = 10;
    }

    if (item === "Pencil") {
      if (!pencilType) return showMsg("Select pencil type");
      name = `${pencilType} Pencil`;
      price = 10;
    }

    if (item === "Mechanical Pencil") {
      if (!mechSize) return showMsg("Select size");
      name = `Mechanical Pencil (${mechSize})`;
      price = 50;
    }

    if (["Notebook", "Loose Sheets", "Sticky Notes"].includes(item)) price = 30;
    if (["Scale", "Protractor", "Compass"].includes(item)) price = 40;
    if (["Eraser", "Sharpener"].includes(item)) price = 5;
    if (["Glue Stick", "Stapler"].includes(item)) price = 25;

    // ✅ PASS CORRECT QUANTITY
    addToCart({ name, price, quantity: qty });

    setCategoryTotal((prev) => prev + price * qty);
    showMsg(`${name} added to cart`);
  };

  const categoryLabel = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "Unknown";

  const subtitleMap = {
    writing: "Pens, pencils & more for everyday writing",
    correction: "Fix mistakes cleanly and quickly",
    paper: "Notebooks, sheets & sticky notes",
    measuring: "Rulers, protractors & compasses",
    office: "Essentials for your desk",
  };

  return (
    <>
      {/* Google Fonts: DM Sans */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        select option { background: #12121a; }
        button:focus-visible { outline: 2px solid #7c6af7; outline-offset: 2px; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translate(-50%, 12px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>

      <div style={S.root}>
        {/* Header */}
        <header style={S.header}>
          <div style={S.headerTop}>
            <div>
              <p style={S.eyebrow}>CampusCart · Stationery</p>
              <h1 style={S.title}>{categoryLabel}</h1>
            </div>
            <CartAccessButton />
          </div>
          {subtitleMap[category] && (
            <p style={S.subtitle}>{subtitleMap[category]}</p>
          )}
        </header>

        {/* Empty state */}
        {items.length === 0 && (
          <p style={S.empty}>No items found for this category.</p>
        )}

        {/* Product grid */}
        <div style={S.grid}>
          {items.map((item) => {
            const qty = quantities[item] || 1;

            return (
              <ProductCard
                key={item}
                item={item}
                qty={qty}
                onChangeQty={changeQty}
                onAdd={handleAdd}
              >
                {/* OPTIONS — unchanged logic, restyled */}
                {item === "Pen" && (
                  <>
                    <select
                      style={S.select}
                      onChange={(e) => setPenType(e.target.value)}
                    >
                      <option value="">Type</option>
                      <option>Ball</option>
                      <option>Gel</option>
                    </select>
                    <select
                      style={S.select}
                      onChange={(e) => setPenColor(e.target.value)}
                    >
                      <option value="">Color</option>
                      <option>Blue</option>
                      <option>Black</option>
                    </select>
                  </>
                )}

                {item === "Pencil" && (
                  <select
                    style={S.select}
                    onChange={(e) => setPencilType(e.target.value)}
                  >
                    <option value="">Type</option>
                    <option>HB</option>
                    <option>2B</option>
                  </select>
                )}

                {item === "Mechanical Pencil" && (
                  <select
                    style={S.select}
                    onChange={(e) => setMechSize(e.target.value)}
                  >
                    <option value="">Size</option>
                    <option>0.5 mm</option>
                    <option>0.7 mm</option>
                  </select>
                )}
              </ProductCard>
            );
          })}
        </div>

        {/* Total */}
        {categoryTotal > 0 && (
          <div style={S.totalBar}>
            <span style={S.totalLabel}>Session total</span>
            <span style={S.totalAmount}>₹{categoryTotal}</span>
          </div>
        )}
      </div>

      {/* Toast notification */}
      {message && <div style={S.toast}>{message}</div>}
    </>
  );
}