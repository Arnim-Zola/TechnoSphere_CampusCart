import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

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
    correction: ["Whitener", "Correction Tape", "Highlighter"]
  };

  const items = categories[category] || [];

  const changeQty = (item, value) => {
    if (/^\d*$/.test(value)) {
      setQuantities(p => ({ ...p, [item]: value }));
    }
  };

  const showMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  const handleAdd = (item) => {
    const qty = Number(quantities[item]) || 1;
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

    addToCart({ name, price, quantity: qty });
    setCategoryTotal(prev => prev + (price * qty));
    showMsg(`${name} added`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{category} items</h2>

      {items.map(item => {
        const qty = Number(quantities[item]) || 1;

        return (
          <div key={item} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{item}</h3>

            {/* OPTIONS */}
            {item === "Pen" && (
              <>
                <select onChange={(e) => setPenType(e.target.value)}>
                  <option value="">Type</option>
                  <option>Ball</option>
                  <option>Gel</option>
                </select>

                <select onChange={(e) => setPenColor(e.target.value)}>
                  <option value="">Color</option>
                  <option>Blue</option>
                  <option>Black</option>
                </select>
              </>
            )}

            {item === "Pencil" && (
              <select onChange={(e) => setPencilType(e.target.value)}>
                <option value="">Type</option>
                <option>HB</option>
                <option>2B</option>
              </select>
            )}

            {item === "Mechanical Pencil" && (
              <select onChange={(e) => setMechSize(e.target.value)}>
                <option value="">Size</option>
                <option>0.5 mm</option>
                <option>0.7 mm</option>
              </select>
            )}

            {/* QUANTITY */}
            <div>
              <button onClick={() => changeQty(item, String(Math.max(1, qty - 1)))}>-</button>
              <span>{qty}</span>
              <button onClick={() => changeQty(item, String(qty + 1))}>+</button>
            </div>

            {/* ADD */}
            <button onClick={() => handleAdd(item)}>
              Add to Cart
            </button>
          </div>
        );
      })}

      <h3>Total: ₹{categoryTotal}</h3>

      {message && <p>{message}</p>}
    </div>
  );
}