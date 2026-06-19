import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Eye, EyeOff, Lock, Mail, ChevronDown, Sun, Moon,
  GraduationCap, Users, BookOpen, BarChart3, Shield, ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { loginUser, ROLE_LABELS } from "@/lib/auth";
import type { UserRole } from "@/types";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  role: z.string().min(1, "Please select a role"),
  remember: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const ROLES = [
  { value: "admin", label: "Institute Admin" },
  { value: "teacher", label: "Teacher" },
  { value: "student", label: "Student" },
  { value: "parent", label: "Parent" },
  { value: "librarian", label: "Librarian" },
];

const FEATURES = [
  { icon: GraduationCap, title: "Smart Academics", desc: "AI-powered learning management" },
  { icon: Users, title: "Role-Based Access", desc: "5 distinct portals for all stakeholders" },
  { icon: BarChart3, title: "Real-time Analytics", desc: "Live charts and performance insights" },
  { icon: BookOpen, title: "Digital Library", desc: "Complete library management system" },
];

const DEMO_CREDENTIALS: Array<{
  role: UserRole;
  email: string;
  password: string;
}> = [
  { role: "admin", email: "admin@campus.edu", password: "admin123" },
  { role: "teacher", email: "teacher@campus.edu", password: "teacher123" },
  { role: "student", email: "student@campus.edu", password: "student123" },
  { role: "parent", email: "parent@campus.edu", password: "parent123" },
  { role: "librarian", email: "librarian@campus.edu", password: "lib123" },
];

export default function LoginPage() {
  const { login, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get("role");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const fromPath = location.state?.from;
      navigate(fromPath || `/${user.role}/dashboard`, { replace: true });
    }
  }, [user, navigate, location.state]);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: "", remember: false },
  });

  useEffect(() => {
    if (roleParam && ["admin", "teacher", "student", "parent", "librarian"].includes(roleParam)) {
      setValue("role", roleParam);
    }
  }, [roleParam, setValue]);

  const fillDemoCredentials = (credential: (typeof DEMO_CREDENTIALS)[number]) => {
    setValue("role", credential.role, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    setValue("email", credential.email, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    setValue("password", credential.password, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    toast.message(`Loaded ${ROLE_LABELS[credential.role]} demo credentials.`);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const user = loginUser(data.email, data.password);
    if (!user) {
      toast.error("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }
    if (data.role && user.role !== data.role) {
      toast.error(`This account is not registered as a ${ROLES.find(r => r.value === data.role)?.label}.`);
      setLoading(false);
      return;
    }
    toast.success(`Welcome back, ${user.name.split(" ")[0]}!`);
    const fromPath = location.state?.from;
    login(user, data.remember, fromPath);
  };


  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col w-[520px] xl:w-[600px] relative overflow-hidden gradient-brand">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 flex flex-col h-full p-10">
          {/* Logo - clickable to go to landing */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-12">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-colors">
                <Shield size={22} className="text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-xl font-display tracking-tight">CampusLink</span>
                <p className="text-white/60 text-xs">College ERP Platform</p>
              </div>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-10">
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight font-display mb-4">
              The Future of College Management
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              One intelligent platform connecting students, teachers, parents, and administrators for seamless institutional excellence.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-2 gap-3 mb-10">
            {FEATURES.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 + i * 0.07 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                  <f.icon size={18} className="text-white" />
                </div>
                <p className="text-white font-semibold text-sm">{f.title}</p>
                <p className="text-white/60 text-xs mt-0.5">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex items-center gap-8 mt-auto">
            {[
              { value: "2,400+", label: "Students" },
              { value: "180+", label: "Faculty" },
              { value: "15+", label: "Departments" },
              { value: "98%", label: "Satisfaction" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-white font-display">{s.value}</p>
                <p className="text-white/60 text-xs">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            {/* Back button */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:block">Back to Home</span>
            </button>
            {/* Mobile logo */}
            <Link to="/" className="flex items-center gap-2.5 lg:hidden ml-2">
              <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center">
                <Shield size={16} className="text-white" />
              </div>
              <span className="font-bold text-foreground font-display">CampusLink</span>
            </Link>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-border hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={17} className="text-muted-foreground" /> : <Sun size={17} className="text-muted-foreground" />}
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground font-display">Sign in to your portal</h1>
              <p className="text-muted-foreground mt-1.5 text-sm">Select your role and enter your credentials.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Your Role</label>
                <div className="relative">
                  <select
                    {...register("role")}
                    className={cn(
                      "w-full appearance-none px-4 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all pr-10",
                      errors.role ? "border-rose-500 focus:ring-rose-500/30" : "border-border hover:border-muted-foreground/50"
                    )}
                  >
                    <option value="">-- Select your role --</option>
                    {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
                {errors.role && <p className="text-rose-500 text-xs mt-1.5">{errors.role.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="you@campus.edu"
                    className={cn(
                      "w-full pl-10 pr-4 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground/60",
                      errors.email ? "border-rose-500 focus:ring-rose-500/30" : "border-border hover:border-muted-foreground/50"
                    )}
                  />
                </div>
                {errors.email && <p className="text-rose-500 text-xs mt-1.5">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className={cn(
                      "w-full pl-10 pr-11 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground/60",
                      errors.password ? "border-rose-500 focus:ring-rose-500/30" : "border-border hover:border-muted-foreground/50"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-rose-500 text-xs mt-1.5">{errors.password.message}</p>}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input {...register("remember")} type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-ring accent-primary" />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl gradient-brand text-white font-semibold text-sm hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Signing in...</>
                ) : "Sign In to CampusLink"}
              </button>
            </form>

            <div className="mt-5 rounded-2xl border border-border bg-muted/30 p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">Demo credentials</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Pick a role to auto-fill a working sign-in.</p>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">One click</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DEMO_CREDENTIALS.map(credential => (
                  <button
                    key={credential.role}
                    type="button"
                    onClick={() => fillDemoCredentials(credential)}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2.5 text-left hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">{ROLE_LABELS[credential.role]}</p>
                      <p className="text-[11px] text-muted-foreground">{credential.email}</p>
                    </div>
                    <span className="text-[11px] font-medium text-primary">Load</span>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground mt-3 break-all">
                Passwords: admin123, teacher123, student123, parent123, lib123
              </p>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-primary font-semibold hover:underline">Create account</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
