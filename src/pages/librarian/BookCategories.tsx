import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Tag, History, X, Check } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import Modal from "@/components/features/Modal";
import { store } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useDeleteConfirm } from "@/contexts/DeleteConfirmContext";

const COLOR_OPTIONS = [
  "#4f46e5", "#8b5cf6", "#0ea5e9", "#10b981", "#f59e0b",
  "#f43f5e", "#6b7280", "#14b8a6", "#ec4899", "#84cc16"
];

interface Category {
  id: string;
  name: string;
  count: number;
  color: string;
}

export default function BookCategories() {
  const [categories, setCategories] = useState<Category[]>([...store.bookCategories]);
  const [modalOpen, setModalOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", color: "#4f46e5" });
  const [formError, setFormError] = useState("");
  const { confirmDelete } = useDeleteConfirm();

  useEffect(() => { store.bookCategories = categories; }, [categories]);

  const openAdd = () => {
    setEditCat(null);
    setFormData({ name: "", color: "#4f46e5" });
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditCat(cat);
    setFormData({ name: cat.name, color: cat.color });
    setFormError("");
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) { setFormError("Category name is required"); return; }
    if (formData.name.trim().length < 2) { setFormError("Name must be at least 2 characters"); return; }
    const exists = categories.some(c => c.name.toLowerCase() === formData.name.trim().toLowerCase() && c.id !== editCat?.id);
    if (exists) { setFormError("This category already exists"); return; }

    if (editCat) {
      setCategories(prev => prev.map(c => c.id === editCat.id ? { ...c, name: formData.name.trim(), color: formData.color } : c));
      store.addHistory({ action: "edited", itemType: "Category", itemName: formData.name.trim(), timestamp: new Date().toLocaleString("en-IN"), details: `Updated category name and color` });
      toast.success("Category updated");
    } else {
      const newCat: Category = { id: `cat${Date.now()}`, name: formData.name.trim(), count: 0, color: formData.color };
      setCategories(prev => [...prev, newCat]);
      store.addHistory({ action: "added", itemType: "Category", itemName: formData.name.trim(), timestamp: new Date().toLocaleString("en-IN"), details: `New category created` });
      toast.success("Category added");
    }
    setModalOpen(false);
    setFormError("");
  };

  // handleDelete removed in favor of global confirmDelete

  const historyItems = store.history.filter(h => h.itemType === "Category");

  return (
    <div>
      <PageHeader
        title="Book Categories"
        subtitle={`${categories.length} categories in library`}
        action={
          <div className="flex gap-2">
            <button
              onClick={() => setHistoryOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors text-muted-foreground"
            >
              <History size={15} /> History
            </button>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Plus size={16} /> Add Category
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: cat.color + "20" }}>
                <Tag size={20} style={{ color: cat.color }} />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEdit(cat)}
                  className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-brand-600 transition-colors"
                  title="Edit category"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => confirmDelete({
                    title: "Remove Category",
                    itemName: cat.name,
                    itemType: "Category",
                    onConfirm: () => {
                      setCategories(prev => prev.filter(c => c.id !== cat.id));
                      toast.success("Category removed");
                    }
                  })}
                  className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg text-muted-foreground hover:text-rose-600 transition-colors"
                  title="Delete category"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1.5">{cat.name}</h3>
            <p style={{ color: cat.color }} className="text-3xl font-bold font-display">{cat.count}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Books in this category</p>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setFormError(""); }}
        title={editCat ? "Edit Category" : "Add Category"}
        subtitle={editCat ? `Editing: ${editCat.name}` : "Create a new book category"}
        size="sm"
        footer={
          <>
            <button onClick={() => { setModalOpen(false); setFormError(""); }} className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-5 py-2 text-sm gradient-brand text-white rounded-xl font-semibold hover:opacity-90">
              {editCat ? "Update" : "Add Category"}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Category Name</label>
            <input
              value={formData.name}
              onChange={e => { setFormData(p => ({ ...p, name: e.target.value })); setFormError(""); }}
              placeholder="e.g. Artificial Intelligence"
              className={cn("w-full px-3 py-2.5 text-sm bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/50 transition-all", formError ? "border-rose-500 focus:ring-rose-500/30" : "border-border")}
            />
            {formError && <p className="text-rose-500 text-xs mt-1.5">{formError}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Color</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map(color => (
                <button
                  key={color}
                  onClick={() => setFormData(p => ({ ...p, color }))}
                  className={cn("w-8 h-8 rounded-lg transition-all border-2", formData.color === color ? "border-foreground scale-110 shadow-md" : "border-transparent hover:scale-105")}
                  style={{ backgroundColor: color }}
                  title={color}
                >
                  {formData.color === color && <Check size={14} className="text-white m-auto" />}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: formData.color + "20" }}>
              <Tag size={18} style={{ color: formData.color }} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{formData.name || "Category Name"}</p>
              <p className="text-xs text-muted-foreground">Preview</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Local Delete Confirm Modal removed */}

      {/* History Modal */}
      <Modal
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        title="Category History"
        subtitle="Log of all category changes"
        size="md"
      >
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {historyItems.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No category history yet</p>
          ) : (
            historyItems.map(entry => (
              <div key={entry.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted/40">
                <div className={cn("w-2 h-2 mt-1.5 rounded-full flex-shrink-0", {
                  "bg-emerald-500": entry.action === "added",
                  "bg-rose-500": entry.action === "deleted",
                  "bg-amber-500": entry.action === "edited",
                })} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={cn("text-xs font-bold uppercase px-1.5 py-0.5 rounded", {
                      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400": entry.action === "added",
                      "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400": entry.action === "deleted",
                      "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400": entry.action === "edited",
                    })}>{entry.action}</span>
                    <p className="text-sm font-medium text-foreground">{entry.itemName}</p>
                  </div>
                  {entry.details && <p className="text-xs text-muted-foreground">{entry.details}</p>}
                  <p className="text-xs text-muted-foreground mt-0.5">{entry.timestamp}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
}
