import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import Modal from "@/components/features/Modal";
import { MOCK_SCHEDULES, MOCK_TEACHERS } from "@/constants/mockData";
import type { Schedule } from "@/types";
import { cn } from "@/lib/utils";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_COLORS: Record<string, string> = {
  Monday: "bg-brand-100 text-brand-700 dark:bg-brand-950/30 dark:text-brand-400",
  Tuesday: "bg-sky-100 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400",
  Wednesday: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  Thursday: "bg-violet-100 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400",
  Friday: "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  Saturday: "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400",
};

export default function TeacherSchedule() {
  const [schedules, setSchedules] = useState<Schedule[]>(MOCK_SCHEDULES);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");

  const daySchedules = schedules.filter(s => s.day === selectedDay);

  const handleDelete = (id: string) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
    toast.success("Schedule removed");
  };

  return (
    <div>
      <PageHeader
        title="Teacher Schedule"
        subtitle="Weekly class schedule for all teachers"
        action={
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90">
            <Plus size={16} /> Add Schedule
          </button>
        }
      />

      {/* Day Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={cn("px-4 py-2 text-sm font-medium rounded-xl border whitespace-nowrap transition-all", selectedDay === day ? "gradient-brand text-white border-transparent shadow-sm" : "border-border hover:bg-muted")}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {daySchedules.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <p className="text-muted-foreground text-sm">No classes scheduled for {selectedDay}</p>
          </div>
        ) : (
          daySchedules.map((schedule, idx) => (
            <motion.div
              key={schedule.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="bg-card border border-border rounded-xl p-4 shadow-card flex items-center gap-4"
            >
              <div className="text-center w-20">
                <p className="text-sm font-bold text-foreground">{schedule.startTime}</p>
                <p className="text-xs text-muted-foreground">to</p>
                <p className="text-sm font-bold text-foreground">{schedule.endTime}</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">{schedule.courseName}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {schedule.teacherName} • Room {schedule.room} • {schedule.class} - {schedule.section}
                </p>
              </div>
              <span className={cn("text-xs px-3 py-1 rounded-full font-medium", DAY_COLORS[schedule.day])}>
                {schedule.day}
              </span>
              <button onClick={() => handleDelete(schedule.id)} className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg text-muted-foreground hover:text-rose-600 transition-colors">
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Schedule Entry" size="md"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors">Cancel</button>
            <button onClick={() => { setModalOpen(false); toast.success("Schedule entry added"); }} className="px-4 py-2 text-sm gradient-brand text-white rounded-xl font-semibold">Add</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Teacher</label>
            <select className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
              {MOCK_TEACHERS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Day</label>
            <select className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
              {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Start Time</label>
              <input type="time" className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">End Time</label>
              <input type="time" className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Room</label>
            <input type="text" placeholder="e.g. LH-201" className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
