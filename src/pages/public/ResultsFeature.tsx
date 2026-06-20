import { useState } from "react";
import { Award, BookOpen, Calendar, HelpCircle, Check } from "lucide-react";

interface SubjectScore {
  subject: string;
  marks: number;
  grade: string;
}

interface StudentResult {
  name: string;
  roll: string;
  cgpa: number;
  sgpa: number;
  scores: SubjectScore[];
}

const MOCK_RESULTS: StudentResult[] = [
  {
    name: "Aisha Sharma",
    roll: "CS2021001",
    cgpa: 9.42,
    sgpa: 9.60,
    scores: [
      { subject: "Data Structures & Algorithms", marks: 95, grade: "O" },
      { subject: "Database Management Systems", marks: 92, grade: "O" },
      { subject: "Discrete Mathematics", marks: 88, grade: "A+" },
      { subject: "Computer Organization", marks: 84, grade: "A+" }
    ]
  },
  {
    name: "Rohan Verma",
    roll: "CS2021002",
    cgpa: 8.85,
    sgpa: 9.00,
    scores: [
      { subject: "Data Structures & Algorithms", marks: 86, grade: "A+" },
      { subject: "Database Management Systems", marks: 85, grade: "A+" },
      { subject: "Discrete Mathematics", marks: 78, grade: "A" },
      { subject: "Computer Organization", marks: 82, grade: "A+" }
    ]
  },
  {
    name: "Priya Patel",
    roll: "EE2021045",
    cgpa: 9.15,
    sgpa: 9.25,
    scores: [
      { subject: "Network Analysis & Filters", marks: 94, grade: "O" },
      { subject: "Digital System Design", marks: 90, grade: "O" },
      { subject: "Signals & Systems", marks: 86, grade: "A+" },
      { subject: "Engineering Mathematics", marks: 82, grade: "A+" }
    ]
  }
];

export default function ResultsFeature() {
  const [selectedStudentIdx, setSelectedStudentIdx] = useState(0);
  const currentResult = MOCK_RESULTS[selectedStudentIdx];

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 gradient-brand text-white shadow-lg">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Academics & Evaluation
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display leading-tight mb-4">
            Exams, Grades & Results
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Configure examination schedules, publish mark sheets securely, compute GPA logs automatically, and coordinate student transcripts.
          </p>
        </div>
      </div>

      {/* Grade Book Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Selector and Grade Book */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">Interactive Student Grade Book</h2>
              <p className="text-xs text-muted-foreground">Select a student profile below to review marks and GPAs dynamically.</p>
            </div>
          </div>

          {/* Student Tabs */}
          <div className="flex gap-2">
            {MOCK_RESULTS.map((res, i) => (
              <button
                key={res.roll}
                onClick={() => setSelectedStudentIdx(i)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  selectedStudentIdx === i
                    ? "bg-amber-600 border-amber-600 text-white dark:bg-amber-500 dark:border-amber-500"
                    : "bg-card border-border hover:bg-muted text-muted-foreground"
                }`}
              >
                {res.name}
              </button>
            ))}
          </div>

          {/* Subject Scores Table */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-muted-foreground font-semibold px-1">
              <span>Roll: <span className="font-mono text-foreground font-bold">{currentResult.roll}</span></span>
              <span>Overall CGPA: <span className="text-foreground font-bold">{currentResult.cgpa.toFixed(2)}</span></span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-foreground font-bold bg-muted/30">
                    <th className="py-2.5 px-4">Subject</th>
                    <th className="py-2.5 px-4">Marks Out of 100</th>
                    <th className="py-2.5 px-4">Letter Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {currentResult.scores.map((score, index) => (
                    <tr key={index} className="hover:bg-muted/10">
                      <td className="py-2.5 px-4 font-medium text-foreground">{score.subject}</td>
                      <td className="py-2.5 px-4 text-muted-foreground font-mono">{score.marks}</td>
                      <td className="py-2.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          score.grade === "O"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                            : "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400"
                        }`}>
                          {score.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* GPA Progress Circle */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center justify-center space-y-4">
            <h3 className="font-bold text-foreground text-xs uppercase tracking-wide text-muted-foreground">Current Semester SGPA</h3>
            
            {/* SVG Progress Arc */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/20" />
                <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 48} 
                        strokeDashoffset={2 * Math.PI * 48 * (1 - currentResult.sgpa / 10)} 
                        className="text-amber-500 transition-all duration-500" />
              </svg>
              <div className="absolute text-2xl font-bold text-foreground font-display">{currentResult.sgpa.toFixed(2)}</div>
            </div>
            <p className="text-[10px] text-muted-foreground">Scale: 0.0 - 10.0</p>
          </div>

          {/* Exam Timetable Schedule */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3.5">
            <div className="flex items-center gap-2 text-foreground font-bold text-xs pb-2 border-b border-border">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Upcoming Semester Exam Schedule</span>
            </div>
            <div className="space-y-2.5 text-xs">
              {[
                { date: "June 22, 2026", subject: "Software Architecture", hall: "LH-01" },
                { date: "June 25, 2026", subject: "Cryptography & NetSec", hall: "LH-03" }
              ].map((ex, idx) => (
                <div key={idx} className="p-2.5 bg-muted/40 border border-border rounded-xl">
                  <div className="flex justify-between items-center font-semibold text-foreground">
                    <span>{ex.subject}</span>
                    <span className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 px-2 py-0.5 rounded font-mono">{ex.hall}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">Exam Date: {ex.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* FAQ guidelines */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
          <HelpCircle className="w-4.5 h-4.5 text-amber-500" /> Academic Grading Index
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-2.5 bg-muted/20 border border-border/80 rounded-lg">
            <p className="font-bold text-emerald-500">O (Outstanding)</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Points: 10 | 90 - 100%</p>
          </div>
          <div className="p-2.5 bg-muted/20 border border-border/80 rounded-lg">
            <p className="font-bold text-primary">A+ (Excellent)</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Points: 9 | 80 - 89%</p>
          </div>
          <div className="p-2.5 bg-muted/20 border border-border/80 rounded-lg">
            <p className="font-bold text-indigo-400">A (Very Good)</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Points: 8 | 70 - 79%</p>
          </div>
          <div className="p-2.5 bg-muted/20 border border-border/80 rounded-lg">
            <p className="font-bold text-foreground">B+ (Good)</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Points: 7 | 60 - 69%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
