import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Search, Edit2, Trash2, BookOpen, History, Filter, X, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import Modal from "@/components/features/Modal";
import { store } from "@/lib/store";
import type { Book } from "@/types";
import { cn } from "@/lib/utils";

const schema = z.object({
  title: z.string().min(2, "Title required"),
  author: z.string().min(2, "Author required"),
  isbn: z.string().min(5, "ISBN required"),
  category: z.string().min(2, "Category required"),
  publisher: z.string().min(2, "Publisher required"),
  year: z.string().min(4, "Year required"),
  copies: z.string().min(1, "Copies required"),
  location: z.string().min(2, "Location required"),
});

type FormData = z.infer<typeof schema>;

const CATEGORIES = ["Computer Science", "Mathematics", "Electronics", "Software Engineering", "Networking", "Physics", "Mechanical", "General Science"];

export default function Books() {
  const [books, setBooks] = useState<Book[]>([...store.books]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Sync to store
  useEffect(() => { store.books = books; }, [books]);

  const filtered = books.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.includes(search) ||
      b.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "all" || b.category === categoryFilter;
    const matchStatus = statusFilter === "all" || (statusFilter === "available" && b.available > 0) || (statusFilter === "issued" && b.available === 0);
    return matchSearch && matchCat && matchStatus;
  });

  const openAdd = () => {
    setEditBook(null);
    reset({ title: "", author: "", isbn: "", category: "", publisher: "", year: "", copies: "", location: "" });
    setModalOpen(true);
  };

  const openEdit = (b: Book) => {
    setEditBook(b);
    reset({
      title: b.title, author: b.author, isbn: b.isbn, category: b.category,
      publisher: b.publisher, year: String(b.year), copies: String(b.copies), location: b.location
    });
    setModalOpen(true);
  };

  const onSubmit = (data: FormData) => {
    if (editBook) {
      const updated: Book = {
        ...editBook,
        ...data,
        year: Number(data.year),
        copies: Number(data.copies),
        available: Number(data.copies) - (editBook.copies - editBook.available),
      };
      setBooks(prev => prev.map(b => b.id === editBook.id ? updated : b));
      store.addHistory({ action: "edited", itemType: "Book", itemName: data.title, timestamp: new Date().toLocaleString("en-IN"), details: `Updated book details` });
      toast.success("Book updated successfully");
    } else {
      const nb: Book = {
        id: `b${Date.now()}`,
        ...data,
        year: Number(data.year),
        copies: Number(data.copies),
        available: Number(data.copies),
        status: "available",
      };
      setBooks(prev => [nb, ...prev]);
      store.addHistory({ action: "added", itemType: "Book", itemName: data.title, timestamp: new Date().toLocaleString("en-IN"), details: `Added ${data.copies} copies at ${data.location}` });
      toast.success("Book added to library");
    }
    setModalOpen(false);
    reset();
  };

  const handleDelete = (id: string) => {
    const book = books.find(b => b.id === id);
    if (book) {
      store.addHistory({ action: "deleted", itemType: "Book", itemName: book.title, timestamp: new Date().toLocaleString("en-IN"), details: `Removed from ${book.location}` });
    }
    setBooks(prev => prev.filter(b => b.id !== id));
    setDeleteId(null);
    toast.success("Book removed from library");
  };

  const clearFilters = () => { setSearch(""); setCategoryFilter("all"); setStatusFilter("all"); };
  const hasActiveFilters = search || categoryFilter !== "all" || statusFilter !== "all";

  return (
    <div>
      <PageHeader
        title="Books"
        subtitle={`${books.length} titles in library collection`}
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
              <Plus size={16} /> Add Book
            </button>
          </div>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search title, author, ISBN..."
            className="w-full pl-9 pr-9 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="relative">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="issued">Fully Issued</option>
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>

        {hasActiveFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1.5 px-3 py-2.5 text-xs text-rose-600 border border-rose-200 dark:border-rose-900 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors">
            <X size={12} /> Clear Filters
          </button>
        )}
      </div>

      {/* Results count */}
      {hasActiveFilters && (
        <p className="text-sm text-muted-foreground mb-3">Showing {filtered.length} of {books.length} books</p>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Book</th>
                <th>ISBN</th>
                <th>Category</th>
                <th>Year</th>
                <th>Copies</th>
                <th>Available</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-muted-foreground text-sm">
                    No books found matching your filters.
                    {hasActiveFilters && <button onClick={clearFilters} className="text-primary ml-1 hover:underline">Clear filters</button>}
                  </td>
                </tr>
              ) : (
                filtered.map((book, idx) => (
                  <motion.tr key={book.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/30 flex items-center justify-center flex-shrink-0">
                          <BookOpen size={14} className="text-rose-600 dark:text-rose-400" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{book.title}</p>
                          <p className="text-xs text-muted-foreground">{book.author}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="font-mono text-xs text-muted-foreground">{book.isbn}</span></td>
                    <td>
                      <span className="text-xs bg-muted px-2 py-1 rounded-lg font-medium text-foreground">{book.category}</span>
                    </td>
                    <td className="text-sm text-muted-foreground">{book.year}</td>
                    <td className="text-sm font-medium text-foreground">{book.copies}</td>
                    <td>
                      <span className={cn("font-bold text-sm", book.available > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400")}>
                        {book.available}
                      </span>
                    </td>
                    <td><span className="font-mono text-xs text-muted-foreground">{book.location}</span></td>
                    <td>
                      <div className="flex gap-1">
                        <button
                          onClick={() => openEdit(book)}
                          className="p-1.5 hover:bg-brand-50 dark:hover:bg-brand-950/30 rounded-lg text-muted-foreground hover:text-brand-600 transition-colors"
                          title="Edit book"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteId(book.id)}
                          className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg text-muted-foreground hover:text-rose-600 transition-colors"
                          title="Delete book"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); reset(); }}
        title={editBook ? "Edit Book" : "Add New Book"}
        subtitle={editBook ? `Editing: ${editBook.title}` : "Fill in the book details below"}
        size="lg"
        footer={
          <>
            <button onClick={() => { setModalOpen(false); reset(); }} className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors">Cancel</button>
            <button onClick={handleSubmit(onSubmit)} className="px-5 py-2 text-sm gradient-brand text-white rounded-xl font-semibold hover:opacity-90">
              {editBook ? "Update Book" : "Add Book"}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "title", label: "Book Title", span: true, placeholder: "Enter full book title" },
            { name: "author", label: "Author(s)", placeholder: "Author name(s)" },
            { name: "isbn", label: "ISBN", placeholder: "978-XXXXXXXXXX" },
            { name: "category", label: "Category", placeholder: "" },
            { name: "publisher", label: "Publisher", placeholder: "Publisher name" },
            { name: "year", label: "Publication Year", placeholder: "2024" },
            { name: "copies", label: "No. of Copies", placeholder: "e.g. 5" },
            { name: "location", label: "Shelf Location", placeholder: "e.g. CS-Shelf-A1" },
          ].map(f => (
            <div key={f.name} className={f.span ? "col-span-2" : ""}>
              <label className="block text-sm font-semibold text-foreground mb-1.5">{f.label}</label>
              {f.name === "category" ? (
                <select
                  {...register(f.name as keyof FormData)}
                  className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              ) : (
                <input
                  {...register(f.name as keyof FormData)}
                  placeholder={f.placeholder}
                  type={f.name === "year" || f.name === "copies" ? "number" : "text"}
                  className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/50"
                />
              )}
              {errors[f.name as keyof FormData] && (
                <p className="text-rose-500 text-xs mt-1">{errors[f.name as keyof FormData]?.message}</p>
              )}
            </div>
          ))}
        </div>
      </Modal>

      {/* Delete Confirm */}
      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Remove Book"
        subtitle="This action cannot be undone."
        size="sm"
        footer={
          <>
            <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors">Cancel</button>
            <button onClick={() => handleDelete(deleteId!)} className="px-4 py-2 text-sm bg-rose-600 text-white rounded-xl hover:bg-rose-700 font-semibold">Delete</button>
          </>
        }
      >
        <p className="text-sm text-muted-foreground">Are you sure you want to remove <strong className="text-foreground">{books.find(b => b.id === deleteId)?.title}</strong> from the library?</p>
      </Modal>

      {/* History Modal */}
      <Modal
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        title="Book History"
        subtitle="Log of all additions, edits, and deletions"
        size="lg"
      >
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {store.history.filter(h => h.itemType === "Book").length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No book history yet</p>
          ) : (
            store.history.filter(h => h.itemType === "Book").map((entry, i) => (
              <div key={entry.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors">
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
                    <p className="text-sm font-medium text-foreground truncate">{entry.itemName}</p>
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
