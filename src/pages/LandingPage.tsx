import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Shield, GraduationCap, Users, BookOpen, BarChart3, Bell, MessageSquare,
  CheckCircle2, ArrowRight, Star, Sun, Moon, Menu, X,
  Globe, TrendingUp, Calendar, Award, BookMarked, UserCheck,
  Layers, Sparkles, Play, ChevronDown, Building2, BookUser,
  DollarSign, Phone, Mail, FileText, HelpCircle, Briefcase,
  Info, Lock, FileTerminal, Cpu, Newspaper, Compass, Users2
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import heroCampus from "@/assets/hero-campus.jpg";

/* ─── NAV DATA ─────────────────────────────────────────── */
const PLATFORM_ITEMS = [
  { label: "Students", href: "/login", icon: GraduationCap, desc: "Grades, attendance & assignments" },
  { label: "Parents", href: "/login", icon: Users, desc: "Monitor child's academic progress" },
  { label: "Institute", href: "/login", icon: Building2, desc: "Admin & institutional control" },
  { label: "Teachers", href: "/login", icon: BookUser, desc: "Classes, marks & materials" },
  { label: "Librarian", href: "/login", icon: BookOpen, desc: "Books, issuing & fine management" },
];

const RESOURCES_ITEMS = [
  { label: "Blog", href: "#about", icon: Newspaper, desc: "Latest news & updates" },
  { label: "FAQ", href: "#faq", icon: HelpCircle, desc: "Frequently asked questions" },
  { label: "Career Guidance", href: "#about", icon: Compass, desc: "Student career pathways" },
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
function NavDropdown({ label, items }: { label: string; items: { label: string; href: string; icon: any; desc: string }[] }) {
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
    <div ref={ref} className="relative">
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
            {items.map((item, i) => (
              <Link
                key={i}
                to={item.href}
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 px-4 py-3 hover:bg-muted/60 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <item.icon size={15} className="text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── MAIN COMPONENT ──────────────────────────────────── */
export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePortal, setActivePortal] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ── NAVBAR ── */}
      <nav className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
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
              <span className={cn("font-bold text-lg font-display transition-colors", scrolled ? "text-foreground" : "text-white")}>
                CampusLink
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {/* Platform dropdown */}
              <div className={cn("transition-colors", !scrolled && "[&_button]:text-white/80 [&_button:hover]:text-white [&_button:hover]:bg-white/10")}>
                <NavDropdown label="Platform" items={PLATFORM_ITEMS} />
              </div>

              {["Courses", "Tutors", "Pricing"].map(label => (
                <a
                  key={label}
                  href={label === "Pricing" ? "#pricing" : "#features"}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-lg transition-all",
                    scrolled
                      ? "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {label}
                </a>
              ))}

              {/* Resources dropdown */}
              <div className={cn("transition-colors", !scrolled && "[&_button]:text-white/80 [&_button:hover]:text-white [&_button:hover]:bg-white/10")}>
                <NavDropdown label="Resources" items={RESOURCES_ITEMS} />
              </div>

              <a
                href="#about"
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-all",
                  scrolled
                    ? "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                About
              </a>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className={cn(
                  "p-2.5 rounded-xl border transition-colors",
                  scrolled
                    ? "border-border hover:bg-muted text-muted-foreground"
                    : "border-white/20 hover:bg-white/10 text-white/80"
                )}
              >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              <Link
                to="/register"
                className={cn(
                  "px-4 py-2 text-sm font-semibold rounded-xl border transition-all",
                  scrolled
                    ? "border-border text-foreground hover:bg-muted"
                    : "border-white/30 text-white hover:bg-white/10"
                )}
              >
                Register
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold gradient-brand text-white rounded-xl hover:opacity-90 transition-opacity shadow-sm"
              >
                Sign In <ArrowRight size={14} />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "lg:hidden p-2.5 rounded-xl border transition-colors",
                scrolled ? "border-border hover:bg-muted" : "border-white/20 hover:bg-white/10"
              )}
            >
              {mobileMenuOpen
                ? <X size={18} className={scrolled ? "text-foreground" : "text-white"} />
                : <Menu size={18} className={scrolled ? "text-foreground" : "text-white"} />
              }
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
                {["Courses", "Tutors", "Pricing", "About"].map(l => (
                  <a key={l} href={l === "Pricing" ? "#pricing" : "#about"} onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors">
                    {l}
                  </a>
                ))}
                <div className="border-t border-border my-2" />
                <div className="flex gap-2 pt-1">
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2.5 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                    Register
                  </Link>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 gradient-brand text-white rounded-xl text-sm font-semibold">
                    Sign In <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCampus} alt="Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/96 via-indigo-950/85 to-slate-900/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
        </div>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }} />
        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left — text */}
            <div className="lg:col-span-6 xl:col-span-7">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-7">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/85 text-xs font-bold uppercase tracking-widest">Next-Gen College ERP Platform</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                className="text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white font-display leading-[1.04] mb-6">
                Smarter College
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-300">
                  Management
                </span>
                <br />
                Starts Here
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-white/65 text-lg leading-relaxed mb-8 max-w-lg">
                CampusLink unifies your entire institution — students, teachers, parents, and administration — on one powerful, intelligent platform.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
                className="flex flex-wrap items-center gap-3 mb-9">
                <Link to="/register"
                  className="flex items-center gap-2 px-7 py-3.5 gradient-brand text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-indigo-500/30 text-sm">
                  Get Started Free <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-2 px-7 py-3.5 bg-white/8 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/15 transition-all text-sm">
                  <Play size={14} className="fill-white" /> See Features
                </button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                className="flex items-center gap-5 flex-wrap">
                {["No Credit Card Required", "GDPR Compliant", "99.9% Uptime SLA"].map((badge, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-white/55 text-xs">
                    <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                    <span>{badge}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — dashboard card */}
            <div className="lg:col-span-6 xl:col-span-5 hidden lg:block">
              <motion.div initial={{ opacity: 0, x: 40, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.28, duration: 0.5 }}
                className="relative">
                <div className="bg-white/8 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-2xl gradient-brand flex items-center justify-center shadow-md">
                      <BarChart3 size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Live Dashboard</p>
                      <p className="text-white/45 text-xs">Real-time institutional metrics</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-400 text-xs font-semibold">Live</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 mb-4">
                    {STATS.map((s, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.55 + i * 0.08 }}
                        className="bg-white/8 rounded-2xl p-3.5 border border-white/10">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <s.icon size={12} className="text-white/50" />
                          <span className="text-white/50 text-[10px] font-medium">{s.label}</span>
                        </div>
                        <p className="text-xl font-bold text-white font-display">{s.value}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/55 text-xs font-medium">Monthly Attendance Rate</span>
                      <span className="text-emerald-400 font-bold text-sm">87.4%</span>
                    </div>
                    <div className="flex items-end gap-1 h-10">
                      {[65, 72, 85, 78, 91, 83, 87, 89, 84].map((h, i) => (
                        <motion.div key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.75 + i * 0.04, duration: 0.35 }}
                          style={{ height: `${h}%` }}
                          className="flex-1 bg-gradient-to-t from-indigo-500 to-violet-400 rounded-sm origin-bottom opacity-75" />
                      ))}
                    </div>
                    <div className="flex justify-between text-[9px] text-white/25 mt-1.5">
                      {["J", "F", "M", "A", "M", "J", "J", "A", "S"].map(m => <span key={m}>{m}</span>)}
                    </div>
                  </div>
                </div>

                <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.85, type: "spring" }}
                  className="absolute -top-4 -right-4 bg-emerald-500 text-white rounded-2xl px-3 py-2 text-xs font-bold shadow-lg shadow-emerald-500/30 flex items-center gap-1.5">
                  <TrendingUp size={12} /> +12.4% Growth
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.95 }}
                  className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Award size={14} className="text-amber-400" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold">Accredited ERP</p>
                      <p className="text-white/45 text-[10px]">ISO 27001 Certified</p>
                    </div>
                  </div>
                </motion.div>
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

      {/* ── PORTALS ── */}
      <section id="portals" className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-sky-100 dark:border-sky-900">
              Role-Based Portals
            </span>
            <h2 className="text-4xl font-bold text-foreground font-display mb-4">Dedicated Experience for Every Role</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Five purpose-built portals ensure every stakeholder gets exactly the tools they need.</p>
          </motion.div>
          <div className="flex gap-2 justify-center flex-wrap mb-8">
            {PORTALS.map((p, i) => (
              <button key={i} onClick={() => setActivePortal(i)}
                className={cn("flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                  activePortal === i ? "gradient-brand text-white shadow-lg" : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted")}>
                <p.icon size={15} /> {p.role}
              </button>
            ))}
          </div>
          <motion.div key={activePortal} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-3xl p-8 lg:p-10 shadow-lg max-w-3xl mx-auto">
            <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${PORTALS[activePortal].color} px-4 py-2 rounded-2xl mb-6`}>
              {(() => { const Icon = PORTALS[activePortal].icon; return <Icon size={20} className="text-white" />; })()}
              <span className="text-white font-bold text-sm">{PORTALS[activePortal].role} Portal</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground font-display mb-3">{PORTALS[activePortal].role} Dashboard</h3>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">{PORTALS[activePortal].desc}</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {PORTALS[activePortal].features.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-muted/50 rounded-xl px-4 py-3">
                  <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{f}</span>
                </div>
              ))}
            </div>
            <Link to="/login"
              className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${PORTALS[activePortal].color} text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm shadow-md`}>
              Access {PORTALS[activePortal].role} Portal <ArrowRight size={15} />
            </Link>
          </motion.div>
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
                <Link to="/register"
                  className={cn("block w-full text-center py-3 rounded-xl text-sm font-bold transition-all",
                    i === 1
                      ? "gradient-brand text-white hover:opacity-90 shadow-md"
                      : "border-2 border-border text-foreground hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400"
                  )}>
                  {p.plan === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Link>
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
              <Link to="/register"
                className="flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-2xl hover:bg-white/90 transition-all shadow-lg text-sm">
                Start for Free <ArrowRight size={16} />
              </Link>
              <Link to="/login"
                className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all text-sm">
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

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
                {FOOTER_PLATFORM.map(item => (
                  <li key={item}>
                    <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2.5">
                {FOOTER_RESOURCES.map(item => (
                  <li key={item}>
                    <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2.5">
                {FOOTER_COMPANY.map(item => (
                  <li key={item}>
                    <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CampusLink. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <Link to="/login" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">Sign In</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
