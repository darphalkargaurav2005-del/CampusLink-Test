import { useState } from "react";
import { UserCheck, AlertTriangle, TrendingUp, CheckCircle, XCircle, Clock, Lock, Settings, Download } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface StudentAttendance {
  id: string;
  name: string;
  status: "Present" | "Absent" | "Late";
  historyRate: number;
}

const INITIAL_STUDENTS: StudentAttendance[] = [
  { id: "STU101", name: "Aisha Sharma", status: "Present", historyRate: 92 },
  { id: "STU102", name: "Rohan Verma", status: "Present", historyRate: 88 },
  { id: "STU103", name: "Priya Patel", status: "Absent", historyRate: 74 },
  { id: "STU104", name: "Amit Singh", status: "Late", historyRate: 68 },
  { id: "STU105", name: "Sneha Reddy", status: "Present", historyRate: 95 }
];

export default function AttendanceFeature() {
  const { user } = useAuth();
  const [students, setStudents] = useState<StudentAttendance[]>(INITIAL_STUDENTS);
  
  // Administrative States
  const [threshold, setThreshold] = useState("75");
  const [rfidEnabled, setRfidEnabled] = useState(true);
  const [parentSyncEnabled, setParentSyncEnabled] = useState(true);

  const handleStatusChange = (id: string, newStatus: "Present" | "Absent" | "Late") => {
    setStudents(prev => 
      prev.map(s => {
        if (s.id !== id) return s;
        let diff = 0;
        if (newStatus === "Present") diff = 1;
        else if (newStatus === "Absent") diff = -2;
        else if (newStatus === "Late") diff = -0.5;
        
        const newRate = Math.min(100, Math.max(0, Math.round(s.historyRate + diff)));
        return { ...s, status: newStatus, historyRate: newRate };
      })
    );
  };

  const handleExportReport = () => {
    toast.success("Attendance audit report has been compiled and exported as PDF.");
  };

  // Compute stats
  const presentCount = students.filter(s => s.status === "Present").length;
  const lateCount = students.filter(s => s.status === "Late").length;
  const absentCount = students.filter(s => s.status === "Absent").length;
  const totalCount = students.length;
  
  const attendancePercentage = Math.round(
    ((presentCount * 1.0 + lateCount * 0.7) / totalCount) * 100
  );

  const isAdmin = user?.role === "admin";
  const thresholdNum = parseInt(threshold) || 75;

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              {isAdmin ? "Institute Management Console" : "Faculty portal tools"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-display leading-tight mb-4">
              Attendance Tracking & Analytics
            </h1>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              {isAdmin 
                ? "Monitor system-wide attendance registries, generate institution reports, track threshold compliance, and override hardware credentials."
                : "Manage course schedules, take visual classroom rolls, analyze stats, and report low attendance warnings."
              }
            </p>
          </div>
          <button
            onClick={handleExportReport}
            className="flex items-center justify-center gap-2 px-5 py-3 border border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-xs tracking-wide uppercase transition-all backdrop-blur-sm self-start md:self-center"
          >
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* Interactive Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Simulator Panel */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              {isAdmin ? "Institute-Wide Student Rolls" : "Assigned Class Attendance Register"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Click status badges below to mark or edit student records. Live aggregates update in real-time.
            </p>
          </div>

          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-muted/30 border border-border rounded-xl gap-3">
                <div>
                  <h4 className="font-bold text-foreground text-xs">{student.name}</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">ID: {student.id} • Historical Rate: <span className="font-bold text-foreground">{student.historyRate}%</span></p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(student.id, "Present")}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                      student.status === "Present"
                        ? "bg-emerald-600 border-emerald-600 text-white dark:bg-emerald-500 dark:border-emerald-500"
                        : "bg-background border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Present
                  </button>
                  <button
                    onClick={() => handleStatusChange(student.id, "Late")}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                      student.status === "Late"
                        ? "bg-amber-600 border-amber-600 text-white dark:bg-amber-500 dark:border-amber-500"
                        : "bg-background border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" /> Late
                  </button>
                  <button
                    onClick={() => handleStatusChange(student.id, "Absent")}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                      student.status === "Absent"
                        ? "bg-rose-600 border-rose-600 text-white dark:bg-rose-500 dark:border-rose-500"
                        : "bg-background border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" /> Absent
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          
          {/* Rate Tracker */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center justify-center space-y-4">
            <h3 className="font-bold text-foreground text-xs uppercase tracking-wide text-muted-foreground">Class Attendance Rate</h3>
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/20" />
                <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 48} 
                        strokeDashoffset={2 * Math.PI * 48 * (1 - attendancePercentage / 100)} 
                        className="text-emerald-500 transition-all duration-500" />
              </svg>
              <div className="absolute text-2xl font-bold text-foreground font-display">{attendancePercentage}%</div>
            </div>
            <p className="text-[10px] text-muted-foreground px-4 leading-relaxed font-medium">
              Present: {presentCount} | Late: {lateCount} | Absent: {absentCount}
            </p>
          </div>

          {/* Low Attendance Warnings */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3.5">
            <div className="flex items-center gap-2 text-rose-500 font-bold text-xs pb-2 border-b border-border">
              <AlertTriangle className="w-4 h-4" />
              <span>Low Attendance Warnings (Threshold: {threshold}%)</span>
            </div>
            <div className="space-y-2.5">
              {students.filter(s => s.historyRate < thresholdNum).map(s => (
                <div key={s.id} className="flex items-center justify-between text-xs p-2.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 rounded-xl">
                  <div>
                    <p className="font-bold text-rose-700 dark:text-rose-400">{s.name}</p>
                    <p className="text-[10px] text-muted-foreground">Rate: <span className="font-bold text-rose-600">{s.historyRate}%</span></p>
                  </div>
                  <span className="text-[9px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 px-2 py-0.5 rounded-full uppercase">
                    Warning
                  </span>
                </div>
              ))}
              {students.filter(s => s.historyRate < thresholdNum).length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-2">
                  All active students satisfy the threshold.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Administrative System settings block */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 flex items-center justify-center rounded-lg">
              <Settings size={16} />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">System-Wide Administrative Settings</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Configure compliance rules, notification workflows, and database updates.</p>
            </div>
          </div>
          {!isAdmin && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40 text-[10px] font-bold rounded-lg uppercase tracking-wider">
              <Lock size={10} /> Faculty Lock
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Warning Threshold Config */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide">Warning Threshold Rate</label>
            <select
              value={threshold}
              onChange={(e) => {
                if (!isAdmin) {
                  toast.error("Permission denied. Only admins can modify warning thresholds.");
                  return;
                }
                setThreshold(e.target.value);
                toast.success(`System warning threshold updated to ${e.target.value}%`);
              }}
              disabled={!isAdmin}
              className="w-full bg-background border border-border rounded-xl p-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-75 disabled:cursor-not-allowed"
            >
              <option value="60">60% - Minimum Required</option>
              <option value="70">70% - Notice Issued</option>
              <option value="75">75% - Academic Standard</option>
              <option value="80">80% - strict Compliance</option>
            </select>
          </div>

          {/* RFID Biometric Switch */}
          <div className="flex items-center justify-between p-4 border border-border bg-muted/20 rounded-xl">
            <div>
              <p className="text-xs font-bold text-foreground">RFID Biometric Sync</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Log roll from entry scanners.</p>
            </div>
            <button
              onClick={() => {
                if (!isAdmin) {
                  toast.error("Permission denied. Only admins can toggle biometric sync.");
                  return;
                }
                setRfidEnabled(!rfidEnabled);
                toast.success(`RFID Sync ${!rfidEnabled ? "Enabled" : "Disabled"}`);
              }}
              disabled={!isAdmin}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                rfidEnabled ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"
              } ${!isAdmin && "cursor-not-allowed opacity-75"}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${rfidEnabled ? "translate-x-6" : "translate-x-0"}`} />
            </button>
          </div>

          {/* Parent notifications toggle */}
          <div className="flex items-center justify-between p-4 border border-border bg-muted/20 rounded-xl">
            <div>
              <p className="text-xs font-bold text-foreground">Parent Alerts Broadcast</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Send alerts automatically.</p>
            </div>
            <button
              onClick={() => {
                if (!isAdmin) {
                  toast.error("Permission denied. Only admins can toggle broadcasts.");
                  return;
                }
                setParentSyncEnabled(!parentSyncEnabled);
                toast.success(`Parent alerts broadcast ${!parentSyncEnabled ? "Activated" : "Deactivated"}`);
              }}
              disabled={!isAdmin}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                parentSyncEnabled ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"
              } ${!isAdmin && "cursor-not-allowed opacity-75"}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${parentSyncEnabled ? "translate-x-6" : "translate-x-0"}`} />
            </button>
          </div>
        </div>

        {!isAdmin && (
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-5 bg-amber-50 dark:bg-amber-950/15 p-3 rounded-xl border border-amber-100 dark:border-amber-950/40">
            Note: You are currently viewing this page as a Teacher. System-wide configuration switches are locked. Global changes must be submitted to the institute administration database.
          </p>
        )}
      </div>

      {/* Feature Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-foreground text-sm">Real-time Digital Register</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Record attendance using desktops, tablets, or mobiles. Instantly check student listings and log histories.
          </p>
        </div>
        <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-foreground text-sm">Automated Alerts</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Notify parents immediately via email or dashboard cards when a student is recorded absent or when aggregate attendance slips.
          </p>
        </div>
        <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-foreground text-sm">Biometric & RFID Ready</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Easily sync with automated hardware scanners (RFID cards, fingerprint logs) via cloud API integrations.
          </p>
        </div>
      </div>
    </div>
  );
}
