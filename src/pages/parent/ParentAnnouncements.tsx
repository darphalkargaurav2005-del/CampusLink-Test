import PageHeader from "@/components/features/PageHeader";
import { store } from "@/lib/store";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ParentAnnouncements() {
  return (
    <div>
      <PageHeader title="Announcements" subtitle="Official college announcements and notices" />
      <div className="space-y-4">
        {store.notices.filter(n => n.targetAudience.includes("parent")).map((notice, idx) => (
          <motion.div key={notice.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.07 }} className="bg-card border border-border rounded-xl p-5 shadow-card">
            <div className="flex items-start gap-3">
              <div className={cn("w-2.5 h-2.5 mt-1.5 rounded-full flex-shrink-0", notice.priority === "high" ? "bg-rose-500" : notice.priority === "medium" ? "bg-amber-500" : "bg-emerald-500")} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground text-sm">{notice.title}</h3>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", {
                    "bg-sky-100 text-sky-700": notice.category === "general",
                    "bg-brand-100 text-brand-700": notice.category === "academic",
                    "bg-rose-100 text-rose-700": notice.category === "examination" || notice.category === "urgent",
                    "bg-emerald-100 text-emerald-700": notice.category === "event",
                  })}>{notice.category}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{notice.content}</p>
                <p className="text-xs text-muted-foreground mt-2">{notice.author} • {notice.publishDate}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
