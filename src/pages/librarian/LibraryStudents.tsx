import { useState, useEffect } from "react";
import { Search, BookOpen, X } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import { store } from "@/lib/store";
import type { Student } from "@/types";
import { cn } from "@/lib/utils";

export default function LibraryStudents() {
  const [students, setStudents] = useState<Student[]>([...store.students]);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");

  useEffect(() => {
    setStudents([...store.students]);
  }, []);

  const departments = [...new Set(store.students.map(s => s.department))];

  const filtered = students.filter(s => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "all" || s.department === deptFilter;
    return matchSearch && matchDept;
  });

  // Count active borrows per student
  const borrowCount = (studentId: string) =>
    store.bookIssues.filter(i => i.borrowerId === studentId && i.status !== "returned").length;

  return (
    <div>
      <PageHeader title="Students" subtitle={`${students.length} registered students`} />

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, roll no..."
            className="w-full pl-9 pr-9 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><X size={14} /></button>}
        </div>
        <select
          value={deptFilter}
          onChange={e => setDeptFilter(e.target.value)}
          className="px-3 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Departments</option>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {(search || deptFilter !== "all") && (
        <p className="text-sm text-muted-foreground mb-3">Showing {filtered.length} of {students.length} students</p>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th>Department</th>
                <th>Year</th>
                <th>Phone</th>
                <th>Active Borrows</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-muted-foreground text-sm">No students found</td>
                </tr>
              ) : (
                filtered.map((s, idx) => {
                  const borrows = borrowCount(s.id);
                  return (
                    <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}>
                      <td>
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-950/30 flex items-center justify-center text-brand-700 dark:text-brand-400 font-bold text-xs flex-shrink-0">
                            {s.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{s.name}</p>
                            <p className="text-xs text-muted-foreground">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="font-mono text-xs text-muted-foreground">{s.rollNo}</td>
                      <td className="text-sm">{s.department}</td>
                      <td className="text-sm">Year {s.year}</td>
                      <td className="text-sm text-muted-foreground">{s.phone}</td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <BookOpen size={12} className={borrows > 0 ? "text-sky-500" : "text-muted-foreground"} />
                          <span className={cn("text-sm font-semibold", borrows > 0 ? "text-sky-600 dark:text-sky-400" : "text-muted-foreground")}>
                            {borrows}
                          </span>
                        </div>
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
