import { useState } from "react";
import { motion } from "framer-motion";
import { Search, History as HistoryIcon, Clock, User, Info, Trash2, Edit2, PlusCircle } from "lucide-react";
import PageHeader from "@/components/features/PageHeader";
import { store } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function History() {
  const [search, setSearch] = useState("");

  const filtered = store.history.filter(h =>
    h.itemName.toLowerCase().includes(search.toLowerCase()) ||
    h.itemType.toLowerCase().includes(search.toLowerCase()) ||
    (h.performedBy && h.performedBy.toLowerCase().includes(search.toLowerCase())) ||
    (h.details && h.details.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity & Deletion History"
        subtitle="Comprehensive audit logs of all modifications, additions, and deletions"
      />

      {/* Search and Filters */}
      <div className="relative max-w-md">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search logs by item, user, reason, action..."
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Timeline/List of audit entries */}
      <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <span className="font-semibold text-sm font-display">System Audit Logs</span>
          <span className="text-xs text-muted-foreground">{filtered.length} entries recorded</span>
        </div>

        <div className="divide-y divide-border/60 max-h-[600px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <HistoryIcon size={24} className="text-muted-foreground/45 m-auto mb-3" />
              <p className="text-sm text-muted-foreground">No audit entries found</p>
            </div>
          ) : (
            filtered.map((entry, idx) => {
              const ActionIcon = entry.action === "added" ? PlusCircle : entry.action === "edited" ? Edit2 : Trash2;
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.03, 0.4) }}
                  className="p-4 sm:p-5 flex items-start gap-4 hover:bg-muted/20 transition-colors"
                >
                  {/* Action Color Indicator */}
                  <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", {
                    "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400": entry.action === "added",
                    "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400": entry.action === "deleted",
                    "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400": entry.action === "edited",
                  })}>
                    <ActionIcon size={16} />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    {/* Item and Action details */}
                    <div className="flex items-center gap-2 flex-wrap text-sm">
                      <span className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider leading-none", {
                        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400": entry.action === "added",
                        "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400": entry.action === "deleted",
                        "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400": entry.action === "edited",
                      })}>
                        {entry.action}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground uppercase">{entry.itemType}</span>
                      <strong className="font-semibold text-foreground truncate max-w-xs">{entry.itemName}</strong>
                    </div>

                    {/* Performed by and Timestamp */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      {entry.performedBy && (
                        <span className="flex items-center gap-1">
                          <User size={12} className="text-muted-foreground/75" />
                          Performed by: <span className="font-medium text-foreground">{entry.performedBy}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-muted-foreground/75" />
                        {entry.timestamp}
                      </span>
                    </div>

                    {/* Action Details (Reason, Description, etc.) */}
                    {entry.details && (
                      <div className="flex items-start gap-1.5 p-2.5 rounded-lg bg-muted/40 border border-border/30 text-xs text-muted-foreground leading-relaxed max-w-2xl mt-1.5">
                        <Info size={12} className="mt-0.5 text-muted-foreground/80 flex-shrink-0" />
                        <p className="break-words">{entry.details}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
