import { useState } from "react";
import { Search, GraduationCap, Users, Award, TrendingUp, Filter } from "lucide-react";

interface Student {
  id: string;
  name: string;
  semester: string;
  department: string;
  gpa: number;
  status: "Active" | "Placed" | "On Leave";
}

const MOCK_STUDENTS: Student[] = [
  { id: "STU001", name: "Aisha Sharma", semester: "6th Sem", department: "Computer Science", gpa: 9.4, status: "Active" },
  { id: "STU002", name: "Rohan Verma", semester: "8th Sem", department: "Information Tech", gpa: 8.9, status: "Placed" },
  { id: "STU003", name: "Priya Patel", semester: "4th Sem", department: "Electronics Eng", gpa: 9.1, status: "Active" },
  { id: "STU004", name: "Amit Singh", semester: "6th Sem", department: "Mechanical Eng", gpa: 7.8, status: "On Leave" },
  { id: "STU005", name: "Sneha Reddy", semester: "8th Sem", department: "Computer Science", gpa: 9.6, status: "Placed" },
  { id: "STU006", name: "Vikram Malhotra", semester: "2nd Sem", department: "Civil Eng", gpa: 8.2, status: "Active" }
];

export default function StudentManagementFeature() {
  const [search, setSearch] = useState("");
  const [selectedSem, setSelectedSem] = useState("All");

  const filteredStudents = MOCK_STUDENTS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.id.toLowerCase().includes(search.toLowerCase()) ||
                          s.department.toLowerCase().includes(search.toLowerCase());
    const matchesSem = selectedSem === "All" || s.semester === selectedSem;
    return matchesSearch && matchesSem;
  });

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 gradient-brand text-white shadow-lg">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Core Module
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display leading-tight mb-4">
            Student Management System
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Empowering administrators and advisors to manage the entire student lifecycle — from enrollment and academics to successful graduation and placements.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-primary">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">2,400+</p>
            <p className="text-xs text-muted-foreground">Active Enrolled Students</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-primary">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">94.8%</p>
            <p className="text-xs text-muted-foreground">Placement Success Rate</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-primary">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">8.95</p>
            <p className="text-xs text-muted-foreground">Average Class CGPA</p>
          </div>
        </div>
      </div>

      {/* Interactive Student Directory Widget */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Live Student Directory</h2>
            <p className="text-xs text-muted-foreground">Experience the interactive directory search and filters.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search name, ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground w-48"
              />
            </div>

            {/* Semester Filter */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-muted-foreground" />
              <select
                value={selectedSem}
                onChange={(e) => setSelectedSem(e.target.value)}
                className="px-2 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
              >
                <option value="All">All Semesters</option>
                <option value="2nd Sem">2nd Sem</option>
                <option value="4th Sem">4th Sem</option>
                <option value="6th Sem">6th Sem</option>
                <option value="8th Sem">8th Sem</option>
              </select>
            </div>
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-foreground font-bold bg-muted/30">
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Semester</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">CGPA</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-primary">{s.id}</td>
                    <td className="py-3 px-4 font-medium text-foreground">{s.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{s.semester}</td>
                    <td className="py-3 px-4 text-muted-foreground">{s.department}</td>
                    <td className="py-3 px-4 font-bold text-foreground">{s.gpa.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.status === "Active" 
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                          : s.status === "Placed"
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                      }`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    No student records found matching the search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-foreground text-sm">Academic Performance</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Record grading structures, check dynamic mark sheets, track backlogs, and generate SGPA/CGPA transcripts with advanced reporting filters.
          </p>
        </div>
        <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-foreground text-sm">Parent-Teacher Bridge</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Enable active feedback synchronization. Parents check real-time attendance reports, schedules, disciplinary notes, and progress records.
          </p>
        </div>
        <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-foreground text-sm">Career & Placements</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Track student placement eligibilities, coordinate resume submissions, manage campus interview lists, and view historic hiring records.
          </p>
        </div>
      </div>
    </div>
  );
}
