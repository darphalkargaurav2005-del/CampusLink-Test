import { useState } from "react";
import { BookOpen, Search, BookMarked, Calendar, AlertCircle, Info } from "lucide-react";

interface Book {
  isbn: string;
  title: string;
  author: string;
  category: string;
  available: boolean;
  shelf: string;
}

const MOCK_BOOKS: Book[] = [
  { isbn: "978-0131103627", title: "The C Programming Language", author: "Brian W. Kernighan & Dennis M. Ritchie", category: "Computer Science", available: true, shelf: "CS-04" },
  { isbn: "978-0262033848", title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Computer Science", available: false, shelf: "CS-09" },
  { isbn: "978-0134685991", title: "Effective Java", author: "Joshua Bloch", category: "Computer Science", available: true, shelf: "CS-02" },
  { isbn: "978-0321573513", title: "Algorithms (4th Edition)", author: "Robert Sedgewick", category: "Computer Science", available: true, shelf: "CS-07" },
  { isbn: "978-0062316097", title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", category: "History", available: true, shelf: "H-12" },
  { isbn: "978-0199535927", title: "The Republic", author: "Plato", category: "Philosophy", available: false, shelf: "PH-03" }
];

export default function LibraryFeature() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredBooks = MOCK_BOOKS.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || 
                          b.author.toLowerCase().includes(search.toLowerCase()) ||
                          b.isbn.includes(search);
    const matchesCat = category === "All" || b.category === category;
    return matchesSearch && matchesCat;
  });

  const categories = ["All", "Computer Science", "History", "Philosophy"];

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 gradient-brand text-white shadow-lg">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Curriculum & Resources
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display leading-tight mb-4">
            Library Lifecycle & Catalog
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Manage your full library catalog, configure book collections, track reservations, monitor active checkouts, and calculate overdue fines.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">12,500+</p>
            <p className="text-xs text-muted-foreground">Total Books Cataloged</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">840</p>
            <p className="text-xs text-muted-foreground">Issued This Month</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">14</p>
            <p className="text-xs text-muted-foreground">Pending Book Requests</p>
          </div>
        </div>
      </div>

      {/* Interactive Catalog */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Interactive Book Catalog</h2>
            <p className="text-xs text-muted-foreground">Search and filter live library inventory simulations.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search title, author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground w-48"
              />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                category === cat
                  ? "bg-rose-600 border-rose-600 text-white dark:bg-rose-500 dark:border-rose-500"
                  : "bg-card border-border hover:bg-muted text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-foreground font-bold bg-muted/30">
                <th className="py-3 px-4">ISBN</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Shelf No</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((b) => (
                  <tr key={b.isbn} className="hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-rose-600 dark:text-rose-400">{b.isbn}</td>
                    <td className="py-3 px-4 font-semibold text-foreground">{b.title}</td>
                    <td className="py-3 px-4 text-muted-foreground">{b.author}</td>
                    <td className="py-3 px-4 font-mono text-muted-foreground">{b.shelf}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        b.available
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400"
                      }`}>
                        {b.available ? "Available" : "Checked Out"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    No books match your catalog search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Overview of Fines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
            <Info className="w-4 h-4 text-rose-500" /> Fine Calculation Parameters
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            CampusLink features automated fine tracking. If a book issue exceeds its duration threshold (typically 14 days), a surcharge is updated daily on the student profile.
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-muted/40 rounded-xl border border-border">
              <span className="font-semibold text-foreground">Standard fine rate</span>
              <p className="text-base font-bold text-foreground mt-1">₹5.00 / day</p>
            </div>
            <div className="p-3 bg-muted/40 rounded-xl border border-border">
              <span className="font-semibold text-foreground">Max fine cap</span>
              <p className="text-base font-bold text-foreground mt-1">₹150.00 / book</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-rose-500" /> Active Reservations & AI Cataloging
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Integrate CampusLink AI Assistant in the library portal to automatically catalog books by scanning ISBN codes, recommend subjects to readers, and pre-verify student records.
          </p>
          <div className="bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 text-xs p-3 rounded-xl border border-rose-100 dark:border-rose-900/50 flex items-center gap-2 font-medium">
            <BookMarked className="w-4 h-4" />
            <span>AI automatically catalogs 94% of newly received book inventories.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
