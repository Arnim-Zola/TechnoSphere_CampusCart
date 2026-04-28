import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />  {/* ADD THIS */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;