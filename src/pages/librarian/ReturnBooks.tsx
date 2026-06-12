import { useState, useEffect } from "react";
import { BookCheck, Search, AlertTriangle, X } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import { store } from "@/lib/store";
import type { BookIssue } from "@/types";
import { cn } from "@/lib/utils";

export default function ReturnBooks() {
  const [issues, setIssues] = useState<BookIssue[]>([...store.bookIssues].filter(i => i.status !== "returned"));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "overdue" | "issued">("all");

  const calculateFine = (dueDate: string): number => {
    const due = new Date(dueDate);
    const today = new Date();
    if (today <= due) return 0;
    const days = Math.ceil((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
    return days * 10;
  };

  const filteredIssues = issues.filter(i => {
    const matchSearch =
      i.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
      i.borrowerName.toLowerCase().includes(search.toLowerCase());
    const isOverdue = i.status === "overdue" || new Date(i.dueDate) < new Date();
    const matchFilter =
      filter === "all" ||
      (filter === "overdue" && isOverdue) ||
      (filter === "issued" && !isOverdue);
    return matchSearch && matchFilter;
  });

  const handleReturn = (issueId: string) => {
    const issue = issues.find(i => i.id === issueId);
    if (!issue) return;

    const fine = calculateFine(issue.dueDate);

    // Update the store's book issues
    store.bookIssues = store.bookIssues.map(i =>
      i.id === issueId ? { ...i, status: "returned", returnDate: new Date().toISOString().split("T")[0] } : i
    );

    // Restore book availability in store
    store.books = store.books.map(b =>
      b.id === issue.bookId ? { ...b, available: b.available + 1, status: "available" as const } : b
    );

    setIssues(prev => prev.filter(i => i.id !== issueId));

    if (fine > 0) {
      toast.success(`Book returned — Fine of ₹${fine} collected`);
    } else {
      toast.success("Book returned successfully");
    }
  };

  const overdueCount = issues.filter(i => i.status === "overdue" || new Date(i.dueDate) < new Date()).length;
  const issuedCount = issues.filter(i => i.status === "issued" && new Date(i.dueDate) >= new Date()).length;

  return (
    <div>
      <PageHeader title="Return Books" subtitle="Process book returns and fine collection" />

      {/* Summary Pills */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Total Pending", value: issues.length, color: "text-brand-600" },
          { label: "On Time", value: issuedCount, color: "text-sky-600" },
          { label: "Overdue", value: overdueCount, color: "text-rose-600" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
            <p className={cn("text-2xl font-bold font-display", s.color)}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by book or borrower..."
            className="w-full pl-9 pr-9 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {(["all", "overdue", "issued"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-medium transition-all capitalize",
                filter === f ? "gradient-brand text-white shadow-sm" : "bg-card border border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {f === "all" ? "All" : f === "overdue" ? "Overdue" : "On Time"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredIssues.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-14 text-center shadow-card">
            <BookCheck size={36} className="text-muted-foreground/20 mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground mb-1">
              {issues.length === 0 ? "No pending returns" : "No results found"}
            </p>
            <p className="text-xs text-muted-foreground">
              {issues.length === 0 ? "All books have been returned" : "Try adjusting your search or filter"}
            </p>
          </div>
        ) : (
          filteredIssues.map((issue, idx) => {
            const fine = calculateFine(issue.dueDate);
            const isOverdue = issue.status === "overdue" || new Date(issue.dueDate) < new Date();
            const overdueDays = isOverdue
              ? Math.ceil((new Date().getTime() - new Date(issue.dueDate).getTime()) / (1000 * 60 * 60 * 24))
              : 0;

            return (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={cn(
                  "bg-card border rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all",
                  isOverdue ? "border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/10" : "border-border"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <p className="font-semibold text-foreground text-sm">{issue.bookTitle}</p>
                      {isOverdue && (
                        <span className="badge-error flex items-center gap-1">
                          <AlertTriangle size={10} /> {overdueDays}d overdue
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Borrower: <span className="font-medium text-foreground">{issue.borrowerName}</span>
                      <span className="ml-2 capitalize text-muted-foreground">({issue.borrowerType})</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>Issued: <span className="font-medium text-foreground">{issue.issueDate}</span></span>
                      <span className={cn("font-medium", isOverdue ? "text-rose-600 dark:text-rose-400" : "text-foreground")}>
                        Due: {issue.dueDate}
                      </span>
                      {fine > 0 && (
                        <span className="font-bold text-rose-600 dark:text-rose-400">
                          Fine: ₹{fine}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleReturn(issue.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-sm flex-shrink-0",
                      isOverdue
                        ? "bg-rose-600 hover:bg-rose-700 text-white"
                        : "gradient-brand text-white hover:opacity-90"
                    )}
                  >
                    <BookCheck size={14} />
                    {isOverdue ? `Return + ₹${fine}` : "Return Book"}
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
