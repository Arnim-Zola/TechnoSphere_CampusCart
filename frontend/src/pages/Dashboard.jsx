import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>CampusCart Dashboard</h1>

      <button onClick={() => navigate("/category/writing")}>
        Writing Essentials
      </button>

      <button onClick={() => navigate("/category/correction")}>
        Correction & Marking
      </button>
    </div>
  );
};

export default Dashboard;