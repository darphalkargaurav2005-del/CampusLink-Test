import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types";
import { getCurrentUser, setCurrentUser, clearCurrentUser, ROLE_DASHBOARD_PATHS } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  login: (user: User, remember?: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (updatedFields: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getCurrentUser());
  const navigate = useNavigate();

  const login = useCallback((userData: User, remember = false) => {
    setUser(userData);
    setCurrentUser(userData);
    if (remember) {
      localStorage.setItem("campuslink_remember", "true");
    }
    navigate(ROLE_DASHBOARD_PATHS[userData.role], { replace: true });
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
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
