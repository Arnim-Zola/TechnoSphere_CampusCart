import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState({});

  // 🔹 Dummy data (used if backend fails or empty)
  const dummyData = [
    {
      _id: "1",
      name: "Sample Item 1",
      price: 20,
      image: "https://via.placeholder.com/100",
      description: "Demo product"
    },
    {
      _id: "2",
      name: "Sample Item 2",
      price: 30,
      image: "https://via.placeholder.com/100",
      description: "Demo product"
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:5000/api/products?category=${category}`);
      const data = await res.json();

      // ✅ Use backend if available, else fallback
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(dummyData);
      }

    } catch (error) {
      console.error("Backend not available, using dummy data");

      // ✅ Fallback if API fails
      setProducts(dummyData);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{category.toUpperCase()} Products</h2>

      {loading && <p>Loading...</p>}

      <div>
        {products.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px"
            }}
          >
            <img src={item.image} alt={item.name} width="100" />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <p>{item.description}</p>

            {/* BRAND */}
            <select
              value={selection[item._id]?.brand || ""}
              onChange={(e) =>
                setSelection({
                  ...selection,
                  [item._id]: {
                    ...selection[item._id],
                    brand: e.target.value
                  }
                })
              }
            >
              <option value="">Select Brand</option>
              <option value="Generic">Generic</option>
              <option value="Classmate">Classmate</option>
              <option value="Camlin">Camlin</option>
            </select>

            {/* COLOR */}
            <select
              value={selection[item._id]?.color || ""}
              onChange={(e) =>
                setSelection({
                  ...selection,
                  [item._id]: {
                    ...selection[item._id],
                    color: e.target.value
                  }
                })
              }
            >
              <option value="">Select Color</option>
              <option value="blue">Blue</option>
              <option value="black">Black</option>
              <option value="red">Red</option>
            </select>

            {/* QUANTITY */}
            <select
              value={selection[item._id]?.quantity || 1}
              onChange={(e) =>
                setSelection({
                  ...selection,
                  [item._id]: {
                    ...selection[item._id],
                    quantity: e.target.value
                  }
                })
              }
            >
              {[1, 2, 3, 4, 5].map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>

            {/* DEBUG BUTTON */}
            <button
              onClick={() => console.log("Selected:", selection[item._id])}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                cursor: "pointer"
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;