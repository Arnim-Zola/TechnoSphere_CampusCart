import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg w-96 border border-white/20">
        
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-transparent border border-gray-500 focus:outline-none focus:border-green-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-transparent border border-gray-500 focus:outline-none focus:border-green-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-500 hover:bg-green-600 py-2 rounded transition">
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            className="text-green-400 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;