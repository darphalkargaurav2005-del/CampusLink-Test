import { useState } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import { cn } from "@/lib/utils";

const INITIAL_REQUESTS = [
  { id: "req1", bookTitle: "Artificial Intelligence: A Modern Approach", author: "Russell & Norvig", requestedBy: "Aisha Sharma", type: "student", date: "2024-02-26", priority: "high", status: "pending" as const },
  { id: "req2", bookTitle: "Machine Learning in Practice", author: "Sebastian Raschka", requestedBy: "Rohan Mehta", type: "student", date: "2024-02-25", priority: "medium", status: "pending" as const },
  { id: "req3", bookTitle: "Advanced Database Systems", author: "Ramakrishnan & Gehrke", requestedBy: "Dr. Anand Kumar", type: "teacher", date: "2024-02-24", priority: "high", status: "pending" as const },
];

export default function BookRequests() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  const updateStatus = (id: string, status: "approved" | "rejected") => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    toast.success(`Request ${status}`);
  };

  const pending = requests.filter(r => r.status === "pending");
  const processed = requests.filter(r => r.status !== "pending");

  return (
    <div>
      <PageHeader title="Book Requests" subtitle={`${pending.length} pending requests`} />

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Pending", value: requests.filter(r => r.status === "pending").length, color: "text-amber-600" },
          { label: "Approved", value: requests.filter(r => r.status === "approved").length, color: "text-emerald-600" },
          { label: "Rejected", value: requests.filter(r => r.status === "rejected").length, color: "text-rose-600" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
            <p className={cn("text-2xl font-bold font-display", s.color)}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {pending.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-foreground text-sm font-display mb-3">Pending Requests</h3>
          <div className="space-y-3">
            {pending.map((req, idx) => (
              <motion.div key={req.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.07 }} className="bg-card border border-amber-200 dark:border-amber-900 rounded-xl p-4 shadow-card">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">{req.bookTitle}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">by {req.author}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>Requested by: <span className="font-medium text-foreground">{req.requestedBy}</span></span>
                      <span className="capitalize">{req.type}</span>
                      <span>{req.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => updateStatus(req.id, "approved")} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                      <CheckCircle size={13} /> Approve
                    </button>
                    <button onClick={() => updateStatus(req.id, "rejected")} className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 text-white text-xs font-medium rounded-lg hover:bg-rose-700 transition-colors">
                      <XCircle size={13} /> Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {processed.length > 0 && (
        <div>
          <h3 className="font-semibold text-foreground text-sm font-display mb-3">Processed Requests</h3>
          <div className="space-y-2">
            {processed.map((req, idx) => (
              <motion.div key={req.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-3 shadow-card">
                <div>
                  <p className="font-medium text-foreground text-sm">{req.bookTitle}</p>
                  <p className="text-xs text-muted-foreground">{req.requestedBy} • {req.date}</p>
                </div>
                <span className={req.status === "approved" ? "badge-success" : "badge-error"}>{req.status}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
