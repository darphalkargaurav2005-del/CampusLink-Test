import { useState } from "react";
import { Search, Eye } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import Modal from "@/components/features/Modal";
import { MOCK_STUDENTS } from "@/constants/mockData";
import type { Student } from "@/types";
import { cn } from "@/lib/utils";

export default function StudentProfiles() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Student | null>(null);

  const filtered = MOCK_STUDENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Student Profiles" subtitle={`View detailed profiles of ${MOCK_STUDENTS.length} students`} />

      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((student, idx) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-950/30 flex items-center justify-center text-brand-700 dark:text-brand-400 font-bold text-lg">
                {student.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{student.name}</p>
                <p className="text-xs text-muted-foreground">{student.rollNo} • {student.department}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <p className={cn("font-bold text-base", student.attendance >= 75 ? "text-emerald-600" : "text-rose-600")}>{student.attendance}%</p>
                <p className="text-muted-foreground">Attendance</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <p className="font-bold text-base text-brand-600 dark:text-brand-400">{student.cgpa.toFixed(1)}</p>
                <p className="text-muted-foreground">CGPA</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={cn({
                "badge-success": student.feeStatus === "paid",
                "badge-warning": student.feeStatus === "partial",
                "badge-error": student.feeStatus === "pending",
              })}>
                Fee {student.feeStatus}
              </span>
              <button onClick={() => setSelected(student)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-border rounded-lg hover:bg-muted transition-colors">
                <Eye size={12} /> View Profile
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name ?? ""} subtitle={`${selected?.rollNo} • Year ${selected?.year} ${selected?.department}`} size="lg">
        {selected && (
          <div className="space-y-3">
            {[
              ["Email", selected.email],
              ["Phone", selected.phone],
              ["Section", selected.section],
              ["Gender", selected.gender],
              ["Date of Birth", selected.dob],
              ["Parent", selected.parentName],
              ["Parent Phone", selected.parentPhone],
              ["Address", selected.address],
              ["Attendance", `${selected.attendance}%`],
              ["CGPA", selected.cgpa.toFixed(1)],
              ["Fee Status", selected.feeStatus],
              ["Join Date", selected.joinDate],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-border/50 text-sm">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium text-foreground text-right">{v}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
