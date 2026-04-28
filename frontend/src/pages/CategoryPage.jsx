import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ✅ FIXED

const BASE_URL = "http://localhost:5000/api";

const CategoryPage = () => {
  const { type } = useParams();

  const { addToCart, cartItems } = useCart(); // ✅ FIXED

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!type) return;
    fetchProducts();
  }, [type]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = `${BASE_URL}/products?category=${type}`;
      console.log("Fetching:", url);

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // 🔥 DEBUG
  console.log("Cart:", cartItems);

  return (
    <div>
      <h2>{type ? type.toUpperCase() : "Loading..."}</h2>

      {loading && <p>Loading...</p>}

      {!loading && products.length === 0 && (
        <p>No products found</p>
      )}

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px",
            width: "200px"
          }}
        >
          <img
            src={product.image}
            width="100"
            alt={product.name}
          />
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>

          <button onClick={() => {
  console.log("CLICKED");   // 🔥 debug
  addToCart(product);
}}>
  Add to Cart
</button>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;