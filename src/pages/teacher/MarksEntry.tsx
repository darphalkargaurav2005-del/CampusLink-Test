import { useState } from "react";
import { Save, Search } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import { MOCK_STUDENTS, MOCK_COURSES } from "@/constants/mockData";
import { cn } from "@/lib/utils";

const EXAM_TYPES = ["Internal Exam", "Mid-Semester", "Final Exam", "Assignment"];

const getGrade = (obtained: number, max: number) => {
  const pct = (obtained / max) * 100;
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B+";
  if (pct >= 60) return "B";
  if (pct >= 50) return "C";
  return "F";
};

export default function MarksEntry() {
  const [course, setCourse] = useState(MOCK_COURSES[0].id);
  const [examType, setExamType] = useState(EXAM_TYPES[0]);
  const [maxMarks, setMaxMarks] = useState("30");
  const [marks, setMarks] = useState<Record<string, string>>(Object.fromEntries(MOCK_STUDENTS.map(s => [s.id, ""])));

  const handleSave = () => {
    const unmarked = Object.values(marks).filter(m => m === "").length;
    if (unmarked > 0) { toast.warning(`${unmarked} students have no marks entered`); return; }
    toast.success("Marks saved and published successfully");
  };

  return (
    <div>
      <PageHeader
        title="Marks Entry"
        subtitle="Enter and publish examination marks"
        action={
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90">
            <Save size={16} /> Save & Publish
          </button>
        }
      />

      <div className="bg-card border border-border rounded-xl p-4 mb-5 shadow-card">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Course</label>
            <select value={course} onChange={e => setCourse(e.target.value)} className="px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
              {MOCK_COURSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Exam Type</label>
            <select value={examType} onChange={e => setExamType(e.target.value)} className="px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
              {EXAM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Max Marks</label>
            <input type="number" value={maxMarks} onChange={e => setMaxMarks(e.target.value)} className="w-24 px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground text-sm font-display">Enter Marks — Max: {maxMarks}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Roll No</th>
                <th>Marks Obtained</th>
                <th>Grade</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_STUDENTS.map((student, idx) => {
                const obtained = Number(marks[student.id]) || 0;
                const grade = marks[student.id] ? getGrade(obtained, Number(maxMarks)) : "—";
                const pct = marks[student.id] ? Math.round((obtained / Number(maxMarks)) * 100) : 0;
                return (
                  <motion.tr key={student.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}>
                    <td className="text-muted-foreground text-xs">{idx + 1}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-950/30 flex items-center justify-center text-brand-700 dark:text-brand-400 font-bold text-xs">{student.name.charAt(0)}</div>
                        <span className="font-medium text-sm text-foreground">{student.name}</span>
                      </div>
                    </td>
                    <td className="font-mono text-xs text-muted-foreground">{student.rollNo}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max={maxMarks}
                        value={marks[student.id]}
                        onChange={e => setMarks(prev => ({ ...prev, [student.id]: e.target.value }))}
                        placeholder={`0-${maxMarks}`}
                        className="w-24 px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </td>
                    <td>
                      <span className={cn("font-semibold text-sm", {
                        "text-emerald-600": grade === "A+" || grade === "A",
                        "text-sky-600": grade === "B+" || grade === "B",
                        "text-amber-600": grade === "C",
                        "text-rose-600": grade === "F",
                        "text-muted-foreground": grade === "—",
                      })}>
                        {grade}
                      </span>
                    </td>
                    <td>
                      {marks[student.id] && (
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full", pct >= 75 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-rose-500")} style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{pct}%</span>
                        </div>
                      )}
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
