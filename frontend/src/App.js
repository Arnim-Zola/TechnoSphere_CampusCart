import { Routes, Route } from "react-router-dom";
import Stationery from "./pages/Stationery";
import StationeryPage from "./pages/StationeryPage";
import Print from "./pages/Print";
import Cart from "./pages/Cart";import Checkout from "./pages/Checkout";
import Receipt from "./pages/Receipt";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Stationery />} />
      <Route path="/category/:type" element={<StationeryPage />} />
      <Route path="/report" element={<Print />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
<Route path="/receipt" element={<Receipt />} />
    </Routes>
  );
}

export default App;