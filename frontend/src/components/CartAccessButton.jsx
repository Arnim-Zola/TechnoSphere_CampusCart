import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartAccessButton() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  return (
    <button
      type="button"
      onClick={() => navigate("/cart")}
      title="View Cart"
      aria-label="View Cart"
      style={styles.button}
    >
      🛒
      {totalItems > 0 && (
        <span style={styles.badge}>{totalItems}</span>
      )}
    </button>
  );
}

const styles = {
  button: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#2563eb",
    color: "white",
    fontSize: "22px",
    padding: "14px",
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
    zIndex: 9999,
    border: "none",
    outline: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "56px",
    height: "56px",
    transition: "transform 180ms ease, background 180ms ease",
  },
  badge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "#ef4444",
    color: "white",
    fontSize: "12px",
    padding: "4px 6px",
    borderRadius: "50%",
    minWidth: "20px",
    height: "20px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  },
};
