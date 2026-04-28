import { useNavigate } from "react-router-dom";

export default function Stationery() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>CampusCart</h2>

      <div style={{ marginTop: "30px" }}>
        
        {/* Writing */}
        <button
          onClick={() => navigate("/category/writing")}
          style={{ margin: "10px", padding: "15px 30px" }}
        >
          Writing Essentials
        </button>

        {/* Correction */}
        <button
          onClick={() => navigate("/category/correction")}
          style={{ margin: "10px", padding: "15px 30px" }}
        >
          Corrections
        </button>

        {/* 🔥 Report / Print */}
        <button
          onClick={() => navigate("/report")}
          style={{ margin: "10px", padding: "15px 30px" }}
        >
          Report / Print
        </button>

        <button onClick={() => navigate("/category/paper")}>Paper</button>
<button onClick={() => navigate("/category/measuring")}>Measuring</button>
<button onClick={() => navigate("/category/office")}>Office</button>

      </div>
    </div>
  );
}