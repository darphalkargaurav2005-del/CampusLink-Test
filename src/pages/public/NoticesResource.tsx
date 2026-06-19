import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Search, Bell, Shield, Calendar, AlertTriangle, FileText, MailOpen } from "lucide-react";

interface Notice {
  id: string;
  title: string;
  category: string;
  date: string;
  publisher: string;
  content: string;
}

const MOCK_NOTICES: Record<string, Notice[]> = {
  "latest-announcements": [
    { id: "N-101", title: "Institutional NAAC A++ Grade Celebration", category: "General", date: "June 19, 2026", publisher: "Director of Campus Development", content: "CampusLink is proud to announce that the institution has secured an A++ accreditation score from the NAAC board. Celebrations scheduled tomorrow." },
    { id: "N-102", title: "Smart-Card Biometric Rollout", category: "Operations", date: "June 17, 2026", publisher: "IT Infrastructure Team", content: "Students and teachers must collect their new RFID biometric access cards from the administrative desk before next week." }
  ],
  "circulars": [
    { id: "C-201", title: "Anti-Ragging Conduct & Compliance Regulations", category: "Compliance", date: "June 10, 2026", publisher: "Disciplinary Board Dean", content: "Strict adherence to safety rules is mandatory. Violation of student conduct codes will result in immediate registration suspensions." },
    { id: "C-202", title: "Hostel Entry Timing Strict Policy", category: "Rules", date: "June 08, 2026", publisher: "Chief Hostel Warden", content: "Curfew timings are verified by local security daily. Hostlers must record entry logs before 9:00 PM." }
  ],
  "exam-notices": [
    { id: "E-301", title: "Even Sem Exam Seat Allocations", category: "Exams", date: "June 18, 2026", publisher: "Controller of Examinations", content: "Detailed seating spreadsheets and hall invigilator duties are published on the dashboard boards. Bring valid ID cards." },
    { id: "E-302", title: "Practical Evaluations Schedule Modified", category: "Exams", date: "June 14, 2026", publisher: "Dean of Academics Office", content: "CS/IT lab practical exams are rescheduled. Review modified calendar entries for specific lab hall details." }
  ],
  "placement-notices": [
    { id: "P-401", title: "Google Campus Recruitment Drive 2026", category: "Placements", date: "June 19, 2026", publisher: "Placement Coordinator", content: "Google recruitment team is hosting preliminary screening tests next week for B.Tech CS & IT streams. Upload resumes today." },
    { id: "P-402", title: "Microsoft Summer Internship Eligibility", category: "Internships", date: "June 15, 2026", publisher: "Corporate Liaison Officer", content: "Internship lists for 3rd-year engineering candidates are open. Minimum CGPA threshold of 8.5 is required to apply." }
  ],
  "emergency-alerts": [
    { id: "A-501", title: "Severe Weather Precaution Notice", category: "Emergency", date: "June 19, 2026", publisher: "Administration Office", content: "Due to heavy rain warning signals, all afternoon lab classes are moved to online forums. Safety first." },
    { id: "A-502", title: "ERP Database Server Maintenance", category: "System", date: "June 16, 2026", publisher: "IT Helpdesk Admin", content: "CampusLink dashboard databases will be offline for security updates on Sunday from 2 AM to 5 AM." }
  ]
};

export default function NoticesResource() {
  const { tab } = useParams<{ tab: string }>();
  const activeTab = tab || "latest-announcements";

  const [search, setSearch] = useState("");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const tabs = [
    { id: "latest-announcements", label: "Latest Announcements" },
    { id: "circulars", label: "Circulars" },
    { id: "exam-notices", label: "Examination Notices" },
    { id: "placement-notices", label: "Placement Notices" },
    { id: "emergency-alerts", label: "Emergency Alerts" }
  ];

  const notices = MOCK_NOTICES[activeTab] || [];
  
  const filteredNotices = notices.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    n.id.toLowerCase().includes(search.toLowerCase()) ||
    n.publisher.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            Official Bulletin
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display leading-tight mb-2">
            Notice Board & Circulars
          </h1>
          <p className="text-white/80 text-xs sm:text-sm">
            Access certified institutional notices, placement drives, examination seats, and emergency safety alerts directly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide px-3 mb-2">Notice Categories</p>
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-1 lg:gap-1.5">
            {tabs.map((t) => {
              const isActive = activeTab === t.id;
              return (
                <Link
                  key={t.id}
                  to={`/resources/notices/${t.id}`}
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
          {/* Search bar widget */}
          <div className="bg-card border border-border rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search by ID, title, publisher, contents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-foreground focus:outline-none placeholder-muted-foreground"
            />
          </div>

          {/* Notices listing */}
          <div className="space-y-4">
            {filteredNotices.map((n) => {
              const isEmergency = activeTab === "emergency-alerts";
              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNotice(n)}
                  className={`p-5 bg-card border rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3 text-left ${
                    isEmergency 
                      ? "border-rose-200 dark:border-rose-950/40 bg-rose-50/20 dark:bg-rose-950/5" 
                      : "border-border"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        isEmergency 
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 animate-pulse" 
                          : "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400"
                      }`}>
                        {n.category}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">ID: {n.id}</span>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary shrink-0" /> {n.date}</span>
                      <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-primary shrink-0" /> {n.publisher}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-foreground text-xs leading-snug">{n.title}</h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{n.content}</p>
                  
                  <span className="text-[10px] font-bold text-primary flex items-center gap-1 mt-1 hover:underline">
                    <MailOpen className="w-3.5 h-3.5" /> Read full notice
                  </span>
                </div>
              );
            })}
            
            {filteredNotices.length === 0 && (
              <div className="py-8 text-center text-muted-foreground bg-card border border-border rounded-2xl">
                No notices found matching the query.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-modal space-y-4 text-left">
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-primary/10 text-primary font-bold text-[9px] uppercase">{selectedNotice.category}</span>
                <h3 className="text-sm font-bold text-foreground mt-2 leading-snug">{selectedNotice.title}</h3>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded shrink-0">{selectedNotice.id}</span>
            </div>

            <div className="border-t border-b border-border/60 py-3 space-y-1.5 text-[10px] text-muted-foreground">
              <p><strong>Published Date:</strong> {selectedNotice.date}</p>
              <p><strong>Authority:</strong> {selectedNotice.publisher}</p>
            </div>

            <p className="text-xs text-foreground/80 leading-relaxed bg-muted/20 p-4 rounded-xl border border-border/40">
              {selectedNotice.content}
            </p>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2 text-xs font-semibold bg-primary text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                Dismiss Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
