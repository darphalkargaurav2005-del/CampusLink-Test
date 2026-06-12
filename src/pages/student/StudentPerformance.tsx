import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend, BarChart, Bar } from "recharts";
import PageHeader from "@/components/features/PageHeader";
import ChartCard from "@/components/features/ChartCard";
import { ANALYTICS_PERFORMANCE, SUBJECT_PERFORMANCE } from "@/constants/mockData";

const SEMESTER_SGPA = [
  { sem: "Sem 1", sgpa: 8.2 },
  { sem: "Sem 2", sgpa: 8.5 },
  { sem: "Sem 3", sgpa: 8.8 },
  { sem: "Sem 4", sgpa: 9.0 },
  { sem: "Sem 5", sgpa: 8.9 },
];

export default function StudentPerformance() {
  return (
    <div>
      <PageHeader title="My Performance" subtitle="Detailed academic performance analytics" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ChartCard title="SGPA Trend" subtitle="Semester-wise performance" index={0}>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={SEMESTER_SGPA}>
              <defs>
                <linearGradient id="sgpaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="sem" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[7, 10]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="sgpa" stroke="#4f46e5" strokeWidth={2.5} fill="url(#sgpaGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Subject Performance Radar" subtitle="My scores vs class average" index={1}>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={SUBJECT_PERFORMANCE}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
              <Radar name="My Score" dataKey="avg" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Class Avg" dataKey="highest" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Subject-wise Score Breakdown" subtitle="Marks obtained vs class average" index={2}>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={SUBJECT_PERFORMANCE} barSize={22}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
            <Bar dataKey="avg" fill="#4f46e5" name="Class Avg" radius={[5, 5, 0, 0]} />
            <Bar dataKey="highest" fill="#10b981" name="Highest" radius={[5, 5, 0, 0]} />
            <Bar dataKey="lowest" fill="#f43f5e" name="Lowest" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
