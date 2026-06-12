import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSentEmail(data.email);
    setSent(true);
    setLoading(false);
    toast.success("Password reset link sent to your email.");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground font-display">Reset your password</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Enter your email and we will send you a reset link.
          </p>
        </div>

        {!sent ? (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@campus.edu"
                    className={cn(
                      "w-full pl-10 pr-4 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground/60",
                      errors.email ? "border-rose-500" : "border-border"
                    )}
                  />
                </div>
                {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl gradient-brand text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending link...
                  </>
                ) : "Send Reset Link"}
              </button>
            </form>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-8 text-center shadow-card"
          >
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-semibold text-foreground text-base mb-2">Check your inbox</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We sent a password reset link to <span className="font-medium text-foreground">{sentEmail}</span>. 
              Check your spam folder if you do not receive it within a few minutes.
            </p>
          </motion.div>
        )}

        <div className="text-center mt-6">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={15} /> Back to sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
