import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Award, Calculator, CheckCircle, Clock, Info, ShieldAlert, Sparkles } from "lucide-react";

interface Scholarship {
  id: string;
  name: string;
  waiver: string;
  criteria: string;
  incomeLimit: number;
  cgpaLimit: number;
}

const SCHOLARSHIPS_LIST: Scholarship[] = [
  { id: "SCH-01", name: "National Academic Excellence Scheme", waiver: "100% Tuition Waiver", criteria: "CGPA > 9.5 and family income < ₹6,00,000", incomeLimit: 600000, cgpaLimit: 9.5 },
  { id: "SCH-02", name: "State Merit Financial Scholarship", waiver: "50% Tuition Waiver", criteria: "CGPA > 8.8 and family income < ₹4,50,000", incomeLimit: 450000, cgpaLimit: 8.8 },
  { id: "SCH-03", name: "Economically Backward Class (EBC) Aid", waiver: "25% Fee Reduction", criteria: "CGPA > 7.5 and family income < ₹3,00,000", incomeLimit: 300000, cgpaLimit: 7.5 },
  { id: "SCH-04", name: "Dean's Special Endowment Grant", waiver: "10% Fee Reduction", criteria: "CGPA > 8.0 and family income < ₹8,00,000", incomeLimit: 800000, cgpaLimit: 8.0 }
];

export default function ScholarshipsResource() {
  const { tab } = useParams<{ tab: string }>();
  const activeTab = tab || "government-scholarships";

  // Calculator State
  const [cgpa, setCgpa] = useState<string>("8.5");
  const [income, setIncome] = useState<string>("350000");
  const [calculated, setCalculated] = useState(false);
  const [qualifyingScholarships, setQualifyingScholarships] = useState<Scholarship[]>([]);

  const tabs = [
    { id: "government-scholarships", label: "Government Scholarships" },
    { id: "merit-scholarships", label: "Merit Scholarships" },
    { id: "financial-assistance", label: "Financial Assistance" },
    { id: "eligibility-criteria", label: "Eligibility Criteria" },
    { id: "application-process", label: "Application Process" }
  ];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const cgpaNum = parseFloat(cgpa) || 0;
    const incomeNum = parseFloat(income) || 0;

    const matches = SCHOLARSHIPS_LIST.filter(s => 
      cgpaNum >= s.cgpaLimit && incomeNum <= s.incomeLimit
    );
    setQualifyingScholarships(matches);
    setCalculated(true);
  };

  return (
    <div className="space-y-8">
      {/* Header banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            Financial Aids
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display leading-tight mb-2">
            Scholarships & Fee Reductions
          </h1>
          <p className="text-white/80 text-xs sm:text-sm">
            Access merit rewards, state waivers, and institutional assistance funds to offset tuition expenses.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide px-3 mb-2">Aid Options</p>
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-1 lg:gap-1.5">
            {tabs.map((t) => {
              const isActive = activeTab === t.id;
              return (
                <Link
                  key={t.id}
                  to={`/resources/scholarships/${t.id}`}
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
          
          {/* Tab Information */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4 text-left">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Award className="w-4.5 h-4.5 text-emerald-500" />
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            
            {activeTab === "government-scholarships" && (
              <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                <p>CampusLink syncs directly with State & National Scholarship Portals. Eligible students can request fee clearances under state rules:</p>
                <ul className="list-disc pl-5 space-y-1.5 font-medium text-foreground">
                  <li><strong>Post-Matric Scholarship Scheme:</strong> 100% waiver for reserved categories with income limits under ₹2.5 LPA.</li>
                  <li><strong>Central Sector Merit Scheme:</strong> Direct cash assistance for top 20th percentile scorers in high school.</li>
                  <li><strong>Minority Development Grant:</strong> Dedicated 50% tuition reduction for registered minority students.</li>
                </ul>
              </div>
            )}

            {activeTab === "merit-scholarships" && (
              <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                <p>We reward academic leaders inside CampusLink. Merit waivers are adjusted automatically on semester result calculations:</p>
                <ul className="list-disc pl-5 space-y-1.5 font-medium text-foreground">
                  <li><strong>Dean's Gold Merit Medal:</strong> 100% waiver of succeeding semester fee for candidates securing a 10.0 SGPA.</li>
                  <li><strong>Honors Division Prize:</strong> 30% tuition fee reduction for the top 5 students in each engineering department.</li>
                </ul>
              </div>
            )}

            {activeTab === "financial-assistance" && (
              <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                <p>Support structures for families facing sudden economic hard times or medical situations:</p>
                <ul className="list-disc pl-5 space-y-1.5 font-medium text-foreground">
                  <li><strong>EBC Tuition Subsidy:</strong> 25% to 50% waiver depending on physical audits and family income certificates.</li>
                  <li><strong>Emergency Tuition Installment Plans:</strong> Structured payouts split into 4 parts on administrative authorizations.</li>
                </ul>
              </div>
            )}

            {activeTab === "eligibility-criteria" && (
              <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                <p>To retain fee reductions and active grants, students must maintain clear status records:</p>
                <ul className="list-disc pl-5 space-y-1.5 font-medium text-foreground">
                  <li><strong>Academic standing:</strong> Must maintain a cumulative CGPA above 7.5 with no active course backlogs.</li>
                  <li><strong>Attendance compliance:</strong> Must preserve an aggregate class register attendance above 75%.</li>
                  <li><strong>Disciplinary standard:</strong> No active records of conduct code violations or library overdue penalties.</li>
                </ul>
              </div>
            )}

            {activeTab === "application-process" && (
              <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                <p>Step-by-step guideline to submit scholarship files:</p>
                <ol className="list-decimal pl-5 space-y-1.5 font-medium text-foreground">
                  <li>Visit the dashboard 'Billing & Fees' tab.</li>
                  <li>Click 'Apply for Fee Grant' and download the form template.</li>
                  <li>Upload verified income statements, current marks sheets, and address certificates.</li>
                  <li>The finance desk will conduct audits and apply credit adjustments to bills within 14 calendar days.</li>
                </ol>
              </div>
            )}
          </div>

          {/* Interactive Calculator Widget */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="md:col-span-1 bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-foreground text-xs flex items-center gap-1.5 pb-2 border-b border-border">
                <Calculator className="w-4 h-4 text-emerald-500" /> Eligibility Calculator
              </h3>
              
              <form onSubmit={handleCalculate} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase">Current CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    placeholder="e.g. 8.5"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase">Family Annual Income (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 350000"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-white font-bold gradient-brand hover:opacity-90 transition-opacity"
                >
                  Verify Qualifying Aids
                </button>
              </form>
            </div>

            {/* Qualifier Results Panel */}
            <div className="md:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div className="space-y-3.5 text-xs">
                <h4 className="font-bold text-foreground pb-2 border-b border-border flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-500" /> Qualified Aid Options
                </h4>
                {calculated ? (
                  <div className="space-y-2.5 max-h-[170px] overflow-y-auto pr-1">
                    {qualifyingScholarships.map((s) => (
                      <div key={s.id} className="p-3 bg-emerald-50/30 dark:bg-emerald-950/15 border border-emerald-100 dark:border-emerald-900/50 rounded-xl flex justify-between items-start gap-3">
                        <div>
                          <h5 className="font-bold text-foreground text-xs leading-tight">{s.name}</h5>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{s.criteria}</p>
                        </div>
                        <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 px-2.5 py-0.5 rounded-full shrink-0">
                          {s.waiver}
                        </span>
                      </div>
                    ))}
                    {qualifyingScholarships.length === 0 && (
                      <div className="text-center py-6 text-muted-foreground flex flex-col items-center">
                        <ShieldAlert className="w-6 h-6 text-amber-500 mb-1" />
                        <p className="font-semibold text-foreground">No matches found</p>
                        <p className="text-[10px] mt-0.5">Qualifying thresholds for our merit programs are not met.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Info className="w-5 h-5 mx-auto mb-1.5" />
                    Input your CGPA & income limits to run the calculator.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
