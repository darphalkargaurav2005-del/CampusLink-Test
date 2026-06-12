import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import PageHeader from "@/components/features/PageHeader";
import ChartCard from "@/components/features/ChartCard";
import StatCard from "@/components/features/StatCard";
import { LIBRARY_STATS } from "@/constants/mockData";
import { store } from "@/lib/store";
import { BookOpen, Users, TrendingUp, Download } from "lucide-react";
import { toast } from "sonner";

export default function LibraryReports() {
  const books = store.books;
  const issues = store.bookIssues;

  const totalBooks = books.reduce((a, b) => a + b.copies, 0);
  const issuedBooks = books.reduce((a, b) => a + (b.copies - b.available), 0);
  const overdueCount = issues.filter(i => i.status === "overdue").length;
  const issueRate = totalBooks > 0 ? Math.round((issuedBooks / totalBooks) * 100) : 0;

  // Category distribution from actual books
  const catMap = books.reduce((acc, b) => {
    acc[b.category] = (acc[b.category] || 0) + b.copies;
    return acc;
  }, {} as Record<string, number>);

  const COLORS = ["#4f46e5", "#8b5cf6", "#0ea5e9", "#10b981", "#f43f5e", "#f59e0b", "#14b8a6", "#ec4899"];
  const categoryData = Object.entries(catMap).map(([name, value], i) => ({
    name, value, color: COLORS[i % COLORS.length]
  }));

  return (
    <div>
      <PageHeader
        title="Library Reports"
        subtitle="Comprehensive library usage and inventory analytics"
        action={
          <button onClick={() => toast.success("Report exported to CSV")} className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
            <Download size={16} /> Export Report
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Copies" value={totalBooks} icon={BookOpen} gradient="brand" index={0} />
        <StatCard title="Currently Issued" value={issuedBooks} icon={Users} gradient="sky" index={1} />
        <StatCard title="Unique Titles" value={books.length} icon={BookOpen} gradient="success" index={2} />
        <StatCard title="Issue Rate" value={`${issueRate}%`} icon={TrendingUp} gradient="warning" index={3} trend={5.2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <ChartCard title="Monthly Issue/Return Trend" subtitle="Books issued and returned each month" index={0}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={LIBRARY_STATS} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="issued" fill="#4f46e5" name="Issued" radius={[3, 3, 0, 0]} />
                <Bar dataKey="returned" fill="#10b981" name="Returned" radius={[3, 3, 0, 0]} />
                <Bar dataKey="overdue" fill="#f43f5e" name="Overdue" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Category Distribution" subtitle="Books by category (live data)" index={1}>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={90} dataKey="value" paddingAngle={2} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "10px" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Summary Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground text-sm font-display">Top Books by Issue Count</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Category</th>
                <th>Total Copies</th>
                <th>Available</th>
                <th>Issued</th>
                <th>Utilization</th>
              </tr>
            </thead>
            <tbody>
              {[...books].sort((a, b) => (b.copies - b.available) - (a.copies - a.available)).map((book, idx) => {
                const issued = book.copies - book.available;
                const util = Math.round((issued / book.copies) * 100);
                return (
                  <tr key={book.id}>
                    <td>
                      <p className="font-medium text-sm text-foreground">{book.title}</p>
                      <p className="text-xs text-muted-foreground">{book.author}</p>
                    </td>
                    <td className="text-sm">{book.category}</td>
                    <td className="text-sm font-medium">{book.copies}</td>
                    <td className="text-sm text-emerald-600 font-semibold">{book.available}</td>
                    <td className="text-sm text-rose-600 font-semibold">{issued}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div style={{ width: `${util}%` }} className="h-full bg-brand-500 rounded-full" />
                        </div>
                        <span className="text-xs text-muted-foreground">{util}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
