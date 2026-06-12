import { useState } from "react";
import { Search, Download, CheckCircle, XCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import PageHeader from "@/components/features/PageHeader";
import StatCard from "@/components/features/StatCard";
import { MOCK_FEES } from "@/constants/mockData";
import type { FeeRecord } from "@/types";
import { Wallet, AlertTriangle, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FeeManagement() {
  const [fees] = useState<FeeRecord[]>(MOCK_FEES);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = fees.filter(f => {
    const matchSearch = f.studentName.toLowerCase().includes(search.toLowerCase()) || f.feeType.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || f.status === filter;
    return matchSearch && matchFilter;
  });

  const totalCollected = fees.filter(f => f.status === "paid").reduce((a, f) => a + f.amount, 0);
  const totalPending = fees.filter(f => f.status !== "paid").reduce((a, f) => a + f.amount, 0);

  const statusIcons = {
    paid: <CheckCircle size={14} className="text-emerald-600" />,
    pending: <Clock size={14} className="text-amber-600" />,
    overdue: <XCircle size={14} className="text-rose-600" />,
  };

  return (
    <div>
      <PageHeader
        title="Fee Management"
        subtitle="Track and manage student fee payments"
        action={
          <button onClick={() => toast.success("Report exported successfully")} className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
            <Download size={16} /> Export Report
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Collected" value={`₹${(totalCollected / 100000).toFixed(1)}L`} icon={Wallet} gradient="success" index={0} trend={12.4} />
        <StatCard title="Pending Amount" value={`₹${(totalPending / 1000).toFixed(0)}K`} icon={AlertTriangle} gradient="rose" index={1} trend={-5.2} />
        <StatCard title="Paid Students" value={fees.filter(f => f.status === "paid").length} icon={Users} gradient="sky" index={2} />
        <StatCard title="Collection Rate" value={`${Math.round((totalCollected / (totalCollected + totalPending)) * 100)}%`} icon={TrendingUp} gradient="brand" index={3} />
      </div>

      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-48 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student or fee type..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex gap-2">
          {["all", "paid", "pending", "overdue"].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn("px-3 py-2 text-xs font-medium rounded-xl border transition-colors capitalize", filter === s ? "gradient-brand text-white border-transparent" : "border-border hover:bg-muted")}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Fee Type</th>
                <th>Amount</th>
                <th>Semester</th>
                <th>Due Date</th>
                <th>Paid Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((fee, idx) => (
                <motion.tr key={fee.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.04 }}>
                  <td className="font-medium text-sm">{fee.studentName}</td>
                  <td className="text-sm text-muted-foreground">{fee.feeType}</td>
                  <td className="font-semibold text-foreground">₹{fee.amount.toLocaleString()}</td>
                  <td className="text-sm">Sem {fee.semester}</td>
                  <td className="text-xs text-muted-foreground">{fee.dueDate}</td>
                  <td className="text-xs text-muted-foreground">{fee.paidDate || "—"}</td>
                  <td>
                    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium", {
                      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400": fee.status === "paid",
                      "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400": fee.status === "pending",
                      "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400": fee.status === "overdue",
                    })}>
                      {statusIcons[fee.status]}
                      {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    {fee.status !== "paid" && (
                      <button onClick={() => toast.success(`Payment reminder sent to ${fee.studentName}`)} className="text-xs px-3 py-1.5 border border-border rounded-lg hover:bg-muted transition-colors">
                        Send Reminder
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
