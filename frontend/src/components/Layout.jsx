import React, { useState } from "react";

const Layout = ({ children }) => {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "bg-black text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      
      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4">
        <h1 className="text-xl font-bold text-green-400">CampusCart</h1>

        
      </div>

      {/* Page Content */}
      <div>{children}</div>
    </div>
  );
};

export default Layout;