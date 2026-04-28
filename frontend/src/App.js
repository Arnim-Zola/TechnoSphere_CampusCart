import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart"; // ✅ added
import CartProvider from "./context/CartContext";

function App() {
  return (
    <CartProvider> {/* ✅ CRITICAL */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/category/:type" element={<CategoryPage />} />
          <Route path="/cart" element={<Cart />} /> {/* ✅ added */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;