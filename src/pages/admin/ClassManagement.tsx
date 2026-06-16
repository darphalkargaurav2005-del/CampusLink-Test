import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import Modal from "@/components/features/Modal";
import { useDeleteConfirm } from "@/contexts/DeleteConfirmContext";

const schema = z.object({
  name: z.string().min(2, "Class name required"),
  department: z.string().min(2, "Department required"),
  year: z.string().min(1, "Year required"),
  section: z.string().min(1, "Section required"),
  capacity: z.string().min(1, "Capacity required"),
  classTeacher: z.string().min(2, "Class teacher required"),
  room: z.string().min(1, "Room required"),
});

type FormData = z.infer<typeof schema>;

const INITIAL_CLASSES = [
  { id: "cl1", name: "B.Tech CS - Year 3 A", department: "Computer Science", year: 3, section: "A", capacity: 65, enrolled: 62, classTeacher: "Dr. Anand Kumar", room: "LH-201" },
  { id: "cl2", name: "B.Tech CS - Year 3 B", department: "Computer Science", year: 3, section: "B", capacity: 65, enrolled: 58, classTeacher: "Mr. Kartik Verma", room: "LH-202" },
  { id: "cl3", name: "B.Tech EC - Year 3 A", department: "Electronics", year: 3, section: "A", capacity: 60, enrolled: 45, classTeacher: "Mr. Ravi Shankar", room: "LH-301" },
  { id: "cl4", name: "B.Tech ME - Year 2 A", department: "Mechanical", year: 2, section: "A", capacity: 60, enrolled: 55, classTeacher: "Dr. Sunita Rao", room: "LH-401" },
  { id: "cl5", name: "B.Tech CS - Year 1 A", department: "Computer Science", year: 1, section: "A", capacity: 70, enrolled: 68, classTeacher: "Prof. Meera Iyer", room: "LH-101" },
];

export default function ClassManagement() {
  const [classes, setClasses] = useState(INITIAL_CLASSES);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const { confirmDelete } = useDeleteConfirm();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    if (editId) {
      setClasses(prev => prev.map(c => c.id === editId ? { ...c, ...data, year: Number(data.year), capacity: Number(data.capacity) } : c));
      toast.success("Class updated");
    } else {
      setClasses(prev => [...prev, { id: `cl${Date.now()}`, ...data, year: Number(data.year), capacity: Number(data.capacity), enrolled: 0 }]);
      toast.success("Class created successfully");
    }
    setModalOpen(false);
  };

  const openEdit = (c: typeof INITIAL_CLASSES[0]) => {
    setEditId(c.id);
    reset({ name: c.name, department: c.department, year: String(c.year), section: c.section, capacity: String(c.capacity), classTeacher: c.classTeacher, room: c.room });
    setModalOpen(true);
  };

  return (
    <div>
      <PageHeader
        title="Class Management"
        subtitle={`${classes.length} active classes across departments`}
        action={
          <button onClick={() => { setEditId(null); reset(); setModalOpen(true); }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            <Plus size={16} /> Create Class
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {classes.map((cls, idx) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground text-sm">{cls.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{cls.department} • Room {cls.room}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(cls)} className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground">
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => confirmDelete({
                    title: "Remove Class",
                    itemName: cls.name,
                    itemType: "Class",
                    onConfirm: () => {
                      setClasses(prev => prev.filter(c => c.id !== cls.id));
                      toast.success("Class removed");
                    }
                  })}
                  className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors text-muted-foreground hover:text-rose-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Enrollment</span>
                <span className="font-medium">{cls.enrolled}/{cls.capacity}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                  className="h-full bg-brand-500 rounded-full"
                />
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              Class Teacher: <span className="text-foreground font-medium">{cls.classTeacher}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? "Edit Class" : "Create Class"} size="lg"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors">Cancel</button>
            <button onClick={handleSubmit(onSubmit)} className="px-4 py-2 text-sm gradient-brand text-white rounded-xl font-semibold">{editId ? "Update" : "Create"}</button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "name", label: "Class Name", span: true },
            { name: "department", label: "Department" },
            { name: "classTeacher", label: "Class Teacher" },
            { name: "room", label: "Room Number" },
            { name: "capacity", label: "Capacity" },
          ].map(f => (
            <div key={f.name} className={f.span ? "col-span-2" : ""}>
              <label className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
              <input {...register(f.name as keyof FormData)} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
              {errors[f.name as keyof FormData] && <p className="text-rose-500 text-xs mt-1">{errors[f.name as keyof FormData]?.message}</p>}
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Year</label>
            <select {...register("year")} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
              {[1, 2, 3, 4].map(y => <option key={y} value={y}>Year {y}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Section</label>
            <select {...register("section")} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
              {["A", "B", "C", "D"].map(s => <option key={s} value={s}>Section {s}</option>)}
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
