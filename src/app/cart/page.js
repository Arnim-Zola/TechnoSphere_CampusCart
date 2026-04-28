"use client";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Trash2, ArrowRight, ShoppingBag, Plus, Minus, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const handleCheckout = async () => {
    if (!user) {
      router.push("/");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate fake processing time
      await new Promise(resolve => setTimeout(resolve, 1500));

      const fakeOrderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Save order to Firestore
      const orderData = {
        userId: user.uid,
        userEmail: user.email,
        items: cartItems,
        totalAmount: cartTotal,
        status: "Order Received", // New status field for admin tracking
        orderId: fakeOrderId,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, "orders"), orderData);

      setOrderSuccess(fakeOrderId);
      clearCart();
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Order Successful!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">
          Your order has been placed successfully and is now marked as "Order Received".
        </p>
        <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 mb-8 text-center w-full max-w-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-1">Order ID</p>
          <p className="text-xl font-mono font-bold text-gray-900 dark:text-white">{orderSuccess}</p>
        </div>
        <Link 
          href="/dashboard"
          className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all active:scale-[0.98]"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-gray-400 dark:text-gray-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Your cart is empty</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">
          Looks like you haven't added any premium stationery to your cart yet. Let's fix that!
        </p>
        <Link 
          href="/dashboard"
          className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all active:scale-[0.98]"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-10">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-grow space-y-6">
          {cartItems.map((item) => (
            <div key={`${item.id}-${JSON.stringify(item.selectedOptions || {})}`} className="flex flex-col sm:flex-row items-start sm:items-center p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm transition-colors relative">
              <div className="flex-grow mt-4 sm:mt-0 sm:pr-6">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                  <span className="text-lg font-black text-gray-900 dark:text-white ml-4">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{item.category}</p>
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedOptions)}
                      className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedOptions)}
                      className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedOptions)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center text-sm font-medium transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Trash2 size={16} className="mr-1.5" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-96 flex-shrink-0">
          <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900 dark:text-white">₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-green-600 dark:text-green-400">Free</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-zinc-700 pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  ₹{cartTotal.toFixed(2)}
                </span>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className={`w-full flex items-center justify-center py-4 px-4 rounded-xl text-white font-bold transition-all shadow-md active:scale-[0.98] ${
                isProcessing ? 'bg-blue-800 opacity-80 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  Confirm Order
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
            {!user && (
              <p className="text-xs text-center text-gray-500 mt-4">You will be redirected to login first.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
