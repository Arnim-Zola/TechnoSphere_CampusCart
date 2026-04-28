"use client";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PackageSearch, PlusCircle, CheckCircle2, XCircle, Loader2, ClipboardList } from "lucide-react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, doc, updateDoc } from "firebase/firestore";

const CATEGORIES = [
  "Writing Essentials",
  "Correction & Marking",
  "Paper Products",
  "Measuring Tools",
  "Office Utility"
];

export default function AdminPage() {
  const { user, role, loading } = useAuth();
  const { products, addProduct, toggleStock, loadingProducts } = useProducts();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("inventory"); // 'inventory' or 'orders'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    category: CATEGORIES[0],
    price: "",
    description: "",
    image: "",
    inStock: true
  });

  useEffect(() => {
    if (!loading) {
      if (!user || role !== "admin") {
        router.push("/");
      } else if (activeTab === "orders") {
        fetchOrders();
      }
    }
  }, [user, role, loading, router, activeTab]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const toggleOrderStatus = async (orderId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Order Received" ? "Order Completed" : "Order Received";
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Failed to update status");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      addProduct({
        ...formData,
        price: parseFloat(formData.price)
      });
      
      setFormData({
        name: "",
        category: CATEGORIES[0],
        price: "",
        description: "",
        image: "",
        inStock: true
      });
      setIsSubmitting(false);
      alert("Product added successfully!");
    }, 500);
  };

  if (loading || role !== "admin") return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <PackageSearch className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Admin Dashboard</h1>
        </div>
        
        <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
              activeTab === "inventory" 
                ? "bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm" 
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              activeTab === "orders" 
                ? "bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm" 
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            Orders
          </button>
        </div>
      </div>

      {activeTab === "inventory" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Product Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 p-6 sticky top-24 transition-colors">
              <div className="flex items-center gap-2 mb-6">
                <PlusCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Product</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    min="0"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    name="description"
                    required
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    required
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="inStock"
                    id="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded"
                  />
                  <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    In Stock
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Product"}
                </button>
              </form>
            </div>
          </div>

          {/* Product Inventory List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden transition-colors">
              <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/50">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Inventory Management</h2>
              </div>
              
              {loadingProducts ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : products.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  No products found. Add some using the form!
                </div>
              ) : (
                <ul className="divide-y divide-gray-100 dark:divide-zinc-800 max-h-[800px] overflow-y-auto">
                  {products.map((product) => (
                    <li key={product.id} className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0 py-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{product.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{product.category}</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">₹{parseFloat(product.price).toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleStock(product.id, product.inStock)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                          product.inStock 
                            ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/50" 
                            : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/50"
                        }`}
                      >
                        {product.inStock ? (
                          <><CheckCircle2 size={14} /> In Stock</>
                        ) : (
                          <><XCircle size={14} /> Out of Stock</>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Orders Tab */
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden transition-colors">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/50 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Customer Orders</h2>
          </div>
          
          {loadingOrders ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : orders.length === 0 ? (
            <div className="p-16 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
              <ClipboardList className="w-16 h-16 text-gray-300 dark:text-zinc-700 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No orders yet</h3>
              <p>When customers check out, their orders will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-zinc-800/30 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-zinc-800">
                    <th className="px-6 py-4 font-medium">Order ID</th>
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">Items</th>
                    <th className="px-6 py-4 font-medium">Total</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                  {orders.map((order) => (
                    <tr key={order.id} className={`transition-colors ${order.status === "Order Completed" ? "bg-green-50/50 dark:bg-green-900/10 hover:bg-green-100/50 dark:hover:bg-green-900/20" : "hover:bg-gray-50/50 dark:hover:bg-zinc-800/30"}`}>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
                          {order.orderId}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {order.userEmail}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 max-w-xs">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              <span className="font-semibold">{item.quantity}x</span> {item.name}
                              {item.isCustomPrint && item.details && (
                                <span className="text-gray-400 dark:text-gray-500"> ({item.details.pages} pgs, {item.details.color})</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                        ₹{parseFloat(order.totalAmount || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          order.status === "Order Completed" 
                            ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                            : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {order.createdAt ? new Date(order.createdAt.seconds ? order.createdAt.seconds * 1000 : order.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => toggleOrderStatus(order.id, order.status)}
                          className={`text-sm font-semibold transition-colors ${
                            order.status === "Order Completed" 
                              ? "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                              : "text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                          }`}
                        >
                          {order.status === "Order Completed" ? "Revert" : "Mark Completed"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
