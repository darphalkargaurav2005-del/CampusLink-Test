import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Bell, Search, Sun, Moon, Menu, X, ChevronDown, LogOut, User, Settings,
  LayoutDashboard, Users, GraduationCap, UserCog, UserCheck, BookOpen, BookCopy,
  ClipboardList, Wallet, CalendarCheck, Calendar, BarChart3, Bot, MessageSquare,
  ClipboardEdit, FileText, FileCheck, CalendarDays, TrendingUp, Tag, BookPlus,
  BookCheck, DollarSign, Inbox, Phone, Activity
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ROLE_LABELS } from "@/lib/auth";

const ROLE_NOTIFICATIONS: Record<string, Array<{ id: string; title: string; message: string; type: "info" | "success" | "warning" | "error"; timestamp: string; read: boolean }>> = {
  admin: [
    { id: "a_notif1", title: "Admissions Review Pending", message: "Review Q3 admission growth and approve 12 pending student profiles.", type: "warning", timestamp: "2024-02-28T10:30:00Z", read: false },
    { id: "a_notif2", title: "Staff Report Submitted", message: "Dr. Anand Kumar submitted the monthly department attendance sheet.", type: "success", timestamp: "2024-02-27T09:00:00Z", read: false },
    { id: "a_notif3", title: "System Health Alert", message: "All ERP channels running smoothly. Auto-backup completed.", type: "info", timestamp: "2024-02-26T14:20:00Z", read: true },
  ],
  teacher: [
    { id: "t_notif1", title: "Mid-Term Exam Schedule", message: "Mid-semester examination timetable has been published.", type: "info", timestamp: "2024-02-28T10:30:00Z", read: false },
    { id: "t_notif2", title: "Attendance Sheet Due", message: "Please submit your class digital attendance data for review.", type: "warning", timestamp: "2024-02-27T09:00:00Z", read: false },
    { id: "t_notif3", title: "Marks Saved Successfully", message: "Data Structures marks saved to academic catalog database.", type: "success", timestamp: "2024-02-26T14:20:00Z", read: true },
  ],
  student: [
    { id: "s_notif1", title: "New Assignment Posted", message: "Dr. Anand Kumar posted a new assignment in Data Structures & Algorithms.", type: "info", timestamp: "2024-02-28T10:30:00Z", read: false },
    { id: "s_notif2", title: "Attendance Warning", message: "Your attendance in Engineering Physics has dropped below 75%.", type: "warning", timestamp: "2024-02-27T09:00:00Z", read: false },
    { id: "s_notif3", title: "Fee Payment Successful", message: "Your tuition fee payment of Rs. 45,000 has been received.", type: "success", timestamp: "2024-02-26T14:20:00Z", read: true },
    { id: "s_notif4", title: "Exam Timetable Released", message: "Mid-semester examination timetable has been published.", type: "info", timestamp: "2024-02-25T11:00:00Z", read: true },
  ],
  parent: [
    { id: "p_notif1", title: "Child Progress Update", message: "Aisha Sharma's grades in Data Structures have been updated to A.", type: "success", timestamp: "2024-02-28T10:30:00Z", read: false },
    { id: "p_notif2", title: "Attendance Alert", message: "Aisha's attendance has been marked present for all lectures today.", type: "info", timestamp: "2024-02-27T09:00:00Z", read: false },
    { id: "p_notif3", title: "Tuition Invoice Received", message: "Upcoming Tuition Fee for Next Term ₹45,000 generated.", type: "warning", timestamp: "2024-02-26T14:20:00Z", read: true },
  ],
  librarian: [
    { id: "l_notif1", title: "Book Return Received", message: "Clean Code was successfully returned by student Rohan Mehta.", type: "success", timestamp: "2024-02-28T10:30:00Z", read: false },
    { id: "l_notif2", title: "Book Request Pending", message: "Student Aisha Sharma requested 'The Pragmatic Programmer'.", type: "info", timestamp: "2024-02-27T09:00:00Z", read: false },
    { id: "l_notif3", title: "Overdue Alert", message: "Operating System Concepts is overdue by student Karan Singh.", type: "error", timestamp: "2024-02-26T14:20:00Z", read: true },
  ],
};
import { cn } from "@/lib/utils";

interface NavbarProps {
  onMenuToggle: () => void;
  sidebarOpen: boolean;
  title?: string;
}

const ROLE_NAV_ITEMS: Record<string, Array<{ label: string; path: string; icon: any }>> = {
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "User Management", path: "/admin/users", icon: Users },
    { label: "Student Management", path: "/admin/students", icon: GraduationCap },
    { label: "Teacher Management", path: "/admin/teachers", icon: UserCog },
    { label: "Parent Management", path: "/admin/parents", icon: UserCheck },
    { label: "Class Management", path: "/admin/classes", icon: BookOpen },
    { label: "Course Management", path: "/admin/courses", icon: BookCopy },
    { label: "Teacher Assignment", path: "/admin/teacher-assignment", icon: ClipboardList },
    { label: "Fee Management", path: "/admin/fees", icon: Wallet },
    { label: "Teacher Attendance", path: "/admin/teacher-attendance", icon: CalendarCheck },
    { label: "Teacher Schedule", path: "/admin/teacher-schedule", icon: Calendar },
    { label: "Notice Board", path: "/admin/notices", icon: Bell },
    { label: "Reports & Analytics", path: "/admin/reports", icon: BarChart3 },
    { label: "AI Assistant", path: "/admin/ai", icon: Bot },
    { label: "Chats", path: "/admin/chats", icon: MessageSquare },
    { label: "Settings", path: "/admin/settings", icon: Settings },
  ],
  teacher: [
    { label: "Dashboard", path: "/teacher/dashboard", icon: LayoutDashboard },
    { label: "Digital Attendance", path: "/teacher/attendance", icon: CalendarCheck },
    { label: "Marks Entry", path: "/teacher/marks", icon: ClipboardEdit },
    { label: "Study Material", path: "/teacher/materials", icon: FileText },
    { label: "Student Profiles", path: "/teacher/students", icon: Users },
    { label: "My Courses", path: "/teacher/courses", icon: BookOpen },
    { label: "Performance Graphs", path: "/teacher/performance", icon: BarChart3 },
    { label: "Schedule", path: "/teacher/schedule", icon: Calendar },
    { label: "Assignments", path: "/teacher/assignments", icon: FileCheck },
    { label: "AI Assistant", path: "/teacher/ai", icon: Bot },
    { label: "Chats", path: "/teacher/chats", icon: MessageSquare },
    { label: "Settings", path: "/teacher/settings", icon: Settings },
  ],
  student: [
    { label: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
    { label: "Attendance Report", path: "/student/attendance", icon: CalendarDays },
    { label: "Results", path: "/student/results", icon: ClipboardList },
    { label: "Notice Board", path: "/student/notices", icon: Bell },
    { label: "Notes", path: "/student/notes", icon: FileText },
    { label: "Courses", path: "/student/courses", icon: BookOpen },
    { label: "Assignments", path: "/student/assignments", icon: FileCheck },
    { label: "Schedule", path: "/student/schedule", icon: Calendar },
    { label: "Performance", path: "/student/performance", icon: TrendingUp },
    { label: "AI Assistant", path: "/student/ai", icon: Bot },
    { label: "Chats", path: "/student/chats", icon: MessageSquare },
    { label: "Settings", path: "/student/settings", icon: Settings },
  ],
  parent: [
    { label: "Dashboard", path: "/parent/dashboard", icon: LayoutDashboard },
    { label: "Child Attendance", path: "/parent/attendance", icon: CalendarDays },
    { label: "Academic Progress", path: "/parent/progress", icon: TrendingUp },
    { label: "Teacher Contact", path: "/parent/teachers", icon: Phone },
    { label: "Announcements", path: "/parent/announcements", icon: Bell },
    { label: "Performance Graphs", path: "/parent/performance", icon: BarChart3 },
    { label: "Growth Analysis", path: "/parent/growth", icon: Activity },
    { label: "Chats", path: "/parent/chats", icon: MessageSquare },
    { label: "AI Assistant", path: "/parent/ai", icon: Bot },
    { label: "Settings", path: "/parent/settings", icon: Settings },
  ],
  librarian: [
    { label: "Dashboard", path: "/librarian/dashboard", icon: LayoutDashboard },
    { label: "Books", path: "/librarian/books", icon: BookOpen },
    { label: "Categories", path: "/librarian/categories", icon: Tag },
    { label: "Issue Books", path: "/librarian/issue", icon: BookPlus },
    { label: "Return Books", path: "/librarian/return", icon: BookCheck },
    { label: "Students", path: "/librarian/students", icon: Users },
    { label: "Teachers", path: "/librarian/teachers", icon: UserCog },
    { label: "Fine Management", path: "/librarian/fines", icon: DollarSign },
    { label: "Book Requests", path: "/librarian/requests", icon: Inbox },
    { label: "Reports", path: "/librarian/reports", icon: BarChart3 },
    { label: "AI Assistant", path: "/librarian/ai", icon: Bot },
    { label: "Settings", path: "/librarian/settings", icon: Settings },
  ],
};

export default function Navbar({ onMenuToggle, sidebarOpen, title }: NavbarProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifications, setNotifications] = useState(() => ROLE_NOTIFICATIONS[user?.role ?? "admin"] || []);

  useEffect(() => {
    if (user) {
      setNotifications(ROLE_NOTIFICATIONS[user.role] || []);
    }
  }, [user]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleNotifClick = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDismissNotif = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roleColors: Record<string, string> = {
    admin: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
    teacher: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
    student: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    parent: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    librarian: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  };

  const currentRoleItems = ROLE_NAV_ITEMS[user?.role ?? "admin"] || [];
  const matchedItems = searchQuery
    ? currentRoleItems.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

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
      <div className="hidden md:flex flex-1 max-w-sm relative">
        <div className="relative w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
            placeholder="Search pages, settings..."
            className="w-full pl-9 pr-9 py-2 text-sm bg-muted rounded-lg border border-transparent focus:border-ring focus:outline-none focus:bg-background transition-all placeholder:text-muted-foreground/60"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <AnimatePresence>
          {searchFocused && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-modal z-50 overflow-hidden max-h-60 overflow-y-auto"
            >
              {searchQuery.trim() === "" ? (
                <div className="p-3 text-xs text-muted-foreground">
                  <p className="font-semibold mb-2">Quick Navigation</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {currentRoleItems.slice(0, 4).map(item => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setSearchQuery("")}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted text-foreground transition-colors"
                        >
                          <Icon size={14} className="text-muted-foreground" />
                          <span className="truncate text-xs font-medium">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : matchedItems.length > 0 ? (
                <div className="p-1">
                  {matchedItems.map(item => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSearchQuery("")}
                        className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                      >
                        <Icon size={15} className="text-muted-foreground" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-muted-foreground">
                  No pages matching &quot;{searchQuery}&quot;
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
        <div className="relative" ref={notifRef}>
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
                  {unreadCount > 0 ? (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-xs text-primary font-medium hover:underline transition-all"
                    >
                      Mark all as read
                    </button>
                  ) : (
                    <span className="text-xs text-muted-foreground">All caught up!</span>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notif => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotifClick(notif.id)}
                        className={cn(
                          "p-3 border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors group relative flex items-start justify-between gap-2",
                          !notif.read && "bg-primary/5"
                        )}
                      >
                        <div className="flex gap-2 min-w-0">
                          <div className={cn("w-2 h-2 mt-1.5 rounded-full flex-shrink-0", {
                            "bg-blue-500": notif.type === "info",
                            "bg-emerald-500": notif.type === "success",
                            "bg-amber-500": notif.type === "warning",
                            "bg-rose-500": notif.type === "error",
                          })} />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-foreground leading-snug">{notif.title}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5 leading-normal">{notif.message}</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => handleDismissNotif(e, notif.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-all flex-shrink-0 self-center"
                          aria-label="Dismiss notification"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-muted-foreground">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="p-2 text-center">
                  <Link
                    to={user?.role === "admin" ? "/admin/notices" : user?.role === "student" ? "/student/notices" : user?.role === "parent" ? "/parent/announcements" : `/${user?.role}/dashboard`}
                    className="text-xs text-primary font-medium hover:underline block"
                    onClick={() => setNotifOpen(false)}
                  >
                    View all notifications
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.name.charAt(0)
              )}
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
                  <Link
                    to={`/${user?.role}/settings?tab=profile`}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <User size={15} className="text-muted-foreground" /> Profile
                  </Link>
                  <Link
                    to={`/${user?.role}/settings?tab=security`}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <Settings size={15} className="text-muted-foreground" /> Settings
                  </Link>
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
