import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Mail, Phone, MessageSquare, Send, FileQuestion } from "lucide-react";
import { toast } from "sonner";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS_DATA: Record<string, FAQItem[]> = {
  "faq": [
    { question: "How do I reset my account credentials?", answer: "Go to the login screen and click 'Forgot Password'. Input your registered institutional email ID, and our security systems will email you a reset link." },
    { question: "Where do I track my children's grades?", answer: "Log in to the Parent dashboard, choose the 'Academic Progress' card, and select the semester term to review GPA cards and attendance transcripts." }
  ],
  "student-support": [
    { question: "Whom should I contact for exam room mismatches?", answer: "Contact the Controller of Examinations Desk at ext. 402 or raise a support ticket under 'Student Support' categories immediately." },
    { question: "How can I register academic elective modifications?", answer: "Selection is audited within 14 calendar days of batch start. Go to course management in the student portal to select your preferred classes." }
  ],
  "technical-support": [
    { question: "Why is my biometric smart card not reading?", answer: "Clean the card contact chips or visit the IT Desk Room 302 to verify if database sync issues have restricted your access rules." },
    { question: "Can I download study materials offline?", answer: "Yes, click the download icon next to files uploaded on the teacher courses lists to save PDFs directly on your local device." }
  ],
  "account-assistance": [
    { question: "I got billed twice for tuition fees, how do I get a refund?", answer: "Submit transaction receipts, bank statements, and invoice IDs using the 'Account Assistance' support form. Refunds are processed within 3 bank days." },
    { question: "Are installment plans open for hostel charges?", answer: "Yes, submit income proofs and request approval from the administrative warden's desk to split hostel charges into 2 payouts." }
  ]
};

export default function HelpCenterResource() {
  const { tab } = useParams<{ tab: string }>();
  const activeTab = tab || "faq";

  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Technical");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tabs = [
    { id: "faq", label: "General FAQs" },
    { id: "student-support", label: "Student Support" },
    { id: "technical-support", label: "Technical Support" },
    { id: "account-assistance", label: "Account Assistance" },
    { id: "contact-support", label: "Contact Support" }
  ];

  const currentFaqList = FAQS_DATA[activeTab] || [];
  
  const filteredFaqs = currentFaqList.filter(f => 
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Support ticket logged! Reference code: TKT-2026-" + Math.floor(Math.random() * 9000 + 1000));
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 gradient-brand text-white shadow-lg">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            Support Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display leading-tight mb-2">
            Help Center & Direct Support
          </h1>
          <p className="text-white/80 text-xs sm:text-sm">
            Find immediate answers to technical credentials, class registers, billing options, or create an official support ticket.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide px-3 mb-2">Support Topics</p>
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-1 lg:gap-1.5">
            {tabs.map((t) => {
              const isActive = activeTab === t.id;
              return (
                <Link
                  key={t.id}
                  to={`/resources/help-center/${t.id}`}
                  className={`flex-shrink-0 text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    isActive
                      ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                      : "bg-card border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab !== "contact-support" ? (
            <div className="space-y-4 text-left">
              {/* Search filter widget */}
              <div className="bg-card border border-border rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <FileQuestion className="w-4.5 h-4.5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search FAQ topics..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-xs text-foreground focus:outline-none placeholder-muted-foreground"
                />
              </div>

              {/* Accordion List */}
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
                        <p className="text-[11px] text-muted-foreground leading-relaxed mt-3 pt-3 border-t border-border/50">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
                
                {filteredFaqs.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground bg-card border border-border rounded-2xl">
                    No FAQs match your search query.
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Contact Support Form Widget */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="md:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
                <div>
                  <h3 className="font-bold text-foreground text-xs uppercase tracking-wide text-muted-foreground">Submit a Ticket</h3>
                  <p className="text-[11px] text-muted-foreground">Fill out this secure form to notify administrators immediately.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-muted-foreground uppercase">Full Name</label>
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
                      <label className="block text-[10px] font-bold text-muted-foreground uppercase">Email Address</label>
                      <input
                        type="email"
                        placeholder="name@campus.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase">Ticket Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                    >
                      <option value="Technical">Technical Portal Login</option>
                      <option value="Billing">Fee Invoices / Payments</option>
                      <option value="Academics">Exam Seating / Results</option>
                      <option value="Library">Book Checkouts / Overdue Fines</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase">Detailed Message</label>
                    <textarea
                      rows={4}
                      placeholder="Explain your technical query in detail..."
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
                        Logging ticket...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" /> Submit Support Ticket
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Direct Help Desk Details */}
              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4 text-xs text-muted-foreground">
                <h4 className="font-bold text-foreground">Direct Desk Hubs</h4>
                <p className="flex items-center gap-2"><Mail className="w-4.5 h-4.5 text-primary shrink-0" /> support@campuslink.com</p>
                <p className="flex items-center gap-2"><Phone className="w-4.5 h-4.5 text-primary shrink-0" /> +91 98000 00001</p>
                <p className="flex items-center gap-2"><MessageSquare className="w-4.5 h-4.5 text-primary shrink-0" /> Live Chat open 9AM - 6PM</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
