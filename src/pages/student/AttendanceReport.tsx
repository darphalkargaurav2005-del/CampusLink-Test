import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import PageHeader from "@/components/features/PageHeader";
import ChartCard from "@/components/features/ChartCard";
import { ANALYTICS_ATTENDANCE } from "@/constants/mockData";
import { cn } from "@/lib/utils";

const COURSE_ATTENDANCE = [
  { course: "Data Structures", present: 22, total: 26, pct: 85 },
  { course: "DBMS", present: 24, total: 26, pct: 92 },
  { course: "Engineering Math", present: 18, total: 26, pct: 69 },
  { course: "Digital Electronics", present: 20, total: 24, pct: 83 },
  { course: "Engineering Physics", present: 16, total: 24, pct: 67 },
  { course: "Web Development", present: 10, total: 12, pct: 83 },
];

const MONTHLY = [
  { month: "Aug", present: 22, absent: 2, total: 24 },
  { month: "Sep", present: 24, absent: 2, total: 26 },
  { month: "Oct", present: 21, absent: 5, total: 26 },
  { month: "Nov", present: 23, absent: 3, total: 26 },
  { month: "Dec", present: 19, absent: 5, total: 24 },
  { month: "Jan", present: 25, absent: 1, total: 26 },
  { month: "Feb", present: 20, absent: 3, total: 23 },
];

export default function AttendanceReport() {
  const overall = Math.round((COURSE_ATTENDANCE.reduce((a, c) => a + c.present, 0) / COURSE_ATTENDANCE.reduce((a, c) => a + c.total, 0)) * 100);

  return (
    <div>
      <PageHeader title="Attendance Report" subtitle="Your detailed attendance records across all courses" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Overall Attendance", value: `${overall}%`, color: overall >= 75 ? "text-emerald-600" : "text-rose-600" },
          { label: "Total Classes", value: COURSE_ATTENDANCE.reduce((a, c) => a + c.total, 0), color: "text-foreground" },
          { label: "Classes Attended", value: COURSE_ATTENDANCE.reduce((a, c) => a + c.present, 0), color: "text-foreground" },
          { label: "Classes Missed", value: COURSE_ATTENDANCE.reduce((a, c) => a + (c.total - c.present), 0), color: "text-rose-600" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
            <p className={cn("text-2xl font-bold font-display", s.color)}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Monthly Attendance" subtitle="Present vs Absent each month" index={0}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY}>
              <defs>
                <linearGradient id="pres" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2} fill="url(#pres)" name="Present" />
              <Area type="monotone" dataKey="absent" stroke="#f43f5e" strokeWidth={2} fill="transparent" name="Absent" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Course-wise Attendance" subtitle="Attendance percentage by subject" index={1}>
          <div className="space-y-3 mt-1">
            {COURSE_ATTENDANCE.map((c, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground truncate">{c.course}</span>
                  <span className={cn("font-semibold ml-2", c.pct >= 75 ? "text-emerald-600" : "text-rose-600")}>{c.pct}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.pct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={cn("h-full rounded-full", c.pct >= 75 ? "bg-emerald-500" : "bg-rose-500")}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {overall < 75 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl p-4 text-sm text-rose-700 dark:text-rose-400">
          Your overall attendance is below 75%. You may not be eligible to appear for examinations. Please contact your class teacher immediately.
        </motion.div>
      )}
    </div>
  );
}
