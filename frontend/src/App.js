import { Routes, Route } from "react-router-dom";
import Stationery from "./pages/Stationery";
import StationeryPage from "./pages/StationeryPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Receipt from "./pages/Receipt";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Stationery />} />
      <Route path="/category/:type" element={<StationeryPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/payment" element={<Checkout />} />
      <Route path="/receipt" element={<Receipt />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;