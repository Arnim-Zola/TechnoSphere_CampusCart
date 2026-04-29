import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import IntroPage from "./pages/IntroPage";

import Dashboard from "./pages/Dashboard";
import StationeryPage from "./pages/StationeryPage";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import ReceiptPage from "./pages/ReceiptPage";
import PrintPage from "./pages/Print";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* 🔐 AUTH FLOW */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/intro" element={<IntroPage />} />

      {/* 🛍️ MAIN APP (STUDENT) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRole="student">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/category/:type"
        element={
          <ProtectedRoute allowedRole="student">
            <StationeryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRole="student">
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={<Navigate to="/payment" replace />}
      />

      {/* 💳 PAYMENT FLOW */}
      <Route
        path="/payment"
        element={
          <ProtectedRoute allowedRole="student">
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/receipt"
        element={
          <ProtectedRoute allowedRole="student">
            <ReceiptPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/print"
        element={
          <ProtectedRoute allowedRole="student">
            <PrintPage />
          </ProtectedRoute>
        }
      />

      {/* 🧑‍💼 ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ❌ FALLBACK */}
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
}

export default App;