import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, GraduationCap, UserCog, UserCheck, BookOpen, BookCopy, ClipboardList, Wallet, CalendarCheck, Calendar, Bell, BarChart3, Bot, MessageSquare, Settings, History, BookCheck } from "lucide-react";
import Sidebar, { type NavItem } from "./Sidebar";
import Navbar from "./Navbar";
import Breadcrumb from "./Breadcrumb";

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "User Management", path: "/admin/users", icon: Users },
  { label: "Student Management", path: "/admin/students", icon: GraduationCap },
  { label: "Teacher Management", path: "/admin/teachers", icon: UserCog },
  { label: "Parent Management", path: "/admin/parents", icon: UserCheck },
  { label: "Class Management", path: "/admin/classes", icon: BookOpen },
  { label: "Course Management", path: "/admin/courses", icon: BookCopy },
  { label: "Teacher Assignment", path: "/admin/teacher-assignment", icon: ClipboardList },
  { label: "Fee Management", path: "/admin/fees", icon: Wallet },
  { label: "Library Management", path: "/admin/library", icon: BookCheck },
  { label: "Teacher Attendance", path: "/admin/teacher-attendance", icon: CalendarCheck },
  { label: "Teacher Schedule", path: "/admin/teacher-schedule", icon: Calendar },
  { label: "Notice Board", path: "/admin/notices", icon: Bell },
  { label: "Reports & Analytics", path: "/admin/reports", icon: BarChart3 },
  { label: "AI Assistant", path: "/admin/ai", icon: Bot },
  { label: "Chats", path: "/admin/chats", icon: MessageSquare },
  { label: "History", path: "/admin/history", icon: History },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1024);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        navItems={navItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        roleName="Institute Admin"
        roleColor="gradient-brand"
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          title="Admin Panel"
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
