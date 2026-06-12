import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import PageHeader from "@/components/features/PageHeader";
import { MOCK_SCHEDULES } from "@/constants/mockData";
import { cn } from "@/lib/utils";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function StudentSchedule() {
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long" });

  return (
    <div>
      <PageHeader title="Class Schedule" subtitle="Your weekly timetable" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {DAYS.map(day => {
          const dayClasses = MOCK_SCHEDULES.filter(s => s.day === day);
          const isToday = day === today;
          return (
            <div key={day}>
              <div className={cn("flex items-center gap-2 mb-3 pb-1 border-b", isToday ? "border-primary" : "border-border")}>
                <h3 className={cn("font-semibold text-sm font-display", isToday ? "text-primary" : "text-foreground")}>{day}</h3>
                {isToday && <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full">Today</span>}
              </div>
              <div className="space-y-2">
                {dayClasses.length === 0 ? (
                  <div className="border-2 border-dashed border-border rounded-xl p-4 text-center">
                    <p className="text-xs text-muted-foreground">No classes</p>
                  </div>
                ) : (
                  dayClasses.map((s, i) => (
                    <motion.div key={s.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                      className={cn("bg-card border border-border rounded-xl p-3 shadow-card", isToday && "border-primary/30 bg-primary/5")}>
                      <p className="font-semibold text-foreground text-xs leading-snug mb-2">{s.courseName}</p>
                      <p className="text-[10px] text-muted-foreground mb-1">{s.teacherName}</p>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-1">
                        <Clock size={10} /> {s.startTime} - {s.endTime}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <MapPin size={10} /> Room {s.room}
                      </div>
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
