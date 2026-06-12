import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";
import PageHeader from "@/components/features/PageHeader";
import ChartCard from "@/components/features/ChartCard";
import StatCard from "@/components/features/StatCard";
import { ANALYTICS_ATTENDANCE, ANALYTICS_FEE_COLLECTION, ANALYTICS_ADMISSIONS, ANALYTICS_PERFORMANCE, DEPARTMENT_DISTRIBUTION, LIBRARY_STATS, SUBJECT_PERFORMANCE } from "@/constants/mockData";
import { GraduationCap, TrendingUp, Wallet, BookOpen, Download } from "lucide-react";
import { toast } from "sonner";

export default function ReportsAnalytics() {
  const feeData = ANALYTICS_FEE_COLLECTION.map(d => ({ ...d, fees: Math.round((d.fees ?? 0) / 100000) }));

  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Comprehensive institutional analytics and performance insights"
        action={
          <button onClick={() => toast.success("Full report exported")} className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
            <Download size={16} /> Export All Reports
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Avg Attendance" value="87%" icon={GraduationCap} gradient="success" trend={2.1} index={0} />
        <StatCard title="Pass Rate" value="94.2%" icon={TrendingUp} gradient="brand" trend={1.8} index={1} />
        <StatCard title="Fee Collection" value="₹1.82 Cr" icon={Wallet} gradient="warning" trend={12.4} index={2} />
        <StatCard title="Library Usage" value="1,840" icon={BookOpen} gradient="sky" trend={5.3} index={3} subtitle="Books issued this year" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ChartCard title="Student Attendance Trend" subtitle="Monthly attendance rate (%)" index={0}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ANALYTICS_ATTENDANCE}>
              <defs>
                <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} formatter={(v: number) => [`${v}%`, "Attendance"]} />
              <Area type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2.5} fill="url(#attGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Academic Performance" subtitle="Average performance score (%)" index={1}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={ANALYTICS_PERFORMANCE}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} formatter={(v: number) => [`${v}%`, "Performance"]} />
              <Line type="monotone" dataKey="performance" stroke="#4f46e5" strokeWidth={2.5} dot={{ r: 4, fill: "#4f46e5" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <ChartCard title="Fee Collection" subtitle="Monthly collection in Lakhs (₹)" index={2}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={feeData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}L`} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} formatter={(v: number) => [`₹${v} Lakhs`, "Collected"]} />
                <Bar dataKey="fees" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Department Split" subtitle="Student distribution" index={3}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={DEPARTMENT_DISTRIBUTION} cx="50%" cy="50%" outerRadius={80} dataKey="value" paddingAngle={2}>
                {DEPARTMENT_DISTRIBUTION.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} />
              <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: "10px" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Library Usage" subtitle="Books issued/returned monthly" index={4}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={LIBRARY_STATS} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} />
              <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="issued" fill="#0ea5e9" name="Issued" radius={[3, 3, 0, 0]} />
              <Bar dataKey="returned" fill="#10b981" name="Returned" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Subject Performance" subtitle="Average scores per subject" index={5}>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={SUBJECT_PERFORMANCE}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <Radar name="Average" dataKey="avg" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Highest" dataKey="highest" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
              <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: "11px" }} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
