import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // ✅ ADD THIS

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <CartProvider>   {/* ✅ WRAP HERE */}
      <App />
    </CartProvider>
  </BrowserRouter>
);