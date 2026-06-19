import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types";
import { getCurrentUser, setCurrentUser, clearCurrentUser, ROLE_DASHBOARD_PATHS } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  login: (user: User, remember?: boolean, redirectTo?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (updatedFields: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getCurrentUser());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate secure verification validation delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const login = useCallback((userData: User, remember = false, redirectTo?: string) => {
    setUser(userData);
    setCurrentUser(userData);
    if (remember) {
      localStorage.setItem("campuslink_remember", "true");
    }
    navigate(redirectTo || ROLE_DASHBOARD_PATHS[userData.role], { replace: true });
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    clearCurrentUser();
    localStorage.removeItem("campuslink_remember");
    navigate("/login", { replace: true });
  }, [navigate]);

  const updateUser = useCallback((updatedFields: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updatedFields };
      setCurrentUser(updated);
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

