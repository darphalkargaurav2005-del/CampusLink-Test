import { useState } from "react";
import { Download, Search, FileText, File } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import { cn } from "@/lib/utils";

const NOTES = [
  { id: "n1", title: "Lecture 5: Binary Search Trees", subject: "Data Structures", type: "Notes", size: "2.3 MB", date: "2024-02-20", teacher: "Dr. Anand Kumar" },
  { id: "n2", title: "Week 3: SQL Joins and Subqueries", subject: "DBMS", type: "Notes", size: "1.8 MB", date: "2024-02-18", teacher: "Mr. Kartik Verma" },
  { id: "n3", title: "Chapter 7: Integration Techniques", subject: "Engineering Math", type: "PDF", size: "4.2 MB", date: "2024-02-15", teacher: "Prof. Meera Iyer" },
  { id: "n4", title: "Algorithm Visualization Slides", subject: "Data Structures", type: "PPT", size: "8.7 MB", date: "2024-02-12", teacher: "Dr. Anand Kumar" },
  { id: "n5", title: "React Fundamentals Workshop", subject: "Web Development", type: "PPT", size: "15.2 MB", date: "2024-02-10", teacher: "Mr. Kartik Verma" },
  { id: "n6", title: "Quantum Mechanics Basics", subject: "Physics", type: "PDF", size: "3.5 MB", date: "2024-02-08", teacher: "Dr. Lakshmi Prasad" },
];

export default function StudentNotes() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = NOTES.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.subject.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || n.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <PageHeader title="Study Notes" subtitle="Download lecture notes and study materials" />

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notes..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex gap-2">
          {["All", "Notes", "PDF", "PPT"].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={cn("px-3 py-2 text-xs font-medium rounded-xl border transition-colors", filter === f ? "gradient-brand text-white border-transparent" : "border-border hover:bg-muted")}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="divide-y divide-border">
          {filtered.map((note, idx) => (
            <motion.div key={note.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="flex items-center gap-4 p-4 hover:bg-muted/40 transition-colors">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", {
                "bg-sky-100 dark:bg-sky-950/30": note.type === "Notes",
                "bg-rose-100 dark:bg-rose-950/30": note.type === "PDF",
                "bg-amber-100 dark:bg-amber-950/30": note.type === "PPT",
              })}>
                <FileText size={16} className={cn({ "text-sky-600": note.type === "Notes", "text-rose-600": note.type === "PDF", "text-amber-600": note.type === "PPT" })} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{note.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{note.subject} • {note.teacher} • {note.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{note.size}</span>
                <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", {
                  "bg-sky-100 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400": note.type === "Notes",
                  "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400": note.type === "PDF",
                  "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400": note.type === "PPT",
                })}>{note.type}</span>
                <button onClick={() => toast.success(`Downloading ${note.title}`)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Download size={13} /> Download
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
