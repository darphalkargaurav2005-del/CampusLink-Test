import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import PageHeader from "@/components/features/PageHeader";
import ChartCard from "@/components/features/ChartCard";
import { ANALYTICS_ADMISSIONS } from "@/constants/mockData";

const SKILL_GROWTH = [
  { sem: "Sem 1", problem: 60, communication: 55, technical: 65 },
  { sem: "Sem 2", problem: 65, communication: 62, technical: 70 },
  { sem: "Sem 3", problem: 72, communication: 68, technical: 76 },
  { sem: "Sem 4", problem: 78, communication: 74, technical: 82 },
  { sem: "Sem 5", problem: 85, communication: 80, technical: 88 },
];

export default function GrowthAnalysis() {
  return (
    <div>
      <PageHeader title="Growth Analysis" subtitle="Academic and personal development tracking for Aisha Sharma" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Academic Growth" subtitle="SGPA progression over semesters" index={0}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={[
              { sem: "Sem 1", sgpa: 8.2 }, { sem: "Sem 2", sgpa: 8.5 }, { sem: "Sem 3", sgpa: 8.8 },
              { sem: "Sem 4", sgpa: 9.0 }, { sem: "Sem 5", sgpa: 8.9 },
            ]}>
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="sem" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[7, 10]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="sgpa" stroke="#10b981" strokeWidth={2.5} fill="url(#growthGrad)" name="SGPA" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Skill Development" subtitle="Growth in core competency areas" index={1}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={SKILL_GROWTH}>
              <defs>
                <linearGradient id="techGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="sem" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="technical" stroke="#4f46e5" strokeWidth={2} fill="url(#techGrad)" name="Technical" />
              <Area type="monotone" dataKey="problem" stroke="#10b981" strokeWidth={2} fill="transparent" name="Problem Solving" />
              <Area type="monotone" dataKey="communication" stroke="#f59e0b" strokeWidth={2} fill="transparent" name="Communication" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
