import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import PageHeader from "@/components/features/PageHeader";
import { MOCK_SCHEDULES } from "@/constants/mockData";
import { cn } from "@/lib/utils";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const DAY_COLORS: Record<string, string> = {
  Monday: "border-l-brand-500",
  Tuesday: "border-l-sky-500",
  Wednesday: "border-l-emerald-500",
  Thursday: "border-l-violet-500",
  Friday: "border-l-amber-500",
};

export default function TeacherMySchedule() {
  return (
    <div>
      <PageHeader title="My Schedule" subtitle="Weekly teaching schedule and class timings" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {DAYS.map((day) => {
          const dayClasses = MOCK_SCHEDULES.filter(s => s.day === day);
          return (
            <div key={day}>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-foreground text-sm font-display">{day}</h3>
                {dayClasses.length > 0 && (
                  <span className="text-xs bg-brand-100 dark:bg-brand-950/30 text-brand-700 dark:text-brand-400 px-1.5 py-0.5 rounded-full font-medium">{dayClasses.length}</span>
                )}
              </div>
              <div className="space-y-2 min-h-[80px]">
                {dayClasses.length === 0 ? (
                  <div className="border-2 border-dashed border-border rounded-xl p-4 text-center">
                    <p className="text-xs text-muted-foreground">No classes</p>
                  </div>
                ) : (
                  dayClasses.map((schedule, idx) => (
                    <motion.div
                      key={schedule.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className={cn("bg-card border border-border rounded-xl p-3 shadow-card border-l-4", DAY_COLORS[day])}
                    >
                      <p className="font-semibold text-foreground text-xs leading-snug mb-2">{schedule.courseName}</p>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-1">
                        <Clock size={10} />
                        <span>{schedule.startTime} - {schedule.endTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <MapPin size={10} />
                        <span>Room {schedule.room}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">{schedule.class} - {schedule.section}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
