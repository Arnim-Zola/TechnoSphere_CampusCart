import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg w-96 border border-white/20">
        
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <input
          placeholder="Name"
          className="w-full p-3 mb-4 rounded bg-transparent border border-gray-500 focus:outline-none focus:border-green-400"
          onChange={(e) => setName(e.target.value)}
        />

        <input
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
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-green-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;