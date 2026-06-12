import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const SEGMENT_LABELS: Record<string, string> = {
  admin: "Admin",
  teacher: "Teacher",
  student: "Student",
  parent: "Parent",
  librarian: "Librarian",
  dashboard: "Dashboard",
  users: "User Management",
  students: "Students",
  teachers: "Teachers",
  parents: "Parents",
  classes: "Classes",
  courses: "Courses",
  "teacher-assignment": "Teacher Assignment",
  fees: "Fee Management",
  "teacher-attendance": "Teacher Attendance",
  "teacher-schedule": "Teacher Schedule",
  notices: "Notice Board",
  reports: "Reports & Analytics",
  ai: "AI Assistant",
  chats: "Chats",
  settings: "Settings",
  attendance: "Attendance",
  marks: "Marks Entry",
  materials: "Study Material",
  performance: "Performance",
  schedule: "Schedule",
  assignments: "Assignments",
  results: "Results",
  notes: "Notes",
  books: "Books",
  categories: "Categories",
  issue: "Issue Books",
  return: "Return Books",
  fines: "Fine Management",
  requests: "Book Requests",
  progress: "Academic Progress",
  growth: "Growth Analysis",
  announcements: "Announcements",
};

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) return null;

  return (
    <nav className="flex items-center gap-1.5 text-sm mb-4">
      <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
        <Home size={14} />
      </Link>
      {segments.map((seg, idx) => {
        const path = "/" + segments.slice(0, idx + 1).join("/");
        const label = SEGMENT_LABELS[seg] || seg;
        const isLast = idx === segments.length - 1;

        return (
          <div key={path} className="flex items-center gap-1.5">
            <ChevronRight size={13} className="text-muted-foreground/50" />
            {isLast ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link to={path} className="text-muted-foreground hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
