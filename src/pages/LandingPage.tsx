import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, GraduationCap, Users, BookOpen, BarChart3, Bell, MessageSquare,
  CheckCircle2, ArrowRight, ArrowLeft, Star, Sun, Moon, Menu, X,
  Globe, TrendingUp, Calendar, Award, BookMarked, UserCheck,
  Layers, Sparkles, Play, ChevronDown, Building2, BookUser,
  DollarSign, Phone, Mail, FileText, HelpCircle, Briefcase,
  Info, Lock, FileTerminal, Cpu, Newspaper, Compass, Users2, PlayCircle, Eye, Download, Presentation
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import heroCampus from "@/assets/hero-campus.png";
import Modal from "@/components/features/Modal";
import { toast } from "sonner";

/* ─── NAV DATA ─────────────────────────────────────────── */
const PLATFORM_ITEMS = [
  { label: "Students", href: "/login", icon: GraduationCap, desc: "Grades, attendance & assignments" },
  { label: "Parents", href: "/login", icon: Users, desc: "Monitor child's academic progress" },
  { label: "Institute", href: "/login", icon: Building2, desc: "Admin & institutional control" },
  { label: "Teachers", href: "/login", icon: BookUser, desc: "Classes, marks & materials" },
  { label: "Librarian", href: "/login", icon: BookOpen, desc: "Books, issuing & fine management" },
];

const RESOURCES_ITEMS = [
  { label: "Blog", href: "/blog", icon: Newspaper, desc: "Latest news & updates" },
  { label: "FAQ", href: "/faq", icon: HelpCircle, desc: "Frequently asked questions" },
  { label: "Career Guidance", href: "/career", icon: Compass, desc: "Student career pathways" },
];

const FOOTER_PLATFORM = ["Features", "Pricing", "Parents", "Students", "Teachers", "Institute", "Librarian"];
const FOOTER_RESOURCES = ["Blog", "FAQ", "Tutors", "Community", "Scholarships", "Courses"];
const FOOTER_COMPANY = ["About Us", "Contact", "Privacy Policy", "Terms of Service"];

/* ─── FEATURES ────────────────────────────────────────── */
const FEATURES = [
  { icon: GraduationCap, title: "Student Management", desc: "Complete enrollment, attendance, results, and academic tracking with automated analytics.", color: "text-brand-600 dark:text-brand-400", bg: "bg-brand-50 dark:bg-brand-950/30" },
  { icon: UserCheck, title: "Digital Attendance", desc: "Real-time attendance marking with instant parent notifications and compliance alerts.", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Live charts, reports, and AI-powered insights for data-driven institutional decisions.", color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-950/30" },
  { icon: BookMarked, title: "Library System", desc: "Full-featured library with book issuing, returns, fine calculation, and inventory control.", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-950/30" },
  { icon: MessageSquare, title: "Communication Hub", desc: "Seamless messaging between students, parents, teachers, and administration.", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/30" },
  { icon: Layers, title: "Fee Management", desc: "Automated fee collection, payment tracking, reminders, and receipt generation.", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-950/30" },
  { icon: Calendar, title: "Scheduling", desc: "Dynamic timetable generation, teacher assignments, and resource optimization.", color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-950/30" },
  { icon: Sparkles, title: "AI Assistant", desc: "Built-in AI for question paper generation, performance analysis, and study assistance.", color: "text-pink-600 dark:text-pink-400", bg: "bg-pink-50 dark:bg-pink-950/30" },
];

const PORTALS = [
  { role: "Admin", icon: Shield, color: "from-violet-500 to-indigo-600", desc: "Full institutional control — manage students, teachers, fees, courses, and analytics.", features: ["User Management", "Fee Oversight", "Reports & Analytics", "Notice Management"] },
  { role: "Teacher", icon: GraduationCap, color: "from-sky-500 to-blue-600", desc: "Digital tools for attendance, marks entry, study material uploads, and AI assistance.", features: ["Digital Attendance", "Marks & Grades", "Study Materials", "AI Question Generator"] },
  { role: "Student", icon: BookOpen, color: "from-emerald-500 to-teal-600", desc: "Access results, timetable, assignments, notes, and personalized performance insights.", features: ["Attendance Reports", "Results & Grades", "Assignment Submission", "AI Study Assistant"] },
  { role: "Parent", icon: Users, color: "from-amber-500 to-orange-600", desc: "Monitor your child's progress, attendance, academic growth, and communicate with teachers.", features: ["Live Attendance Tracking", "Academic Progress", "Teacher Communication", "Growth Analytics"] },
  { role: "Librarian", icon: BookMarked, color: "from-rose-500 to-pink-600", desc: "Manage the full library lifecycle from books and categories to issuing, returns, and fines.", features: ["Book Catalog", "Issue & Returns", "Fine Management", "AI Library Assistant"] },
];

const STATS = [
  { value: "2,400+", label: "Active Students", icon: GraduationCap, color: "text-brand-600 dark:text-brand-400" },
  { value: "180+", label: "Faculty Members", icon: UserCheck, color: "text-sky-600 dark:text-sky-400" },
  { value: "15+", label: "Departments", icon: Globe, color: "text-emerald-600 dark:text-emerald-400" },
  { value: "98%", label: "Satisfaction Rate", icon: Star, color: "text-amber-500" },
];

const TESTIMONIALS = [
  { name: "Dr. Pradeep Srivastava", role: "Institute Director", quote: "CampusLink transformed how we manage our 2,400+ students. The real-time analytics are outstanding.", avatar: "P" },
  { name: "Prof. Meera Iyer", role: "Mathematics Faculty", quote: "The digital attendance and marks entry saves me hours each week. The AI question generator is a game-changer.", avatar: "M" },
  { name: "Aisha Sharma", role: "B.Tech Student", quote: "I can track my attendance, assignments and grades all in one place. The AI study assistant is incredibly helpful.", avatar: "A" },
];

const PRICING = [
  { plan: "Starter", price: "₹4,999", period: "/month", desc: "For small colleges up to 500 students", color: "border-border", features: ["Up to 500 students", "3 admin accounts", "Basic analytics", "Email support", "Library module"] },
  { plan: "Professional", price: "₹12,999", period: "/month", desc: "For growing institutions up to 2,000 students", color: "border-brand-500", badge: "Most Popular", features: ["Up to 2,000 students", "Unlimited admins", "Advanced analytics", "AI Assistant", "Priority support", "All modules"] },
  { plan: "Enterprise", price: "Custom", period: "", desc: "Unlimited scale with dedicated support", color: "border-border", features: ["Unlimited students", "Custom integrations", "Dedicated manager", "SLA guarantee", "White-label option", "API access"] },
];

/* ─── DROPDOWN COMPONENT ──────────────────────────────── */
function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string; icon: any; desc: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/60 transition-all"
      >
        {label}
        <ChevronDown size={13} className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1.5 w-64 bg-card border border-border rounded-2xl shadow-modal overflow-hidden z-50"
          >
            {items.map((item, i) => {
              const content = (
                <>
                  <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <item.icon size={15} className="text-brand-600 dark:text-brand-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </>
              );

              return (
                <Link
                  key={i}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-muted/60 transition-colors"
                >
                  {content}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── MAIN COMPONENT ──────────────────────────────────── */
export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePortal, setActivePortal] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [selectedCheckoutPlan, setSelectedCheckoutPlan] = useState<any | null>(null);
  const userPlan = user?.plan || null;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isSubPage = pathname !== "/";

  return (
    <div className="min-h-screen bg-background">
      {/* ── NAVBAR ── */}
      <nav className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        (scrolled || mobileMenuOpen || isSubPage)
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-sm">
                <Shield size={18} className="text-white" />
              </div>
              <span className={cn("font-bold text-lg text-foreground font-display")}>
                CampusLink
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {/* Platform dropdown */}
              <div className="transition-colors">
                <NavDropdown label="Platform" items={PLATFORM_ITEMS} />
              </div>

              {["Courses", "Tutors", "Pricing"].map(label => {
                if (label === "Pricing") {
                  return (
                    <Link
                      key={label}
                      to="/#pricing"
                      onClick={() => {
                        if (pathname === "/") {
                          document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="px-3 py-2 text-sm font-medium rounded-lg transition-all text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    >
                      {label}
                    </Link>
                  );
                }
                const path = label === "Courses" ? "/courses" : "/tutors";
                return (
                  <Link
                    key={label}
                    to={path}
                    className="px-3 py-2 text-sm font-medium rounded-lg transition-all text-left text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  >
                    {label}
                  </Link>
                );
              })}

              {/* Resources dropdown */}
              <div className="transition-colors">
                <NavDropdown label="Resources" items={RESOURCES_ITEMS} />
              </div>

              <Link
                to="/about"
                className="px-3 py-2 text-sm font-medium rounded-lg transition-all text-muted-foreground hover:text-foreground hover:bg-muted/60"
              >
                About
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl border border-border hover:bg-muted text-muted-foreground transition-colors"
              >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              {user ? (
                <Link
                  to={`/${user.role}/dashboard`}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold gradient-brand text-white rounded-xl hover:opacity-90 transition-opacity shadow-sm"
                >
                  Dashboard <ArrowRight size={14} />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-semibold rounded-xl border border-border text-foreground hover:bg-muted transition-colors"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold gradient-brand text-white rounded-xl hover:opacity-90 transition-opacity shadow-sm"
                  >
                    Sign In <ArrowRight size={14} />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-border hover:bg-muted text-foreground transition-colors"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border bg-background overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-3 mb-2">Platform</p>
                {PLATFORM_ITEMS.map((item, i) => (
                  <Link key={i} to={item.href} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors">
                    <item.icon size={16} className="text-brand-500" />
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-border my-2" />
                {["Courses", "Tutors", "Pricing", "About"].map(l => {
                  let path = "/";
                  if (l === "Pricing") path = "/#pricing";
                  else if (l === "About") path = "/about";
                  else if (l === "Courses") path = "/courses";
                  else if (l === "Tutors") path = "/tutors";

                  return (
                    <Link key={l} to={path} onClick={() => {
                      setMobileMenuOpen(false);
                      if (l === "Pricing" && pathname === "/") {
                        document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                      className="block px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors">
                      {l}
                    </Link>
                  );
                })}
                <div className="border-t border-border my-2" />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-3 mb-2">Resources</p>
                {RESOURCES_ITEMS.map((item, i) => (
                  <Link key={i} to={item.href} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors">
                    <item.icon size={16} className="text-brand-500" />
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-border my-2" />
                <div className="flex gap-2 pt-1">
                  {user ? (
                    <Link to={`/${user.role}/dashboard`} onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 gradient-brand text-white rounded-xl text-sm font-semibold">
                      Go to Dashboard <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <>
                      <Link to="/register" onClick={() => setMobileMenuOpen(false)}
                        className="flex-1 text-center py-2.5 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                        Register
                      </Link>
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 gradient-brand text-white rounded-xl text-sm font-semibold">
                        Sign In <ArrowRight size={14} />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── MAIN CONTENT ── */}
      {!isSubPage ? (
        <>
          {/* ── HERO ── */}
          <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-background">
            <div className="absolute inset-0">
              <img src={heroCampus} alt="Campus" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-indigo-50/75 to-slate-100/60 dark:from-slate-950/96 dark:via-indigo-950/85 dark:to-slate-900/70 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent transition-all duration-300" />
            </div>
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.035]" style={{
              backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px"
            }} />
            {/* Radial glow */}
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left — text */}
                <div className="lg:col-span-7 text-left flex flex-col items-start justify-center w-full">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 bg-slate-200/50 dark:bg-white/8 backdrop-blur-sm border border-slate-300 dark:border-white/15 rounded-full px-4 py-1.5 mb-7 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                    <span className="text-slate-800 dark:text-white/85 text-xs font-bold uppercase tracking-widest">Next-Gen College ERP Platform</span>
                  </motion.div>

                  <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                    className="text-4xl sm:text-5xl xl:text-6xl font-bold text-slate-900 dark:text-white font-display leading-[1.08] mb-6 text-left transition-colors">
                    Smarter College
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-300 dark:via-violet-300 dark:to-purple-300">
                      Management
                    </span>
                    <br />
                    Starts Here
                  </motion.h1>

                  <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="text-slate-650 dark:text-white/65 text-base sm:text-lg leading-relaxed mb-8 max-w-xl text-left transition-colors">
                    CampusLink unifies your entire institution — students, teachers, parents, and administration — on one powerful, intelligent platform.
                  </motion.p>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
                    className="flex flex-wrap items-center gap-3 mb-9">
                    <Link to={user ? `/${user.role}/dashboard` : "/register"}
                      className="flex items-center gap-2 px-7 py-3.5 gradient-brand text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-indigo-500/30 text-sm animate-button">
                      {user ? "Go to Dashboard" : "Get Started Free"} <ArrowRight size={16} />
                    </Link>
                    <button
                      onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                      className="flex items-center gap-2 px-7 py-3.5 bg-slate-200/50 dark:bg-white/8 backdrop-blur-sm border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white font-semibold rounded-2xl hover:bg-slate-200 dark:hover:bg-white/15 transition-all text-sm"
                    >
                      See Features
                    </button>
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                    className="flex items-center gap-5 flex-wrap">
                    {["No Credit Card Required", "GDPR Compliant", "99.9% Uptime SLA"].map((badge, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-slate-500 dark:text-white/55 text-xs transition-colors">
                        <CheckCircle2 size={13} className="text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                        <span>{badge}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Right Side Mockup */}
                <div className="lg:col-span-5 hidden lg:block">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass-card rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden bg-slate-900/10 dark:bg-slate-950/20 backdrop-blur-md relative group"
                  >
                    {/* Top Header Mockup */}
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-900/20 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-rose-500" />
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      </div>
                      <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">campuslink.edu/portal</div>
                      <div className="w-6" />
                    </div>

                    {/* Body Content Mockup */}
                    <div className="p-5 space-y-4 text-left">
                      <div className="flex items-center justify-between pb-3 border-b border-white/15">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Live Analytics</p>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Active Portal Status</h4>
                        </div>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">2.4k online</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                          <p className="text-[10px] text-muted-foreground">Student Turnout</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">94.8%</p>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                          <p className="text-[10px] text-muted-foreground">Fee Cleared</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">87.2%</p>
                        </div>
                      </div>

                      <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl space-y-2">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-bold">Recent Notices</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-800 dark:text-slate-200 truncate pr-2">Mid-Semester Timetable Released</span>
                          <span className="text-[10px] text-rose-500 font-semibold flex-shrink-0">EXAM</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-800 dark:text-slate-200 truncate pr-2">Sports Day Registration</span>
                          <span className="text-[10px] text-emerald-500 font-semibold flex-shrink-0">EVENT</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent" />
          </section>

          {/* ── STATS BAR ── */}
          <section className="relative z-10 border-y border-border bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
                {STATS.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex flex-col items-center gap-1 py-8 px-4">
                    <s.icon size={20} className={cn("mb-1", s.color)} />
                    <p className={cn("text-3xl font-bold font-display", s.color)}>{s.value}</p>
                    <p className="text-sm text-muted-foreground text-center">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FEATURES ── */}
          <section id="features" className="py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                <span className="inline-block bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-brand-100 dark:border-brand-900">
                  Platform Features
                </span>
                <h2 className="text-4xl font-bold text-foreground font-display mb-4">Everything Your College Needs</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">From enrollment to graduation, CampusLink handles every aspect of college management with precision and intelligence.</p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {FEATURES.map((f, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-default">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", f.bg)}>
                      <f.icon size={22} className={f.color} />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── PRICING ── */}
          <section id="pricing" className="py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                <span className="inline-block bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-violet-100 dark:border-violet-900">
                  Pricing
                </span>
                <h2 className="text-4xl font-bold text-foreground font-display mb-4">Transparent, Flexible Pricing</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">Choose a plan that scales with your institution's needs.</p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {PRICING.map((p, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className={cn("relative bg-card rounded-2xl p-7 border-2 transition-all hover:shadow-lg", p.color, i === 1 && "shadow-xl ring-2 ring-brand-500/20")}>
                    {p.badge && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-500 to-violet-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                        {p.badge}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-foreground font-display mb-1">{p.plan}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{p.desc}</p>
                    <div className="flex items-end gap-1 mb-6">
                      <span className="text-4xl font-bold text-foreground font-display">{p.price}</span>
                      {p.period && <span className="text-muted-foreground text-sm mb-1.5">{p.period}</span>}
                    </div>
                    <ul className="space-y-3 mb-7">
                      {p.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2.5 text-sm text-foreground">
                          <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {user ? (
                      userPlan === p.plan ? (
                        <button type="button" disabled className="block w-full text-center py-3 rounded-xl text-sm font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 cursor-default">
                          Active Plan
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedCheckoutPlan(p)}
                          className={cn("block w-full text-center py-3 rounded-xl text-sm font-bold transition-all",
                            i === 1
                              ? "gradient-brand text-white hover:opacity-90 shadow-md animate-pulse-accent"
                              : "border-2 border-border text-foreground hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400"
                          )}
                        >
                          {p.plan === "Enterprise" ? "Contact Sales" : "Choose Plan"}
                        </button>
                      )
                    ) : (
                      <Link to="/register"
                        className={cn("block w-full text-center py-3 rounded-xl text-sm font-bold transition-all",
                          i === 1
                            ? "gradient-brand text-white hover:opacity-90 shadow-md"
                            : "border-2 border-border text-foreground hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400"
                        )}>
                        {p.plan === "Enterprise" ? "Contact Sales" : "Get Started"}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── TESTIMONIALS ── */}
          <section id="about" className="py-20 lg:py-28 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                <span className="inline-block bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-emerald-100 dark:border-emerald-900">
                  Testimonials
                </span>
                <h2 className="text-4xl font-bold text-foreground font-display mb-4">Loved by the Entire Campus</h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white font-bold flex-shrink-0">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="py-20 lg:py-24 relative overflow-hidden">
            <div className="absolute inset-0 gradient-brand opacity-95" />
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl lg:text-5xl font-bold text-white font-display mb-5 leading-tight">
                  Ready to Transform Your Institution?
                </h2>
                <p className="text-white/75 text-lg mb-8 max-w-2xl mx-auto">
                  Join hundreds of colleges using CampusLink to streamline operations and elevate student success.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {user ? (
                    <Link to={`/${user.role}/dashboard`}
                      className="flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-2xl hover:bg-white/90 transition-all shadow-lg text-sm">
                      Go to Dashboard <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <>
                      <Link to="/register"
                        className="flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-2xl hover:bg-white/90 transition-all shadow-lg text-sm">
                        Start for Free <ArrowRight size={16} />
                      </Link>
                      <Link to="/login"
                        className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all text-sm">
                        Sign In
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        </>
      ) : (
        <section className="relative pt-24 pb-16 min-h-[70vh] bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {pathname === "/blog" && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <span className="inline-block bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-brand-100 dark:border-brand-900 animate-fade">
                    Blog
                  </span>
                  <h1 className="text-3xl font-bold text-foreground font-display">CampusLink Insights Blog</h1>
                  <p className="text-muted-foreground text-sm mt-1 animate-fade">Recent news, academic studies, and product updates</p>
                </div>
                {selectedArticle ? (
                  <div className="space-y-4">
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="text-xs text-primary font-semibold hover:underline mb-4 flex items-center gap-1"
                    >
                      <ArrowLeft size={12} /> Back to Blog List
                    </button>
                    <div className="space-y-4 text-sm text-foreground/80 leading-relaxed bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card">
                      <h2 className="text-xl font-bold text-foreground leading-snug">{selectedArticle.title}</h2>
                      <span className="text-[10px] text-primary font-medium block">{selectedArticle.date} • By {selectedArticle.author}</span>
                      <p className="text-base font-semibold text-foreground leading-snug mt-4">{selectedArticle.excerpt}</p>
                      <div className="border-t border-border/50 pt-4 mt-4 space-y-3">
                        <p>Digital transformation in educational institutes plays a pivotal role in ensuring that processes are efficient, transparent, and scalable. By centralizing management features, from grade entry to attendance tracking, CampusLink ensures both students and faculty are aligned at all times.</p>
                        <p>Our research and data collection indicates that instant communication platforms reduce administrative latency by up to 50%. The integration of smart filters and automated reports allows users to focus on high-impact tutoring and guidance rather than standard manual indexing and spreadsheets.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[
                      { title: "AI in Modern Classrooms: The Future of Grading", date: "June 12, 2026", author: "Academic Office", excerpt: "Discover how teachers are using automated intelligence tools to evaluate marks and generate custom question banks using CampusLink AI." },
                      { title: "Connecting Parents with Academic Analytics", date: "May 28, 2026", author: "Liaison Officer", excerpt: "Learn how our live parent portal helps bridge the communication gap between faculty and families, providing live insights on student growth." },
                      { title: "Digital Libraries: Restructuring Campus Knowledge", date: "May 15, 2026", author: "Library Committee", excerpt: "Explore the new librarian dashboard features for real-time returns tracking, automated cataloging, and instant fine collection notifications." }
                    ].map((b, i) => (
                      <div key={i} className="p-5 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors shadow-card">
                        <span className="text-[10px] text-primary font-medium">{b.date} • By {b.author}</span>
                        <h4 onClick={() => setSelectedArticle(b)} className="font-bold text-base text-foreground mt-1 leading-snug hover:text-primary transition-colors cursor-pointer">{b.title}</h4>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{b.excerpt}</p>
                        <button onClick={() => setSelectedArticle(b)} className="text-xs text-primary font-semibold hover:underline mt-3 flex items-center gap-1">Read article <ArrowRight size={12} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {pathname === "/faq" && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <span className="inline-block bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-indigo-100 dark:border-indigo-900">
                    FAQs
                  </span>
                  <h1 className="text-3xl font-bold text-foreground font-display">Frequently Asked Questions</h1>
                  <p className="text-muted-foreground text-sm mt-1">Common questions about the CampusLink college ERP platform</p>
                </div>
                <div className="space-y-3">
                  {[
                    { q: "What is CampusLink?", a: "CampusLink is an AI-powered college ERP and Learning Management System designed to unify administrators, teachers, students, and parents." },
                    { q: "How can parents get access to the portal?", a: "Parents are registered by the college administration. Once registered, they will receive login credentials to monitor attendance and grades." },
                    { q: "Is the AI Assistant free to use for students?", a: "Yes! The AI assistant is a built-in feature designed to help students with questions, schedules, study plans, and performance analysis." },
                    { q: "How secure is my data on the platform?", a: "We take security seriously. CampusLink utilizes end-to-end SSL encryption, role-based strict page route guards, and is fully ISO 27001 certified." }
                  ].map((f, i) => (
                    <div key={i} className="p-4 bg-card rounded-2xl border border-border shadow-card">
                      <p className="font-semibold text-sm text-foreground">{f.q}</p>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pathname === "/tutors" && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <span className="inline-block bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-violet-100 dark:border-violet-900">
                    Tutors
                  </span>
                  <h1 className="text-3xl font-bold text-foreground font-display">Verified Campus Tutors</h1>
                  <p className="text-muted-foreground text-sm mt-1">Department professors available for academic sessions</p>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Dr. Anand Kumar", dept: "Computer Science", spec: "Data Structures, Algorithms", time: "Mon, Wed, Fri 4:00 - 5:00 PM", initial: "A", color: "bg-sky-500" },
                    { name: "Prof. Meera Iyer", dept: "Mathematics", spec: "Calculus, Linear Algebra", time: "Tue, Thu 3:00 - 4:30 PM", initial: "M", color: "bg-violet-500" },
                    { name: "Mr. Ravi Shankar", dept: "Electronics", spec: "Digital Logic, Microprocessors", time: "Mon, Thu 2:00 - 3:30 PM", initial: "R", color: "bg-emerald-500" },
                    { name: "Mr. Kartik Verma", dept: "Computer Science", spec: "Web Development, DBMS", time: "Wed, Fri 1:30 - 3:00 PM", initial: "K", color: "bg-amber-500" }
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-card rounded-2xl border border-border shadow-card animate-slide-up">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base ${t.color} flex-shrink-0 shadow-sm`}>
                        {t.initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-base text-foreground leading-snug">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.dept} Department</p>
                        <p className="text-xs text-foreground mt-2"><strong>Specializes in:</strong> {t.spec}</p>
                        <p className="text-[11px] text-primary mt-1"><strong>Availability:</strong> {t.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pathname === "/courses" && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <span className="inline-block bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-amber-100 dark:border-amber-900">
                    Courses
                  </span>
                  <h1 className="text-3xl font-bold text-foreground font-display">CampusLink Key Subjects</h1>
                  <p className="text-muted-foreground text-sm mt-1">Core engineering and sciences subjects available in the curriculum</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { code: "CS301", title: "Data Structures & Algorithms", credits: 4, sem: 5, desc: "Fundamental data structures and algorithm design." },
                    { code: "CS302", title: "Database Management Systems", credits: 3, sem: 5, desc: "Relational design, normalization, SQL, indexing." },
                    { code: "CS401", title: "Web Development", credits: 3, sem: 7, desc: "Modern full-stack web applications with React & Node." },
                    { code: "EC301", title: "Digital Electronics", credits: 3, sem: 5, desc: "Combinational and sequential logic circuit design." },
                    { code: "PH101", title: "Engineering Physics", credits: 3, sem: 1, desc: "Wave mechanics, optics, and quantum basics." },
                    { code: "MA301", title: "Engineering Mathematics III", credits: 4, sem: 5, desc: "Calculus, linear algebra, and complex variables." }
                  ].map((c, i) => (
                    <div key={i} className="p-4 bg-card rounded-2xl border border-border flex flex-col justify-between hover:border-primary/40 transition-colors shadow-card">
                      <div>
                        <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase">{c.code} • {c.credits} Credits</span>
                        <h4 className="font-bold text-base text-foreground mt-2 leading-snug">{c.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{c.desc}</p>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-3 font-medium">Semester {c.sem}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pathname === "/community" && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <span className="inline-block bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-sky-100 dark:border-sky-900">
                    Community
                  </span>
                  <h1 className="text-3xl font-bold text-foreground font-display">CampusLink Forums</h1>
                  <p className="text-muted-foreground text-sm mt-1">Connect with classmates, alumni, and faculty groups</p>
                </div>
                <div className="space-y-3">
                  {[
                    { channel: "#placements-2026", count: 840, desc: "Discussion on upcoming corporate campus drives, preparation questions, and interview shares." },
                    { channel: "#technical-club", count: 520, desc: "Hackathon project planning, coding updates, and weekly developer meetups." },
                    { channel: "#campus-life", count: 1200, desc: "General announcements, cultural events, sports meet details, and campus stories." },
                    { channel: "#alumni-connect", count: 650, desc: "Mentorship channels connecting recent graduates with industry leaders." }
                  ].map((c, i) => (
                    <div key={i} className="p-4 bg-card rounded-2xl border border-border shadow-card hover:bg-muted/10 transition-colors">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-sm text-foreground">{c.channel}</span>
                        <span className="text-[10px] bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 font-bold px-2.5 py-0.5 rounded-full">{c.count} members</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pathname === "/scholarships" && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <span className="inline-block bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-emerald-100 dark:border-emerald-900">
                    Scholarships
                  </span>
                  <h1 className="text-3xl font-bold text-foreground font-display">Scholarships & Aid</h1>
                  <p className="text-muted-foreground text-sm mt-1">Funding schemes and fee waivers available for student enrollment</p>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Academic Merit Scholarship", waiver: "50% Waiver", criteria: "Top 5% of class in semesters", deadline: "July 15, 2026" },
                    { name: "Need-Based Financial Assistance", waiver: "Up to 100% Waiver", criteria: "Annual family income < ₹3,00,000", deadline: "June 30, 2026" },
                    { name: "Sports Excellence Grant", waiver: "25% Waiver", criteria: "State or National level representation", deadline: "August 01, 2026" }
                  ].map((s, i) => (
                    <div key={i} className="p-4 bg-card rounded-2xl border border-border shadow-card">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-sm text-foreground">{s.name}</h4>
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 font-bold px-2.5 py-0.5 rounded-full">{s.waiver}</span>
                      </div>
                      <p className="text-xs text-muted-foreground"><strong>Eligibility:</strong> {s.criteria}</p>
                      <p className="text-[10px] text-rose-500 mt-1.5 font-semibold"><strong>Application Deadline:</strong> {s.deadline}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pathname === "/about" && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <span className="inline-block bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-violet-100 dark:border-violet-900">
                    About Us
                  </span>
                  <h1 className="text-3xl font-bold text-foreground font-display">About CampusLink</h1>
                  <p className="text-muted-foreground text-sm mt-1">Our mission and values in shaping educational institutions</p>
                </div>
                <div className="space-y-4 text-sm text-foreground/80 leading-relaxed bg-card border border-border rounded-2xl p-6 shadow-card">
                  <p>CampusLink is a leading college management ERP platform designed from the ground up to solve administrative, teacher, student, and parent collaboration gaps. Our platform empowers more than 50 educational complexes to streamline attendance reports, schedule examinations, library issuing, fee payouts, and academic grade cards in real time.</p>
                  <p>We believe that clean, unified, and AI-enabled design brings families closer to academic growth. By automating structural audits and communication blocks, we save hours for teaching staffs, allowing them to perform high-impact instruction.</p>
                </div>
              </div>
            )}

            {pathname === "/contact" && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <span className="inline-block bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-teal-100 dark:border-teal-900">
                    Contact Us
                  </span>
                  <h1 className="text-3xl font-bold text-foreground font-display">Get in Touch</h1>
                  <p className="text-muted-foreground text-sm mt-1">We would love to hear from you or schedule a live platform demo</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card border border-border rounded-2xl p-6 shadow-card">
                  <div>
                    <h3 className="font-bold text-sm text-foreground mb-3">Office Location</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      CampusLink Headquarters<br />
                      500 Innovation Way, Tech Park,<br />
                      Suite 300, Bangalore, India
                    </p>
                    <h3 className="font-bold text-sm text-foreground mt-4 mb-2">Email & Phone</h3>
                    <p className="text-xs text-muted-foreground">
                      Support: support@campuslink.com<br />
                      Sales: sales@campuslink.com<br />
                      Phone: +91 98000 00001
                    </p>
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); toast.success("Message sent successfully!"); }} className="space-y-3">
                    <input placeholder="Your Name" className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring" required />
                    <input type="email" placeholder="Your Email" className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring" required />
                    <textarea rows={3} placeholder="Your Message" className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring resize-none" required />
                    <button type="submit" className="w-full py-2 gradient-brand text-white rounded-xl text-xs font-bold hover:opacity-90">Send Message</button>
                  </form>
                </div>
              </div>
            )}

            {pathname === "/privacy" && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <span className="inline-block bg-slate-50 dark:bg-slate-950/30 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-slate-100 dark:border-slate-900">
                    Privacy Policy
                  </span>
                  <h1 className="text-3xl font-bold text-foreground font-display">Privacy Policy</h1>
                  <p className="text-muted-foreground text-sm mt-1">Last updated: June 17, 2026</p>
                </div>
                <div className="space-y-4 text-sm text-foreground/80 leading-relaxed bg-card border border-border rounded-2xl p-6 shadow-card">
                  <p>At CampusLink, we value the confidentiality of student records, grades, and parent communication channels. This privacy policy describes the types of information we collect and compile, our encryption standards, and your rights in controlling stored user data.</p>
                  <p>All database tables are saved securely with role-based access restrictions. We do not sell, disclose, or distribute audit logs or contact sheets to external third-party agencies.</p>
                </div>
              </div>
            )}

            {pathname === "/terms" && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <span className="inline-block bg-slate-50 dark:bg-slate-950/30 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-slate-100 dark:border-slate-900">
                    Terms of Service
                  </span>
                  <h1 className="text-3xl font-bold text-foreground font-display">Terms of Service</h1>
                  <p className="text-muted-foreground text-sm mt-1">Last updated: June 17, 2026</p>
                </div>
                <div className="space-y-4 text-sm text-foreground/80 leading-relaxed bg-card border border-border rounded-2xl p-6 shadow-card">
                  <p>Welcome to CampusLink. By using our hosted ERP portals, databases, or AI tools, you represent and agree to abide by our institutional code of conduct, acceptable academic integrity rules, and database compliance policies.</p>
                  <p>Violation of access rules, reverse engineering, or attempting unauthorized route bypasses will result in immediate termination of the user profile and administrative follow-up.</p>
                </div>
              </div>
            )}

            {pathname === "/career" && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <span className="inline-block bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-emerald-100 dark:border-emerald-900">
                    Career Guidance
                  </span>
                  <h1 className="text-3xl font-bold text-foreground font-display">Student Career Pathways</h1>
                  <p className="text-muted-foreground text-sm mt-1">Recommended tracks and key capabilities for engineering, analytics, and networks</p>
                </div>
                <div className="space-y-4">
                  {[
                    { track: "Full Stack Web Engineering", skills: "React, TypeScript, Node.js, DSA, System Design", courses: "CS401 Web Development, CS301 Data Structures", desc: "Focuses on building modern, scalable responsive interfaces and reliable back-end databases." },
                    { track: "Data Science & AI Analyst", skills: "Python, Machine Learning, Applied Calculus, DBMS", courses: "CS302 Database Systems, MA301 Engineering Math", desc: "Focuses on statistical modeling, data visualization, predictive analytics, and machine learning structures." },
                    { track: "Computer Networking & Cybersecurity", skills: "ISO/OSI model, Cryptography, Firewalls, TCP/IP", courses: "CS301 Data Structures, Computer Networks (CS-Shelf)", desc: "Focuses on network administration, secure information channels, encryption protocols, and server routing." }
                  ].map((c, i) => (
                    <div key={i} className="p-5 bg-card rounded-2xl border border-border hover:border-primary/40 transition-colors shadow-card">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2.5 py-0.5 rounded-full uppercase">Career Pathway</span>
                      <h4 className="font-bold text-base text-foreground mt-3 leading-snug">{c.track}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.desc}</p>
                      <div className="mt-4 text-xs space-y-1 bg-muted/30 p-3 rounded-xl border border-border/45">
                        <p><strong>Required Skills:</strong> <span className="text-muted-foreground">{c.skills}</span></p>
                        <p><strong>Recommended Courses:</strong> <span className="text-primary font-medium">{c.courses}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="bg-card border-t border-border pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
                  <Shield size={17} className="text-white" />
                </div>
                <span className="font-bold text-lg text-foreground font-display">CampusLink</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-xs">
                The modern college ERP platform built for the future of education — intelligent, connected, and beautifully designed.
              </p>
              <div className="flex items-center gap-3">
                <button onClick={toggleTheme} className="p-2.5 rounded-xl border border-border hover:bg-muted transition-colors" aria-label="Toggle theme">
                  {theme === "light" ? <Moon size={16} className="text-muted-foreground" /> : <Sun size={16} className="text-muted-foreground" />}
                </button>
                <div className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">All systems operational</span>
                </div>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Platform</h4>
              <ul className="space-y-2.5">
                {FOOTER_PLATFORM.map(item => {
                  let href = "/login";
                  let onClick: any = undefined;
                  if (item === "Features") {
                    href = "/#features";
                    onClick = (e: any) => {
                      if (pathname === "/") {
                        e.preventDefault();
                        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                      }
                    };
                  } else if (item === "Pricing") {
                    href = "/#pricing";
                    onClick = (e: any) => {
                      if (pathname === "/") {
                        e.preventDefault();
                        document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                      }
                    };
                  } else {
                    const roleMap: Record<string, string> = {
                      "Parents": "parent",
                      "Students": "student",
                      "Teachers": "teacher",
                      "Institute": "admin",
                      "Librarian": "librarian"
                    };
                    href = `/login?role=${roleMap[item] || ""}`;
                  }
                  return (
                    <li key={item}>
                      <Link to={href} onClick={onClick} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2.5">
                {FOOTER_RESOURCES.map(item => {
                  const keyMap: Record<string, string> = {
                    "Blog": "/blog",
                    "FAQ": "/faq",
                    "Tutors": "/tutors",
                    "Community": "/community",
                    "Scholarships": "/scholarships",
                    "Courses": "/courses"
                  };
                  const path = keyMap[item] || "/";
                  return (
                    <li key={item}>
                      <Link
                        to={path}
                        onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setSelectedArticle(null); }}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                      >
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2.5">
                {FOOTER_COMPANY.map(item => {
                  const keyMap: Record<string, string> = {
                    "About Us": "/about",
                    "Contact": "/contact",
                    "Privacy Policy": "/privacy",
                    "Terms of Service": "/terms"
                  };
                  const path = keyMap[item] || "/";
                  return (
                    <li key={item}>
                      <Link
                        to={path}
                        onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CampusLink. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
              {user ? (
                <Link to={`/${user.role}/dashboard`} className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">Dashboard</Link>
              ) : (
                <Link to="/login" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">Sign In</Link>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* ── CHECKOUT MODAL ── */}
      <Modal
        open={!!selectedCheckoutPlan}
        onClose={() => setSelectedCheckoutPlan(null)}
        title={selectedCheckoutPlan ? `Activate ${selectedCheckoutPlan.plan} Plan` : ""}
        subtitle="Simulate billing and subscribe your college instance instantly"
        size="md"
      >
        {selectedCheckoutPlan && (
          <div className="space-y-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{selectedCheckoutPlan.plan} Plan</p>
                <p className="text-xs text-muted-foreground mt-0.5">{selectedCheckoutPlan.desc}</p>
              </div>
              <span className="text-lg font-bold text-primary font-display">{selectedCheckoutPlan.price}</span>
            </div>
            
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3.5 border-2 border-primary bg-primary/5 rounded-xl text-left">
                  <p className="font-semibold text-xs text-foreground">Institute Wallet</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Available: ₹5.50 Lakhs</p>
                </button>
                <button className="p-3.5 border border-border rounded-xl text-left hover:bg-muted/50" disabled>
                  <p className="font-semibold text-xs text-muted-foreground">Corporate Card</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Not configured</p>
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-4 border-t border-border mt-5">
              <button
                onClick={() => setSelectedCheckoutPlan(null)}
                className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (user) {
                    updateUser({ plan: selectedCheckoutPlan.plan });
                  }
                  toast.success(`Plan ${selectedCheckoutPlan.plan} successfully activated!`);
                  setSelectedCheckoutPlan(null);
                }}
                className="px-5 py-2 text-sm gradient-brand text-white rounded-xl font-semibold hover:opacity-90"
              >
                Confirm Payout
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
