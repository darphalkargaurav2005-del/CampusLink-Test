import { useState } from "react";
import { CalendarCheck, Download } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import PageHeader from "@/components/features/PageHeader";
import ChartCard from "@/components/features/ChartCard";
import { MOCK_TEACHERS, TEACHER_ATTENDANCE_DATA } from "@/constants/mockData";
import { cn } from "@/lib/utils";

const TODAY_RECORDS = MOCK_TEACHERS.map(t => ({
  id: t.id,
  name: t.name,
  employeeId: t.employeeId,
  department: t.department,
  status: t.status === "on-leave" ? "leave" : (Math.random() > 0.1 ? "present" : "absent") as "present" | "absent" | "leave",
}));

export default function TeacherAttendance() {
  const [records, setRecords] = useState(TODAY_RECORDS);
  const [saved, setSaved] = useState(false);
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const updateStatus = (id: string, status: "present" | "absent" | "leave") => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    toast.success("Teacher attendance recorded successfully");
  };

  const presentCount = records.filter(r => r.status === "present").length;
  const absentCount = records.filter(r => r.status === "absent").length;
  const leaveCount = records.filter(r => r.status === "leave").length;

  return (
    <div>
      <PageHeader
        title="Teacher Attendance"
        subtitle={`Attendance for ${today}`}
        action={
          <div className="flex gap-2">
            <button onClick={() => toast.success("Report downloaded")} className="flex items-center gap-2 px-3 py-2.5 border border-border rounded-xl text-sm hover:bg-muted transition-colors">
              <Download size={15} />
            </button>
            <button onClick={handleSave} className={cn("flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-opacity", saved ? "bg-emerald-600 text-white" : "gradient-brand text-white hover:opacity-90")}>
              <CalendarCheck size={16} /> {saved ? "Saved" : "Save Attendance"}
            </button>
          </div>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Present", count: presentCount, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400" },
          { label: "Absent", count: absentCount, color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400" },
          { label: "On Leave", count: leaveCount, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center">
            <p className={cn("text-2xl font-bold font-display", s.color.split(" ")[0])}>{s.count}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-sm text-foreground font-display">Today's Attendance</h3>
            </div>
            <div className="divide-y divide-border">
              {records.map((record, idx) => (
                <motion.div key={record.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.04 }} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-950/30 flex items-center justify-center text-sky-700 dark:text-sky-400 font-bold text-sm">
                      {record.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{record.name}</p>
                      <p className="text-xs text-muted-foreground">{record.department} • {record.employeeId}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {(["present", "absent", "leave"] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => updateStatus(record.id, s)}
                        className={cn("px-3 py-1.5 text-xs font-medium rounded-lg border transition-all capitalize", {
                          "bg-emerald-500 text-white border-emerald-500": record.status === s && s === "present",
                          "bg-rose-500 text-white border-rose-500": record.status === s && s === "absent",
                          "bg-amber-500 text-white border-amber-500": record.status === s && s === "leave",
                          "border-border hover:bg-muted": record.status !== s,
                        })}
                      >
                        {s === "leave" ? "Leave" : s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <ChartCard title="Monthly Trend" subtitle="Attendance trend over months" index={0}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={TEACHER_ATTENDANCE_DATA} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "12px" }} />
              <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="present" fill="#10b981" name="Present" stackId="a" />
              <Bar dataKey="absent" fill="#f43f5e" name="Absent" stackId="a" />
              <Bar dataKey="leave" fill="#f59e0b" name="Leave" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
