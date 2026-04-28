import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import CartProvider from "./context/CartContext";

function App() {
  return (
    <CartProvider>   {/* ✅ THIS IS CRITICAL */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/category/:type" element={<CategoryPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;