import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
let role = sessionStorage.getItem("role");

if (!role) {
role = "admin";
sessionStorage.setItem("role", "admin");
}

if (allowedRole && role !== allowedRole) {
return <Navigate to="/" replace />;
}

return children;
}
