import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BookPlus, Search, X } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import { store } from "@/lib/store";
import type { Book, BookIssue } from "@/types";
import { cn } from "@/lib/utils";

const schema = z.object({
  bookId: z.string().min(1, "Please select a book"),
  borrowerId: z.string().min(1, "Please select a borrower"),
  borrowerType: z.enum(["student", "teacher"], { required_error: "Select borrower type" }),
  dueDate: z.string().min(1, "Due date required"),
});

type FormData = z.infer<typeof schema>;

export default function IssueBooks() {
  const [books, setBooks] = useState<Book[]>([...store.books]);
  const [issuedList, setIssuedList] = useState<(BookIssue & { bookTitle: string; borrowerName: string })[]>([]);
  const [searchIssued, setSearchIssued] = useState("");
  const [, forceRender] = useState(0);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { bookId: "", borrowerId: "", borrowerType: "student", dueDate: "" },
  });

  const borrowerType = watch("borrowerType");
  const selectedBookId = watch("bookId");

  // Sync books from store
  useEffect(() => {
    setBooks([...store.books]);
  }, []);

  const availableBooks = books.filter(b => b.available > 0);
  const selectedBook = books.find(b => b.id === selectedBookId);
  const borrowers = borrowerType === "student" ? store.students : store.teachers;

  const onSubmit = (data: FormData) => {
    const book = books.find(b => b.id === data.bookId);
    const borrower = borrowers.find((b: any) => b.id === data.borrowerId);
    if (!book || book.available === 0) {
      toast.error("This book is currently not available");
      return;
    }

    // Update book availability in store and local state
    const updatedBooks = books.map(b =>
      b.id === data.bookId ? { ...b, available: b.available - 1, status: b.available - 1 === 0 ? "issued" as const : b.status } : b
    );
    setBooks(updatedBooks);
    store.books = updatedBooks;

    // Create issue record
    const issueRecord: BookIssue & { bookTitle: string; borrowerName: string } = {
      id: `bi${Date.now()}`,
      bookId: data.bookId,
      bookTitle: book.title,
      borrowerId: data.borrowerId,
      borrowerName: (borrower as any)?.name ?? "Unknown",
      borrowerType: data.borrowerType,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: data.dueDate,
      fine: 0,
      status: "issued",
    };

    store.bookIssues.unshift(issueRecord);
    setIssuedList(prev => [issueRecord, ...prev]);

    toast.success(`"${book.title}" issued to ${(borrower as any)?.name}`);
    reset({ bookId: "", borrowerId: "", borrowerType: "student", dueDate: "" });
    forceRender(n => n + 1);
  };

  const filteredIssued = issuedList.filter(i =>
    i.bookTitle.toLowerCase().includes(searchIssued.toLowerCase()) ||
    i.borrowerName.toLowerCase().includes(searchIssued.toLowerCase())
  );

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  return (
    <div>
      <PageHeader title="Issue Books" subtitle="Issue books to students and teachers" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Issue Form */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-xl p-5 shadow-card">
            <h3 className="font-semibold text-foreground text-sm font-display mb-4 flex items-center gap-2">
              <BookPlus size={16} className="text-brand-500" />
              New Book Issue
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {/* Borrower Type */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Borrower Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["student", "teacher"] as const).map(t => (
                    <label key={t} className={cn(
                      "flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium capitalize",
                      borrowerType === t ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:bg-muted"
                    )}>
                      <input {...register("borrowerType")} type="radio" value={t} className="sr-only" />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              {/* Book Select */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Select Book <span className="text-muted-foreground font-normal">({availableBooks.length} available)</span>
                </label>
                <select
                  {...register("bookId")}
                  className={cn("w-full px-3 py-2.5 text-sm bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition-all", errors.bookId ? "border-rose-500" : "border-border")}
                >
                  <option value="">Choose a book...</option>
                  {availableBooks.map(b => (
                    <option key={b.id} value={b.id}>{b.title} ({b.available} left)</option>
                  ))}
                </select>
                {errors.bookId && <p className="text-rose-500 text-xs mt-1">{errors.bookId.message}</p>}
                {selectedBook && (
                  <div className="mt-2 p-3 bg-muted/50 rounded-xl text-xs space-y-1">
                    <p><span className="text-muted-foreground">Author:</span> <span className="font-medium text-foreground">{selectedBook.author}</span></p>
                    <p><span className="text-muted-foreground">Location:</span> <span className="font-mono font-medium text-foreground">{selectedBook.location}</span></p>
                    <p>
                      <span className="text-muted-foreground">Available:</span>{" "}
                      <span className={cn("font-bold", selectedBook.available > 0 ? "text-emerald-600" : "text-rose-600")}>
                        {selectedBook.available} of {selectedBook.copies}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Borrower */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Select {borrowerType === "student" ? "Student" : "Teacher"}
                </label>
                <select
                  {...register("borrowerId")}
                  className={cn("w-full px-3 py-2.5 text-sm bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition-all", errors.borrowerId ? "border-rose-500" : "border-border")}
                >
                  <option value="">Choose {borrowerType}...</option>
                  {(borrowers as any[]).map((b: any) => (
                    <option key={b.id} value={b.id}>
                      {b.name}{b.rollNo ? ` (${b.rollNo})` : b.employeeId ? ` (${b.employeeId})` : ""}
                    </option>
                  ))}
                </select>
                {errors.borrowerId && <p className="text-rose-500 text-xs mt-1">{errors.borrowerId.message}</p>}
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Return Due Date</label>
                <input
                  {...register("dueDate")}
                  type="date"
                  min={minDate.toISOString().split("T")[0]}
                  className={cn("w-full px-3 py-2.5 text-sm bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition-all", errors.dueDate ? "border-rose-500" : "border-border")}
                />
                {errors.dueDate && <p className="text-rose-500 text-xs mt-1">{errors.dueDate.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 gradient-brand text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                <BookPlus size={16} /> Issue Book
              </button>
            </form>
          </div>
        </div>

        {/* Today's Issues */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
            <div className="p-4 border-b border-border flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h3 className="font-semibold text-foreground text-sm font-display">Today's Issues</h3>
                <p className="text-xs text-muted-foreground">{issuedList.length} books issued this session</p>
              </div>
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  value={searchIssued}
                  onChange={e => setSearchIssued(e.target.value)}
                  placeholder="Search issues..."
                  className="pl-7 pr-3 py-2 text-xs bg-muted rounded-lg focus:outline-none focus:ring-1 focus:ring-ring w-48"
                />
              </div>
            </div>

            {filteredIssued.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 gap-3">
                <BookPlus size={36} className="text-muted-foreground/20" />
                <p className="text-sm text-muted-foreground">No books issued yet today</p>
                <p className="text-xs text-muted-foreground">Use the form to issue books</p>
              </div>
            ) : (
              <div className="divide-y divide-border max-h-[480px] overflow-y-auto">
                {filteredIssued.map((issue, idx) => (
                  <motion.div key={issue.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.04 }}
                    className="flex items-center justify-between px-4 py-3.5 hover:bg-muted/30 transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground text-sm truncate">{issue.bookTitle}</p>
                      <p className="text-xs text-muted-foreground">
                        {issue.borrowerName} • <span className="capitalize">{issue.borrowerType}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">Issued: {issue.issueDate}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <span className="badge-info text-xs">Issued</span>
                      <p className="text-xs text-muted-foreground mt-1">Due: {issue.dueDate}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
