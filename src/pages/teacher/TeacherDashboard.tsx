import { motion } from "framer-motion";
import { BookOpen, Users, CalendarCheck, TrendingUp, Clock, AlertCircle, ClipboardList, FileText } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import StatCard from "@/components/features/StatCard";
import ChartCard from "@/components/features/ChartCard";
import PageHeader from "@/components/features/PageHeader";
import { MOCK_ASSIGNMENTS, MOCK_COURSES, ANALYTICS_ATTENDANCE, SUBJECT_PERFORMANCE } from "@/constants/mockData";
import { cn } from "@/lib/utils";

export default function TeacherDashboard() {
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" });

  const todayClasses = [
    { time: "09:00 AM", course: "Data Structures & Algorithms", room: "LH-201", class: "B.Tech CS Year 3 A", students: 62 },
    { time: "11:00 AM", course: "Algorithm Design Lab", room: "CS-Lab-2", class: "B.Tech CS Year 3 B", students: 30 },
    { time: "02:00 PM", course: "Database Management Systems", room: "LH-203", class: "B.Tech CS Year 3 A", students: 58 },
  ];

  return (
    <div>
      <PageHeader title="Teacher Dashboard" subtitle={`Good morning, Dr. Anand. Today is ${today}.`} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="My Courses" value="4" subtitle="Active this semester" icon={BookOpen} gradient="brand" index={0} />
        <StatCard title="Total Students" value="215" subtitle="Across all courses" icon={Users} gradient="sky" index={1} />
        <StatCard title="Classes Today" value="3" subtitle="Next at 9:00 AM" icon={Clock} gradient="success" index={2} />
        <StatCard title="Pending Reviews" value="38" subtitle="Assignments to grade" icon={ClipboardList} gradient="warning" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <ChartCard title="Class Attendance Trend" subtitle="Average attendance % across my courses" index={0}>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={ANALYTICS_ATTENDANCE}>
                <defs>
                  <linearGradient id="teachAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} formatter={(v: number) => [`${v}%`, "Attendance"]} />
                <Area type="monotone" dataKey="attendance" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#teachAtt)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Today's Schedule" subtitle={today} index={1}>
          <div className="space-y-3 mt-1">
            {todayClasses.map((cls, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                <div className="text-center w-16 flex-shrink-0">
                  <p className="text-xs font-bold text-brand-600 dark:text-brand-400">{cls.time}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{cls.course}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{cls.room} • {cls.students} students</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Subject Performance" subtitle="Class average score per subject (%)" index={2}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={SUBJECT_PERFORMANCE} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} />
              <Bar dataKey="avg" fill="#4f46e5" radius={[5, 5, 0, 0]} name="Avg Score" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="font-semibold text-foreground text-sm font-display mb-4">Pending Assignments</h3>
          <div className="space-y-3">
            {MOCK_ASSIGNMENTS.filter(a => a.status === "active").map(a => (
              <div key={a.id} className="flex items-start justify-between gap-3 p-3 bg-muted/50 rounded-xl">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.courseName}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: `${Math.round(((a.submittedCount ?? 0) / (a.totalStudents ?? 1)) * 100)}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{a.submittedCount}/{a.totalStudents}</span>
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground whitespace-nowrap">
                  <AlertCircle size={13} className="inline mr-1 text-amber-500" />Due {a.dueDate}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
