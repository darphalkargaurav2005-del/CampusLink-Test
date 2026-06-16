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
import Modal from "@/components/features/Modal";

/* ─── NAV DATA ─────────────────────────────────────────── */
const PLATFORM_ITEMS = [
  { label: "Students", href: "/login", icon: GraduationCap, desc: "Grades, attendance & assignments" },
  { label: "Parents", href: "/login", icon: Users, desc: "Monitor child's academic progress" },
  { label: "Institute", href: "/login", icon: Building2, desc: "Admin & institutional control" },
  { label: "Teachers", href: "/login", icon: BookUser, desc: "Classes, marks & materials" },
  { label: "Librarian", href: "/login", icon: BookOpen, desc: "Books, issuing & fine management" },
];

const RESOURCES_ITEMS = [
  { label: "Blog", href: "#", icon: Newspaper, desc: "Latest news & updates", modalKey: "blog" },
  { label: "FAQ", href: "#", icon: HelpCircle, desc: "Frequently asked questions", modalKey: "faq" },
  { label: "Career Guidance", href: "#", icon: Compass, desc: "Student career pathways", modalKey: "career" },
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
  onItemClick,
}: {
  label: string;
  items: { label: string; href: string; icon: any; desc: string; modalKey?: string }[];
  onItemClick?: (modalKey: string) => void;
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

              if (item.modalKey && onItemClick) {
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setOpen(false);
                      onItemClick(item.modalKey!);
                    }}
                    className="flex items-start gap-3 w-full px-4 py-3 hover:bg-muted/60 transition-colors text-left"
                  >
                    {content}
                  </button>
                );
              }

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
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePortal, setActivePortal] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState<"blog" | "faq" | "career" | "tutors" | "courses" | null>(null);

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
        (scrolled || mobileMenuOpen)
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
              <span className={cn("font-bold text-lg font-display transition-colors", (scrolled || mobileMenuOpen) ? "text-foreground" : "text-white")}>
                CampusLink
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {/* Platform dropdown */}
              <div className={cn("transition-colors", !(scrolled || mobileMenuOpen) && "[&_button]:text-white/80 [&_button:hover]:text-white [&_button:hover]:bg-white/10")}>
                <NavDropdown label="Platform" items={PLATFORM_ITEMS} />
              </div>

              {["Courses", "Tutors", "Pricing"].map(label => {
                if (label === "Pricing") {
                  return (
                    <a
                      key={label}
                      href="#pricing"
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-lg transition-all",
                        (scrolled || mobileMenuOpen)
                          ? "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {label}
                    </a>
                  );
                }
                const modalKey = label === "Courses" ? "courses" : "tutors";
                return (
                  <button
                    key={label}
                    onClick={() => setActiveModal(modalKey)}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-lg transition-all text-left",
                      (scrolled || mobileMenuOpen)
                        ? "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {label}
                  </button>
                );
              })}

              {/* Resources dropdown */}
              <div className={cn("transition-colors", !(scrolled || mobileMenuOpen) && "[&_button]:text-white/80 [&_button:hover]:text-white [&_button:hover]:bg-white/10")}>
                <NavDropdown label="Resources" items={RESOURCES_ITEMS} onItemClick={(key) => setActiveModal(key as any)} />
              </div>

              <a
                href="#about"
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-all",
                  (scrolled || mobileMenuOpen)
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
                  (scrolled || mobileMenuOpen)
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
                  (scrolled || mobileMenuOpen)
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
                (scrolled || mobileMenuOpen)
                  ? "border-border hover:bg-muted text-foreground"
                  : "border-white/20 hover:bg-white/10 text-white"
              )}
            >
              {mobileMenuOpen
                ? <X size={18} />
                : <Menu size={18} />
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
                {["Courses", "Tutors", "Pricing", "About"].map(l => {
                  if (l === "Pricing" || l === "About") {
                    return (
                      <a key={l} href={l === "Pricing" ? "#pricing" : "#about"} onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors">
                        {l}
                      </a>
                    );
                  }
                  const modalKey = l === "Courses" ? "courses" : "tutors";
                  return (
                    <button key={l} onClick={() => { setMobileMenuOpen(false); setActiveModal(modalKey); }}
                      className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors">
                      {l}
                    </button>
                  );
                })}
                <div className="border-t border-border my-2" />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-3 mb-2">Resources</p>
                {RESOURCES_ITEMS.map((item, i) => (
                  <button key={i} onClick={() => { setMobileMenuOpen(false); setActiveModal(item.modalKey as any); }}
                    className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors">
                    <item.icon size={16} className="text-brand-500" />
                    {item.label}
                  </button>
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
            <div className="lg:col-span-12 text-center flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-7">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/85 text-xs font-bold uppercase tracking-widest">Next-Gen College ERP Platform</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                className="text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white font-display leading-[1.04] mb-6 text-center">
                Smarter College
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-300">
                  Management
                </span>
                <br />
                Starts Here
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-white/65 text-lg leading-relaxed mb-8 max-w-2xl mx-auto text-center">
                CampusLink unifies your entire institution — students, teachers, parents, and administration — on one powerful, intelligent platform.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
                className="flex flex-wrap items-center justify-center gap-3 mb-9">
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
                className="flex items-center justify-center gap-5 flex-wrap">
                {["No Credit Card Required", "GDPR Compliant", "99.9% Uptime SLA"].map((badge, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-white/55 text-xs">
                    <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                    <span>{badge}</span>
                  </div>
                ))}
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

      {/* ── RESOURCE MODALS ── */}
      <Modal
        open={activeModal === "faq"}
        onClose={() => setActiveModal(null)}
        title="Frequently Asked Questions (FAQ)"
        subtitle="Common questions about the CampusLink college ERP platform"
        size="lg"
      >
        <div className="space-y-3">
          {[
            { q: "What is CampusLink?", a: "CampusLink is an AI-powered college ERP and Learning Management System designed to unify administrators, teachers, students, and parents." },
            { q: "How can parents get access to the portal?", a: "Parents are registered by the college administration. Once registered, they will receive login credentials to monitor attendance and grades." },
            { q: "Is the AI Assistant free to use for students?", a: "Yes! The AI assistant is a built-in feature designed to help students with questions, schedules, study plans, and performance analysis." },
            { q: "How secure is my data on the platform?", a: "We take security seriously. CampusLink utilizes end-to-end SSL encryption, role-based strict page route guards, and is fully ISO 27001 certified." }
          ].map((f, i) => (
            <div key={i} className="p-3 bg-muted/40 rounded-xl border border-border/50">
              <p className="font-semibold text-sm text-foreground">{f.q}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={activeModal === "blog"}
        onClose={() => setActiveModal(null)}
        title="CampusLink Insights Blog"
        subtitle="Recent news, academic studies, and product updates"
        size="lg"
      >
        <div className="space-y-4">
          {[
            { title: "AI in Modern Classrooms: The Future of Grading", date: "June 12, 2026", author: "Academic Office", excerpt: "Discover how teachers are using automated intelligence tools to evaluate marks and generate custom question banks using CampusLink AI." },
            { title: "Connecting Parents with Academic Analytics", date: "May 28, 2026", author: "Liaison Officer", excerpt: "Learn how our live parent portal helps bridge the communication gap between faculty and families, providing live insights on student growth." },
            { title: "Digital Libraries: Restructuring Campus Knowledge", date: "May 15, 2026", author: "Library Committee", excerpt: "Explore the new librarian dashboard features for real-time returns tracking, automated cataloging, and instant fine collection notifications." }
          ].map((b, i) => (
            <div key={i} className="p-4 bg-muted/30 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors">
              <span className="text-[10px] text-primary font-medium">{b.date} • By {b.author}</span>
              <h4 className="font-bold text-sm text-foreground mt-1 leading-snug hover:text-primary transition-colors cursor-pointer">{b.title}</h4>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{b.excerpt}</p>
              <button className="text-xs text-primary font-semibold hover:underline mt-2.5 flex items-center gap-1">Read article <ArrowRight size={12} /></button>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={activeModal === "career"}
        onClose={() => setActiveModal(null)}
        title="Student Career Guidance Pathways"
        subtitle="Recommended tracks and key capabilities for software engineering, analysis, and networks"
        size="lg"
      >
        <div className="space-y-4">
          {[
            { track: "Full Stack Web Engineering", skills: "React, TypeScript, Node.js, DSA, System Design", courses: "CS401 Web Development, CS301 Data Structures", desc: "Focuses on building modern, scalable responsive interfaces and reliable back-end databases." },
            { track: "Data Science & AI Analyst", skills: "Python, Machine Learning, Applied Calculus, DBMS", courses: "CS302 Database Systems, MA301 Engineering Math", desc: "Focuses on statistical modeling, data visualization, predictive analytics, and machine learning structures." },
            { track: "Computer Networking & Cybersecurity", skills: "ISO/OSI model, Cryptography, Firewalls, TCP/IP", courses: "CS301 Data Structures, Computer Networks (CS-Shelf)", desc: "Focuses on network administration, secure information channels, encryption protocols, and server routing." }
          ].map((c, i) => (
            <div key={i} className="p-3.5 bg-muted/40 rounded-xl border border-border/50 hover:border-primary/40 transition-colors">
              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-1.5 py-0.5 rounded-full uppercase">Career Pathway</span>
              <h4 className="font-bold text-sm text-foreground mt-2 leading-snug">{c.track}</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.desc}</p>
              <div className="mt-3 text-xs space-y-1">
                <p><strong>Required Skills:</strong> <span className="text-muted-foreground">{c.skills}</span></p>
                <p><strong>Recommended Courses:</strong> <span className="text-primary font-medium">{c.courses}</span></p>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={activeModal === "tutors"}
        onClose={() => setActiveModal(null)}
        title="Verified Campus Tutors"
        subtitle="Department professors available for academic sessions"
        size="lg"
      >
        <div className="space-y-4">
          {[
            { name: "Dr. Anand Kumar", dept: "Computer Science", spec: "Data Structures, Algorithms", time: "Mon, Wed, Fri 4:00 - 5:00 PM", initial: "A", color: "bg-sky-500" },
            { name: "Prof. Meera Iyer", dept: "Mathematics", spec: "Calculus, Linear Algebra", time: "Tue, Thu 3:00 - 4:30 PM", initial: "M", color: "bg-violet-500" },
            { name: "Mr. Ravi Shankar", dept: "Electronics", spec: "Digital Logic, Microprocessors", time: "Mon, Thu 2:00 - 3:30 PM", initial: "R", color: "bg-emerald-500" },
            { name: "Mr. Kartik Verma", dept: "Computer Science", spec: "Web Development, DBMS", time: "Wed, Fri 1:30 - 3:00 PM", initial: "K", color: "bg-amber-500" }
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl hover:bg-muted/70 transition-colors border border-border/50">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${t.color}`}>
                {t.initial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.dept} Department</p>
                <p className="text-xs text-foreground mt-1"><strong>Specializes in:</strong> {t.spec}</p>
                <p className="text-[11px] text-primary mt-0.5"><strong>Availability:</strong> {t.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={activeModal === "courses"}
        onClose={() => setActiveModal(null)}
        title="CampusLink Key Subjects & Courses"
        subtitle="Core engineering and sciences subjects available in the ERP curriculum"
        size="lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { code: "CS301", title: "Data Structures & Algorithms", credits: 4, sem: 5, desc: "Fundamental data structures and algorithm design." },
            { code: "CS302", title: "Database Management Systems", credits: 3, sem: 5, desc: "Relational design, normalization, SQL, indexing." },
            { code: "CS401", title: "Web Development", credits: 3, sem: 7, desc: "Modern full-stack web applications with React & Node." },
            { code: "EC301", title: "Digital Electronics", credits: 3, sem: 5, desc: "Combinational and sequential logic circuit design." },
            { code: "PH101", title: "Engineering Physics", credits: 3, sem: 1, desc: "Wave mechanics, optics, and quantum basics." },
            { code: "MA301", title: "Engineering Mathematics III", credits: 4, sem: 5, desc: "Calculus, linear algebra, and complex variables." }
          ].map((c, i) => (
            <div key={i} className="p-3.5 bg-muted/40 rounded-xl border border-border/50 flex flex-col justify-between hover:border-primary/40 transition-colors">
              <div>
                <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded-full uppercase">{c.code} • {c.credits} Credits</span>
                <h4 className="font-bold text-sm text-foreground mt-1.5 leading-snug">{c.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.desc}</p>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 font-medium">Semester {c.sem}</p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
