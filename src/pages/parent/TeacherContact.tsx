import { useState } from "react";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import Modal from "@/components/features/Modal";
import { MOCK_TEACHERS } from "@/constants/mockData";

export default function TeacherContact() {
  const [selectedTeacher, setSelectedTeacher] = useState<typeof MOCK_TEACHERS[0] | null>(null);
  const [msgText, setMsgText] = useState("");

  const handleSendMsg = () => {
    if (!msgText.trim()) return;
    toast.success(`Message sent to ${selectedTeacher?.name}`);
    setMsgText("");
    setSelectedTeacher(null);
  };

  return (
    <div>
      <PageHeader title="Teacher Contact" subtitle="Get in touch with your child's teachers" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {MOCK_TEACHERS.map((teacher, idx) => (
          <motion.div key={teacher.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.07 }} className="bg-card border border-border rounded-xl p-5 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950/30 flex items-center justify-center text-sky-700 dark:text-sky-400 font-bold text-lg">
                {teacher.name.split(" ").pop()?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{teacher.name}</p>
                <p className="text-xs text-muted-foreground">{teacher.designation}</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail size={12} className="text-brand-500" />
                <span className="truncate">{teacher.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone size={12} className="text-emerald-500" />
                <span>{teacher.phone}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Subjects: </span>
                {teacher.subjects.join(", ") || teacher.department}
              </p>
            </div>
            <button onClick={() => setSelectedTeacher(teacher)} className="w-full flex items-center justify-center gap-2 py-2.5 gradient-brand text-white text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity">
              <MessageSquare size={14} /> Send Message
            </button>
          </motion.div>
        ))}
      </div>

      <Modal open={!!selectedTeacher} onClose={() => setSelectedTeacher(null)} title={`Message ${selectedTeacher?.name}`} subtitle={selectedTeacher?.designation} size="sm"
        footer={
          <>
            <button onClick={() => setSelectedTeacher(null)} className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors">Cancel</button>
            <button onClick={handleSendMsg} className="px-4 py-2 text-sm gradient-brand text-white rounded-xl font-semibold">Send</button>
          </>
        }
      >
        <textarea value={msgText} onChange={e => setMsgText(e.target.value)} rows={4} placeholder="Type your message here..." className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
      </Modal>
    </div>
  );
}
