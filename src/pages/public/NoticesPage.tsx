import { useState } from "react";
import { Search, Bell, Shield, Calendar } from "lucide-react";

interface Notice {
  id: string;
  title: string;
  category: "Urgent" | "Academic" | "General";
  date: string;
  publisher: string;
  content: string;
}

const MOCK_NOTICES: Notice[] = [
  { id: "N-108", title: "Fees Payment Deadline Extended", category: "Urgent", date: "June 18, 2026", publisher: "Accounts & Billing Division", content: "The deadline for Sem-IV and VI tuition fees has been extended to June 30, 2026, without late fees." },
  { id: "N-107", title: "Class Scheduling Adjustments", category: "Academic", date: "June 15, 2026", publisher: "Dean of Academics Office", content: "Lec routines for IT & CS departments will be temporarily modified to accommodate practical evaluations." },
  { id: "N-106", title: "Independence Recess & Library Closed", category: "General", date: "June 12, 2026", publisher: "Director of Administration", content: "Official notice declaring that all departments, offices, and library facilities will remain closed on national recesses." },
  { id: "N-105", title: "Hostel Entry Timing Strict Policy", category: "General", date: "June 10, 2026", publisher: "Chief Hostel Warden", content: "Curfew timing will be strictly audited starting next week. Entry cards must be verified by security." }
];

export default function NoticesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredNotices = MOCK_NOTICES.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || 
                          n.publisher.toLowerCase().includes(search.toLowerCase()) ||
                          n.content.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "All" || n.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-primary/20">
          Official Bulletins
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground font-display mb-2">Notice Board & Announcements</h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">Get verified institutional notices, circulars, and scheduling details directly from campus administrators.</p>
      </div>

      {/* Filter and Search */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {["All", "Urgent", "Academic", "General"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  category === cat
                    ? "bg-primary border-primary text-white"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground w-64"
            />
          </div>
        </div>
      </div>

      {/* Notices Board */}
      <div className="space-y-6">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((n) => (
            <div key={n.id} className={`p-6 bg-card border rounded-2xl shadow-sm space-y-3 ${
              n.category === "Urgent" 
                ? "border-rose-200 dark:border-rose-950/40 bg-rose-50/20 dark:bg-rose-950/5"
                : "border-border"
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                    n.category === "Urgent"
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 animate-pulse"
                      : n.category === "Academic"
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400"
                      : "bg-muted text-muted-foreground border border-border/80"
                  }`}>
                    {n.category}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">Notice ID: {n.id}</span>
                </div>
                
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary" /> {n.date}</span>
                  <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-primary" /> By {n.publisher}</span>
                </div>
              </div>

              <h3 className="font-bold text-foreground text-sm leading-snug">{n.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{n.content}</p>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-muted-foreground bg-card border border-border rounded-2xl">
            No notices match your filter or search inputs.
          </div>
        )}
      </div>
    </div>
  );
}
