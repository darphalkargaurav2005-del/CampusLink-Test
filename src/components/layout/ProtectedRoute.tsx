import { Navigate, useLocation } from "react-router-dom";
import { useEffect, type ReactNode } from "react";
import { Shield } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { hasPermission, type FeatureKey } from "@/lib/permissions";
import { ROLE_DASHBOARD_PATHS } from "@/lib/auth";
import type { UserRole } from "@/types";

/**
 * Premium Loading Spinner for verifying auth/roles
 */
export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="relative flex items-center justify-center">
        {/* Outer Glow Ring */}
        <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        {/* Inner Logo Icon */}
        <div className="absolute w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white">
          <Shield size={16} />
        </div>
      </div>
      <p className="text-sm font-semibold text-muted-foreground mt-4 animate-pulse">
        Verifying secure connection...
      </p>
    </div>
  );
}

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Ensures a user is logged in. Redirects to /login and saves the target path.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      if (location.pathname.includes("attendance")) {
        toast.error("Please login to continue.");
      } else {
        toast.error("Please login to access this feature.");
      }
    }
  }, [isAuthenticated, loading, location.pathname]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}

interface RoleProtectedRouteProps {
  children: ReactNode;
  feature?: FeatureKey;
  allowedRoles?: UserRole[];
}

/**
 * Checks authentication and restricts access based on allowedRoles or specific feature permissions.
 */
export function RoleProtectedRoute({ children, feature, allowedRoles }: RoleProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  const isAuthorized = (() => {
    if (!isAuthenticated || !user) return false;
    if (allowedRoles && !allowedRoles.includes(user.role)) return false;
    if (feature && !hasPermission(user.role, feature)) return false;
    return true;
  })();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      if (location.pathname.includes("attendance")) {
        toast.error("Please login to continue.");
      } else {
        toast.error("Please login to access this feature.");
      }
    } else if (!loading && isAuthenticated && !isAuthorized) {
      toast.error("You do not have permission to access this page.");
    }
  }, [isAuthenticated, loading, isAuthorized, location.pathname]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!isAuthorized && user) {
    return <Navigate to={ROLE_DASHBOARD_PATHS[user.role]} replace />;
  }

  return <>{children}</>;
}
