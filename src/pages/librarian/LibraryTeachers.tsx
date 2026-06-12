import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import { store } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function LibraryTeachers() {
  const [search, setSearch] = useState("");
  const [teachers, setTeachers] = useState([...store.teachers]);

  useEffect(() => { setTeachers([...store.teachers]); }, []);

  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.department.toLowerCase().includes(search.toLowerCase()) ||
    t.employeeId.toLowerCase().includes(search.toLowerCase())
  );

  const getActiveBooks = (id: string) => store.bookIssues.filter(i => i.borrowerId === id && i.status !== "returned").length;

  return (
    <div>
      <PageHeader title="Teachers" subtitle="Faculty library access and issued books" />

      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search teachers..."
          className="w-full pl-9 pr-9 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><X size={14} /></button>}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Active Borrows</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-muted-foreground text-sm">No teachers found</td>
                </tr>
              ) : (
                filtered.map((t, idx) => {
                  const borrows = getActiveBooks(t.id);
                  return (
                    <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.04 }}>
                      <td>
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-sky-100 dark:bg-sky-950/30 flex items-center justify-center text-sky-700 dark:text-sky-400 font-bold text-xs flex-shrink-0">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-foreground">{t.name}</p>
                            <p className="text-xs text-muted-foreground">{t.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="font-mono text-xs text-muted-foreground">{t.employeeId}</td>
                      <td className="text-sm">{t.department}</td>
                      <td className="text-sm">{t.designation}</td>
                      <td>
                        <span className={cn("text-sm font-semibold", borrows > 0 ? "text-sky-600 dark:text-sky-400" : "text-muted-foreground")}>
                          {borrows}
                        </span>
                      </td>
                      <td>
                        <span className={cn({
                          "badge-success": t.status === "active",
                          "badge-warning": t.status === "on-leave",
                          "badge-error": t.status === "inactive",
                        })}>
                          {t.status === "on-leave" ? "On Leave" : t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
