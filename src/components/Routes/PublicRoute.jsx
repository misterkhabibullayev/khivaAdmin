import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../../utils/auth";

export const PublicRoute = () => {
  const token = localStorage.getItem("admin_token");

  if (token && !isTokenExpired(token)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;