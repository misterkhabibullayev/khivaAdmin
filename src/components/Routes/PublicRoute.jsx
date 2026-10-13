import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const token = localStorage.getItem("admin_token");

  if (token) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};
