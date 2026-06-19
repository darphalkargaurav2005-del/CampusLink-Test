import { useState } from "react";
import { DollarSign, CheckCircle, Clock, AlertCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Invoice {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
}

const INITIAL_INVOICES: Invoice[] = [
  { id: "INV-2026-001", name: "Even Sem Tuition Fee", amount: 45000, dueDate: "June 30, 2026", status: "Pending" },
  { id: "INV-2026-002", name: "Hostel & Mess Charges", amount: 24000, dueDate: "July 05, 2026", status: "Pending" },
  { id: "INV-2026-003", name: "Library & Lab Deposits", amount: 5000, dueDate: "May 10, 2026", status: "Paid" },
  { id: "INV-2026-004", name: "Annual Sports Gymkhana", amount: 1500, dueDate: "April 15, 2026", status: "Paid" },
  { id: "INV-2026-005", name: "Exam Fee (Backlogs)", amount: 2000, dueDate: "June 10, 2026", status: "Overdue" }
];

export default function FeesFeature() {
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [payingInvoice, setPayingInvoice] = useState<Invoice | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const simulatePayment = (invoice: Invoice) => {
    setPayingInvoice(invoice);
  };

  const confirmPayment = () => {
    if (!payingInvoice) return;
    setIsProcessing(true);
    
    setTimeout(() => {
      setInvoices(prev => 
        prev.map(inv => inv.id === payingInvoice.id ? { ...inv, status: "Paid" } : inv)
      );
      toast.success(`Payment of ₹${payingInvoice.amount.toLocaleString()} for ${payingInvoice.name} simulated successfully!`);
      setIsProcessing(false);
      setPayingInvoice(null);
    }, 2000);
  };

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-violet-600 to-indigo-700 text-white shadow-lg">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Finance & Billing
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display leading-tight mb-4">
            Fee Management & Billing
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            Configure installment timelines, dispatch automated reminders, process digital checkouts securely, and track receipts and audit logs.
          </p>
        </div>
      </div>

      {/* Invoice Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Invoice List */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Pending & Historic Bills</h2>
            <p className="text-xs text-muted-foreground">Review institutional fee schedules. Click "Pay Fees" to simulate transaction checkouts.</p>
          </div>

          <div className="space-y-3.5">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/30 border border-border rounded-xl gap-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-primary font-bold">{inv.id}</span>
                  <h4 className="font-bold text-foreground text-xs">{inv.name}</h4>
                  <p className="text-[10px] text-muted-foreground">Due Date: {inv.dueDate}</p>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-bold text-foreground">₹{inv.amount.toLocaleString()}</p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      inv.status === "Paid"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                        : inv.status === "Pending"
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400"
                    }`}>
                      {inv.status}
                    </span>
                  </div>

                  {inv.status !== "Paid" && (
                    <button
                      onClick={() => simulatePayment(inv)}
                      className="px-3.5 py-2 text-xs font-bold text-white gradient-brand rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Pay Fees
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Overdue alert */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-rose-500 font-bold text-xs pb-1">
              <AlertCircle className="w-4.5 h-4.5" />
              <span>Overdue Invoice Alerts</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Automated notifications are pushed to student profiles and parents when deadlines pass to prevent fine aggregates.
            </p>
            {invoices.filter(i => i.status === "Overdue").map(i => (
              <div key={i.id} className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-rose-800 dark:text-rose-400">{i.name}</span>
                <span className="font-bold text-rose-600">₹{i.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Secure Payment Card */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
            <h4 className="font-bold text-foreground text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> Multi-Gateway Support
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              CampusLink accommodates multiple gateways including UPI, NetBanking, Credit Cards, and Institute Wallets. Fully PCI-DSS compliant.
            </p>
          </div>
        </div>

      </div>

      {/* Simulator Modal */}
      {payingInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl max-w-sm w-full p-6 shadow-modal space-y-5">
            <div>
              <h3 className="text-sm font-bold text-foreground">Secure Checkout Simulation</h3>
              <p className="text-xs text-muted-foreground">Simulate bill payment via CampusLink mock gateway.</p>
            </div>

            <div className="p-4 bg-muted/40 rounded-xl border border-border space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wide">{payingInvoice.id}</p>
              <h4 className="font-bold text-foreground text-xs">{payingInvoice.name}</h4>
              <p className="text-lg font-bold text-primary font-display mt-2">₹{payingInvoice.amount.toLocaleString()}</p>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-border">
              <button
                disabled={isProcessing}
                onClick={() => setPayingInvoice(null)}
                className="px-4 py-2 text-xs font-semibold border border-border rounded-xl hover:bg-muted transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={isProcessing}
                onClick={confirmPayment}
                className="px-5 py-2 text-xs font-semibold text-white gradient-brand rounded-xl hover:opacity-90 flex items-center gap-1.5"
              >
                {isProcessing ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Sim Payout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
