import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (category) => {
    console.log("Navigating to:", category); // ✅ debug
    navigate(`/category/${category}`);
  };

  return (
    <div>
      <h1>CampusCart Dashboard</h1>

      <button onClick={() => handleNavigation("writing")}>
        Writing Essentials
      </button>

      <button onClick={() => handleNavigation("correction")}>
        Correction & Marking
      </button>
    </div>
  );
};

export default Dashboard;