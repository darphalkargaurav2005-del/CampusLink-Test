import { useState } from "react";
import { UserPlus, Search, Phone, Mail, User } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import Modal from "@/components/features/Modal";
import { MOCK_STUDENTS } from "@/constants/mockData";

export default function ParentManagement() {
  const [search, setSearch] = useState("");
  const [selectedParent, setSelectedParent] = useState<typeof MOCK_STUDENTS[0] | null>(null);

  const parents = MOCK_STUDENTS.map(s => ({
    id: "par" + s.id,
    name: s.parentName,
    phone: s.parentPhone,
    childName: s.name,
    childRollNo: s.rollNo,
    childDept: s.department,
    childYear: s.year,
    email: `parent.${s.name.toLowerCase().replace(/\s+/, ".")}@gmail.com`,
  }));

  const filtered = parents.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.childName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Parent Management"
        subtitle={`${parents.length} registered parents and guardians`}
        action={
          <button onClick={() => toast.info("Parent registration portal opened")} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity">
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
                    <button onClick={() => setSelectedParent(MOCK_STUDENTS.find(s => s.id === parent.id.replace("par", "")) || null)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-border rounded-lg hover:bg-muted transition-colors">
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
    </div>
  );
}
