import { useState } from "react";
import { Search, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import Modal from "@/components/features/Modal";
import { useDeleteConfirm } from "@/contexts/DeleteConfirmContext";
import { store } from "@/lib/store";
import { useAuth } from "@/contexts/AuthContext";

const roleColors: Record<string, string> = {
  "Institute Admin": "badge-primary",
  "Teacher": "badge-info",
  "Student": "badge-success",
  "Parent": "badge-warning",
  "Librarian": "badge-error",
};

export default function UserManagement() {
  const [users, setUsers] = useState(() => store.users);
  const [search, setSearch] = useState("");
  const { confirmDelete } = useDeleteConfirm();
  const { user: loggedInUser } = useAuth();

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Student");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("Active");

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.role.toLowerCase().includes(search.toLowerCase()));

  const handleOpenAdd = () => {
    setEditingUser(null);
    setName("");
    setEmail("");
    setRole("Student");
    setDepartment("");
    setStatus("Active");
    setModalOpen(true);
  };

  const handleOpenEdit = (user: any) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setDepartment(user.department === "-" ? "" : user.department);
    setStatus(user.status);
    setModalOpen(true);
  };

  const handleSaveUser = () => {
    if (!name.trim() || !email.trim()) {
      toast.error("Name and Email are required");
      return;
    }

    if (editingUser) {
      // Edit mode
      const updatedUsers = users.map(u => {
        if (u.id === editingUser.id) {
          return {
            ...u,
            name,
            email,
            role,
            department: department.trim() || "-",
            status
          };
        }
        return u;
      });
      store.users = updatedUsers;
      setUsers(updatedUsers);

      store.addHistory({
        action: "edited",
        itemType: "User",
        itemName: name,
        timestamp: new Date().toLocaleString("en-IN"),
        performedBy: loggedInUser ? `${loggedInUser.name} (${loggedInUser.role})` : "System",
        details: `Updated info for user ${editingUser.name}`,
      });

      toast.success("User updated successfully");
    } else {
      // Add mode
      const newUser = {
        id: "u" + Date.now(),
        name,
        email,
        role,
        department: department.trim() || "-",
        status,
        lastLogin: "Never"
      };
      const updatedUsers = [...users, newUser];
      store.users = updatedUsers;
      setUsers(updatedUsers);

      store.addHistory({
        action: "added",
        itemType: "User",
        itemName: name,
        timestamp: new Date().toLocaleString("en-IN"),
        performedBy: loggedInUser ? `${loggedInUser.name} (${loggedInUser.role})` : "System",
        details: `Role: ${role}, Email: ${email}`,
      });

      toast.success("New user invited successfully");
    }

    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="User Management"
        subtitle="Manage all system users and their access levels"
        action={
          <button onClick={handleOpenAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90">
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
                      <button onClick={() => handleOpenEdit(user)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground transition-colors"><Edit2 size={14} /></button>
                      <button
                        onClick={() => confirmDelete({
                          title: "Remove User",
                          itemName: user.name,
                          itemType: "User",
                          onConfirm: () => {
                            const updated = users.filter(u => u.id !== user.id);
                            store.users = updated;
                            setUsers(updated);
                            toast.success("User removed");
                          }
                        })}
                        className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg text-muted-foreground hover:text-rose-600 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingUser ? "Edit User" : "Invite New User"}
        subtitle={editingUser ? "Modify user details and roles" : "Send an invitation to a new system user"}
        size="md"
        footer={
          <>
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveUser}
              className="px-4 py-2 text-sm gradient-brand text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              {editingUser ? "Save Changes" : "Invite User"}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. Pradeep Srivastava"
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. user@campus.edu"
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring select-none"
              >
                <option value="Institute Admin">Institute Admin</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
                <option value="Parent">Parent</option>
                <option value="Librarian">Librarian</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Computer Science"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          {editingUser && (
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
