import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import PageHeader from "@/components/features/PageHeader";
import ChartCard from "@/components/features/ChartCard";
import { ANALYTICS_ATTENDANCE, ANALYTICS_PERFORMANCE } from "@/constants/mockData";

const COMBINED = ANALYTICS_ATTENDANCE.map((a, i) => ({
  month: a.month,
  attendance: a.attendance,
  performance: ANALYTICS_PERFORMANCE[i]?.performance ?? 0,
}));

export default function ParentPerformanceGraphs() {
  return (
    <div>
      <PageHeader title="Performance Graphs" subtitle="Visual analysis of your child's academic performance" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ChartCard title="Attendance vs Performance" subtitle="Monthly comparison" index={0}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={COMBINED} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="attendance" fill="#10b981" name="Attendance %" radius={[3, 3, 0, 0]} />
              <Bar dataKey="performance" fill="#4f46e5" name="Performance %" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Performance Trend" subtitle="Score trend over months" index={1}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={ANALYTICS_PERFORMANCE}>
              <defs>
                <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} formatter={(v: number) => [`${v}%`, "Performance"]} />
              <Area type="monotone" dataKey="performance" stroke="#4f46e5" strokeWidth={2.5} fill="url(#perfGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
