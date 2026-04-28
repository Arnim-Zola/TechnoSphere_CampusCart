import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Receipt from "./pages/Receipt";

// Temporary test button to add dummy items to cart
const Home = ({ setCartItems }) => {
  const navigate = useNavigate();

  const loadTestItems = () => {
    setCartItems([
      {
        productId: "abc123",
        name: "Blue Pen",
        price: 10,
        quantity: 1,
        image: "",
      },
      {
        productId: "xyz456",
        name: "A4 Paper (100 sheets)",
        price: 50,
        quantity: 2,
        image: "",
      },
    ]);
    navigate("/cart");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>CampusCart Test</h2>
      <button onClick={loadTestItems}>
        Add Test Items & Go to Cart
      </button>
    </div>
  );
};

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setCartItems={setCartItems} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/receipt" element={<Receipt />} />
      </Routes>
    </Router>
  );
}

export default App;