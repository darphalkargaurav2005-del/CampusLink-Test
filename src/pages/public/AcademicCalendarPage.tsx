import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Award, Bell } from "lucide-react";

interface CalendarEvent {
  date: number;
  title: string;
  category: "Academic" | "Exam" | "Holiday" | "Activity";
  desc: string;
}

const MOCK_EVENTS: CalendarEvent[] = [
  { date: 5, title: "Commencement of Classes", category: "Academic", desc: "Official startup of lectures for all courses." },
  { date: 12, title: "Hackathon 2026 Registration", category: "Activity", desc: "Team registrations open on the student portal." },
  { date: 15, title: "Independence Day Recess", category: "Holiday", desc: "National holiday recess, offices and library closed." },
  { date: 22, title: "Mid-Term Examination Rollup", category: "Exam", desc: "Midterm theory tests commence for even semesters." },
  { date: 28, title: "Syllabus Review Committee Meet", category: "Academic", desc: "Review of syllabus progress across departments." }
];

export default function AcademicCalendarPage() {
  const [selectedCat, setSelectedCat] = useState("All");

  const filteredEvents = selectedCat === "All" 
    ? MOCK_EVENTS 
    : MOCK_EVENTS.filter(e => e.category === selectedCat);

  // June 2026 starts on Monday. 30 Days.
  const daysInJune = 30;
  const daysArray = Array.from({ length: daysInJune }, (_, i) => i + 1);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-primary/20">
          Academic Operations
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground font-display mb-2">Academic Calendar</h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">Stay updated with class commencements, exam sessions, holidays, and extracurricular schedules.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Grid Component */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-foreground text-sm font-display">June 2026</h3>
            <div className="flex items-center gap-1">
              <button className="p-1 border border-border rounded-lg hover:bg-muted text-muted-foreground transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              <button className="p-1 border border-border rounded-lg hover:bg-muted text-muted-foreground transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2.5 text-center text-xs font-bold text-muted-foreground border-b border-border pb-2.5">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>

          <div className="grid grid-cols-7 gap-2.5">
            {daysArray.map((day) => {
              const dayEvents = MOCK_EVENTS.filter(e => e.date === day);
              const hasEvents = dayEvents.length > 0;
              return (
                <div key={day} className={`relative min-h-[50px] p-1.5 border border-border/50 rounded-xl flex flex-col justify-between ${
                  hasEvents ? "bg-primary/5 border-primary/30" : "bg-muted/10"
                }`}>
                  <span className={`text-[10px] font-bold ${hasEvents ? "text-primary font-black" : "text-muted-foreground"}`}>{day}</span>
                  {hasEvents && (
                    <div className="flex gap-1 justify-center mt-1">
                      {dayEvents.map((e, idx) => (
                        <span key={idx} className={`w-1.5 h-1.5 rounded-full ${
                          e.category === "Academic" ? "bg-indigo-500" :
                          e.category === "Exam" ? "bg-rose-500" :
                          e.category === "Holiday" ? "bg-amber-500" : "bg-emerald-500"
                        }`} title={e.title} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedule List */}
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
            <h4 className="font-bold text-foreground text-xs uppercase tracking-wide text-muted-foreground">Filters</h4>
            <div className="flex flex-wrap gap-2">
              {["All", "Academic", "Exam", "Holiday", "Activity"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    selectedCat === cat
                      ? "bg-primary border-primary text-white"
                      : "bg-background border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Event Listing */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
            <h4 className="font-bold text-foreground text-xs pb-2 border-b border-border flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-primary" /> Upcoming Events (June 2026)
            </h4>
            <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
              {filteredEvents.map((e, idx) => (
                <div key={idx} className="p-3 bg-muted/40 rounded-xl border border-border space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-foreground">June {e.date}, 2026</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      e.category === "Academic" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400" :
                      e.category === "Exam" ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400" :
                      e.category === "Holiday" ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400" :
                      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                    }`}>{e.category}</span>
                  </div>
                  <h4 className="font-bold text-foreground text-xs leading-snug">{e.title}</h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{e.desc}</p>
                </div>
              ))}
              {filteredEvents.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">No events found in this category.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
