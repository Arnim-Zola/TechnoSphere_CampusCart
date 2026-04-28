import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/category/:type" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;