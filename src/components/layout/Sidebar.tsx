import { useRef, useEffect } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { LogOut, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  badge?: string | number;
}

interface SidebarProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  roleName: string;
  roleColor: string;
}

export default function Sidebar({ navItems, isOpen, onClose, roleName, roleColor }: SidebarProps) {
  const { logout, user } = useAuth();
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar — fixed on mobile, relative/shrinkable on desktop */}
      <aside
        className={cn(
          "h-full bg-sidebar flex flex-col z-50 transition-all duration-300 ease-in-out fixed left-0 top-0 lg:static lg:flex-shrink-0",
          isOpen
            ? "w-64 translate-x-0 shadow-2xl lg:shadow-none"
            : "w-64 -translate-x-full lg:w-0 lg:translate-x-0 lg:overflow-hidden lg:pointer-events-none"
        )}
      >
        <div className="w-64 h-full flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-sidebar-border flex-shrink-0">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-lg flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M12 3L3 8v6c0 5.25 4 10 9 11 5-1 9-5.75 9-11V8L12 3z" fill="white" opacity="0.9" />
                <path d="M9 12l2 2 4-4" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-white text-[15px] font-display leading-tight">CampusLink</p>
              <p className="text-[10px] text-sidebar-foreground/50 leading-tight">{roleName}</p>
            </div>
          </Link>
        </div>

        {/* User info */}
        <div className="px-4 py-3 border-b border-sidebar-border flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 overflow-hidden", roleColor)}>
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.name.charAt(0)
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate leading-snug">{user?.name.split(" ").slice(0, 2).join(" ")}</p>
              <p className="text-[11px] text-sidebar-foreground/50 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Precise active matching: exact for dashboards, startsWith for others
            const isDashboard = item.path.endsWith("/dashboard");
            const isActive = isDashboard
              ? location.pathname === item.path
              : location.pathname === item.path || location.pathname.startsWith(item.path + "/");

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer select-none group",
                  isActive
                    ? "bg-sidebar-accent text-white"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white"
                )}
              >
                <Icon
                  size={17}
                  className={cn(
                    "flex-shrink-0 transition-colors",
                    isActive ? "text-white" : "text-sidebar-foreground/60 group-hover:text-white"
                  )}
                />
                <span className="flex-1 text-[13px]">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full font-bold leading-none">
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight size={13} className="text-white/50 flex-shrink-0" />}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-2.5 border-t border-sidebar-border flex-shrink-0">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-all duration-150"
          >
            <LogOut size={17} className="flex-shrink-0" />
            <span className="text-[13px]">Logout</span>
          </button>
        </div>
        </div>
      </aside>
    </>
  );
}
