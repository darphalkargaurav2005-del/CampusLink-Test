import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Edit2, Trash2, Users, Clock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import Modal from "@/components/features/Modal";
import { MOCK_ASSIGNMENTS } from "@/constants/mockData";
import type { Assignment } from "@/types";
import { cn } from "@/lib/utils";
import { useDeleteConfirm } from "@/contexts/DeleteConfirmContext";
import { store } from "@/lib/store";

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description required"),
  courseName: z.string().min(2, "Course required"),
  dueDate: z.string().min(1, "Due date required"),
  maxMarks: z.string().min(1, "Max marks required"),
});

type FormData = z.infer<typeof schema>;

export default function Assignments() {
  const [assignments, setAssignments] = useState<Assignment[]>(() => store.assignments);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const { confirmDelete } = useDeleteConfirm();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleEdit = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    reset({
      title: assignment.title,
      description: assignment.description,
      courseName: assignment.courseName,
      dueDate: assignment.dueDate,
      maxMarks: String(assignment.maxMarks),
    });
    setModalOpen(true);
  };

  const onSubmit = (data: FormData) => {
    if (editingAssignment) {
      const updated = assignments.map(a => a.id === editingAssignment.id ? {
        ...a,
        ...data,
        maxMarks: Number(data.maxMarks),
      } : a);
      store.assignments = updated;
      setAssignments(updated);
      toast.success("Assignment updated successfully");
    } else {
      const newA: Assignment = {
        id: `a${Date.now()}`,
        title: data.title,
        description: data.description,
        courseName: data.courseName,
        dueDate: data.dueDate,
        maxMarks: Number(data.maxMarks),
        courseId: "c1",
        teacherId: "t1",
        submittedCount: 0,
        totalStudents: 65,
        status: "active",
      };
      const updated = [newA, ...assignments];
      store.assignments = updated;
      setAssignments(updated);
      toast.success("Assignment created and published");
    }
    setModalOpen(false);
    setEditingAssignment(null);
    reset();
  };

  const statusColors: Record<Assignment["status"], string> = {
    active: "badge-success",
    closed: "badge-error",
    draft: "badge-warning",
  };

  return (
    <div>
      <PageHeader
        title="Assignments"
        subtitle={`Managing ${assignments.length} assignments`}
        action={
          <button onClick={() => { setEditingAssignment(null); reset({ title: "", description: "", courseName: "", dueDate: "", maxMarks: "" }); setModalOpen(true); }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90">
            <Plus size={16} /> Create Assignment
          </button>
        }
      />

      <div className="space-y-4">
        {assignments.map((a, idx) => {
          const submissionPct = a.totalStudents ? Math.round(((a.submittedCount ?? 0) / a.totalStudents) * 100) : 0;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              className="bg-card border border-border rounded-xl p-5 shadow-card"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm">{a.title}</h3>
                    <span className={statusColors[a.status]}>{a.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{a.courseName} • Max Marks: {a.maxMarks}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{a.description}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => handleEdit(a)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground transition-colors"><Edit2 size={14} /></button>
                  <button
                    onClick={() => confirmDelete({
                      title: "Remove Assignment",
                      itemName: a.title,
                      itemType: "Assignment",
                      onConfirm: () => {
                        const updated = assignments.filter(x => x.id !== a.id);
                        store.assignments = updated;
                        setAssignments(updated);
                        toast.success("Assignment deleted");
                      }
                    })}
                    className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg text-muted-foreground hover:text-rose-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock size={13} /> Due: <span className="font-medium text-foreground">{a.dueDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users size={13} /> {a.submittedCount}/{a.totalStudents} submitted
                </div>
                <div className="flex-1">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full transition-all" style={{ width: `${submissionPct}%` }} />
                  </div>
                </div>
                <span className="text-xs font-medium text-muted-foreground">{submissionPct}%</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditingAssignment(null); reset(); }} title={editingAssignment ? "Edit Assignment" : "Create Assignment"} size="lg"
        footer={
          <>
            <button onClick={() => { setModalOpen(false); setEditingAssignment(null); reset(); }} className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors">Cancel</button>
            <button onClick={handleSubmit(onSubmit)} className="px-4 py-2 text-sm gradient-brand text-white rounded-xl font-semibold">{editingAssignment ? "Save Changes" : "Publish Assignment"}</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Assignment Title</label>
            <input {...register("title")} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
            <textarea {...register("description")} rows={3} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            {errors.description && <p className="text-rose-500 text-xs mt-1">{errors.description.message}</p>}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1.5">Course</label>
              <select {...register("courseName")} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select Course</option>
                <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
                <option value="Database Management Systems">Database Management Systems</option>
                <option value="Web Development">Web Development</option>
              </select>
              {errors.courseName && <p className="text-rose-500 text-xs mt-1">{errors.courseName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Max Marks</label>
              <input {...register("maxMarks")} type="number" className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Due Date</label>
            <input {...register("dueDate")} type="date" className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.dueDate && <p className="text-rose-500 text-xs mt-1">{errors.dueDate.message}</p>}
          </div>
        </div>
      </Modal>
    </div>
  );
}
