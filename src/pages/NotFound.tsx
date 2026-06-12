import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Shield size={28} className="text-white" />
        </div>
        <h1 className="text-6xl font-bold text-foreground font-display mb-4">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-3">Page Not Found</h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved. Please check the URL or return to your dashboard.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-6 py-3 gradient-brand text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <ArrowLeft size={16} /> Return to Login
        </Link>
      </motion.div>
    </div>
  );
}
