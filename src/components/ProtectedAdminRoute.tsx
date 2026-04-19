import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAdminSession } from "@/lib/admin-auth";

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const location = useLocation();
  const session = getAdminSession();

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedAdminRoute;
