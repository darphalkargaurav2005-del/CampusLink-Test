import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  gradient?: "brand" | "success" | "warning" | "sky" | "rose" | "violet";
  index?: number;
}

const gradients = {
  brand: "from-brand-500 to-violet-600",
  success: "from-emerald-500 to-teal-600",
  warning: "from-amber-500 to-orange-600",
  sky: "from-sky-500 to-blue-600",
  rose: "from-rose-500 to-pink-600",
  violet: "from-violet-500 to-purple-600",
};

const lightBg = {
  brand: "bg-brand-50 dark:bg-brand-950/30",
  success: "bg-emerald-50 dark:bg-emerald-950/30",
  warning: "bg-amber-50 dark:bg-amber-950/30",
  sky: "bg-sky-50 dark:bg-sky-950/30",
  rose: "bg-rose-50 dark:bg-rose-950/30",
  violet: "bg-violet-50 dark:bg-violet-950/30",
};

const iconColors = {
  brand: "text-brand-600 dark:text-brand-400",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  sky: "text-sky-600 dark:text-sky-400",
  rose: "text-rose-600 dark:text-rose-400",
  violet: "text-violet-600 dark:text-violet-400",
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  gradient = "brand",
  index = 0,
}: StatCardProps) {
  const isPositive = trend !== undefined && trend > 0;
  const isNegative = trend !== undefined && trend < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="stat-card group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground mb-1 truncate">{title}</p>
          <p className="text-2xl font-bold text-foreground font-display tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend !== undefined && (
            <div className={cn("flex items-center gap-1 mt-2 text-xs font-medium",
              isPositive ? "text-emerald-600 dark:text-emerald-400" :
              isNegative ? "text-rose-600 dark:text-rose-400" :
              "text-muted-foreground"
            )}>
              {isPositive ? <TrendingUp size={13} /> : isNegative ? <TrendingDown size={13} /> : <Minus size={13} />}
              <span>{Math.abs(trend)}% {trendLabel ?? "vs last month"}</span>
            </div>
          )}
        </div>
        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ml-3", lightBg[gradient])}>
          <Icon size={22} className={iconColors[gradient]} />
        </div>
      </div>
    </motion.div>
  );
}
