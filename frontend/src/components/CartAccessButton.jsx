import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartAccessButton() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const itemCount = cartItems.length;
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      type="button"
      onClick={() => navigate("/cart")}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{ ...styles.button, ...(isHover ? styles.buttonHover : {}) }}
      aria-label="Open cart"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={styles.icon}
      >
        <path
          d="M6 6h15l-1.5 9h-12L4 4H2"
          stroke="#c7d4e8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          stroke="#c7d4e8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span style={styles.label}>Cart</span>
      {itemCount > 0 && (
        <span style={styles.badge}>{itemCount}</span>
      )}
    </button>
  );
}

const styles = {
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 14px",
    background: "#111828",
    border: "1px solid #1f2937",
    borderRadius: "999px",
    color: "#c7d4e8",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 160ms ease, transform 160ms ease, border-color 160ms ease",
    minHeight: "44px",
  },
  buttonHover: {
    background: "#141c2f",
    borderColor: "#374151",
    transform: "translateY(-1px)",
  },
  icon: {
    display: "block",
  },
  label: {
    lineHeight: 1,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "20px",
    height: "20px",
    borderRadius: "999px",
    background: "#7c3aed",
    color: "#fff",
    fontSize: "11px",
    fontWeight: 700,
    padding: "0 6px",
  },
};
