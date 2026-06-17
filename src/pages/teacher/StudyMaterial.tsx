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
  const [previewMaterial, setPreviewMaterial] = useState<MaterialItem | null>(null);
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
                <button onClick={() => setPreviewMaterial(mat)} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs border border-border rounded-lg hover:bg-muted transition-colors">
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

      <Modal
        open={!!previewMaterial}
        onClose={() => setPreviewMaterial(null)}
        title={previewMaterial ? `Document Preview - ${previewMaterial.title}` : ""}
        size="lg"
      >
        {previewMaterial && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-muted/40 border border-border/60 rounded-xl">
              <div>
                <span className={cn("px-2 py-0.5 rounded-full font-medium text-xs mr-3", TYPE_COLORS[previewMaterial.type])}>
                  {previewMaterial.type}
                </span>
                <span className="text-sm font-semibold text-foreground">{previewMaterial.course}</span>
              </div>
              <span className="text-xs text-muted-foreground">{previewMaterial.size} • {previewMaterial.date}</span>
            </div>
            
            <div className="border border-border rounded-xl bg-background p-6 h-96 overflow-y-auto font-sans shadow-inner">
              <div className="max-w-prose mx-auto space-y-4">
                <h1 className="text-xl font-bold text-foreground border-b border-border pb-3">{previewMaterial.title}</h1>
                
                {previewMaterial.type === "Notes" && (
                  <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
                    <p className="font-semibold text-foreground">1. Introduction</p>
                    <p>This document contains essential study notes on {previewMaterial.title} for {previewMaterial.course}. Make sure to review the core algorithmic properties and design trade-offs before the midterms.</p>
                    <p className="font-semibold text-foreground">2. Core Concepts</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Definitions and properties.</li>
                      <li>Complexity analysis: Time complexity O(log n) average, O(n) worst case.</li>
                      <li>Standard traversal algorithms: In-order, Pre-order, Post-order.</li>
                    </ul>
                    <p className="font-semibold text-foreground">3. Key Takeaways</p>
                    <p>Always draw out diagrams when verifying recursive structures. Keep operations balanced to ensure optimal retrieval times.</p>
                  </div>
                )}
                
                {previewMaterial.type === "PDF" && (
                  <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
                    <div className="flex justify-between items-center bg-muted/20 px-3 py-1.5 rounded-lg border border-border/40 text-xs mb-4">
                      <span>PDF Document (Page 1 of 5)</span>
                      <span className="text-primary hover:underline cursor-pointer">Go to page 2 →</span>
                    </div>
                    <p className="font-semibold text-foreground">Section 4.1: Mathematical Background & Formulations</p>
                    <p>We formulate the basic integration boundaries and show proofs for structural properties. For any continuous function f(x) over [a, b], we partition the interval to compute Riemann sums.</p>
                    <div className="p-4 bg-muted/40 rounded-lg font-mono text-xs border border-border/50 text-center my-4">
                      ∫ [a to b] f(x) dx = lim (n → ∞) Σ [i=1 to n] f(x_i*) Δx
                    </div>
                    <p>This proof forms the basis of all numerical computing algorithms used in modern software engineering libraries.</p>
                  </div>
                )}
                
                {previewMaterial.type === "PPT" && (
                  <div className="space-y-4 text-center">
                    <div className="border border-border/70 rounded-xl p-8 bg-muted/10 shadow-sm relative overflow-hidden flex flex-col justify-center items-center h-64">
                      <div className="absolute top-2 left-2 text-xs text-muted-foreground font-medium">Slide 1 of 12</div>
                      <Presentation size={36} className="text-amber-500 mb-4" />
                      <h2 className="text-lg font-bold text-foreground mb-2">{previewMaterial.title}</h2>
                      <p className="text-xs text-muted-foreground">{previewMaterial.course} Presentation</p>
                      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground font-medium">Click next below to navigate</div>
                    </div>
                    <div className="flex justify-center gap-2">
                      <button className="px-3 py-1 text-xs border border-border rounded hover:bg-muted transition-colors disabled:opacity-50" disabled>Previous</button>
                      <button className="px-3 py-1 text-xs border border-border rounded hover:bg-muted transition-colors">Next Slide</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-2.5">
              <button
                onClick={() => {
                  toast.success("Downloaded " + previewMaterial.title);
                  setPreviewMaterial(null);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm gradient-brand text-white rounded-xl font-semibold hover:opacity-90"
              >
                <Download size={14} /> Download Document
              </button>
              <button
                onClick={() => setPreviewMaterial(null)}
                className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
