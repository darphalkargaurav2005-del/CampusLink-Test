import { useState, useEffect } from "react";
import { DollarSign, CheckCircle, Search, AlertTriangle, X, IndianRupee } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import StatCard from "@/components/features/StatCard";
import { store } from "@/lib/store";
import type { BookIssue } from "@/types";
import { cn } from "@/lib/utils";

export default function FineManagement() {
  const [issues, setIssues] = useState<BookIssue[]>([...store.bookIssues]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "collected">("all");

  useEffect(() => {
    setIssues([...store.bookIssues]);
  }, []);

  const calculateFine = (issue: BookIssue): number => {
    if (issue.status === "returned") return issue.fine;
    const due = new Date(issue.dueDate);
    const today = new Date();
    if (today <= due) return 0;
    const days = Math.ceil((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
    return days * 10; // ₹10/day
  };

  // Enrich issues with calculated fines
  const enrichedIssues = issues.map(i => ({
    ...i,
    calculatedFine: calculateFine(i),
    isOverdue: i.status === "overdue" || (i.status === "issued" && new Date(i.dueDate) < new Date()),
  }));

  const fineIssues = enrichedIssues.filter(i => i.calculatedFine > 0);

  const totalFine = fineIssues.reduce((a, i) => a + i.calculatedFine, 0);
  const collected = fineIssues.filter(i => i.status === "returned").reduce((a, i) => a + i.calculatedFine, 0);
  const pending = fineIssues.filter(i => i.status !== "returned").reduce((a, i) => a + i.calculatedFine, 0);

  const filtered = fineIssues.filter(i => {
    const matchSearch =
      i.borrowerName.toLowerCase().includes(search.toLowerCase()) ||
      i.bookTitle.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "pending" && i.status !== "returned") ||
      (filter === "collected" && i.status === "returned");
    return matchSearch && matchFilter;
  });

  const collectFine = (id: string) => {
    const issue = issues.find(i => i.id === id);
    if (!issue) return;
    const fine = calculateFine(issue);

    const updated = issues.map(i =>
      i.id === id ? { ...i, fine: fine, status: "returned" as const, returnDate: new Date().toISOString().split("T")[0] } : i
    );
    setIssues(updated);
    store.bookIssues = updated;

    toast.success(`Fine of ₹${fine} collected successfully`);
  };

  return (
    <div>
      <PageHeader title="Fine Management" subtitle="Track and collect overdue library fines" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Fines Generated" value={`₹${totalFine}`} icon={IndianRupee} gradient="rose" index={0} />
        <StatCard title="Amount Collected" value={`₹${collected}`} icon={CheckCircle} gradient="success" index={1} />
        <StatCard title="Pending Collection" value={`₹${pending}`} icon={AlertTriangle} gradient="warning" index={2} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by borrower or book..."
            className="w-full pl-9 pr-9 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "collected"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-medium transition-all capitalize",
                filter === f ? "gradient-brand text-white shadow-sm" : "bg-card border border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Fine Rate Notice */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-3 mb-5 flex items-center gap-2.5 text-sm text-amber-700 dark:text-amber-400">
        <AlertTriangle size={15} className="flex-shrink-0" />
        <span>Late fee: <strong>₹10 per day</strong> after due date</span>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Borrower</th>
                <th>Book</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Fine Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-muted-foreground text-sm">
                    No fine records found
                    {(search || filter !== "all") && (
                      <button onClick={() => { setSearch(""); setFilter("all"); }} className="text-primary ml-1 hover:underline">Clear filters</button>
                    )}
                  </td>
                </tr>
              ) : (
                filtered.map((issue, idx) => (
                  <motion.tr key={issue.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.04 }}>
                    <td>
                      <div>
                        <p className="font-medium text-sm text-foreground">{issue.borrowerName}</p>
                        <p className="text-xs text-muted-foreground capitalize">{issue.borrowerType}</p>
                      </div>
                    </td>
                    <td className="text-sm text-foreground font-medium">{issue.bookTitle}</td>
                    <td className="text-xs text-muted-foreground">{issue.issueDate}</td>
                    <td>
                      <span className={cn(
                        "text-xs font-semibold",
                        issue.isOverdue && issue.status !== "returned" ? "text-rose-600 dark:text-rose-400" : "text-foreground"
                      )}>
                        {issue.dueDate}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-rose-600 dark:text-rose-400">₹{issue.calculatedFine}</span>
                      </div>
                    </td>
                    <td>
                      <span className={cn({
                        "badge-error": issue.status === "overdue" || (issue.isOverdue && issue.status !== "returned"),
                        "badge-success": issue.status === "returned",
                        "badge-info": issue.status === "issued" && !issue.isOverdue,
                      })}>
                        {issue.status === "returned" ? "Collected" : issue.isOverdue ? "Overdue" : "Issued"}
                      </span>
                    </td>
                    <td>
                      {issue.status !== "returned" && issue.calculatedFine > 0 && (
                        <button
                          onClick={() => collectFine(issue.id)}
                          className="flex items-center gap-1.5 text-xs px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                        >
                          <DollarSign size={12} /> Collect ₹{issue.calculatedFine}
                        </button>
                      )}
                      {issue.status === "returned" && (
                        <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                          <CheckCircle size={12} /> Paid
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
