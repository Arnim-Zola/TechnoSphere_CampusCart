import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const Intro = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);

  return (
    <div
      className={clsx(
        "min-h-screen transition-all duration-500",
        dark ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      {/* NAVBAR */}
      <div className="flex justify-between items-center px-8 py-4">
        
        <div className="flex gap-3 items-center">
          <button
            className="border px-4 py-1 rounded"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="border px-4 py-1 rounded"
            onClick={() => navigate("/register")}
          >
            Sign up
          </button>

          {/* 🌗 Toggle */}
         
        </div>
      </div>

      {/* HERO */}
      <div className="text-center mt-24 px-4">
        <p className="inline-block bg-green-900 text-green-300 px-4 py-1 rounded-full mb-4">
          Campus ordering, simplified
        </p>

        <h1 className="text-5xl font-bold">
          Campus<span className="text-green-400">Cart</span>
        </h1>

        <p className="mt-4 text-gray-400">
          Pre-order stationery & print services — skip the queue
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            className="border px-6 py-2 rounded"
            onClick={() => navigate("/login")}
          >
            Get started
          </button>

          <button
            className="border px-6 py-2 rounded"
            onClick={() => navigate("/register")}
          >
            Create account
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
        <div className="border rounded-lg p-6 text-center">
          <h3 className="font-bold">Print services</h3>
          <p className="text-gray-400">
            Upload PDFs, collect on time
          </p>
        </div>

        <div className="border rounded-lg p-6 text-center">
          <h3 className="font-bold">Stationery orders</h3>
          <p className="text-gray-400">
            Pre-order, no waiting in line
          </p>
        </div>

        <div className="border rounded-lg p-6 text-center">
          <h3 className="font-bold">Fast checkout</h3>
          <p className="text-gray-400">
            Order in under a minute
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;