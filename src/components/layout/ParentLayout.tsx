import { useState } from "react";
import { Outlet } from "react-router-dom";
import { LayoutDashboard, CalendarDays, TrendingUp, Phone, Bell, BarChart3, Activity, MessageSquare, Bot, Settings } from "lucide-react";
import Sidebar, { type NavItem } from "./Sidebar";
import Navbar from "./Navbar";
import Breadcrumb from "./Breadcrumb";

const navItems: NavItem[] = [
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
];

export default function ParentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1024);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        navItems={navItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        roleName="Parent Portal"
        roleColor="bg-amber-600"
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          title="Parent Panel"
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
