import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, BookCheck, AlertTriangle, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import StatCard from "@/components/features/StatCard";
import ChartCard from "@/components/features/ChartCard";
import PageHeader from "@/components/features/PageHeader";
import { LIBRARY_STATS } from "@/constants/mockData";
import { store } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function LibrarianDashboard() {
  const [books, setBooks] = useState([...store.books]);
  const [issues, setIssues] = useState([...store.bookIssues]);

  useEffect(() => {
    setBooks([...store.books]);
    setIssues([...store.bookIssues]);
  }, []);

  const totalBooks = books.reduce((a, b) => a + b.copies, 0);
  const issuedBooks = books.reduce((a, b) => a + (b.copies - b.available), 0);
  const overdueCount = issues.filter(i => i.status === "overdue").length;
  const totalFine = issues.reduce((a, i) => a + i.fine, 0);
  const recentIssues = [...issues].slice(0, 5);

  return (
    <div>
      <PageHeader title="Library Dashboard" subtitle="Welcome, Mrs. Kavitha. Here is the library overview." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Books" value={totalBooks} subtitle="In collection" icon={BookOpen} gradient="brand" index={0} />
        <StatCard title="Currently Issued" value={issuedBooks} subtitle="Out of library" icon={BookCheck} gradient="sky" index={1} />
        <StatCard title="Overdue Returns" value={overdueCount} subtitle="Need follow-up" icon={AlertTriangle} gradient="rose" index={2} />
        <StatCard title="Pending Fines" value={`₹${totalFine}`} subtitle="Total outstanding" icon={DollarSign} gradient="warning" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <ChartCard title="Library Usage Trend" subtitle="Books issued and returned monthly" index={0}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={LIBRARY_STATS} barSize={16}>
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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="font-semibold text-foreground text-sm font-display mb-4">Recent Issues</h3>
          <div className="space-y-3">
            {recentIssues.map(issue => (
              <div key={issue.id} className="flex items-start gap-2.5">
                <div className={cn("w-2 h-2 mt-1.5 rounded-full flex-shrink-0", {
                  "bg-emerald-500": issue.status === "returned",
                  "bg-sky-500": issue.status === "issued",
                  "bg-rose-500": issue.status === "overdue",
                })} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{issue.bookTitle}</p>
                  <p className="text-[10px] text-muted-foreground">{issue.borrowerName} • {issue.issueDate}</p>
                </div>
                <span className={cn("text-[10px] font-semibold capitalize px-1.5 py-0.5 rounded-full flex-shrink-0", {
                  "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400": issue.status === "returned",
                  "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400": issue.status === "issued",
                  "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400": issue.status === "overdue",
                })}>{issue.status}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Available Books", value: books.reduce((a, b) => a + b.available, 0), color: "text-emerald-600" },
          { label: "Total Titles", value: books.length, color: "text-brand-600" },
          { label: "Active Borrowers", value: issues.filter(i => i.status === "issued").length, color: "text-sky-600" },
          { label: "Overdue Fines", value: `₹${issues.filter(i => i.status === "overdue").reduce((a, i) => a + i.fine, 0)}`, color: "text-rose-600" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 + 0.4 }} className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
            <p className={cn("text-2xl font-bold font-display", s.color)}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
