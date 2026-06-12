import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { UserRole } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  role: UserRole;
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
