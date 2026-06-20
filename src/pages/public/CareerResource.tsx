import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Compass, Briefcase, FileText, ChevronRight, CheckCircle2, Sparkles, BookOpen, AlertCircle } from "lucide-react";

export default function CareerResource() {
  const { tab } = useParams<{ tab: string }>();
  const activeTab = tab || "career-counseling";

  // Resume Checker State
  const [hasGithub, setHasGithub] = useState(false);
  const [hasLinkedIn, setHasLinkedIn] = useState(false);
  const [skillsCount, setSkillsCount] = useState("3");
  const [projectsCount, setProjectsCount] = useState("1");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const tabs = [
    { id: "career-counseling", label: "Career Counseling" },
    { id: "internships", label: "Internships" },
    { id: "resume-builder", label: "Resume Builder" },
    { id: "interview-preparation", label: "Interview Prep" },
    { id: "job-placement-support", label: "Placement Support" }
  ];

  const handleCheckResume = (e: React.FormEvent) => {
    e.preventDefault();
    let computedScore = 30; // base score
    const suggestionsList: string[] = [];

    if (hasGithub) computedScore += 15;
    else suggestionsList.push("Add a link to your active GitHub profile.");

    if (hasLinkedIn) computedScore += 15;
    else suggestionsList.push("Provide your professional LinkedIn URL.");

    const skills = parseInt(skillsCount) || 0;
    if (skills >= 5) computedScore += 20;
    else {
      computedScore += skills * 3;
      suggestionsList.push("List at least 5 core technical skills or frameworks.");
    }

    const projects = parseInt(projectsCount) || 0;
    if (projects >= 3) computedScore += 20;
    else {
      computedScore += projects * 6;
      suggestionsList.push("Add at least 3 software development projects with detailed descriptions.");
    }

    setScore(computedScore);
    setSuggestions(suggestionsList);
    setChecked(true);
  };

  return (
    <div className="space-y-8">
      {/* Header banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 gradient-brand text-white shadow-lg">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            Career Readiness
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display leading-tight mb-2">
            Student Career Pathways
          </h1>
          <p className="text-white/80 text-xs sm:text-sm">
            Book counseling coordinates, look up summer internships, check resume scores, and evaluate corporate placement requirements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide px-3 mb-2">Career Steps</p>
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-1 lg:gap-1.5">
            {tabs.map((t) => {
              const isActive = activeTab === t.id;
              return (
                <Link
                  key={t.id}
                  to={`/resources/career/${t.id}`}
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
              <Compass className="w-4.5 h-4.5 text-teal-500" />
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            
            {activeTab === "career-counseling" && (
              <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                <p>CampusLink provides direct access to dedicated career advisors. Schedule academic meetings to structure your study paths:</p>
                <ul className="list-disc pl-5 space-y-1.5 font-medium text-foreground">
                  <li><strong>Faculty Advisor Guidance:</strong> One-on-one sessions to align elective choices with target career tracks.</li>
                  <li><strong>Placement Mock Audits:</strong> Evaluate weak nodes, schedule tests, and get recommendations.</li>
                </ul>
              </div>
            )}

            {activeTab === "internships" && (
              <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                <p>Find corporate internship offers compiled under administrative placements boards:</p>
                <ul className="list-disc pl-5 space-y-1.5 font-medium text-foreground">
                  <li><strong>Summer Internships:</strong> 2-month summer programs at tech labs and corporate consulting chambers.</li>
                  <li><strong>Credit-Bearing Co-ops:</strong> Semester-long placements giving 6 academic course credits on approvals.</li>
                </ul>
              </div>
            )}

            {activeTab === "resume-builder" && (
              <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                <p>Build professional resumes utilizing our approved single-page LaTeX templates:</p>
                <ul className="list-disc pl-5 space-y-1.5 font-medium text-foreground">
                  <li><strong>Single-Page Guidelines:</strong> Focus on core DSA skills, project lists, and internships without wrapping lines.</li>
                  <li><strong>ATS Optimization:</strong> Format resumes using clean headers that server scanners parse accurately.</li>
                </ul>
              </div>
            )}

            {activeTab === "interview-preparation" && (
              <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                <p>Preparation modules to help candidates pass rigorous screening rounds:</p>
                <ul className="list-disc pl-5 space-y-1.5 font-medium text-foreground">
                  <li><strong>DSA Practice Sheets:</strong> Over 150 curated arrays, trees, hashing, and dynamic programming queries.</li>
                  <li><strong>System Design Circles:</strong> Sessions covering network caching, load balancer limits, and scaling.</li>
                </ul>
              </div>
            )}

            {activeTab === "job-placement-support" && (
              <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                <p>Complete liaison support during official campus placements:</p>
                <ul className="list-disc pl-5 space-y-1.5 font-medium text-foreground">
                  <li><strong>Placement Audits:</strong> Pre-screen eligible candidates and manage recruitment spreadsheets.</li>
                  <li><strong>Mock Interviews:</strong> Connect with alumni working at Google, Microsoft, and Amazon for trial runs.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Interactive Resume Checker widget */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="md:col-span-1 bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-foreground text-xs flex items-center gap-1.5 pb-2 border-b border-border">
                <FileText className="w-4 h-4 text-teal-500" /> Resume Checker
              </h3>
              
              <form onSubmit={handleCheckResume} className="space-y-3.5 text-xs">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase">Social Links Included</label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-foreground select-none">
                    <input
                      type="checkbox"
                      checked={hasGithub}
                      onChange={(e) => setHasGithub(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary w-3.5 h-3.5"
                    />
                    <span>GitHub Profile Link</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-foreground select-none">
                    <input
                      type="checkbox"
                      checked={hasLinkedIn}
                      onChange={(e) => setHasLinkedIn(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary w-3.5 h-3.5"
                    />
                    <span>LinkedIn Profile Link</span>
                  </label>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase">Number of Key Skills Listed</label>
                  <select
                    value={skillsCount}
                    onChange={(e) => setSkillsCount(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  >
                    <option value="1">1 - 2 Skills</option>
                    <option value="3">3 - 4 Skills</option>
                    <option value="5">5 or more Skills</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase">Number of Software Projects</label>
                  <select
                    value={projectsCount}
                    onChange={(e) => setProjectsCount(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  >
                    <option value="0">None</option>
                    <option value="1">1 Project</option>
                    <option value="2">2 Projects</option>
                    <option value="3">3 or more Projects</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-white font-bold gradient-brand hover:opacity-90 transition-opacity"
                >
                  Analyze Resume Metrics
                </button>
              </form>
            </div>

            {/* Checker results panel */}
            <div className="md:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div className="space-y-4 text-xs">
                <h4 className="font-bold text-foreground pb-2 border-b border-border flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-500" /> Resume Audit Score
                </h4>
                {checked ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center justify-center text-center space-y-2 p-4 bg-muted/30 border border-border rounded-xl">
                      <span className="font-bold text-foreground uppercase tracking-wider text-[10px]">Score</span>
                      <div className="text-3xl font-black text-primary font-display">{score}%</div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        score >= 80 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" :
                        score >= 60 ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400" :
                        "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400"
                      }`}>{score >= 80 ? "Excellent" : score >= 60 ? "Fair" : "Needs Review"}</span>
                    </div>

                    <div className="sm:col-span-2 space-y-2">
                      <p className="font-bold text-foreground text-xs flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5 text-primary shrink-0" /> Improvement Suggestions</p>
                      {suggestions.length > 0 ? (
                        <ul className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1 text-[11px] text-muted-foreground list-inside list-disc">
                          {suggestions.map((s, idx) => (
                            <li key={idx} className="leading-relaxed">{s}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold py-4">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>All parameters satisfy ATS scoring guidelines!</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    <BookOpen className="w-5 h-5 mx-auto mb-1.5" />
                    Input your resume metrics to evaluate ATS compatibility.
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
