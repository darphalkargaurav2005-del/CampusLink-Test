import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend, ScatterChart, Scatter, ZAxis } from "recharts";
import PageHeader from "@/components/features/PageHeader";
import ChartCard from "@/components/features/ChartCard";
import { SUBJECT_PERFORMANCE, ANALYTICS_ATTENDANCE } from "@/constants/mockData";

const TOP_PERFORMERS = [
  { name: "Aisha Sharma", cgpa: 8.9, attendance: 87, subject: "CS" },
  { name: "Priya Patel", cgpa: 9.2, attendance: 93, subject: "EC" },
  { name: "Sneha Reddy", cgpa: 9.0, attendance: 91, subject: "CS" },
  { name: "Arjun Nair", cgpa: 8.1, attendance: 79, subject: "CI" },
  { name: "Tanvi Joshi", cgpa: 8.5, attendance: 88, subject: "CS" },
];

const GRADE_DIST = [
  { grade: "A+", count: 28, fill: "#10b981" },
  { grade: "A", count: 45, fill: "#4f46e5" },
  { grade: "B+", count: 62, fill: "#0ea5e9" },
  { grade: "B", count: 38, fill: "#f59e0b" },
  { grade: "C", count: 18, fill: "#f43f5e" },
  { grade: "F", count: 5, fill: "#6b7280" },
];

export default function PerformanceGraphs() {
  return (
    <div>
      <PageHeader title="Performance Analytics" subtitle="Detailed analysis of student performance across courses" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ChartCard title="Subject Performance Analysis" subtitle="Average, highest, and lowest scores per subject" index={0}>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={SUBJECT_PERFORMANCE}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <Radar name="Class Avg" dataKey="avg" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Highest" dataKey="highest" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Grade Distribution" subtitle="Number of students in each grade category" index={1}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={GRADE_DIST} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="grade" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "13px" }} />
              {GRADE_DIST.map(d => (
                <Bar key={d.grade} dataKey="count" fill={d.fill} radius={[6, 6, 0, 0]} />
              ))}
              <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartCard title="Subject-wise Class Average" subtitle="Average score per subject this semester" index={2}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={SUBJECT_PERFORMANCE} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "13px" }} />
                <Bar dataKey="avg" fill="#4f46e5" radius={[5, 5, 0, 0]} name="Avg Score" />
                <Bar dataKey="lowest" fill="#f43f5e" radius={[5, 5, 0, 0]} name="Lowest" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Top Performers" subtitle="Ranked by CGPA" index={3}>
          <div className="space-y-3">
            {TOP_PERFORMERS.sort((a, b) => b.cgpa - a.cgpa).map((s, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-950/30 flex items-center justify-center text-brand-700 dark:text-brand-400 font-bold text-xs">{s.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{s.name}</p>
                  <p className="text-[10px] text-muted-foreground">Att: {s.attendance}%</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{s.cgpa}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
