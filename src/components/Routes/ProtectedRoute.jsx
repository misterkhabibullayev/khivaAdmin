import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../../utils/auth";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("admin_token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("admin_token");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
