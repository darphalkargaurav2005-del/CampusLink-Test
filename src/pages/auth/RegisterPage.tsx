import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, Lock, Mail, User, Phone, ChevronDown, Sun, Moon,
  Shield, ArrowLeft, ArrowRight, CheckCircle2, GraduationCap,
  Building2, BookOpen, Users, BookUser
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const schema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Enter a valid 10-digit mobile number").max(10, "Enter a valid 10-digit mobile number").regex(/^[0-9]+$/, "Only digits allowed"),
  role: z.enum(["admin", "teacher", "student", "parent", "librarian"], { required_error: "Please select a role" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  institutionCode: z.string().min(4, "Enter your institution access code"),
  agreeTerms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms to continue" }) }),
}).refine(d => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

const ROLES = [
  { value: "admin", label: "Institute Admin", icon: Shield, color: "from-violet-500 to-indigo-600", desc: "Manage the full institution" },
  { value: "teacher", label: "Teacher", icon: GraduationCap, color: "from-sky-500 to-blue-600", desc: "Manage classes & students" },
  { value: "student", label: "Student", icon: BookOpen, color: "from-emerald-500 to-teal-600", desc: "Access academics & results" },
  { value: "parent", label: "Parent / Guardian", icon: Users, color: "from-amber-500 to-orange-600", desc: "Monitor your child's progress" },
  { value: "librarian", label: "Librarian", icon: BookUser, color: "from-rose-500 to-pink-600", desc: "Manage library resources" },
];

const BENEFITS = [
  "Role-specific dashboards tailored for you",
  "Secure access with institutional verification",
  "Real-time academic updates & notifications",
  "AI-powered learning and analytics tools",
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: undefined, agreeTerms: undefined as any },
  });

  const selectedRole = watch("role");
  const password = watch("password");

  const passwordStrength = (p: string) => {
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strength = passwordStrength(password || "");
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-rose-500", "bg-amber-500", "bg-sky-500", "bg-emerald-500"][strength];

  const goNext = async () => {
    const valid = await trigger(step === 1 ? ["role"] : ["fullName", "email", "phone"]);
    if (valid) setStep(s => s + 1);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    toast.success(`Welcome to CampusLink, ${data.fullName.split(" ")[0]}! Your account has been created. Please sign in.`);
    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col w-[480px] xl:w-[540px] relative overflow-hidden gradient-brand">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col h-full p-10">
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
            <h2 className="text-4xl font-bold text-white leading-tight font-display mb-4">
              Join Thousands of Campus Users
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              Create your account in minutes and get access to your role-specific portal with intelligent tools built for education.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4 mb-10">
            {BENEFITS.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.07 }}
                className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={14} className="text-white" />
                </div>
                <p className="text-white/80 text-sm">{b}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Role cards preview */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-auto">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">Available Roles</p>
            <div className="flex flex-wrap gap-2">
              {ROLES.map(r => (
                <div key={r.value} className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/20 bg-white/10",
                  selectedRole === r.value && "bg-white/25 border-white/40"
                )}>
                  <r.icon size={12} />
                  {r.label.split(" ")[0]}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 lg:hidden">
              <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center">
                <Shield size={16} className="text-white" />
              </div>
              <span className="font-bold text-foreground font-display">CampusLink</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl border border-border hover:bg-muted transition-colors" aria-label="Toggle theme">
              {theme === "light" ? <Moon size={17} className="text-muted-foreground" /> : <Sun size={17} className="text-muted-foreground" />}
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-lg">
            {/* Back */}
            <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group">
              <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to Sign In
            </Link>

            {/* Header */}
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-foreground font-display">Create your account</h1>
              <p className="text-muted-foreground mt-1.5 text-sm">Fill in your details to get started with CampusLink.</p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-7">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                    step > s ? "bg-emerald-500 text-white" : step === s ? "gradient-brand text-white shadow-md" : "bg-muted text-muted-foreground"
                  )}>
                    {step > s ? <CheckCircle2 size={14} /> : s}
                  </div>
                  <span className={cn("text-xs font-medium hidden sm:block", step === s ? "text-foreground" : "text-muted-foreground")}>
                    {s === 1 ? "Choose Role" : s === 2 ? "Personal Info" : "Set Password"}
                  </span>
                  {s < 3 && <div className={cn("w-8 h-px flex-shrink-0", step > s ? "bg-emerald-500" : "bg-border")} />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <AnimatePresence mode="wait">
                {/* Step 1 — Role Selection */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <p className="text-sm font-semibold text-foreground mb-3">Select your role</p>
                    <div className="space-y-2.5 mb-6">
                      {ROLES.map(r => (
                        <label key={r.value}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                            selectedRole === r.value
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border hover:border-muted-foreground/30 hover:bg-muted/40"
                          )}
                        >
                          <input {...register("role")} type="radio" value={r.value} className="sr-only" />
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center flex-shrink-0`}>
                            <r.icon size={18} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={cn("text-sm font-semibold", selectedRole === r.value ? "text-primary" : "text-foreground")}>{r.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
                          </div>
                          <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                            selectedRole === r.value ? "border-primary" : "border-muted-foreground/30")}>
                            {selectedRole === r.value && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.role && <p className="text-rose-500 text-xs mb-3">{errors.role.message}</p>}
                    <button type="button" onClick={goNext}
                      className="w-full py-3 rounded-xl gradient-brand text-white font-semibold text-sm hover:opacity-90 flex items-center justify-center gap-2">
                      Continue <ArrowRight size={15} />
                    </button>
                  </motion.div>
                )}

                {/* Step 2 — Personal Info */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name</label>
                      <div className="relative">
                        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <input {...register("fullName")} type="text" placeholder="Your full legal name"
                          className={cn("w-full pl-10 pr-4 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground/60",
                            errors.fullName ? "border-rose-500 focus:ring-rose-500/30" : "border-border hover:border-muted-foreground/50")} />
                      </div>
                      {errors.fullName && <p className="text-rose-500 text-xs mt-1.5">{errors.fullName.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <input {...register("email")} type="email" placeholder="you@campus.edu"
                          className={cn("w-full pl-10 pr-4 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground/60",
                            errors.email ? "border-rose-500 focus:ring-rose-500/30" : "border-border hover:border-muted-foreground/50")} />
                      </div>
                      {errors.email && <p className="text-rose-500 text-xs mt-1.5">{errors.email.message}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Mobile Number</label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <input {...register("phone")} type="tel" placeholder="10-digit mobile number"
                          maxLength={10}
                          className={cn("w-full pl-10 pr-4 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground/60",
                            errors.phone ? "border-rose-500 focus:ring-rose-500/30" : "border-border hover:border-muted-foreground/50")} />
                      </div>
                      {errors.phone && <p className="text-rose-500 text-xs mt-1.5">{errors.phone.message}</p>}
                    </div>

                    {/* Institution Code */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Institution Access Code</label>
                      <div className="relative">
                        <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <input {...register("institutionCode")} type="text" placeholder="Provided by your institution"
                          className={cn("w-full pl-10 pr-4 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground/60",
                            errors.institutionCode ? "border-rose-500 focus:ring-rose-500/30" : "border-border hover:border-muted-foreground/50")} />
                      </div>
                      {errors.institutionCode && <p className="text-rose-500 text-xs mt-1.5">{errors.institutionCode.message}</p>}
                      <p className="text-xs text-muted-foreground mt-1.5">Contact your institution admin if you don't have a code.</p>
                    </div>

                    <div className="flex gap-3 pt-1">
                      <button type="button" onClick={() => setStep(1)}
                        className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                        <ArrowLeft size={15} /> Back
                      </button>
                      <button type="button" onClick={goNext}
                        className="flex-1 py-3 rounded-xl gradient-brand text-white font-semibold text-sm hover:opacity-90 flex items-center justify-center gap-2">
                        Continue <ArrowRight size={15} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3 — Password */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    {/* Password */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Create Password</label>
                      <div className="relative">
                        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <input {...register("password")} type={showPassword ? "text" : "password"} placeholder="At least 8 characters"
                          className={cn("w-full pl-10 pr-11 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground/60",
                            errors.password ? "border-rose-500 focus:ring-rose-500/30" : "border-border hover:border-muted-foreground/50")} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {errors.password && <p className="text-rose-500 text-xs mt-1.5">{errors.password.message}</p>}
                      {/* Strength indicator */}
                      {password && (
                        <div className="mt-2">
                          <div className="flex gap-1 mb-1">
                            {[1, 2, 3, 4].map(n => (
                              <div key={n} className={cn("flex-1 h-1.5 rounded-full transition-all", strength >= n ? strengthColor : "bg-muted")} />
                            ))}
                          </div>
                          <p className={cn("text-xs font-medium", strength >= 3 ? "text-emerald-600" : strength >= 2 ? "text-sky-600" : "text-amber-600")}>
                            {strengthLabel}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">Confirm Password</label>
                      <div className="relative">
                        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <input {...register("confirmPassword")} type={showConfirm ? "text" : "password"} placeholder="Re-enter your password"
                          className={cn("w-full pl-10 pr-11 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground/60",
                            errors.confirmPassword ? "border-rose-500 focus:ring-rose-500/30" : "border-border hover:border-muted-foreground/50")} />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                          {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-rose-500 text-xs mt-1.5">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Terms */}
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input {...register("agreeTerms")} type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border accent-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          I agree to the{" "}
                          <a href="#" className="text-primary hover:underline font-medium">Terms of Service</a>
                          {" "}and{" "}
                          <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a>
                        </span>
                      </label>
                      {errors.agreeTerms && <p className="text-rose-500 text-xs mt-1.5">{errors.agreeTerms.message}</p>}
                    </div>

                    <div className="flex gap-3 pt-1">
                      <button type="button" onClick={() => setStep(2)}
                        className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                        <ArrowLeft size={15} /> Back
                      </button>
                      <button type="submit" disabled={loading}
                        className="flex-1 py-3 rounded-xl gradient-brand text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2">
                        {loading
                          ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Creating Account...</>
                          : <><CheckCircle2 size={16} /> Create My Account</>
                        }
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
