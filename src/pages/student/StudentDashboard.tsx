import { motion } from "framer-motion";
import { CalendarCheck, TrendingUp, BookOpen, ClipboardList, AlertTriangle, CheckCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import StatCard from "@/components/features/StatCard";
import ChartCard from "@/components/features/ChartCard";
import PageHeader from "@/components/features/PageHeader";
import { ANALYTICS_ATTENDANCE, MOCK_COURSES, SUBJECT_PERFORMANCE } from "@/constants/mockData";
import { store } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function StudentDashboard() {
  const upcoming = store.assignments.filter(a => a.status === "active").slice(0, 3);

  const recentGrades = [
    { subject: "Data Structures", grade: "A", marks: "26/30", date: "Feb 20" },
    { subject: "DBMS", grade: "A+", marks: "28/30", date: "Feb 18" },
    { subject: "Engineering Math", grade: "A", marks: "44/50", date: "Feb 15" },
  ];

  return (
    <div>
      <PageHeader title="Student Dashboard" subtitle="Welcome back, Aisha. Here is your academic summary." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Attendance" value="87%" subtitle="Above 75% threshold" icon={CalendarCheck} gradient="success" trend={2.1} index={0} />
        <StatCard title="Current CGPA" value="8.9" subtitle="Excellent performance" icon={TrendingUp} gradient="brand" trend={0.2} index={1} />
        <StatCard title="Enrolled Courses" value="6" subtitle="This semester" icon={BookOpen} gradient="sky" index={2} />
        <StatCard title="Pending Tasks" value={upcoming.length} subtitle="Assignments due soon" icon={ClipboardList} gradient="warning" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <ChartCard title="My Attendance Trend" subtitle="Monthly attendance percentage" index={0}>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={ANALYTICS_ATTENDANCE}>
                <defs>
                  <linearGradient id="stuAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} formatter={(v: number) => [`${v}%`, "Attendance"]} />
                <Area type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2.5} fill="url(#stuAtt)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="font-semibold text-foreground text-sm font-display mb-4">Recent Grades</h3>
          <div className="space-y-3">
            {recentGrades.map((g, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div>
                  <p className="font-medium text-foreground text-xs">{g.subject}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{g.marks} • {g.date}</p>
                </div>
                <span className={cn("font-bold text-base", g.grade.includes("+") ? "text-emerald-600 dark:text-emerald-400" : "text-brand-600 dark:text-brand-400")}>{g.grade}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Subject Performance" subtitle="My scores vs class average" index={2}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={SUBJECT_PERFORMANCE.slice(0, 4)} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="subject" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} />
              <Bar dataKey="avg" fill="#4f46e5" name="Class Avg" radius={[4, 4, 0, 0]} />
              <Bar dataKey="highest" fill="#10b981" name="Highest" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="font-semibold text-foreground text-sm font-display mb-4">Upcoming Assignments</h3>
          <div className="space-y-3">
            {upcoming.map(a => (
              <div key={a.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                <AlertTriangle size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-xs truncate">{a.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{a.courseName} • Due: {a.dueDate}</p>
                </div>
                <span className="text-xs text-muted-foreground">{a.maxMarks} marks</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
