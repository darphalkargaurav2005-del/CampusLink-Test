import { useState } from "react";
import { Outlet } from "react-router-dom";
import { LayoutDashboard, CalendarCheck, ClipboardEdit, FileText, Users, BookOpen, BarChart3, Calendar, FileCheck, Bot, MessageSquare, Settings, History } from "lucide-react";
import Sidebar, { type NavItem } from "./Sidebar";
import Navbar from "./Navbar";
import Breadcrumb from "./Breadcrumb";

const navItems: NavItem[] = [
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
  { label: "History", path: "/teacher/history", icon: History },
  { label: "Settings", path: "/teacher/settings", icon: Settings },
];

export default function TeacherLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1024);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        navItems={navItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        roleName="Teacher Portal"
        roleColor="bg-sky-600"
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          title="Teacher Panel"
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
