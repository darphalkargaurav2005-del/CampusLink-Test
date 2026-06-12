import { useState } from "react";
import { Save, Search } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import { MOCK_TEACHERS, MOCK_COURSES } from "@/constants/mockData";

export default function TeacherAssignment() {
  const [assignments, setAssignments] = useState<Record<string, string>>(
    Object.fromEntries(MOCK_COURSES.map(c => [c.id, c.teacherId]))
  );
  const [search, setSearch] = useState("");

  const filtered = MOCK_COURSES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleAssign = (courseId: string, teacherId: string) => {
    setAssignments(prev => ({ ...prev, [courseId]: teacherId }));
  };

  const handleSave = () => {
    toast.success("Teacher assignments saved successfully");
  };

  return (
    <div>
      <PageHeader
        title="Teacher Assignment"
        subtitle="Assign teachers to courses for the current semester"
        action={
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90">
            <Save size={16} /> Save Assignments
          </button>
        }
      />

      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="space-y-3">
        {filtered.map((course, idx) => {
          const assignedTeacher = MOCK_TEACHERS.find(t => t.id === assignments[course.id]);
          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-card border border-border rounded-xl p-4 shadow-card"
            >
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{course.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{course.code} • {course.department} • Sem {course.semester} • {course.credits} Credits</p>
                </div>
                <div className="flex items-center gap-3">
                  {assignedTeacher && (
                    <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
                      <div className="w-6 h-6 rounded-full gradient-sky flex items-center justify-center text-white text-xs font-bold">
                        {assignedTeacher.name.charAt(0)}
                      </div>
                      <span className="text-xs font-medium text-foreground">{assignedTeacher.name.split(" ").slice(0, 2).join(" ")}</span>
                    </div>
                  )}
                  <select
                    value={assignments[course.id] || ""}
                    onChange={e => handleAssign(course.id, e.target.value)}
                    className="text-sm bg-background border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                  >
                    <option value="">Assign Teacher</option>
                    {MOCK_TEACHERS.filter(t => t.status === "active").map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.department})</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
