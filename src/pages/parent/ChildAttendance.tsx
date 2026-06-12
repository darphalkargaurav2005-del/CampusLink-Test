import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import PageHeader from "@/components/features/PageHeader";
import ChartCard from "@/components/features/ChartCard";
import { ANALYTICS_ATTENDANCE } from "@/constants/mockData";
import { cn } from "@/lib/utils";

const MONTHLY_DETAILS = [
  { month: "Aug", present: 22, absent: 2, late: 0, total: 24 },
  { month: "Sep", present: 24, absent: 2, late: 0, total: 26 },
  { month: "Oct", present: 21, absent: 5, late: 0, total: 26 },
  { month: "Nov", present: 23, absent: 3, late: 0, total: 26 },
  { month: "Dec", present: 19, absent: 5, late: 0, total: 24 },
  { month: "Jan", present: 25, absent: 1, late: 0, total: 26 },
  { month: "Feb", present: 20, absent: 3, late: 0, total: 23 },
];

const SUBJECT_ATTENDANCE = [
  { subject: "Data Structures", pct: 85, present: 22, total: 26 },
  { subject: "DBMS", pct: 92, present: 24, total: 26 },
  { subject: "Engineering Math", pct: 69, present: 18, total: 26 },
  { subject: "Digital Electronics", pct: 83, present: 20, total: 24 },
  { subject: "Physics", pct: 67, present: 16, total: 24 },
  { subject: "Web Development", pct: 83, present: 10, total: 12 },
];

export default function ChildAttendance() {
  const overall = Math.round(MONTHLY_DETAILS.reduce((a, m) => a + m.present, 0) / MONTHLY_DETAILS.reduce((a, m) => a + m.total, 0) * 100);

  return (
    <div>
      <PageHeader title="Child Attendance" subtitle="Aisha Sharma's attendance records" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Overall", value: `${overall}%`, color: overall >= 75 ? "text-emerald-600" : "text-rose-600" },
          { label: "Total Classes", value: MONTHLY_DETAILS.reduce((a, m) => a + m.total, 0), color: "text-foreground" },
          { label: "Present", value: MONTHLY_DETAILS.reduce((a, m) => a + m.present, 0), color: "text-emerald-600" },
          { label: "Absent", value: MONTHLY_DETAILS.reduce((a, m) => a + m.absent, 0), color: "text-rose-600" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
            <p className={cn("text-2xl font-bold font-display", s.color)}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ChartCard title="Monthly Attendance" subtitle="Present vs Absent per month" index={0}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY_DETAILS} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="present" fill="#10b981" name="Present" radius={[3, 3, 0, 0]} />
              <Bar dataKey="absent" fill="#f43f5e" name="Absent" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Subject-wise Attendance" subtitle="Attendance percentage by course" index={1}>
          <div className="space-y-3 mt-1">
            {SUBJECT_ATTENDANCE.map((c, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground truncate">{c.subject}</span>
                  <span className={cn("font-semibold ml-2", c.pct >= 75 ? "text-emerald-600" : "text-rose-600")}>{c.pct}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${c.pct}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={cn("h-full rounded-full", c.pct >= 75 ? "bg-emerald-500" : "bg-rose-500")} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
