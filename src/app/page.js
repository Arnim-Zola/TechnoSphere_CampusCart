"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ShoppingBag, Loader2, UserCog } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdminPortal, setIsAdminPortal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, role, loading } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, role, loading, router]);

  // Pre-fill credentials if switching to Admin portal
  useEffect(() => {
    if (isAdminPortal) {
      setEmail("admin123@gmail.com");
      setPassword("admin123");
      setIsLogin(true); // admins can't sign up from here
    } else {
      setEmail("");
      setPassword("");
    }
  }, [isAdminPortal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (isLogin && email === "admin123@gmail.com" && password === "admin123") {
      // Hardcode admin bypass
      localStorage.setItem("techfusion_hardcoded_admin", "true");
      // Give context a moment to catch the localstorage change before redirecting
      setTimeout(() => {
        window.location.href = "/admin"; // Force reload to re-run context initialization
      }, 500);
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;
        
        // Save user role in Firestore
        await setDoc(doc(db, "users", newUser.uid), {
          uid: newUser.uid,
          email: newUser.email,
          role: "user", // default role
          createdAt: new Date().toISOString()
        });
      }
    } catch (err) {
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-100 to-transparent dark:from-blue-900/20 opacity-50 pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-lg mb-4 transform hover:scale-105 transition-transform">
            <ShoppingBag size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Techfusion</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Premium Stationery E-Commerce</p>
        </div>

        <div className={`bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border transition-colors duration-300 ${isAdminPortal ? 'border-indigo-200 dark:border-indigo-500/30' : 'border-gray-100 dark:border-zinc-800'}`}>
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                {isAdminPortal ? "Admin Portal" : (isLogin ? "Welcome back" : "Create an account")}
              </h2>
              <button 
                onClick={() => setIsAdminPortal(!isAdminPortal)}
                className={`p-2 rounded-lg transition-colors ${isAdminPortal ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'}`}
                title="Toggle Admin Login"
              >
                <UserCog size={20} />
              </button>
            </div>
            
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 dark:bg-red-900/20 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={isAdminPortal}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none ${isAdminPortal ? 'opacity-70 cursor-not-allowed' : ''}`}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  readOnly={isAdminPortal}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none ${isAdminPortal ? 'opacity-70 cursor-not-allowed' : ''}`}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3.5 px-4 rounded-xl text-white font-bold tracking-wide shadow-md transition-all active:scale-[0.98] ${
                  isAdminPortal 
                    ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 dark:shadow-none' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 dark:shadow-none'
                } ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  isAdminPortal ? "Login to Dashboard" : (isLogin ? "Sign In" : "Sign Up")
                )}
              </button>
            </form>
          </div>
          
          {!isAdminPortal && (
            <div className="px-8 py-5 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-800 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
