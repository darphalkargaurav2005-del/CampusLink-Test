import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Bell, Clock, Award, Info } from "lucide-react";

interface CalendarEvent {
  date: number;
  title: string;
  category: string;
  desc: string;
}

const JUNE_EVENTS: Record<string, CalendarEvent[]> = {
  "semester-schedule": [
    { date: 1, title: "Commencement of Lectures", category: "Academic", desc: "Start of classes for even semesters (II, IV, VI, VIII)." },
    { date: 15, title: "Mid-Term Academic Review", category: "Academic", desc: "First syllabus progress audit and review meetings." }
  ],
  "examination-calendar": [
    { date: 18, title: "Lab Practical Submissions", category: "Exams", desc: "Final submission of journals and external evaluations." },
    { date: 22, title: "Even Sem Mid-Term Exams", category: "Exams", desc: "Theory exams begin in morning & afternoon slots." }
  ],
  "holiday-list": [
    { date: 5, title: "World Environment Day Holiday", category: "Holiday", desc: "Institutional recess for environmental drives." },
    { date: 15, title: "Mid-Year Vacation Recess", category: "Holiday", desc: "Offices and library closed for mid-year break." }
  ],
  "admission-timeline": [
    { date: 10, title: "Admission Round 1 Form Closes", category: "Admissions", desc: "Last date to register and lock preferences on portal." },
    { date: 20, title: "Round 1 Merit List Publication", category: "Admissions", desc: "First seat allocation lists published at 10 AM." }
  ],
  "academic-deadlines": [
    { date: 8, title: "Course Elective Selection Closes", category: "Deadlines", desc: "No modifications to electives permitted after 5 PM." },
    { date: 28, title: "Syllabus Add-Drop Window Closes", category: "Deadlines", desc: "Final date for syllabus alignment requests." }
  ]
};

export default function AcademicCalendarResource() {
  const { tab } = useParams<{ tab: string }>();
  const activeTab = tab || "semester-schedule";

  const [currentDate, setCurrentDate] = useState<number | null>(null);

  const tabs = [
    { id: "semester-schedule", label: "Semester Schedule" },
    { id: "examination-calendar", label: "Examination Calendar" },
    { id: "holiday-list", label: "Holiday List" },
    { id: "admission-timeline", label: "Admission Timeline" },
    { id: "academic-deadlines", label: "Academic Deadlines" }
  ];

  const events = JUNE_EVENTS[activeTab] || [];
  
  // Combine all events for the Calendar view
  const allEventsList = Object.values(JUNE_EVENTS).flat();

  // June 2026 days array (30 days)
  const daysArray = Array.from({ length: 30 }, (_, i) => i + 1);

  const selectedDayEvents = allEventsList.filter(e => e.date === currentDate);

  return (
    <div className="space-y-8">
      {/* Header banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 gradient-brand text-white shadow-lg">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            Academic Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display leading-tight mb-2">
            Campus Calendars & Timelines
          </h1>
          <p className="text-white/80 text-xs sm:text-sm">
            Keep track of active lecture schedules, examination sheets, vacations, and important academic deadlines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide px-3 mb-2">Calendar Menus</p>
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-1 lg:gap-1.5">
            {tabs.map((t) => {
              const isActive = activeTab === t.id;
              return (
                <Link
                  key={t.id}
                  to={`/resources/academic-calendar/${t.id}`}
                  className={`flex-shrink-0 text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    isActive
                      ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                      : "bg-card border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-5">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <span className="text-[10px] text-muted-foreground font-semibold">June 2026</span>
            </div>

            <div className="space-y-3.5">
              {events.map((e, index) => (
                <div key={index} className="p-4 bg-muted/30 border border-border rounded-xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                    {e.date}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-foreground text-xs">{e.title}</h4>
                      <span className="text-[9px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase">{e.category}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              ))}
              {events.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">No events posted for this category.</p>
              )}
            </div>
          </div>

          {/* Interactive Month Grid widget */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground text-xs font-display">June 2026 Calendar Grid</h3>
                <div className="flex items-center gap-1">
                  <button className="p-1 border border-border rounded-lg hover:bg-muted text-muted-foreground" disabled><ChevronLeft className="w-3.5 h-3.5" /></button>
                  <button className="p-1 border border-border rounded-lg hover:bg-muted text-muted-foreground" disabled><ChevronRight className="w-3.5 h-3.5" /></button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-black text-muted-foreground border-b border-border pb-2">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {daysArray.map((day) => {
                  const dayEvents = allEventsList.filter(e => e.date === day);
                  const hasEvents = dayEvents.length > 0;
                  const isSelected = currentDate === day;
                  return (
                    <button
                      key={day}
                      onClick={() => setCurrentDate(isSelected ? null : day)}
                      className={`relative min-h-[42px] p-1 border rounded-lg flex flex-col justify-between transition-colors ${
                        isSelected
                          ? "bg-primary border-primary text-white"
                          : hasEvents
                          ? "bg-primary/5 border-primary/20 hover:bg-primary/10 text-foreground"
                          : "bg-muted/10 border-border/40 hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      <span className="text-[10px] font-bold">{day}</span>
                      {hasEvents && !isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mx-auto mb-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Date Drawer */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div className="space-y-4 text-xs">
                <h4 className="font-bold text-foreground pb-2 border-b border-border flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" /> Active Date Inspector
                </h4>
                {currentDate ? (
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground">Date: June {currentDate}, 2026</p>
                    {selectedDayEvents.length > 0 ? (
                      selectedDayEvents.map((e, idx) => (
                        <div key={idx} className="p-2.5 bg-muted/40 rounded-lg border border-border space-y-1">
                          <span className="text-[9px] bg-primary/15 text-primary font-bold px-2 py-0.5 rounded-full uppercase">{e.category}</span>
                          <h5 className="font-bold text-foreground text-[11px] leading-tight">{e.title}</h5>
                          <p className="text-[10px] text-muted-foreground leading-normal">{e.desc}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-[11px] text-muted-foreground">No events scheduled on this day.</p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Info className="w-6 h-6 text-muted-foreground/60 mx-auto mb-2" />
                    <p className="text-[11px] leading-relaxed">Select a highlighted day on the calendar to audit event schedules.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
