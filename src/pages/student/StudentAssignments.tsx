import { useState } from "react";
import { Upload, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import Modal from "@/components/features/Modal";
import { store } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function StudentAssignments() {
  const [submitted, setSubmitted] = useState<Set<string>>(new Set());
  const [submitModal, setSubmitModal] = useState<string | null>(null);
  const [file, setFile] = useState<string>("");

  const handleSubmit = () => {
    if (!file.trim()) { toast.error("Please add a submission note or file link"); return; }
    setSubmitted(prev => new Set([...prev, submitModal!]));
    setSubmitModal(null);
    setFile("");
    toast.success("Assignment submitted successfully");
  };

  const isOverdue = (dueDate: string) => new Date(dueDate) < new Date();

  return (
    <div>
      <PageHeader title="Assignments" subtitle="View and submit your assignments" />

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Total", value: store.assignments.length, color: "text-foreground" },
          { label: "Submitted", value: submitted.size, color: "text-emerald-600" },
          { label: "Pending", value: store.assignments.length - submitted.size, color: "text-amber-600" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 text-center shadow-card">
            <p className={cn("text-2xl font-bold font-display", s.color)}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {store.assignments.map((a, idx) => {
          const isSubmitted = submitted.has(a.id);
          const overdue = isOverdue(a.dueDate) && !isSubmitted;
          return (
            <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.07 }} className="bg-card border border-border rounded-xl p-5 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-foreground text-sm">{a.title}</h3>
                    {isSubmitted && <span className="badge-success flex items-center gap-1"><CheckCircle size={10} /> Submitted</span>}
                    {overdue && <span className="badge-error flex items-center gap-1"><AlertCircle size={10} /> Overdue</span>}
                    {!isSubmitted && !overdue && <span className="badge-warning">Pending</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{a.courseName}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{a.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock size={11} /> Due: {a.dueDate}</span>
                    <span>Max Marks: {a.maxMarks}</span>
                  </div>
                </div>
                {!isSubmitted && (
                  <button onClick={() => setSubmitModal(a.id)} className="flex items-center gap-1.5 px-4 py-2 gradient-brand text-white text-xs font-semibold rounded-xl hover:opacity-90 whitespace-nowrap">
                    <Upload size={13} /> Submit
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <Modal open={!!submitModal} onClose={() => setSubmitModal(null)} title="Submit Assignment" subtitle="Upload your completed assignment" size="sm"
        footer={
          <>
            <button onClick={() => setSubmitModal(null)} className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors">Cancel</button>
            <button onClick={handleSubmit} className="px-4 py-2 text-sm gradient-brand text-white rounded-xl font-semibold">Submit</button>
          </>
        }
      >
        <div className="space-y-3">
          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => toast.info("File picker opened")}>
            <Upload size={22} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Click to upload file</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Submission Note</label>
            <textarea value={file} onChange={e => setFile(e.target.value)} rows={2} placeholder="Add a note or file link..." className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
