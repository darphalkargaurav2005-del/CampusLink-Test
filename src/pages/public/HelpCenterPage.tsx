import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Mail, Phone, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

interface FAQItem {
  question: string;
  answer: string;
  category: "Accounts" | "Portals" | "Library";
}

const FAQS: FAQItem[] = [
  { question: "How do I access my student/teacher dashboard?", answer: "Once registered by your institutional administrator, you can log in using your registered college email and the default password sent to you. You can update your password in the dashboard settings.", category: "Portals" },
  { question: "What is the procedure for library book checkouts?", answer: "Look up books in the catalog, note the shelf coordinates, and visit the librarian checkout desk. Your issued books will instantly log on your student dashboard under 'My Books' with due dates.", category: "Library" },
  { question: "How are fee payment transactions handled?", answer: "Transactions are processed securely through our integrated checkout screen. Once paid, invoices change status from pending to paid and a receipts log is created on the billing profile.", category: "Accounts" },
  { question: "Can parents contact teachers directly through the portal?", answer: "Yes, parents have a dedicated contact tab containing faculty emails and the ability to trigger direct chat messages with course coordinators.", category: "Portals" }
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  
  // Support Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredFaqs = FAQS.filter(f => 
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Support ticket created! Our team will email you within 24 hours.");
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-primary/20">
          Support Center
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground font-display mb-2">Help Center & Support</h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">Find quick guides on dashboard setups, library issues, fee checkouts, or get in touch directly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-foreground text-sm">Frequently Asked Questions</h3>
            <input
              type="text"
              placeholder="Search help topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
            />
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between font-bold text-foreground text-xs text-left"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-primary shrink-0" /> : <ChevronDown className="w-4 h-4 text-primary shrink-0" />}
                  </button>
                  {isOpen && (
                    <p className="text-xs text-muted-foreground leading-relaxed mt-3 pt-3 border-t border-border/50">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
            {filteredFaqs.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4 bg-card border border-border rounded-2xl">
                No FAQs match your search. Try different keywords.
              </p>
            )}
          </div>
        </div>

        {/* Contact Support Form */}
        <div className="space-y-6">
          {/* Quick contact info */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3 text-xs text-muted-foreground">
            <h4 className="font-bold text-foreground mb-1">Direct Helplines</h4>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> support@campuslink.com</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +91 98000 00001</p>
            <p className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary" /> Live chat available 9am - 6pm</p>
          </div>

          {/* Form */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
            <h4 className="font-bold text-foreground text-xs">Create Support Ticket</h4>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase text-muted-foreground">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase text-muted-foreground">Email ID</label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase text-muted-foreground">Issue Description</label>
                <textarea
                  rows={4}
                  placeholder="State your queries about grades, accounts..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary resize-none text-foreground"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl text-white font-bold gradient-brand hover:opacity-90 flex items-center justify-center gap-1.5 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Submit Ticket
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
