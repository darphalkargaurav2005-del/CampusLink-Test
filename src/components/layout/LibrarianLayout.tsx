import { useState } from "react";
import { Outlet } from "react-router-dom";
import { LayoutDashboard, BookOpen, Tag, BookPlus, BookCheck, Users, UserCog, DollarSign, Inbox, BarChart3, Bot, Settings, History } from "lucide-react";
import Sidebar, { type NavItem } from "./Sidebar";
import Navbar from "./Navbar";
import Breadcrumb from "./Breadcrumb";

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/librarian/dashboard", icon: LayoutDashboard },
  { label: "Books", path: "/librarian/books", icon: BookOpen },
  { label: "Categories", path: "/librarian/categories", icon: Tag },
  { label: "Issue Books", path: "/librarian/issue", icon: BookPlus },
  { label: "Return Books", path: "/librarian/return", icon: BookCheck },
  { label: "Students", path: "/librarian/students", icon: Users },
  { label: "Teachers", path: "/librarian/teachers", icon: UserCog },
  { label: "Fine Management", path: "/librarian/fines", icon: DollarSign },
  { label: "Book Requests", path: "/librarian/requests", icon: Inbox, badge: 3 },
  { label: "Reports", path: "/librarian/reports", icon: BarChart3 },
  { label: "AI Assistant", path: "/librarian/ai", icon: Bot },
  { label: "History", path: "/librarian/history", icon: History },
  { label: "Settings", path: "/librarian/settings", icon: Settings },
];

export default function LibrarianLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1024);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        navItems={navItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        roleName="Library Portal"
        roleColor="bg-rose-600"
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          title="Library Panel"
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
