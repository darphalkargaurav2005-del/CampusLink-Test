import { useState } from "react";
import { UserPlus, Search, Phone, Mail, User } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import Modal from "@/components/features/Modal";
import { MOCK_STUDENTS } from "@/constants/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { store } from "@/lib/store";

export default function ParentManagement() {
  const [search, setSearch] = useState("");
  const [selectedParent, setSelectedParent] = useState<typeof MOCK_STUDENTS[0] | null>(null);
  const { user: loggedInUser } = useAuth();

  const [parents, setParents] = useState(() => MOCK_STUDENTS.map(s => ({
    id: "par" + s.id,
    name: s.parentName,
    phone: s.parentPhone,
    childName: s.name,
    childRollNo: s.rollNo,
    childDept: s.department,
    childYear: s.year,
    email: `parent.${s.name.toLowerCase().replace(/\s+/, ".")}@gmail.com`,
  })));

  // Add Parent modal states
  const [parentModalOpen, setParentModalOpen] = useState(false);
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [childName, setChildName] = useState("");
  const [childRoll, setChildRoll] = useState("");
  const [childDept, setChildDept] = useState("Computer Science");
  const [childYear, setChildYear] = useState(1);

  const filtered = parents.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.childName.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setParentName("");
    setParentPhone("");
    setParentEmail("");
    setChildName("");
    setChildRoll("");
    setChildDept("Computer Science");
    setChildYear(1);
    setParentModalOpen(true);
  };

  const handleSaveParent = () => {
    if (!parentName.trim() || !parentPhone.trim() || !parentEmail.trim() || !childName.trim() || !childRoll.trim()) {
      toast.error("All parent and student details are required");
      return;
    }

    const newParent = {
      id: "par" + Date.now(),
      name: parentName.trim(),
      phone: parentPhone.trim(),
      email: parentEmail.trim(),
      childName: childName.trim(),
      childRollNo: childRoll.trim(),
      childDept,
      childYear
    };

    setParents(prev => [newParent, ...prev]);

    store.addHistory({
      action: "added",
      itemType: "Parent",
      itemName: parentName.trim(),
      timestamp: new Date().toLocaleString("en-IN"),
      performedBy: loggedInUser ? `${loggedInUser.name} (${loggedInUser.role})` : "System",
      details: `Child: ${childName.trim()} (${childRoll.trim()}), Dept: ${childDept}`,
    });

    toast.success("Parent registered successfully");
    setParentModalOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Parent Management"
        subtitle={`${parents.length} registered parents and guardians`}
        action={
          <button onClick={handleOpenAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            <UserPlus size={16} /> Add Parent
          </button>
        }
      />

      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search parents or students..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Parent Name</th>
                <th>Contact</th>
                <th>Child Name</th>
                <th>Roll No</th>
                <th>Department</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((parent, idx) => (
                <motion.tr key={parent.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.04 }}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center text-amber-700 dark:text-amber-400 font-bold text-sm">
                        {parent.name.charAt(0)}
                      </div>
                      <span className="font-medium text-sm text-foreground">{parent.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Phone size={11} />{parent.phone}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Mail size={11} />{parent.email}
                      </div>
                    </div>
                  </td>
                  <td className="text-sm font-medium">{parent.childName}</td>
                  <td className="font-mono text-xs text-muted-foreground">{parent.childRollNo}</td>
                  <td className="text-sm">{parent.childDept}</td>
                  <td className="text-sm">Year {parent.childYear}</td>
                  <td>
                    <button
                      onClick={() => {
                        const localStudent = MOCK_STUDENTS.find(s => s.rollNo === parent.childRollNo);
                        if (localStudent) {
                          setSelectedParent(localStudent);
                        } else {
                          setSelectedParent({
                            id: parent.id,
                            name: parent.childName,
                            email: `${parent.childName.toLowerCase().replace(/\s+/, ".")}@campus.edu`,
                            phone: parent.phone,
                            rollNo: parent.childRollNo,
                            class: "B.Tech",
                            section: "A",
                            department: parent.childDept,
                            year: parent.childYear,
                            gender: "Male",
                            dob: "2002-05-15",
                            address: "Campus Hostel",
                            parentName: parent.name,
                            parentPhone: parent.phone,
                            feeStatus: "paid",
                            attendance: 100,
                            cgpa: 8.0,
                            joinDate: "2021-08-01"
                          });
                        }
                      }}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      <User size={12} /> View Child
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!selectedParent} onClose={() => setSelectedParent(null)} title="Child Profile">
        {selectedParent && (
          <div className="space-y-3">
            {[
              ["Name", selectedParent.name],
              ["Roll No", selectedParent.rollNo],
              ["Department", selectedParent.department],
              ["Year", `Year ${selectedParent.year}`],
              ["Attendance", `${selectedParent.attendance}%`],
              ["CGPA", selectedParent.cgpa.toFixed(1)],
              ["Fee Status", selectedParent.feeStatus],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-border/50 text-sm">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium text-foreground">{v}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <Modal
        open={parentModalOpen}
        onClose={() => setParentModalOpen(false)}
        title="Add Parent / Guardian"
        subtitle="Register a new parent and map them to a student profile"
        size="md"
        footer={
          <>
            <button
              onClick={() => setParentModalOpen(false)}
              className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveParent}
              className="px-4 py-2 text-sm gradient-brand text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Add Parent
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="border-b border-border/60 pb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Parent Information</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-foreground mb-1">Parent Name</label>
                <input required type="text" value={parentName} onChange={e => setParentName(e.target.value)} placeholder="e.g. Rajesh Sharma" className="w-full text-xs px-3 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-foreground mb-1">Phone Number</label>
                  <input required type="text" value={parentPhone} onChange={e => setParentPhone(e.target.value)} placeholder="e.g. 9876543200" className="w-full text-xs px-3 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-foreground mb-1">Email Address</label>
                  <input required type="email" value={parentEmail} onChange={e => setParentEmail(e.target.value)} placeholder="e.g. parent@example.com" className="w-full text-xs px-3 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Mapped Student Details</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-foreground mb-1">Child Full Name</label>
                  <input required type="text" value={childName} onChange={e => setChildName(e.target.value)} placeholder="e.g. Aisha Sharma" className="w-full text-xs px-3 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-foreground mb-1">Roll Number</label>
                  <input required type="text" value={childRoll} onChange={e => setChildRoll(e.target.value)} placeholder="e.g. CS2021001" className="w-full text-xs px-3 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-foreground mb-1">Department</label>
                  <select value={childDept} onChange={e => setChildDept(e.target.value)} className="w-full text-xs px-3 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring select-none">
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Civil">Civil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-foreground mb-1">Academic Year</label>
                  <select value={childYear} onChange={e => setChildYear(Number(e.target.value))} className="w-full text-xs px-3 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring select-none">
                    <option value={1}>Year 1</option>
                    <option value={2}>Year 2</option>
                    <option value={3}>Year 3</option>
                    <option value={4}>Year 4</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
