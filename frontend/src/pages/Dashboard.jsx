return (
  <div>
    <h1>CampusCart Dashboard</h1>

    <button onClick={() => handleNavigation("writing")}>
      Writing Essentials
    </button>

    <button onClick={() => handleNavigation("correction")}>
      Correction & Marking
    </button>

    <button onClick={() => handleNavigation("paper")}>
      Paper Products
    </button>

    <button onClick={() => handleNavigation("measuring")}>
      Measuring Tools
    </button>

    <button onClick={() => handleNavigation("office")}>
      Office / Utility
    </button>

    <button onClick={() => navigate("/report")}>
      Report / Print
    </button>
  </div>
);