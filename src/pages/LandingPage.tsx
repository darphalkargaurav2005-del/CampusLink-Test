import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, GraduationCap, Users, BookOpen, BarChart3, Bell, MessageSquare,
  CheckCircle2, ArrowRight, ArrowLeft, Star, Sun, Moon, Menu, X,
  Globe, TrendingUp, Calendar, Award, BookMarked, UserCheck,
  Layers, Sparkles, Play, ChevronDown, Building2, BookUser,
  DollarSign, Phone, Mail, FileText, HelpCircle, Briefcase,
  Info, Lock, FileTerminal, Cpu, Newspaper, Compass, Users2, PlayCircle, Eye, Download, Presentation,
  Search, Clock, Check,
  Twitter, Github, Linkedin, Facebook, Instagram
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { hasPermission, type FeatureKey } from "@/lib/permissions";
import { ROLE_DASHBOARD_PATHS } from "@/lib/auth";
import heroCampus from "@/assets/hero-campus.png";
import Modal from "@/components/features/Modal";
import { toast } from "sonner";

// Import custom public subpages
import StudentManagementFeature from "./public/StudentManagementFeature";
import TeacherManagementFeature from "./public/TeacherManagementFeature";
import AttendanceFeature from "./public/AttendanceFeature";
import LibraryFeature from "./public/LibraryFeature";
import FeesFeature from "./public/FeesFeature";
import ResultsFeature from "./public/ResultsFeature";
import CookiePolicyPage from "./public/CookiePolicyPage";
import SecurityPolicyPage from "./public/SecurityPolicyPage";

// Import refactored resources components
import AcademicCalendarResource from "./public/AcademicCalendarResource";
import EventsResource from "./public/EventsResource";
import NoticesResource from "./public/NoticesResource";
import HelpCenterResource from "./public/HelpCenterResource";
import ScholarshipsResource from "./public/ScholarshipsResource";
import CareerResource from "./public/CareerResource";
import BlogResource from "./public/BlogResource";
import CommunityResource from "./public/CommunityResource";

/* ─── NAV DATA ─────────────────────────────────────────── */
const RESOURCES_ITEMS = [
  { label: "Blog", href: "/resources/blog/education-news", icon: Newspaper, desc: "Latest news & updates" },
  { label: "FAQ", href: "/resources/help-center/faq", icon: HelpCircle, desc: "Frequently asked questions" },
  { label: "Career Guidance", href: "/resources/career/career-counseling", icon: Compass, desc: "Student career pathways" },
];

const FOOTER_RESOURCES = ["Blog", "FAQ", "Tutors", "Community", "Scholarships", "Courses", "Career Guidance"];
const FOOTER_COMPANY = ["About Us", "Contact", "Privacy Policy", "Terms of Service"];



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
  const { user, updateUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleFeatureClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();

    const featureMap: Record<string, FeatureKey> = {
      "/features/student-management": "student-management",
      "/features/teacher-management": "teacher-management",
      "/features/attendance": "attendance",
      "/features/library": "library",
      "/features/fees": "fees",
      "/features/results": "results",
      "/courses": "courses"
    };

    const feature = featureMap[path];
    if (!feature) {
      navigate(path);
      return;
    }

    if (!isAuthenticated || !user) {
      if (path.includes("attendance")) {
        toast.error("Please login to continue.");
      } else {
        toast.error("Please login to access this feature.");
      }
      navigate("/login", { state: { from: path } });
      return;
    }

    if (!hasPermission(user.role, feature)) {
      toast.error("You do not have permission to access this page.");
      navigate(ROLE_DASHBOARD_PATHS[user.role]);
      return;
    }

    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePortal, setActivePortal] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [selectedCheckoutPlan, setSelectedCheckoutPlan] = useState<any | null>(null);
  const userPlan = user?.plan || null;

  // --- Auto-redirect for Dashboard ---
  useEffect(() => {
    if (pathname === "/dashboard") {
      if (user) {
        navigate(`/${user.role}/dashboard`, { replace: true });
      } else {
        toast.info("Please sign in to access your dashboard.");
        navigate("/login", { replace: true });
      }
    }
  }, [pathname, user, navigate]);

  // --- Tutors Subpage States ---
  const [tutorSearch, setTutorSearch] = useState("");
  const [selectedTutorDept, setSelectedTutorDept] = useState("All");
  const [tutorInquiryName, setTutorInquiryName] = useState("");
  const [tutorInquiryEmail, setTutorInquiryEmail] = useState("");
  const [tutorInquiryTutor, setTutorInquiryTutor] = useState("");
  const [tutorInquiryMsg, setTutorInquiryMsg] = useState("");

  // --- Career Guidance States ---
  const [activeCareerTrack, setActiveCareerTrack] = useState(0);

  // --- FAQ States ---
  const [faqSearch, setFaqSearch] = useState("");
  const [faqOpenIndex, setFaqOpenIndex] = useState<Record<number, boolean>>({});
  const [faqInquiryName, setFaqInquiryName] = useState("");
  const [faqInquiryEmail, setFaqInquiryEmail] = useState("");
  const [faqInquiryCategory, setFaqInquiryCategory] = useState("Technical");
  const [faqInquiryMsg, setFaqInquiryMsg] = useState("");

  // --- Courses States ---
  const [coursesSearch, setCoursesSearch] = useState("");
  const [selectedCourseSem, setSelectedCourseSem] = useState("All");
  const [courseInquiryName, setCourseInquiryName] = useState("");
  const [courseInquirySem, setCourseInquirySem] = useState("");
  const [courseInquiryElective, setCourseInquiryElective] = useState("");
  const [courseInquiryMsg, setCourseInquiryMsg] = useState("");

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


              {["Courses", "Tutors", "Pricing"].map(label => {
                const path = label === "Courses" ? "/courses" : label === "Tutors" ? "/tutors" : "/pricing";
                return (
                  <Link
                    key={label}
                    to={path}
                    onClick={() => {
                      if (pathname === path) {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
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
                onClick={() => {
                  if (pathname === "/about") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
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
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 mr-1 hidden sm:flex">
                    <span className="text-xs font-medium text-muted-foreground">
                      Logged in as: <span className="text-foreground font-bold">{user.name}</span>
                      <span className="text-[9px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full ml-2 inline-flex items-center gap-1">
                        {user.role === "admin" && <Shield size={9} />}
                        {user.role === "teacher" && <GraduationCap size={9} />}
                        {user.role === "student" && <BookOpen size={9} />}
                        {user.role === "parent" && <Users size={9} />}
                        {user.role === "librarian" && <BookMarked size={9} />}
                        {user.role}
                      </span>
                    </span>
                  </div>
                  <Link
                    to={`/${user.role}/dashboard`}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/60 transition-all"
                  >
                    Dashboard
                    <div className="w-6 h-6 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-[10px] overflow-hidden shadow-sm flex-shrink-0">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        user.name.charAt(0)
                      )}
                    </div>
                  </Link>
                </div>
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
                {["Courses", "Tutors", "Pricing", "About"].map(l => {
                  let path = "/";
                  if (l === "Pricing") path = "/pricing";
                  else if (l === "About") path = "/about";
                  else if (l === "Courses") path = "/courses";
                  else if (l === "Tutors") path = "/tutors";

                  return (
                    <Link key={l} to={path} onClick={() => {
                      setMobileMenuOpen(false);
                      if (pathname === path) {
                        window.scrollTo({ top: 0, behavior: "smooth" });
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
                <div className="flex flex-col gap-2.5 pt-1">
                  {user ? (
                    <>
                      <div className="flex items-center gap-2.5 text-xs text-muted-foreground px-3 py-2 bg-muted/40 border border-border rounded-xl">
                        <div className="w-7 h-7 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-xs overflow-hidden shadow-sm flex-shrink-0">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            user.name.charAt(0)
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] leading-none text-muted-foreground">Logged in as</p>
                          <p className="text-xs font-bold text-foreground truncate mt-0.5">{user.name}</p>
                        </div>
                        <span className="text-[9px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full ml-auto inline-flex items-center gap-1 flex-shrink-0">
                          {user.role === "admin" && <Shield size={9} />}
                          {user.role === "teacher" && <GraduationCap size={9} />}
                          {user.role === "student" && <BookOpen size={9} />}
                          {user.role === "parent" && <Users size={9} />}
                          {user.role === "librarian" && <BookMarked size={9} />}
                          {user.role}
                        </span>
                      </div>
                      <Link to={`/${user.role}/dashboard`} onClick={() => setMobileMenuOpen(false)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 gradient-brand text-white rounded-xl text-sm font-semibold">
                        Go to Dashboard <ArrowRight size={14} />
                      </Link>
                    </>
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
            {pathname === "/faq" && (
              <div className="space-y-12">
                {/* Section 1: Page Header & Search */}
                <div className="text-center">
                  <span className="inline-block bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-indigo-100 dark:border-indigo-900 shadow-sm">
                    FAQs
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-display mb-2">Frequently Asked Questions</h1>
                  <p className="text-muted-foreground text-sm max-w-lg mx-auto">Have questions about the CampusLink platform? Browse through our detailed FAQs or submit a support inquiry.</p>
                  
                  <div className="relative max-w-md mx-auto mt-6">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search FAQ articles..."
                      value={faqSearch}
                      onChange={(e) => setFaqSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                    />
                  </div>
                </div>

                {/* Section 2: General Platform FAQs */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <Shield className="w-5 h-5 text-indigo-500" />
                    <h2 className="text-lg font-bold text-foreground">General Platform & Access</h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      { id: 1, q: "What is CampusLink and who is it for?", a: "CampusLink is an AI-powered next-generation college ERP and Learning Management System designed to unify administrators, teachers, students, and parents onto one single secure portal." },
                      { id: 2, q: "How do I get my login credentials?", a: "Credentials are created and managed by your college administration office. Students, teachers, and parents will receive registration details via email once approved." },
                      { id: 3, q: "Is there a mobile app available?", a: "CampusLink is built as a fully responsive web application, meaning it operates smoothly and feels native on all iOS, Android, and tablet browsers without installing external packages." }
                    ].filter(f => f.q.toLowerCase().includes(faqSearch.toLowerCase()) || f.a.toLowerCase().includes(faqSearch.toLowerCase())).map((f) => (
                      <div key={f.id} className="p-4 bg-card rounded-2xl border border-border shadow-sm text-left">
                        <button
                          onClick={() => setFaqOpenIndex(prev => ({ ...prev, [f.id]: !prev[f.id] }))}
                          className="w-full flex justify-between items-center text-left font-semibold text-sm text-foreground hover:text-primary transition-colors"
                        >
                          <span>{f.q}</span>
                          <ChevronDown size={14} className={cn("transition-transform duration-200", faqOpenIndex[f.id] && "rotate-180")} />
                        </button>
                        {(!faqSearch || faqOpenIndex[f.id]) && (
                          <p className="text-xs text-muted-foreground mt-2 leading-relaxed border-t border-border/40 pt-2">{f.a}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Academic & Admissions FAQs */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <GraduationCap className="w-5 h-5 text-indigo-500" />
                    <h2 className="text-lg font-bold text-foreground">Academic Cycles & Grade Cards</h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      { id: 4, q: "When are attendance percentage levels updated?", a: "Faculty members mark attendance digitally after every class hour. The students' and parents' dashboards update percentage bars in real-time." },
                      { id: 5, q: "How are mid-semester grades calculated?", a: "Mid-semester grading aggregates assignment score sheets, mock exams, and quiz components in accordance with college credit weighting guidelines." },
                      { id: 6, q: "Can elective course registrations be updated?", a: "Yes, elective subjects can be modified during the initial 2 weeks of the semester via the student portal under core course list settings." }
                    ].filter(f => f.q.toLowerCase().includes(faqSearch.toLowerCase()) || f.a.toLowerCase().includes(faqSearch.toLowerCase())).map((f) => (
                      <div key={f.id} className="p-4 bg-card rounded-2xl border border-border shadow-sm text-left">
                        <button
                          onClick={() => setFaqOpenIndex(prev => ({ ...prev, [f.id]: !prev[f.id] }))}
                          className="w-full flex justify-between items-center text-left font-semibold text-sm text-foreground hover:text-primary transition-colors"
                        >
                          <span>{f.q}</span>
                          <ChevronDown size={14} className={cn("transition-transform duration-200", faqOpenIndex[f.id] && "rotate-180")} />
                        </button>
                        {(!faqSearch || faqOpenIndex[f.id]) && (
                          <p className="text-xs text-muted-foreground mt-2 leading-relaxed border-t border-border/40 pt-2">{f.a}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Technical & Security FAQs */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <Lock className="w-5 h-5 text-indigo-500" />
                    <h2 className="text-lg font-bold text-foreground">Technical Specifications & Security</h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      { id: 7, q: "What data encryption standards are used?", a: "All communication is routed over SSL. Core student records and grades database columns are encrypted at rest under AES-256 protocols." },
                      { id: 8, q: "Is the AI Assistant compliance checked?", a: "Yes, our integrated AI helpers use restricted model outputs aligned with university study guidelines, preserving academic integrity." }
                    ].filter(f => f.q.toLowerCase().includes(faqSearch.toLowerCase()) || f.a.toLowerCase().includes(faqSearch.toLowerCase())).map((f) => (
                      <div key={f.id} className="p-4 bg-card rounded-2xl border border-border shadow-sm text-left">
                        <button
                          onClick={() => setFaqOpenIndex(prev => ({ ...prev, [f.id]: !prev[f.id] }))}
                          className="w-full flex justify-between items-center text-left font-semibold text-sm text-foreground hover:text-primary transition-colors"
                        >
                          <span>{f.q}</span>
                          <ChevronDown size={14} className={cn("transition-transform duration-200", faqOpenIndex[f.id] && "rotate-180")} />
                        </button>
                        {(!faqSearch || faqOpenIndex[f.id]) && (
                          <p className="text-xs text-muted-foreground mt-2 leading-relaxed border-t border-border/40 pt-2">{f.a}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 5: Direct Support Helpdesk Contact Form */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-md text-left">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-indigo-500" />
                    <div>
                      <h3 className="font-bold text-sm text-foreground">Submit Helpdesk Ticket</h3>
                      <p className="text-xs text-muted-foreground">Can't find your answers? Raise a priority ticket directly to administration support.</p>
                    </div>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Helpdesk ticket submitted successfully! Check your email for status responses.");
                    setFaqInquiryName("");
                    setFaqInquiryEmail("");
                    setFaqInquiryMsg("");
                  }} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Your Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={faqInquiryName}
                          onChange={(e) => setFaqInquiryName(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Your Email</label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={faqInquiryEmail}
                          onChange={(e) => setFaqInquiryEmail(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Inquiry Category</label>
                      <select
                        value={faqInquiryCategory}
                        onChange={(e) => setFaqInquiryCategory(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                      >
                        <option value="Technical">Technical & Login Issues</option>
                        <option value="Academic">Academics & Courses</option>
                        <option value="Billing">Fee Payments & Invoices</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Detailed Message</label>
                      <textarea
                        rows={3}
                        placeholder="Please outline your issue in detail..."
                        value={faqInquiryMsg}
                        onChange={(e) => setFaqInquiryMsg(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary resize-none text-foreground"
                        required
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 gradient-brand text-white rounded-xl text-xs font-bold hover:opacity-90 transition-opacity shadow-sm">
                      Submit Ticket
                    </button>
                  </form>
                </div>
              </div>
            )}

            {pathname === "/tutors" && (
              <div className="space-y-12">
                {/* Section 1: Page Header & Dynamic Search / Filters */}
                <div className="text-center">
                  <span className="inline-block bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-violet-100 dark:border-violet-900 shadow-sm">
                    Tutors
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-display mb-2">Expert Campus Tutors</h1>
                  <p className="text-muted-foreground text-sm max-w-lg mx-auto">Get connected with experienced department professors for dedicated subject counseling, remedial labs, and research advice.</p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mt-6">
                    <div className="relative w-full sm:max-w-xs">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search by name or skill..."
                        value={tutorSearch}
                        onChange={(e) => setTutorSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-card border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                      />
                    </div>
                    <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                      {["All", "Computer Science", "Mathematics", "Electronics"].map((dept) => (
                        <button
                          key={dept}
                          onClick={() => setSelectedTutorDept(dept)}
                          className={cn(
                            "px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap",
                            selectedTutorDept === dept
                              ? "bg-brand-600 text-white dark:bg-brand-500"
                              : "bg-muted hover:bg-muted/80 text-muted-foreground"
                          )}
                        >
                          {dept}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 2: Featured Tutors Directory */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <h2 className="text-lg font-bold text-foreground">Featured Professors</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: "Dr. Anand Kumar", dept: "Computer Science", spec: "Data Structures, Algorithms", time: "Mon, Wed, Fri 4:00 - 5:00 PM", initial: "A", color: "bg-sky-500", rating: 4.9, reviews: 120 },
                      { name: "Prof. Meera Iyer", dept: "Mathematics", spec: "Calculus, Linear Algebra", time: "Tue, Thu 3:00 - 4:30 PM", initial: "M", color: "bg-violet-500", rating: 4.8, reviews: 98 },
                      { name: "Mr. Ravi Shankar", dept: "Electronics", spec: "Digital Logic, Microprocessors", time: "Mon, Thu 2:00 - 3:30 PM", initial: "R", color: "bg-emerald-500", rating: 4.7, reviews: 75 },
                      { name: "Mr. Kartik Verma", dept: "Computer Science", spec: "Web Development, DBMS", time: "Wed, Fri 1:30 - 3:00 PM", initial: "K", color: "bg-amber-500", rating: 4.9, reviews: 88 }
                    ]
                      .filter(t => (selectedTutorDept === "All" || t.dept === selectedTutorDept))
                      .filter(t => (t.name.toLowerCase().includes(tutorSearch.toLowerCase()) || t.spec.toLowerCase().includes(tutorSearch.toLowerCase())))
                      .map((t, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-card rounded-2xl border border-border shadow-card hover:border-primary/45 transition-colors text-left">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base ${t.color} flex-shrink-0 shadow-sm`}>
                            {t.initial}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">{t.name}</p>
                              <span className="flex items-center gap-0.5 text-[10px] text-amber-500 font-bold shrink-0">
                                <Star size={10} className="fill-amber-500" /> {t.rating}
                              </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground font-medium">{t.dept} Dept</p>
                            <p className="text-xs text-foreground mt-2"><strong>Specializes in:</strong> {t.spec}</p>
                            <p className="text-[10px] text-primary mt-1"><strong>Availability:</strong> {t.time}</p>
                            <button
                              onClick={() => {
                                setTutorInquiryTutor(t.name);
                                document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
                              }}
                              className="mt-3 text-[10px] bg-brand-50 hover:bg-brand-100 text-brand-700 dark:bg-brand-950 dark:hover:bg-brand-900 dark:text-brand-300 px-3 py-1.5 rounded-lg font-bold border border-brand-100 dark:border-brand-900 transition-colors w-full"
                            >
                              Request Booking
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Section 3: Department Specializations Directory */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <Layers className="w-5 h-5 text-indigo-500" />
                    <h2 className="text-lg font-bold text-foreground">Department Research & Labs</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                    <div className="p-4 bg-muted/40 rounded-xl border border-border">
                      <p className="font-bold text-xs text-foreground animate-fade">AI & Computation Lab</p>
                      <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">Focus on machine vision algorithms, NLP modeling architectures, and deep neural arrays.</p>
                    </div>
                    <div className="p-4 bg-muted/40 rounded-xl border border-border">
                      <p className="font-bold text-xs text-foreground animate-fade">Advanced Mathematics Cell</p>
                      <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">Research in multivariable systems, calculus modeling, statistics, and cryptographic algebra.</p>
                    </div>
                    <div className="p-4 bg-muted/40 rounded-xl border border-border">
                      <p className="font-bold text-xs text-foreground animate-fade">Micro-processing & VLSI Hub</p>
                      <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">Integrated chip designs, digital signal interfaces, micro-controllers, and sensor arrays.</p>
                    </div>
                  </div>
                </div>

                {/* Section 4: Tutoring Guidelines & Code of Conduct */}
                <div className="bg-card border border-border rounded-2xl p-5 text-left">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
                    <BookUser className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-sm text-foreground">Session Guidelines & Honor Code</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <p className="flex items-start gap-2 text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Sessions are limited to 45 minutes of academic query resolution.</span>
                      </p>
                      <p className="flex items-start gap-2 text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Students must outline queries or share syllabus documents in advance.</span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-start gap-2 text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Rescheduling requires a 24-hour notice to prevent missing slot counts.</span>
                      </p>
                      <p className="flex items-start gap-2 text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Remedial credits will be recorded in student performance matrices.</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 5: Booking Inquiry Form */}
                <div id="booking-form" className="bg-card border border-border rounded-2xl p-6 shadow-md text-left">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-indigo-500" />
                    <div>
                      <h3 className="font-bold text-sm text-foreground">Request Mentorship Booking</h3>
                      <p className="text-xs text-muted-foreground">Submit a reservation to schedule a dedicated counseling slot with your professor.</p>
                    </div>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    toast.success(`Booking request sent to ${tutorInquiryTutor || "the selected professor"} successfully!`);
                    setTutorInquiryName("");
                    setTutorInquiryEmail("");
                    setTutorInquiryTutor("");
                    setTutorInquiryMsg("");
                  }} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Your Name</label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={tutorInquiryName}
                          onChange={(e) => setTutorInquiryName(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Your Email</label>
                        <input
                          type="email"
                          placeholder="Your Email"
                          value={tutorInquiryEmail}
                          onChange={(e) => setTutorInquiryEmail(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Select Professor</label>
                      <select
                        value={tutorInquiryTutor}
                        onChange={(e) => setTutorInquiryTutor(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                        required
                      >
                        <option value="">-- Choose Professor --</option>
                        <option value="Dr. Anand Kumar">Dr. Anand Kumar (Computer Science)</option>
                        <option value="Prof. Meera Iyer">Prof. Meera Iyer (Mathematics)</option>
                        <option value="Mr. Ravi Shankar">Mr. Ravi Shankar (Electronics)</option>
                        <option value="Mr. Kartik Verma">Mr. Kartik Verma (Computer Science)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Topic details / Questions</label>
                      <textarea
                        rows={3}
                        placeholder="State what subject or topic you need assistance with..."
                        value={tutorInquiryMsg}
                        onChange={(e) => setTutorInquiryMsg(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary resize-none text-foreground"
                        required
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 gradient-brand text-white rounded-xl text-xs font-bold hover:opacity-90 transition-opacity shadow-sm">
                      Submit Request
                    </button>
                  </form>
                </div>
              </div>
            )}

            {pathname === "/courses" && (
              <div className="space-y-12">
                {/* Section 1: Page Header & Semester/Search Filters */}
                <div className="text-center">
                  <span className="inline-block bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-amber-100 dark:border-amber-900 shadow-sm">
                    Courses
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-display mb-2">CampusLink Key Subjects</h1>
                  <p className="text-muted-foreground text-sm max-w-lg mx-auto">Browse through our accredited degree modules, credit allocations, and required pre-requisites for technical semesters.</p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mt-6">
                    <div className="relative w-full sm:max-w-xs">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search course title or code..."
                        value={coursesSearch}
                        onChange={(e) => setCoursesSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-card border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                      />
                    </div>
                    <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                      {["All", "Semester 1", "Semester 5", "Semester 7"].map((sem) => (
                        <button
                          key={sem}
                          onClick={() => setSelectedCourseSem(sem)}
                          className={cn(
                            "px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap",
                            selectedCourseSem === sem
                              ? "bg-brand-600 text-white dark:bg-brand-500"
                              : "bg-muted hover:bg-muted/80 text-muted-foreground"
                          )}
                        >
                          {sem}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 2: Core Curriculum Subjects Grid */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <BookOpen className="w-5 h-5 text-amber-500" />
                    <h2 className="text-lg font-bold text-foreground">Curriculum List</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { code: "CS301", title: "Data Structures & Algorithms", credits: 4, sem: "Semester 5", desc: "Fundamental data structures, search tree systems, hashing, and complex algorithm design patterns." },
                      { code: "CS302", title: "Database Management Systems", credits: 3, sem: "Semester 5", desc: "Relational model designs, normal forms, transaction logging, SQL parsing, and B-Tree indexing." },
                      { code: "CS401", title: "Web Development", credits: 3, sem: "Semester 7", desc: "Modern full-stack responsive web systems built with React libraries, TS modules, and Node.js databases." },
                      { code: "EC301", title: "Digital Electronics", credits: 3, sem: "Semester 5", desc: "Combinational gates, sequential flip-flops, register maps, counter designs, and logic chips." },
                      { code: "PH101", title: "Engineering Physics", credits: 3, sem: "Semester 1", desc: "Quantum theory equations, wave mechanics, fiber optics grids, and electromagnetic vector analysis." },
                      { code: "MA301", title: "Engineering Mathematics III", credits: 4, sem: "Semester 5", desc: "Fourier series equations, Laplace transforms, linear algebra vectors, and probability calculations." }
                    ]
                      .filter(c => (selectedCourseSem === "All" || c.sem === selectedCourseSem))
                      .filter(c => (c.title.toLowerCase().includes(coursesSearch.toLowerCase()) || c.code.toLowerCase().includes(coursesSearch.toLowerCase())))
                      .map((c, i) => (
                        <div key={i} className="p-4 bg-card rounded-2xl border border-border flex flex-col justify-between hover:border-primary/45 transition-colors shadow-card text-left">
                          <div>
                            <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase">{c.code} • {c.credits} Credits</span>
                            <h4 className="font-bold text-sm text-foreground mt-2 leading-snug">{c.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{c.desc}</p>
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-3 font-semibold text-left border-t border-border/30 pt-2">{c.sem}</p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Section 3: Credits & Syllabus Distribution */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                    <h2 className="text-lg font-bold text-foreground">Syllabus & Credit Allocation Rules</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                    <div className="p-4 bg-muted/40 rounded-xl border border-border">
                      <p className="font-bold text-xs text-foreground">Elective Selection</p>
                      <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">Students pick 2 electives in odd semesters. Selection closes within 14 calendar days of batch startup.</p>
                    </div>
                    <div className="p-4 bg-muted/40 rounded-xl border border-border">
                      <p className="font-bold text-xs text-foreground">Lab-Course Credits</p>
                      <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">Practical classes hold a 1.5 credit ratio. Mandatory 75% attendance applies to lab submissions.</p>
                    </div>
                    <div className="p-4 bg-muted/40 rounded-xl border border-border">
                      <p className="font-bold text-xs text-foreground">Project Submissions</p>
                      <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">Final semester major projects yield 6 credits. Projects require peer review and a faculty board review.</p>
                    </div>
                  </div>
                </div>

                {/* Section 4: Academic Grading Guidelines */}
                <div className="bg-card border border-border rounded-2xl p-5 text-left">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
                    <Award className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-sm text-foreground">Official Academic Grading System</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-muted-foreground">
                      <thead>
                        <tr className="border-b border-border text-foreground font-bold">
                          <th className="py-2">Letter Grade</th>
                          <th className="py-2">Score Range (%)</th>
                          <th className="py-2">Grade Points</th>
                          <th className="py-2">Classification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        <tr>
                          <td className="py-2 font-bold text-emerald-500">O</td>
                          <td className="py-2">90 - 100</td>
                          <td className="py-2">10</td>
                          <td className="py-2">Outstanding</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-bold text-primary">A+</td>
                          <td className="py-2">80 - 89</td>
                          <td className="py-2">9</td>
                          <td className="py-2">Excellent</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-bold text-indigo-400">A</td>
                          <td className="py-2">70 - 79</td>
                          <td className="py-2">8</td>
                          <td className="py-2">Very Good</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-bold text-foreground">B+</td>
                          <td className="py-2">60 - 69</td>
                          <td className="py-2">7</td>
                          <td className="py-2">Good</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-rose-500 font-bold">F</td>
                          <td className="py-2">Below 40</td>
                          <td className="py-2">0</td>
                          <td className="py-2">Fail</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 5: Syllabus Counselor / Elective Form */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-md text-left">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-indigo-500" />
                    <div>
                      <h3 className="font-bold text-sm text-foreground">Curricular Advising & Counselor Form</h3>
                      <p className="text-xs text-muted-foreground">Need advice on choosing electives or request syllabus modifications? Send an entry here.</p>
                    </div>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Advising request submitted! An academic counselor will contact you shortly.");
                    setCourseInquiryName("");
                    setCourseInquirySem("");
                    setCourseInquiryElective("");
                    setCourseInquiryMsg("");
                  }} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Your Name</label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={courseInquiryName}
                          onChange={(e) => setCourseInquiryName(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Current Semester</label>
                        <select
                          value={courseInquirySem}
                          onChange={(e) => setCourseInquirySem(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                          required
                        >
                          <option value="">-- Choose Sem --</option>
                          <option value="1">Semester 1</option>
                          <option value="3">Semester 3</option>
                          <option value="5">Semester 5</option>
                          <option value="7">Semester 7</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Preferred Subject/Elective Area</label>
                      <input
                        type="text"
                        placeholder="e.g. Advanced Cryptography or Machine Learning"
                        value={courseInquiryElective}
                        onChange={(e) => setCourseInquiryElective(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Counselor Questions</label>
                      <textarea
                        rows={3}
                        placeholder="State your goals or queries about credits/syllabus..."
                        value={courseInquiryMsg}
                        onChange={(e) => setCourseInquiryMsg(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary resize-none text-foreground"
                        required
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 gradient-brand text-white rounded-xl text-xs font-bold hover:opacity-90 transition-opacity shadow-sm">
                      Submit Advising Request
                    </button>
                  </form>
                </div>
              </div>
            )}

            {pathname === "/about" && (
              <div className="space-y-12 text-left">
                {/* Section 1: Page Header */}
                <div className="text-center">
                  <span className="inline-block bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-violet-100 dark:border-violet-900 shadow-sm">
                    About Us
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground font-display mb-2">About CampusLink</h1>
                  <p className="text-muted-foreground text-sm max-w-lg mx-auto">A modern digital ecosystem connecting students, faculty, administrators, and families.</p>
                </div>

                {/* Section 2: Core Mission & Platform Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4 text-sm text-foreground/85 leading-relaxed">
                    <p>CampusLink is a leading college management ERP platform designed from the ground up to solve administrative, teacher, student, and parent collaboration gaps.</p>
                    <p>Our platform empowers educational complexes to streamline attendance reports, schedule examinations, library issuing, fee payouts, and academic grade cards in real time.</p>
                    <p>We believe that clean, unified, and AI-enabled design brings families closer to academic growth. By automating structural audits and communication blocks, we save hours for teaching staffs, allowing them to focus on high-impact instruction.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/40 rounded-xl border border-border text-center animate-fade">
                      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">50+</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-1">Colleges Unified</p>
                    </div>
                    <div className="p-4 bg-muted/40 rounded-xl border border-border text-center animate-fade">
                      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">100k+</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-1">Active Portals</p>
                    </div>
                    <div className="p-4 bg-muted/40 rounded-xl border border-border text-center animate-fade">
                      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">99.9%</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-1">SLA Uptime</p>
                    </div>
                    <div className="p-4 bg-muted/40 rounded-xl border border-border text-center animate-fade">
                      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">14ms</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-1">Average Latency</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Platform Value Pillars */}
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">Our Core Value Pillars</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 bg-card border border-border rounded-2xl shadow-sm space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center animate-fade">
                        <Lock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="font-semibold text-sm text-foreground">Security First</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">Full database encryption, route guards, compliance backups, and ISO 27001 data certifications protect user data.</p>
                    </div>
                    <div className="p-5 bg-card border border-border rounded-2xl shadow-sm space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center animate-fade">
                        <Users2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="font-semibold text-sm text-foreground">Real-time Collaboration</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">Instant notifications, notice board publishes, and dedicated messaging portals align parents and teachers.</p>
                    </div>
                    <div className="p-5 bg-card border border-border rounded-2xl shadow-sm space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center animate-fade">
                        <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="font-semibold text-sm text-foreground">Advanced Analytics</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">Live performance dashboard cards, attendance alerts, predictive grades tracking, and automated schedules.</p>
                    </div>
                  </div>
                </div>

                {/* Section 4: Leadership Team Profiles */}
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">Leadership Team</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { name: "Dr. Pradeep Srivastava", title: "Institute Director", desc: "Leading the strategy, operational workflows, and corporate growth programs across 50 college campuses.", avatar: "P" },
                      { name: "Dr. S. K. Gupta", title: "Dean of Academics", desc: "Enforcing grading integrity standards, credit structures, scheduling parameters, and syllabus development.", avatar: "S" },
                      { name: "Prof. Shalini Sen", title: "Head of IT Services", desc: "Spearheading server integrations, cloud-based latency control, database upgrades, and security protocols.", avatar: "S" }
                    ].map((l, i) => (
                      <div key={i} className="p-5 bg-card border border-border rounded-2xl shadow-sm space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white font-bold shrink-0">
                            {l.avatar}
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-foreground leading-tight">{l.name}</h4>
                            <p className="text-[10px] text-primary font-bold mt-0.5">{l.title}</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{l.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 5: Official Accreditations & Partners */}
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
                    <Award className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-bold text-sm text-foreground">Accreditations & Certificates</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-bold bg-muted text-muted-foreground border border-border/80 px-3 py-1.5 rounded-lg">NAAC A++ Alignment</span>
                    <span className="text-[10px] font-bold bg-muted text-muted-foreground border border-border/80 px-3 py-1.5 rounded-lg">AICTE ERP Standards</span>
                    <span className="text-[10px] font-bold bg-muted text-muted-foreground border border-border/80 px-3 py-1.5 rounded-lg">ISO 27001 Certified</span>
                    <span className="text-[10px] font-bold bg-muted text-muted-foreground border border-border/80 px-3 py-1.5 rounded-lg">GDPR Compliant</span>
                  </div>
                </div>
              </div>
            )}

            {pathname === "/pricing" && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <span className="inline-block bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-violet-100 dark:border-violet-900 animate-fade">
                    Pricing Plans
                  </span>
                  <h2 className="text-3xl font-bold text-foreground font-display mb-2">Transparent, Flexible Pricing</h2>
                  <p className="text-muted-foreground text-sm max-w-xl mx-auto">Choose a plan that scales with your institution's needs.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4 text-left">
                  {PRICING.map((p, i) => (
                    <div key={i} className={cn("relative bg-card rounded-2xl p-7 border-2 transition-all hover:shadow-lg", p.color, i === 1 && "shadow-xl ring-2 ring-brand-500/20")}>
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
                            <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 animate-fade" />
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
                    </div>
                  ))}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card border border-border rounded-2xl p-6 shadow-card text-left">
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
                    <input placeholder="Your Name" className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring text-foreground" required />
                    <input type="email" placeholder="Your Email" className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring text-foreground" required />
                    <textarea rows={3} placeholder="Your Message" className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring resize-none text-foreground" required />
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
                <div className="space-y-4 text-sm text-foreground/80 leading-relaxed bg-card border border-border rounded-2xl p-6 shadow-card text-left">
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
                <div className="space-y-4 text-sm text-foreground/80 leading-relaxed bg-card border border-border rounded-2xl p-6 shadow-card text-left">
                  <p>Welcome to CampusLink. By using our hosted ERP portals, databases, or AI tools, you represent and agree to abide by our institutional code of conduct, acceptable academic integrity rules, and database compliance policies.</p>
                  <p>Violation of access rules, reverse engineering, or attempting unauthorized route bypasses will result in immediate termination of the user profile and administrative follow-up.</p>
                </div>
              </div>
            )}

            {pathname === "/features/student-management" && <StudentManagementFeature />}
            {pathname === "/features/teacher-management" && <TeacherManagementFeature />}
            {pathname === "/features/attendance" && <AttendanceFeature />}
            {pathname === "/features/library" && <LibraryFeature />}
            {pathname === "/features/fees" && <FeesFeature />}
            {pathname === "/features/results" && <ResultsFeature />}
            {pathname === "/cookie-policy" && <CookiePolicyPage />}
            {pathname === "/security-policy" && <SecurityPolicyPage />}
            
            {/* Multi-Tab Resource Renders */}
            {pathname.startsWith("/resources/academic-calendar") && <AcademicCalendarResource />}
            {pathname.startsWith("/resources/notices") && <NoticesResource />}
            {pathname.startsWith("/resources/events") && <EventsResource />}
            {pathname.startsWith("/resources/scholarships") && <ScholarshipsResource />}
            {pathname.startsWith("/resources/career") && <CareerResource />}
            {pathname.startsWith("/resources/help-center") && <HelpCenterResource />}
            {pathname.startsWith("/resources/blog") && <BlogResource />}
            {pathname.startsWith("/resources/community") && <CommunityResource />}
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="bg-card border-t border-border pt-16 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            {/* Column 1: CampusLink About */}
            <div className="sm:col-span-2 lg:col-span-1 space-y-4">
              <Link to="/" className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center shadow-sm">
                  <Shield size={16} className="text-white" />
                </div>
                <span className="font-bold text-base text-foreground font-display">CampusLink</span>
              </Link>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                The modern college ERP platform built for the future of education — intelligent, connected, and beautifully designed.
              </p>
              
              {/* System Status and Version */}
              <div className="space-y-2.5 pt-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">All systems operational</span>
                </div>
                <div className="text-[10px] text-muted-foreground font-semibold">
                  Version <span className="bg-muted px-2 py-0.5 rounded border border-border/80 text-foreground">v1.0</span>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-3 pt-2">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted/40 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-xl border border-border transition-all" aria-label="Twitter">
                  <Twitter size={14} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted/40 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-xl border border-border transition-all" aria-label="GitHub">
                  <Github size={14} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted/40 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-xl border border-border transition-all" aria-label="LinkedIn">
                  <Linkedin size={14} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted/40 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-xl border border-border transition-all" aria-label="Facebook">
                  <Facebook size={14} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-muted/40 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-xl border border-border transition-all" aria-label="Instagram">
                  <Instagram size={14} />
                </a>
              </div>
            </div>

            {/* Column 2: Features */}
            <div>
              <h4 className="text-xs font-bold text-foreground mb-4 uppercase tracking-wider">Features</h4>
              <ul className="space-y-2">
                {[
                  { name: "Student Management", path: "/features/student-management" },
                  { name: "Teacher Management", path: "/features/teacher-management" },
                  { name: "Attendance Tracking", path: "/features/attendance" },
                  { name: "Library Management", path: "/features/library" },
                  { name: "Fee Management", path: "/features/fees" },
                  { name: "Exam & Results", path: "/features/results" },
                  { name: "Courses Overview", path: "/courses" }
                ].map(item => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      onClick={(e) => handleFeatureClick(e, item.path)}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-250"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div>
              <h4 className="text-xs font-bold text-foreground mb-4 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { name: "Home", path: "/" },
                  { name: "Login", path: "/login" },
                  { name: "Register", path: "/register" },
                  { name: "Dashboard", path: "/dashboard" },
                  { name: "Contact Us", path: "/contact" },
                  { name: "FAQ", path: "/faq" },
                  { name: "Pricing", path: "/pricing" }
                ].map(item => (
                  <li key={item.name}>
                    <Link to={item.path} onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-xs text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-250">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div>
              <h4 className="text-xs font-bold text-foreground mb-4 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2">
                {[
                  { name: "Academic Calendar", path: "/resources/academic-calendar/semester-schedule" },
                  { name: "Notices Board", path: "/resources/notices/circulars" },
                  { name: "Events & Activities", path: "/resources/events/upcoming-events" },
                  { name: "Scholarships & Aid", path: "/resources/scholarships/government-scholarships" },
                  { name: "Career Guidance", path: "/resources/career/career-counseling" },
                  { name: "Help Center", path: "/resources/help-center/faq" },
                  { name: "Insights Blog", path: "/resources/blog/education-news" },
                  { name: "Forums Community", path: "/resources/community/student-discussions" }
                ].map(item => (
                  <li key={item.name}>
                    <Link to={item.path} onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-xs text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-250">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Legal / Company */}
            <div>
              <h4 className="text-xs font-bold text-foreground mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2">
                {[
                  { name: "About Us", path: "/about" },
                  { name: "Privacy Policy", path: "/privacy" },
                  { name: "Terms of Service", path: "/terms" },
                  { name: "Cookie Policy", path: "/cookie-policy" },
                  { name: "Security Policy", path: "/security-policy" }
                ].map(item => (
                  <li key={item.name}>
                    <Link to={item.path} onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-xs text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-250">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} CampusLink ERP. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <span className="text-muted/40">|</span>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <span className="text-muted/40">|</span>
              <Link to="/security-policy" className="hover:text-foreground transition-colors">Security Audit</Link>
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
