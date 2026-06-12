import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, Sun, Moon, Menu, X, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { MOCK_NOTIFICATIONS } from "@/constants/mockData";
import { ROLE_LABELS } from "@/lib/auth";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onMenuToggle: () => void;
  sidebarOpen: boolean;
  title?: string;
}

export default function Navbar({ onMenuToggle, sidebarOpen, title }: NavbarProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  const roleColors: Record<string, string> = {
    admin: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
    teacher: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
    student: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    parent: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    librarian: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 gap-4 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {title && (
          <span className="hidden sm:block text-sm font-medium text-muted-foreground">{title}</span>
        )}
      </div>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-sm">
        <div className="relative w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search students, courses..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-muted rounded-lg border border-transparent focus:border-ring focus:outline-none focus:bg-background transition-all placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
            )}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-modal z-50 overflow-hidden"
              >
                <div className="p-3 border-b border-border flex items-center justify-between">
                  <span className="font-semibold text-sm">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-xs text-primary font-medium">{unreadCount} new</span>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {MOCK_NOTIFICATIONS.map(notif => (
                    <div key={notif.id} className={cn("p-3 border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors", !notif.read && "bg-primary/5")}>
                      <div className="flex gap-2">
                        <div className={cn("w-2 h-2 mt-1.5 rounded-full flex-shrink-0", {
                          "bg-blue-500": notif.type === "info",
                          "bg-emerald-500": notif.type === "success",
                          "bg-amber-500": notif.type === "warning",
                          "bg-rose-500": notif.type === "error",
                        })} />
                        <div>
                          <p className="text-xs font-medium text-foreground">{notif.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{notif.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center">
                  <button className="text-xs text-primary font-medium hover:underline" onClick={() => setNotifOpen(false)}>View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white font-semibold text-sm">
              {user?.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-foreground leading-none mb-0.5">{user?.name.split(" ").slice(0, 2).join(" ")}</p>
              <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium", roleColors[user?.role ?? "admin"])}>
                {ROLE_LABELS[user?.role ?? "admin"]}
              </span>
            </div>
            <ChevronDown size={14} className="text-muted-foreground hidden sm:block" />
          </button>
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-52 bg-card border border-border rounded-xl shadow-modal z-50 overflow-hidden"
              >
                <div className="p-3 border-b border-border">
                  <p className="font-semibold text-sm text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
                </div>
                <div className="p-1.5">
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <User size={15} className="text-muted-foreground" /> Profile
                  </button>
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <Settings size={15} className="text-muted-foreground" /> Settings
                  </button>
                  <button
                    onClick={() => { setProfileOpen(false); logout(); }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors mt-0.5"
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
