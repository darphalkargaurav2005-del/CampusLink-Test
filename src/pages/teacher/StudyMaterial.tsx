import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Upload, FileText, File, Presentation, Trash2, Download, Eye, Search, X } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/features/PageHeader";
import Modal from "@/components/features/Modal";
import { cn } from "@/lib/utils";
import { useDeleteConfirm } from "@/contexts/DeleteConfirmContext";

const schema = z.object({
  title: z.string().min(3, "Title required"),
  description: z.string().min(10, "Description required"),
  course: z.string().min(1, "Course required"),
  type: z.string().min(1, "Type required"),
});

interface MaterialItem {
  id: string;
  title: string;
  type: string;
  course: string;
  size: string;
  date: string;
  downloads: number;
  description?: string;
}

type FormData = z.infer<typeof schema>;

const INITIAL_MATERIALS: MaterialItem[] = [
  { id: "m1", title: "Lecture 5: Binary Search Trees", type: "Notes", course: "Data Structures", size: "2.3 MB", date: "2024-02-20", downloads: 45 },
  { id: "m2", title: "Week 3: SQL Joins and Subqueries", type: "Notes", course: "DBMS", size: "1.8 MB", date: "2024-02-18", downloads: 38 },
  { id: "m3", title: "Chapter 7: Integration Techniques", type: "PDF", course: "Engineering Math", size: "4.2 MB", date: "2024-02-15", downloads: 92 },
  { id: "m4", title: "Algorithm Visualization Slides", type: "PPT", course: "Data Structures", size: "8.7 MB", date: "2024-02-12", downloads: 62 },
  { id: "m5", title: "React Fundamentals Workshop", type: "PPT", course: "Web Development", size: "15.2 MB", date: "2024-02-10", downloads: 35 },
];

const TYPE_ICONS: Record<string, typeof FileText> = {
  Notes: FileText,
  PDF: File,
  PPT: Presentation,
};

const TYPE_COLORS: Record<string, string> = {
  Notes: "text-sky-600 bg-sky-100 dark:bg-sky-950/30 dark:text-sky-400",
  PDF: "text-rose-600 bg-rose-100 dark:bg-rose-950/30 dark:text-rose-400",
  PPT: "text-amber-600 bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400",
};

export default function StudyMaterial() {
  const [materials, setMaterials] = useState<MaterialItem[]>(INITIAL_MATERIALS);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const { confirmDelete } = useDeleteConfirm();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const filtered = materials.filter(m => {
    const matchesFilter = filter === "All" || m.type === filter;
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.course.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const onSubmit = (data: FormData) => {
    const newMaterial: MaterialItem = {
      id: `m${Date.now()}`,
      title: data.title,
      type: data.type,
      course: data.course,
      description: data.description,
      size: "1.0 MB",
      date: new Date().toISOString().split("T")[0],
      downloads: 0,
    };
    setMaterials(prev => [newMaterial, ...prev]);
    toast.success("Study material uploaded successfully");
    setModalOpen(false);
    reset();
  };

  return (
    <div>
      <PageHeader
        title="Study Material"
        subtitle="Upload and manage learning resources for students"
        action={
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90">
            <Upload size={16} /> Upload Material
          </button>
        }
      />

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search materials..."
            className="w-full pl-9 pr-9 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {["All", "Notes", "PDF", "PPT"].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={cn("px-4 py-2.5 text-xs font-medium rounded-xl border transition-colors", filter === f ? "gradient-brand text-white border-transparent" : "border-border hover:bg-muted")}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((mat, idx) => {
          const Icon = TYPE_ICONS[mat.type] || FileText;
          return (
            <motion.div
              key={mat.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="bg-card border border-border rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", TYPE_COLORS[mat.type].split(" ").slice(1).join(" "))}>
                  <Icon size={20} className={TYPE_COLORS[mat.type].split(" ")[0]} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm leading-snug">{mat.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{mat.course}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className={cn("px-2 py-0.5 rounded-full font-medium text-xs", TYPE_COLORS[mat.type])}>{mat.type}</span>
                <span>{mat.size}</span>
                <span>{mat.date}</span>
                <span className="ml-auto">{mat.downloads} downloads</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toast.info("Previewing " + mat.title)} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs border border-border rounded-lg hover:bg-muted transition-colors">
                  <Eye size={13} /> Preview
                </button>
                <button onClick={() => toast.success("Downloaded")} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs border border-border rounded-lg hover:bg-muted transition-colors">
                  <Download size={13} /> Download
                </button>
                <button
                  onClick={() => confirmDelete({
                    title: "Remove Study Material",
                    itemName: mat.title,
                    itemType: "Study Material",
                    onConfirm: () => {
                      setMaterials(prev => prev.filter(m => m.id !== mat.id));
                      toast.success("Material removed");
                    }
                  })}
                  className="p-2 border border-rose-200 dark:border-rose-900 text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Upload Study Material" size="md"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors">Cancel</button>
            <button onClick={handleSubmit(onSubmit)} className="px-4 py-2 text-sm gradient-brand text-white rounded-xl font-semibold">Upload</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
            <input {...register("title")} placeholder="Material title..." className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Course</label>
              <select {...register("course")} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select</option>
                <option value="Data Structures">Data Structures</option>
                <option value="DBMS">DBMS</option>
                <option value="Engineering Math">Engineering Math</option>
                <option value="Web Development">Web Development</option>
              </select>
              {errors.course && <p className="text-rose-500 text-xs mt-1">{errors.course.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Type</label>
              <select {...register("type")} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select</option>
                <option value="Notes">Notes</option>
                <option value="PDF">PDF</option>
                <option value="PPT">PPT</option>
              </select>
              {errors.type && <p className="text-rose-500 text-xs mt-1">{errors.type.message}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
            <textarea {...register("description")} rows={3} placeholder="Brief description..." className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            {errors.description && <p className="text-rose-500 text-xs mt-1">{errors.description.message}</p>}
          </div>
          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => toast.info("File picker would open here")}>
            <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
            <p className="text-xs text-muted-foreground/60 mt-1">PDF, PPT, DOCX up to 50MB</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
