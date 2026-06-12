import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/features/PageHeader";
import { MOCK_MARKS } from "@/constants/mockData";
import { cn } from "@/lib/utils";

const SEMESTER_RESULTS = [
  { sem: 1, sgpa: 8.2, courses: 6, credits: 22 },
  { sem: 2, sgpa: 8.5, courses: 6, credits: 22 },
  { sem: 3, sgpa: 8.8, courses: 6, credits: 24 },
  { sem: 4, sgpa: 9.0, courses: 6, credits: 24 },
  { sem: 5, sgpa: 8.9, courses: 6, credits: 24 },
];

const gradeColor: Record<string, string> = {
  "A+": "text-emerald-600 dark:text-emerald-400",
  "A": "text-sky-600 dark:text-sky-400",
  "B+": "text-brand-600 dark:text-brand-400",
  "B": "text-amber-600 dark:text-amber-400",
  "B-": "text-amber-600 dark:text-amber-400",
  "C": "text-orange-600 dark:text-orange-400",
  "F": "text-rose-600 dark:text-rose-400",
};

export default function Results() {
  const myMarks = MOCK_MARKS.filter(m => m.studentId === "s1");

  return (
    <div>
      <PageHeader
        title="My Results"
        subtitle="Academic marks and grade history"
        action={
          <button onClick={() => toast.success("Marksheet downloaded")} className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
            <Download size={16} /> Download Marksheet
          </button>
        }
      />

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
        {SEMESTER_RESULTS.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className={cn("bg-card border rounded-xl p-4 text-center shadow-card", s.sem === 5 ? "border-primary ring-1 ring-primary" : "border-border")}>
            <p className="text-xs text-muted-foreground mb-1">Sem {s.sem}</p>
            <p className={cn("text-xl font-bold font-display", s.sem === 5 ? "text-primary" : "text-foreground")}>{s.sgpa}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">SGPA</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-4 mb-5 flex items-center justify-between shadow-card">
        <div>
          <p className="text-sm text-muted-foreground">Cumulative GPA (CGPA)</p>
          <p className="text-3xl font-bold text-primary font-display mt-0.5">8.90</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Academic Standing</p>
          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-display mt-0.5">Distinction</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground text-sm font-display">Semester 5 — Detailed Marks</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Exam Type</th>
                <th>Max Marks</th>
                <th>Obtained</th>
                <th>Percentage</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {myMarks.map((mark, idx) => {
                const pct = Math.round((mark.obtainedMarks / mark.maxMarks) * 100);
                return (
                  <motion.tr key={mark.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}>
                    <td className="font-medium text-sm">{mark.courseName}</td>
                    <td><span className="badge-info capitalize">{mark.examType}</span></td>
                    <td className="text-sm text-muted-foreground">{mark.maxMarks}</td>
                    <td className="font-semibold text-foreground">{mark.obtainedMarks}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div style={{ width: `${pct}%` }} className="h-full bg-brand-500 rounded-full" />
                        </div>
                        <span className="text-xs text-muted-foreground">{pct}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={cn("font-bold text-base", gradeColor[mark.grade] || "text-foreground")}>
                        {mark.grade}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
