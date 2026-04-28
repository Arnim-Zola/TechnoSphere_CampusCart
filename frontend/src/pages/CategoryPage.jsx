import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const BASE_URL = "http://localhost:5000/api";

const CategoryPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${BASE_URL}/products?category=${type}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, [type]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{type.toUpperCase()} PRODUCTS</h2>

      {products.map((product, index) => (
        <ProductCard key={index} product={product} addToCart={addToCart} navigate={navigate} />
      ))}
    </div>
  );
};

// 🔥 Reusable Product Card (inspired from Odyssey)
const ProductCard = ({ product, addToCart, navigate }) => {
  const [qty, setQty] = useState(1);

  return (
    <div style={{
      border: "1px solid #ccc",
      margin: "15px 0",
      padding: "15px",
      borderRadius: "10px"
    }}>
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      {/* 🔥 Quantity Stepper (from Odyssey idea) */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
        <span style={{ margin: "0 10px" }}>{qty}</span>
        <button onClick={() => setQty(qty + 1)}>+</button>
      </div>

      {/* 🔥 Add to Cart */}
      <button
        onClick={() => {
          addToCart({ ...product, quantity: qty });
          navigate("/cart");
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CategoryPage;