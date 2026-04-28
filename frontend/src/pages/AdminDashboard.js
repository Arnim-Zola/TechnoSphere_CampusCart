import React, { useEffect, useState } from "react";
import axios from "axios";

function getStatusClass(status) {
  if (!status) return "pending";
  const s = status.toLowerCase();
  if (s === "ready") return "ready";
  if (s === "printing") return "printing";
  return "pending";
}

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error loading orders", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${id}/status`, { status });
      fetchOrders();

      const localOrders = JSON.parse(localStorage.getItem("odysseyOrders")) || [];
      const updated = localOrders.map((o) =>
        o.orderId === id || o._id === id ? { ...o, status: status.toUpperCase() } : o
      );
      localStorage.setItem("odysseyOrders", JSON.stringify(updated));
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="ad-root">
      <header className="ad-topbar">
        <div className="ad-topbar-brand">
          <div className="ad-topbar-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <span className="ad-topbar-title">Odyssey</span>
          <span className="ad-topbar-badge">Admin</span>
        </div>

        <button
          className="ad-logout-btn"
          onClick={() => {
            sessionStorage.clear();
            window.location.replace("/");
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </header>

      <div className="ad-body">
        <div className="ad-orders-col">
          <div className="ad-col-header">
            <span className="ad-col-title">Orders</span>
            <span className="ad-order-count">{orders.length} total</span>
          </div>

          {orders.length === 0 && <p className="ad-empty">No orders yet.</p>}

          {orders.map((order) => {
            const studentName = order.user || order.username || order.studentName || "sahil";
            const hasPrinting =
              order.documents?.length > 0 ||
              order.stationeryItems?.some((item) => item.name.toLowerCase().includes("print"));
            const statusClass = getStatusClass(order.status);

            return (
              <div key={order._id} className="ad-order-card">
                <div className="ad-order-head">
                  <span className="ad-order-id">
                    <span>#</span>
                    {order._id}
                  </span>
                  <span
                    style={{
                      fontWeight: "bold",
                      color:
                        order.status === "READY" || order.status === "ready"
                          ? "green"
                          : order.status === "PRINTING" || order.status === "printing"
                          ? "#1976d2"
                          : "#ff9800",
                    }}
                  >
                    <span className={`ad-status-badge ${statusClass}`}>
                      <span className="ad-status-dot" />
                      {order.status || "PENDING"}
                    </span>
                  </span>
                </div>

                {order.stationeryItems?.length > 0 && (
                  <div className="ad-order-items">
                    {order.stationeryItems.map((item, i) => (
                      <div key={i} className="ad-order-item-row">
                        <span className="ad-item-name">{item.name}</span>
                        <span className="ad-item-qty">× {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="ad-order-actions">
                  {hasPrinting && (
                    <button
                      className="ad-action-btn printing"
                      onClick={() => updateStatus(order._id, "printing")}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 6 2 18 2 18 9" />
                        <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                        <rect x="6" y="14" width="12" height="8" />
                      </svg>
                      Printing
                    </button>
                  )}

                  <button
                    className="ad-action-btn ready"
                    onClick={() => updateStatus(order._id, "ready")}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Ready
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
