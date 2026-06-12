import { useState } from "react";
import { Outlet } from "react-router-dom";
import { LayoutDashboard, CalendarDays, ClipboardList, Bell, FileText, BookOpen, FileCheck, Calendar, TrendingUp, Bot, MessageSquare, Settings } from "lucide-react";
import Sidebar, { type NavItem } from "./Sidebar";
import Navbar from "./Navbar";
import Breadcrumb from "./Breadcrumb";

const navItems: NavItem[] = [
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
];

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        navItems={navItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        roleName="Student Portal"
        roleColor="bg-emerald-600"
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          title="Student Panel"
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
