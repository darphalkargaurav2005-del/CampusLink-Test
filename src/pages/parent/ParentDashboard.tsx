import { motion } from "framer-motion";
import { GraduationCap, CalendarCheck, TrendingUp, Bell, BarChart3, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StatCard from "@/components/features/StatCard";
import ChartCard from "@/components/features/ChartCard";
import PageHeader from "@/components/features/PageHeader";
import { ANALYTICS_ATTENDANCE, MOCK_NOTICES } from "@/constants/mockData";
import { cn } from "@/lib/utils";

const SUBJECT_MARKS = [
  { subject: "Data Structures", marks: 26, max: 30, grade: "A" },
  { subject: "DBMS", marks: 28, max: 30, grade: "A+" },
  { subject: "Engineering Math", marks: 44, max: 50, grade: "A" },
  { subject: "Physics", marks: 36, max: 50, grade: "B+" },
];

export default function ParentDashboard() {
  return (
    <div>
      <PageHeader title="Parent Dashboard" subtitle="Monitoring academic progress of Aisha Sharma (CS2021001)" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Attendance" value="87%" subtitle="Above minimum threshold" icon={CalendarCheck} gradient="success" trend={2.1} index={0} />
        <StatCard title="Current CGPA" value="8.9" subtitle="Excellent standing" icon={TrendingUp} gradient="brand" trend={0.2} index={1} />
        <StatCard title="Pending Fees" value="₹0" subtitle="All fees cleared" icon={GraduationCap} gradient="sky" index={2} />
        <StatCard title="Notices" value="3" subtitle="Unread announcements" icon={Bell} gradient="warning" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <ChartCard title="Child Attendance Trend" subtitle="Monthly attendance percentage" index={0}>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={ANALYTICS_ATTENDANCE}>
                <defs>
                  <linearGradient id="parAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} formatter={(v: number) => [`${v}%`, "Attendance"]} />
                <Area type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2.5} fill="url(#parAtt)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="font-semibold text-foreground text-sm font-display mb-4">Recent Marks</h3>
          <div className="space-y-3">
            {SUBJECT_MARKS.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-3">
                  <p className="text-xs font-medium text-foreground truncate">{s.subject}</p>
                  <div className="h-1.5 bg-muted rounded-full mt-1.5 overflow-hidden">
                    <div style={{ width: `${(s.marks / s.max) * 100}%` }} className="h-full bg-brand-500 rounded-full" />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-foreground">{s.marks}/{s.max}</p>
                  <p className={cn("text-xs font-bold", s.grade.includes("+") ? "text-emerald-600 dark:text-emerald-400" : "text-sky-600 dark:text-sky-400")}>{s.grade}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-card border border-border rounded-xl p-5 shadow-card">
        <h3 className="font-semibold text-foreground text-sm font-display mb-4">Recent Announcements</h3>
        <div className="space-y-3">
          {MOCK_NOTICES.slice(0, 3).map(n => (
            <div key={n.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
              <div className={cn("w-2 h-2 mt-1.5 rounded-full flex-shrink-0", n.priority === "high" ? "bg-rose-500" : n.priority === "medium" ? "bg-amber-500" : "bg-emerald-500")} />
              <div>
                <p className="font-medium text-foreground text-sm">{n.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{n.content}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.publishDate}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
