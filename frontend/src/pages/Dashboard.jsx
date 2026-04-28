import React from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../constants";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Categories</h1>

      <button onClick={() => navigate(`/category/${CATEGORIES.PAPER}`)}>
        Paper Products
      </button>

      <button onClick={() => navigate(`/category/${CATEGORIES.MEASURING}`)}>
        Measuring & Drawing
      </button>

      <button onClick={() => navigate(`/category/${CATEGORIES.UTILITY}`)}>
        Office & Utility
      </button>
    </div>
  );
};

export default Dashboard;