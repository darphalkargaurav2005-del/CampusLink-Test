import { useState } from "react";
import { Search, GraduationCap, Calendar, Users, ClipboardList, BookOpen } from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  department: string;
  designation: string;
  experience: string;
  courses: string[];
  avatar: string;
}

const MOCK_TEACHERS: Teacher[] = [
  { id: "EMP001", name: "Dr. Anand Kumar", department: "Computer Science", designation: "Professor & HOD", experience: "15 Years", courses: ["Design & Analysis of Algorithms", "Advanced Compiler Design"], avatar: "AK" },
  { id: "EMP002", name: "Prof. Meera Iyer", department: "Mathematics", designation: "Associate Professor", experience: "10 Years", courses: ["Linear Algebra", "Probability & Statistics"], avatar: "MI" },
  { id: "EMP003", name: "Dr. Rajesh Sengupta", department: "Physics", designation: "Professor", experience: "12 Years", courses: ["Quantum Mechanics", "Electromagnetic Fields"], avatar: "RS" },
  { id: "EMP004", name: "Mrs. Sneha Patil", department: "Computer Science", designation: "Assistant Professor", experience: "6 Years", courses: ["Database Systems", "Software Engineering"], avatar: "SP" },
  { id: "EMP005", name: "Dr. Vijay Kulkarni", department: "Mechanical Eng", designation: "Associate Professor", experience: "9 Years", courses: ["Thermodynamics", "Fluid Mechanics"], avatar: "VK" }
];

export default function TeacherManagementFeature() {
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  const filteredTeachers = MOCK_TEACHERS.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                          t.designation.toLowerCase().includes(search.toLowerCase()) ||
                          t.id.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === "All" || t.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const departments = ["All", "Computer Science", "Mathematics", "Physics", "Mechanical Eng"];

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 gradient-brand text-white shadow-lg">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Faculty Administration
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display leading-tight mb-4">
            Teacher & Course Allocation
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Streamline class routines, track digital teaching logs, configure courses, and simplify schedules to let educators focus on teaching rather than administrative tasks.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">180+</p>
            <p className="text-xs text-muted-foreground">Expert Faculty Members</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">320+</p>
            <p className="text-xs text-muted-foreground">Active Courses Offered</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">99.8%</p>
            <p className="text-xs text-muted-foreground">Lecture Routine Sync</p>
          </div>
        </div>
      </div>

      {/* Interactive Faculty Directory */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Faculty & Course Directory</h2>
            <p className="text-xs text-muted-foreground">Search and filter faculty details and course allocations.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search teacher, role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground w-48"
              />
            </div>
          </div>
        </div>

        {/* Department Filters */}
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                selectedDept === dept
                  ? "bg-sky-600 border-sky-600 text-white dark:bg-sky-500 dark:border-sky-500"
                  : "bg-card border-border hover:bg-muted text-muted-foreground"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((t) => (
              <div key={t.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{t.name}</h3>
                    <p className="text-[10px] text-sky-600 dark:text-sky-400 font-semibold">{t.designation}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{t.department} • {t.experience} Experience</p>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-3.5 space-y-2">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Assigned Courses</p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.courses.map((course, idx) => (
                      <span key={idx} className="bg-muted px-2 py-1 rounded-md text-[10px] text-foreground font-medium border border-border/50">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 py-8 text-center text-muted-foreground">
              No faculty records match your criteria.
            </div>
          )}
        </div>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-foreground text-sm">Schedule Rotations</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Automatically compile and manage timetables, avoid overlaps, manage substitute teaching adjustments, and track schedule logs.
          </p>
        </div>
        <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <ClipboardList className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-foreground text-sm">Teaching Logs & Syllabus</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Record lecture plans, track lesson logs, upload study materials (documents, videos), and configure student assignment milestones.
          </p>
        </div>
        <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-foreground text-sm">AI Assistant</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            AI-driven assistance helps teachers draft notes, compile dynamic question banks, evaluate attendance trends, and write reports.
          </p>
        </div>
      </div>
    </div>
  );
}
