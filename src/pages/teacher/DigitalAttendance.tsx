import { useState } from "react";
import { CalendarCheck, Save, ChevronDown, Search, X } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import { MOCK_STUDENTS, MOCK_COURSES } from "@/constants/mockData";
import { cn } from "@/lib/utils";

type AttendanceStatus = "present" | "absent" | "late";

export default function DigitalAttendance() {
  const [selectedCourse, setSelectedCourse] = useState(MOCK_COURSES[0].id);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [search, setSearch] = useState("");
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>(
    Object.fromEntries(MOCK_STUDENTS.map(s => [s.id, "present"]))
  );
  const [saved, setSaved] = useState(false);

  const course = MOCK_COURSES.find(c => c.id === selectedCourse);
  const presentCount = Object.values(attendance).filter(s => s === "present").length;
  const absentCount = Object.values(attendance).filter(s => s === "absent").length;
  const lateCount = Object.values(attendance).filter(s => s === "late").length;

  const markAll = (status: AttendanceStatus) => {
    setAttendance(Object.fromEntries(MOCK_STUDENTS.map(s => [s.id, status])));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    toast.success(`Attendance saved — ${presentCount} present, ${absentCount} absent, ${lateCount} late`);
  };

  const filteredStudents = MOCK_STUDENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Digital Attendance"
        subtitle="Mark and submit class attendance"
        action={
          <button onClick={handleSave} className={cn("flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold", saved ? "bg-emerald-600 text-white" : "gradient-brand text-white hover:opacity-90")}>
            <CalendarCheck size={16} /> {saved ? "Attendance Saved" : "Submit Attendance"}
          </button>
        }
      />

      <div className="bg-card border border-border rounded-xl p-4 mb-5 shadow-card">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Course</label>
            <select value={selectedCourse} onChange={e => { setSelectedCourse(e.target.value); setSaved(false); }} className="px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
              {MOCK_COURSES.filter(c => c.teacherId === "t1").map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Date</label>
            <input type="date" value={date} onChange={e => { setDate(e.target.value); setSaved(false); }} className="px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="flex items-end gap-2">
            <button onClick={() => markAll("present")} className="px-3 py-2.5 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 rounded-xl hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors">Mark All Present</button>
            <button onClick={() => markAll("absent")} className="px-3 py-2.5 text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 rounded-xl hover:bg-rose-200 transition-colors">Mark All Absent</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Present", count: presentCount, color: "text-emerald-600" },
          { label: "Absent", count: absentCount, color: "text-rose-600" },
          { label: "Late", count: lateCount, color: "text-amber-600" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
            <p className={cn("text-2xl font-bold font-display", s.color)}>{s.count}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="p-4 border-b border-border flex items-center justify-between gap-4 flex-wrap">
          <h3 className="font-semibold text-foreground text-sm font-display">{course?.name} — Student List</h3>
          <div className="relative w-48">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search students..."
              className="w-full pl-7 pr-7 py-1.5 text-xs bg-muted border-0 focus:outline-none focus:ring-1 focus:ring-ring rounded-lg text-foreground placeholder:text-muted-foreground/60"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={12} />
              </button>
            )}
          </div>
        </div>
        <div className="divide-y divide-border">
          {filteredStudents.map((student, idx) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.03 }}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-8">{idx + 1}.</span>
                <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-950/30 flex items-center justify-center text-brand-700 dark:text-brand-400 font-bold text-sm">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.rollNo}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {(["present", "absent", "late"] as AttendanceStatus[]).map(status => (
                  <button
                    key={status}
                    onClick={() => { setAttendance(prev => ({ ...prev, [student.id]: status })); setSaved(false); }}
                    className={cn("px-3 py-1.5 text-xs font-medium rounded-lg border transition-all capitalize", {
                      "bg-emerald-500 text-white border-emerald-500": attendance[student.id] === status && status === "present",
                      "bg-rose-500 text-white border-rose-500": attendance[student.id] === status && status === "absent",
                      "bg-amber-500 text-white border-amber-500": attendance[student.id] === status && status === "late",
                      "border-border hover:bg-muted text-muted-foreground": attendance[student.id] !== status,
                    })}
                  >
                    {status === "late" ? "Late" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
