import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Bell, Edit2, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import PageHeader from "@/components/features/PageHeader";
import Modal from "@/components/features/Modal";
import { MOCK_NOTICES } from "@/constants/mockData";
import type { Notice } from "@/types";
import { cn } from "@/lib/utils";
import { useDeleteConfirm } from "@/contexts/DeleteConfirmContext";

interface Props { role: string; }

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  category: z.string().min(1, "Category required"),
  priority: z.string().min(1, "Priority required"),
});

type FormData = z.infer<typeof schema>;

const CATEGORY_COLORS: Record<string, string> = {
  general: "badge-info",
  academic: "badge-primary",
  examination: "badge-error",
  event: "badge-success",
  urgent: "badge-error",
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-rose-500",
  medium: "bg-amber-500",
  low: "bg-emerald-500",
};

export default function NoticeBoard({ role }: Props) {
  const [notices, setNotices] = useState<Notice[]>(MOCK_NOTICES);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { confirmDelete } = useDeleteConfirm();
  const isAdmin = role === "admin";

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const filtered = notices.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.category.includes(search.toLowerCase())
  );

  const onSubmit = (data: FormData) => {
    const newNotice: Notice = {
      id: `n${Date.now()}`,
      ...data,
      category: data.category as Notice["category"],
      priority: data.priority as Notice["priority"],
      author: "Admin Office",
      publishDate: new Date().toISOString().split("T")[0],
      targetAudience: ["student", "teacher", "parent"],
    };
    setNotices(prev => [newNotice, ...prev]);
    toast.success("Notice published successfully");
    setModalOpen(false);
    reset();
  };

  return (
    <div>
      <PageHeader
        title="Notice Board"
        subtitle="Official announcements and notifications"
        action={isAdmin ? (
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90">
            <Plus size={16} /> Post Notice
          </button>
        ) : undefined}
      />

      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notices..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="space-y-4">
        {filtered.map((notice, idx) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
            className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className={cn("w-2.5 h-2.5 mt-1.5 rounded-full flex-shrink-0", PRIORITY_COLORS[notice.priority])} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="font-semibold text-foreground text-sm">{notice.title}</h3>
                    <span className={CATEGORY_COLORS[notice.category]}>{notice.category}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{notice.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span>Posted by: <span className="font-medium text-foreground">{notice.author}</span></span>
                    <span>{notice.publishDate}</span>
                    <div className="flex gap-1">
                      {notice.targetAudience.map(a => (
                        <span key={a} className="px-1.5 py-0.5 bg-muted rounded text-xs capitalize">{a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {isAdmin && (
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => toast.info("Edit notice")} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground transition-colors"><Edit2 size={14} /></button>
                  <button
                    onClick={() => confirmDelete({
                      title: "Remove Notice",
                      itemName: notice.title,
                      itemType: "Notice",
                      onConfirm: () => {
                        setNotices(prev => prev.filter(n => n.id !== notice.id));
                        toast.success("Notice removed");
                      }
                    })}
                    className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg text-muted-foreground hover:text-rose-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Post New Notice" size="lg"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors">Cancel</button>
            <button onClick={handleSubmit(onSubmit)} className="px-4 py-2 text-sm gradient-brand text-white rounded-xl font-semibold">Publish Notice</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Notice Title</label>
            <input {...register("title")} placeholder="Enter notice title..." className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Content</label>
            <textarea {...register("content")} rows={4} placeholder="Enter notice content..." className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            {errors.content && <p className="text-rose-500 text-xs mt-1">{errors.content.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
              <select {...register("category")} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select</option>
                {["general", "academic", "examination", "event", "urgent"].map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
              {errors.category && <p className="text-rose-500 text-xs mt-1">{errors.category.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Priority</label>
              <select {...register("priority")} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select</option>
                {["low", "medium", "high"].map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
              {errors.priority && <p className="text-rose-500 text-xs mt-1">{errors.priority.message}</p>}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
