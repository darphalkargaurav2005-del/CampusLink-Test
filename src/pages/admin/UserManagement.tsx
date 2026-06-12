import { useState } from "react";
import { Search, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";

const INITIAL_USERS = [
  { id: "u1", name: "Dr. Pradeep Srivastava", email: "admin@campus.edu", role: "Institute Admin", status: "Active", lastLogin: "2024-02-28", department: "Administration" },
  { id: "u2", name: "Dr. Anand Kumar", email: "teacher@campus.edu", role: "Teacher", status: "Active", lastLogin: "2024-02-28", department: "Computer Science" },
  { id: "u3", name: "Aisha Sharma", email: "student@campus.edu", role: "Student", status: "Active", lastLogin: "2024-02-27", department: "Computer Science" },
  { id: "u4", name: "Rajesh Sharma", email: "parent@campus.edu", role: "Parent", status: "Active", lastLogin: "2024-02-25", department: "-" },
  { id: "u5", name: "Mrs. Kavitha Menon", email: "librarian@campus.edu", role: "Librarian", status: "Active", lastLogin: "2024-02-28", department: "Library" },
];

const roleColors: Record<string, string> = {
  "Institute Admin": "badge-primary",
  "Teacher": "badge-info",
  "Student": "badge-success",
  "Parent": "badge-warning",
  "Librarian": "badge-error",
};

export default function UserManagement() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="User Management"
        subtitle="Manage all system users and their access levels"
        action={
          <button onClick={() => toast.info("New user invitation sent")} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90">
            + Invite User
          </button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
        {["Institute Admin", "Teacher", "Student", "Parent", "Librarian"].map((role, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-lg font-bold font-display text-foreground">{users.filter(u => u.role === role).length}</p>
            <p className="text-xs text-muted-foreground">{role}s</p>
          </div>
        ))}
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>User</th><th>Role</th><th>Department</th><th>Status</th><th>Last Login</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((user, idx) => (
                <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-sm">{user.name.charAt(0)}</div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className={roleColors[user.role]}>{user.role}</span></td>
                  <td className="text-sm">{user.department}</td>
                  <td><span className="badge-success">{user.status}</span></td>
                  <td className="text-xs text-muted-foreground">{user.lastLogin}</td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => toast.info(`Editing ${user.name}`)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => { setUsers(prev => prev.filter(u => u.id !== user.id)); toast.success("User removed"); }} className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg text-muted-foreground hover:text-rose-600 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
