import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import PageHeader from "@/components/features/PageHeader";
import ChartCard from "@/components/features/ChartCard";
import { MOCK_MARKS } from "@/constants/mockData";
import { cn } from "@/lib/utils";

const SEMESTER_PROGRESS = [
  { sem: "Sem 1", sgpa: 8.2, attendance: 88 },
  { sem: "Sem 2", sgpa: 8.5, attendance: 91 },
  { sem: "Sem 3", sgpa: 8.8, attendance: 87 },
  { sem: "Sem 4", sgpa: 9.0, attendance: 93 },
  { sem: "Sem 5", sgpa: 8.9, attendance: 87 },
];

export default function AcademicProgress() {
  const marks = MOCK_MARKS.filter(m => m.studentId === "s1");

  return (
    <div>
      <PageHeader title="Academic Progress" subtitle="Aisha Sharma's academic performance overview" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Current CGPA", value: "8.90", color: "text-brand-600" },
          { label: "Academic Rank", value: "12th", color: "text-sky-600" },
          { label: "Subjects Passed", value: `${marks.length}/${marks.length}`, color: "text-emerald-600" },
          { label: "Total Credits", value: "116", color: "text-violet-600" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
            <p className={cn("text-2xl font-bold font-display", s.color)}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ChartCard title="Semester-wise SGPA" subtitle="Academic growth over semesters" index={0}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={SEMESTER_PROGRESS} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="sem" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[7, 10]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} />
              <Bar dataKey="sgpa" fill="#4f46e5" radius={[6, 6, 0, 0]} name="SGPA" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="font-semibold text-foreground text-sm font-display mb-4">Current Semester Marks</h3>
          <div className="space-y-3">
            {marks.map((m, i) => {
              const pct = Math.round((m.obtainedMarks / m.maxMarks) * 100);
              return (
                <div key={i} className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{m.courseName}</p>
                    <div className="h-1.5 bg-muted rounded-full mt-1.5 overflow-hidden">
                      <div style={{ width: `${pct}%` }} className="h-full bg-brand-500 rounded-full" />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-muted-foreground">{m.obtainedMarks}/{m.maxMarks}</p>
                    <p className={cn("text-xs font-bold", m.grade.includes("+") ? "text-emerald-600 dark:text-emerald-400" : "text-sky-600 dark:text-sky-400")}>{m.grade}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
