import React, { useEffect, useState } from "react";

const Admin = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: ""
  });

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        inStock: true
      })
    });

    alert("Product Added!");
    fetchProducts();
  };

  const toggleStock = async (id, currentStatus) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inStock: !currentStatus
      })
    });

    fetchProducts();
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <h2>Add Product</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="image" placeholder="Image URL" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />

      <button onClick={handleSubmit}>Add Product</button>

      <h2>All Products</h2>

      {products.map((item) => (
        <div key={item._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
          <p>{item.category}</p>

          <p>
            Status:{" "}
            <b style={{ color: item.inStock ? "green" : "red" }}>
              {item.inStock ? "In Stock" : "Out of Stock"}
            </b>
          </p>

          <button onClick={() => toggleStock(item._id, item.inStock)}>
            Toggle Stock
          </button>
        </div>
      ))}
    </div>
  );
};

export default Admin;