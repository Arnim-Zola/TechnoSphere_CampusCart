import { Routes, Route } from "react-router-dom";
import Print from "./pages/Print";
import Stationery from "./pages/Stationery"; // Dashboard
import StationeryPage from "./pages/StationeryPage";
import Cart from "./pages/Cart";

function App() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Stationery />} />

      {/* Category Page */}
      <Route path="/category/:type" element={<StationeryPage />} />

      {/* 🔥 Print / Report */}
      <Route path="/report" element={<Print />} />

      {/* Cart */}
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;