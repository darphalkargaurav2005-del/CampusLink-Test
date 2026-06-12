import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Shield, GraduationCap, Users, BookOpen, BarChart3, Bell, MessageSquare,
  CheckCircle2, ArrowRight, Star, ChevronRight, Sun, Moon, Menu, X,
  Zap, Lock, Globe, TrendingUp, Calendar, Award, BookMarked, UserCheck,
  Layers, Sparkles, Play
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import heroCampus from "@/assets/hero-campus.jpg";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Portals", href: "#portals" },
  { label: "About", href: "#about" },
];

const FEATURES = [
  { icon: GraduationCap, title: "Student Management", desc: "Complete enrollment, attendance, results, and academic tracking with automated analytics.", color: "text-brand-600", bg: "bg-brand-50 dark:bg-brand-950/30" },
  { icon: UserCheck, title: "Digital Attendance", desc: "Real-time attendance marking with instant parent notifications and compliance alerts.", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Live charts, reports, and AI-powered insights for data-driven institutional decisions.", color: "text-sky-600", bg: "bg-sky-50 dark:bg-sky-950/30" },
  { icon: BookMarked, title: "Library System", desc: "Full-featured library with book issuing, returns, fine calculation, and inventory control.", color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-950/30" },
  { icon: MessageSquare, title: "Communication Hub", desc: "Seamless messaging between students, parents, teachers, and administration.", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/30" },
  { icon: Layers, title: "Fee Management", desc: "Automated fee collection, payment tracking, reminders, and receipt generation.", color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-950/30" },
  { icon: Calendar, title: "Scheduling", desc: "Dynamic timetable generation, teacher assignments, and resource optimization.", color: "text-teal-600", bg: "bg-teal-50 dark:bg-teal-950/30" },
  { icon: Sparkles, title: "AI Assistant", desc: "Built-in AI for question paper generation, performance analysis, and study assistance.", color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-950/30" },
];

const PORTALS = [
  { role: "Admin", icon: Shield, color: "from-violet-500 to-indigo-600", desc: "Full institutional control — manage students, teachers, fees, courses, and analytics.", features: ["User Management", "Fee Oversight", "Reports & Analytics", "Notice Management"] },
  { role: "Teacher", icon: GraduationCap, color: "from-sky-500 to-blue-600", desc: "Digital tools for attendance, marks entry, study material uploads, and AI assistance.", features: ["Digital Attendance", "Marks & Grades", "Study Materials", "AI Question Generator"] },
  { role: "Student", icon: BookOpen, color: "from-emerald-500 to-teal-600", desc: "Access results, timetable, assignments, notes, and personalized performance insights.", features: ["Attendance Reports", "Results & Grades", "Assignment Submission", "AI Study Assistant"] },
  { role: "Parent", icon: Users, color: "from-amber-500 to-orange-600", desc: "Monitor your child's progress, attendance, academic growth, and communicate with teachers.", features: ["Live Attendance Tracking", "Academic Progress", "Teacher Communication", "Growth Analytics"] },
  { role: "Librarian", icon: BookMarked, color: "from-rose-500 to-pink-600", desc: "Manage the full library lifecycle from books and categories to issuing, returns, and fines.", features: ["Book Catalog", "Issue & Returns", "Fine Management", "AI Library Assistant"] },
];

const STATS = [
  { value: "2,400+", label: "Active Students", icon: GraduationCap },
  { value: "180+", label: "Faculty Members", icon: UserCheck },
  { value: "15+", label: "Departments", icon: Globe },
  { value: "98%", label: "Satisfaction Rate", icon: Star },
];

const TESTIMONIALS = [
  { name: "Dr. Pradeep Srivastava", role: "Institute Director", quote: "CampusLink transformed how we manage our 2,400+ students. The real-time analytics are outstanding.", avatar: "P" },
  { name: "Prof. Meera Iyer", role: "Mathematics Faculty", quote: "The digital attendance and marks entry saves me hours each week. The AI question generator is a game-changer.", avatar: "M" },
  { name: "Aisha Sharma", role: "B.Tech Student", quote: "I can track my attendance, assignments and grades all in one place. The AI study assistant is incredibly helpful.", avatar: "A" },
];

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePortal, setActivePortal] = useState(0);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(0,0,0,0)", "rgba(255,255,255,0.95)"]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <motion.nav
        style={{ backgroundColor: theme === "dark" ? undefined : navBg as any }}
        className="fixed top-0 inset-x-0 z-50 border-b border-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-sm">
                <Shield size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg font-display text-foreground">CampusLink</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <a key={link.label} href={link.href} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/60 transition-all">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2.5 rounded-xl border border-border hover:bg-muted transition-colors hidden md:flex">
                {theme === "light" ? <Moon size={16} className="text-muted-foreground" /> : <Sun size={16} className="text-muted-foreground" />}
              </button>
              <Link to="/login" className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold gradient-brand text-white rounded-xl hover:opacity-90 transition-opacity shadow-sm">
                Sign In <ArrowRight size={14} />
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2.5 rounded-xl border border-border hover:bg-muted transition-colors">
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="md:hidden border-t border-border bg-background px-4 py-4 space-y-2">
            {NAV_LINKS.map(link => (
              <a key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors">
                {link.label}
              </a>
            ))}
            <Link to="/login" className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold gradient-brand text-white rounded-xl mt-2">
              Sign In <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}
      </motion.nav>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={heroCampus} alt="Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text Content */}
            <div>
              {/* Badge */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/90 text-xs font-semibold uppercase tracking-widest">Next-Gen College ERP</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-5xl xl:text-6xl font-bold text-white font-display leading-[1.05] mb-6">
                Smarter College<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">Management</span>
                <br />Starts Here
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
                CampusLink unifies your entire institution — students, teachers, parents, and administration — on one powerful, intelligent platform.
              </motion.p>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                className="flex flex-wrap items-center gap-3 mb-10">
                <Link to="/login"
                  className="flex items-center gap-2 px-6 py-3.5 gradient-brand text-white font-semibold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-indigo-500/25 text-sm">
                  Get Started Free <ArrowRight size={16} />
                </Link>
                <button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all text-sm">
                  <Play size={14} className="fill-white" /> See Features
                </button>
              </motion.div>

              {/* Trust badges */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                className="flex items-center gap-4 flex-wrap">
                {["No Credit Card", "GDPR Compliant", "99.9% Uptime"].map((badge, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-white/60 text-xs">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>{badge}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right - Stats Cards */}
            <div className="hidden lg:block">
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="relative">
                {/* Main card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-2xl gradient-brand flex items-center justify-center">
                      <BarChart3 size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Live Dashboard</p>
                      <p className="text-white/50 text-xs">Real-time institutional metrics</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-400 text-xs font-medium">Live</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {STATS.map((s, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.08 }}
                        className="bg-white/10 rounded-2xl p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <s.icon size={14} className="text-white/60" />
                          <span className="text-white/60 text-xs">{s.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-white font-display">{s.value}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mini chart bars */}
                  <div className="bg-white/5 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/60 text-xs font-medium">Attendance Rate</span>
                      <span className="text-emerald-400 font-bold text-sm">87.4%</span>
                    </div>
                    <div className="flex items-end gap-1 h-12">
                      {[65, 72, 85, 78, 91, 83, 87].map((h, i) => (
                        <motion.div key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.7 + i * 0.05, duration: 0.4 }}
                          style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-indigo-500 to-violet-400 rounded-sm origin-bottom opacity-80" />
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-white/30 mt-1.5">
                      {["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"].map(m => <span key={m}>{m}</span>)}
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -top-4 -right-4 bg-emerald-500 text-white rounded-2xl px-3 py-2 text-xs font-bold shadow-lg shadow-emerald-500/30 flex items-center gap-1.5">
                  <TrendingUp size={12} /> +12.4% Growth
                </motion.div>

                {/* Second floating element */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}
                  className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <Award size={14} className="text-amber-400" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">Accredited ERP</p>
                      <p className="text-white/50 text-[10px]">ISO 27001 Certified</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="relative z-10 border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { value: "2,400+", label: "Active Students", icon: GraduationCap, color: "text-brand-600" },
              { value: "180+", label: "Faculty Members", icon: UserCheck, color: "text-sky-600" },
              { value: "15+", label: "Departments", icon: Globe, color: "text-emerald-600" },
              { value: "98%", label: "Satisfaction Rate", icon: Star, color: "text-amber-500" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-1.5 py-8 px-4">
                <s.icon size={20} className={cn("mb-1", s.color)} />
                <p className={cn("text-3xl font-bold font-display", s.color)}>{s.value}</p>
                <p className="text-sm text-muted-foreground text-center">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
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

      {/* ==================== PORTALS SECTION ==================== */}
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
                className={cn("flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all", activePortal === i ? "gradient-brand text-white shadow-lg" : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted")}>
                <p.icon size={15} />
                {p.role}
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

      {/* ==================== TESTIMONIALS ==================== */}
      <section id="about" className="py-20 lg:py-28">
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
                  <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white font-bold">
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

      {/* ==================== CTA ==================== */}
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
              <Link to="/login"
                className="flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-2xl hover:bg-white/90 transition-all shadow-lg text-sm">
                Start for Free <ArrowRight size={16} />
              </Link>
              <Link to="/login"
                className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all text-sm">
                View Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-card border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                <Shield size={15} className="text-white" />
              </div>
              <span className="font-bold text-foreground font-display">CampusLink</span>
              <span className="text-muted-foreground text-sm ml-1">— Modern College ERP</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with precision for educational excellence.
            </p>
            <div className="flex items-center gap-4">
              <button onClick={toggleTheme} className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                {theme === "light" ? <Moon size={15} className="text-muted-foreground" /> : <Sun size={15} className="text-muted-foreground" />}
              </button>
              <Link to="/login" className="text-sm font-semibold text-primary hover:underline">Sign In</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
