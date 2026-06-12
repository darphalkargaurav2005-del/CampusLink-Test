import { useState } from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, UserCog, BookCopy, Wallet, TrendingUp, AlertTriangle, CheckCircle2, BookOpen, CalendarCheck, Clock, BarChart2, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend } from "recharts";
import StatCard from "@/components/features/StatCard";
import ChartCard from "@/components/features/ChartCard";
import PageHeader from "@/components/features/PageHeader";
import { ANALYTICS_FEE_COLLECTION, ANALYTICS_ADMISSIONS, DEPARTMENT_DISTRIBUTION, TEACHER_ATTENDANCE_DATA, MOCK_NOTICES } from "@/constants/mockData";
import { cn } from "@/lib/utils";

const TASKS = [
  { id: 1, title: "Review Q3 Admission Reports", priority: "high", due: "Today", status: "pending", assignee: "Admin" },
  { id: 2, title: "Approve Teacher Attendance Sheet", priority: "medium", due: "Today", status: "pending", assignee: "Admin" },
  { id: 3, title: "Send Fee Reminder to Pending Students", priority: "high", due: "Mar 1", status: "in-progress", assignee: "Admin" },
  { id: 4, title: "Update Course Catalog for New Semester", priority: "low", due: "Mar 5", status: "pending", assignee: "Academic" },
  { id: 5, title: "Staff Meeting — Semester Planning", priority: "medium", due: "Mar 3", status: "completed", assignee: "Admin" },
  { id: 6, title: "Library Audit for Overdue Books", priority: "low", due: "Mar 7", status: "completed", assignee: "Library" },
];

export default function AdminDashboard() {
  const [tasks, setTasks] = useState(TASKS);
  const [activeTaskFilter, setActiveTaskFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all");

  const stats = [
    { title: "Total Students", value: "2,456", subtitle: "Active enrollments", icon: GraduationCap, trend: 8.2, gradient: "brand" as const, index: 0 },
    { title: "Total Teachers", value: "184", subtitle: "Teaching staff", icon: UserCog, trend: 3.1, gradient: "sky" as const, index: 1 },
    { title: "Total Parents", value: "1,892", subtitle: "Registered guardians", icon: Users, trend: 6.4, gradient: "success" as const, index: 2 },
    { title: "Active Courses", value: "68", subtitle: "Running this semester", icon: BookCopy, trend: 2.5, gradient: "violet" as const, index: 3 },
    { title: "Fee Collected", value: "₹1.82 Cr", subtitle: "This academic year", icon: Wallet, trend: 12.4, gradient: "warning" as const, index: 4 },
    { title: "Pending Fees", value: "₹24.6 L", subtitle: "Across 312 students", icon: AlertTriangle, trend: -5.2, gradient: "rose" as const, index: 5 },
  ];

  const feeData = ANALYTICS_FEE_COLLECTION.map(d => ({ ...d, fees: Math.round((d.fees ?? 0) / 100000) }));

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? {
      ...t,
      status: t.status === "completed" ? "pending" : "completed"
    } : t));
  };

  const filteredTasks = tasks.filter(t => activeTaskFilter === "all" || t.status === activeTaskFilter);
  const pendingCount = tasks.filter(t => t.status === "pending").length;
  const inProgressCount = tasks.filter(t => t.status === "in-progress").length;
  const completedCount = tasks.filter(t => t.status === "completed").length;

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Welcome back, Dr. Pradeep. Here is what is happening at your institution today."
        action={
          <div className="flex items-center gap-2 text-xs bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-900">
            <CheckCircle2 size={13} />
            All systems operational
          </div>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <ChartCard title="Fee Collection Overview" subtitle="Monthly collection in Lakhs (₹)" index={0}>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={feeData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}L`} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "13px" }}
                  formatter={(v: number) => [`₹${v} Lakhs`, "Collected"]}
                />
                <Bar dataKey="fees" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Department Distribution" subtitle="Students by department" index={1}>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={DEPARTMENT_DISTRIBUTION} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {DEPARTMENT_DISTRIBUTION.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "13px" }}
                formatter={(v: number) => [v, "Students"]}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Admission Growth" subtitle="Year-wise new admissions" index={2}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ANALYTICS_ADMISSIONS}>
              <defs>
                <linearGradient id="admGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "13px" }} />
              <Area type="monotone" dataKey="admissions" stroke="#4f46e5" strokeWidth={2.5} fill="url(#admGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Teacher Attendance" subtitle="Monthly present/absent/leave summary" index={3}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={TEACHER_ATTENDANCE_DATA} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "13px" }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="present" fill="#10b981" radius={[4, 4, 0, 0]} stackId="a" name="Present" />
              <Bar dataKey="absent" fill="#f43f5e" radius={[0, 0, 0, 0]} stackId="a" name="Absent" />
              <Bar dataKey="leave" fill="#f59e0b" radius={[4, 4, 0, 0]} stackId="a" name="Leave" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Bottom Row: Task View + Notices + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* TASK VIEW */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-card border border-border rounded-xl shadow-card overflow-hidden"
          >
            <div className="p-5 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground font-display text-sm">Task Overview</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{pendingCount} pending · {inProgressCount} in progress · {completedCount} completed</p>
                </div>
                <Activity size={16} className="text-muted-foreground" />
              </div>
              {/* Task filter tabs */}
              <div className="flex gap-1.5">
                {([
                  { key: "all", label: "All", count: tasks.length },
                  { key: "pending", label: "Pending", count: pendingCount },
                  { key: "in-progress", label: "In Progress", count: inProgressCount },
                  { key: "completed", label: "Done", count: completedCount },
                ] as const).map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTaskFilter(tab.key)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                      activeTaskFilter === tab.key
                        ? "gradient-brand text-white shadow-sm"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab.label}
                    <span className={cn("text-[10px] px-1 rounded-sm", activeTaskFilter === tab.key ? "bg-white/20" : "bg-background")}>{tab.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-border max-h-[280px] overflow-y-auto">
              {filteredTasks.length === 0 ? (
                <div className="py-10 text-center text-sm text-muted-foreground">No tasks in this category</div>
              ) : (
                filteredTasks.map(task => (
                  <motion.div
                    key={task.id}
                    layout
                    className="flex items-start gap-3 px-5 py-3.5 hover:bg-muted/30 transition-colors group"
                  >
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={cn(
                        "mt-0.5 w-4.5 h-4.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all",
                        task.status === "completed"
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-border hover:border-primary"
                      )}
                      style={{ width: 18, height: 18, minWidth: 18 }}
                    >
                      {task.status === "completed" && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-medium text-foreground leading-snug", task.status === "completed" && "line-through text-muted-foreground")}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock size={10} /> {task.due}
                        </span>
                        <span className="text-xs text-muted-foreground">{task.assignee}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={cn("text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full", {
                        "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400": task.priority === "high",
                        "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400": task.priority === "medium",
                        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400": task.priority === "low",
                      })}>
                        {task.priority}
                      </span>
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium capitalize", {
                        "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400": task.status === "pending",
                        "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400": task.status === "in-progress",
                        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400": task.status === "completed",
                      })}>
                        {task.status.replace("-", " ")}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-5 shadow-card"
        >
          <h3 className="font-semibold text-foreground text-sm font-display mb-4 flex items-center gap-2">
            <BarChart2 size={15} className="text-muted-foreground" />
            Quick Overview
          </h3>
          <div className="space-y-4">
            {[
              { label: "Attendance Rate", value: 87, color: "bg-brand-500" },
              { label: "Fee Collection", value: 78, color: "bg-emerald-500" },
              { label: "Pass Percentage", value: 94, color: "bg-amber-500" },
              { label: "Student Satisfaction", value: 92, color: "bg-sky-500" },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-bold text-foreground">{item.value}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className={cn("h-full rounded-full", item.color)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-border">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Recent Notices</h4>
            <div className="space-y-2.5">
              {MOCK_NOTICES.slice(0, 3).map(notice => (
                <div key={notice.id} className="flex items-start gap-2">
                  <div className={cn("w-1.5 h-1.5 mt-1.5 rounded-full flex-shrink-0", {
                    "bg-rose-500": notice.priority === "high",
                    "bg-amber-500": notice.priority === "medium",
                    "bg-emerald-500": notice.priority === "low",
                  })} />
                  <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">{notice.title}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
