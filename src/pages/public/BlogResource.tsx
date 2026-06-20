import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Newspaper, Calendar, User, ArrowRight, BookOpen, Compass, Search } from "lucide-react";

interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
}

const MOCK_ARTICLES: Record<string, Article[]> = {
  "education-news": [
    { slug: "naac-grading-changes", title: "Understanding the New NAAC Binary Grading Matrix", category: "Regulations", date: "June 19, 2026", author: "Dr. S. K. Gupta (Dean)", excerpt: "NAAC has transitioned to a simplified binary grading format. Discover how this matches our academic tracking processes.", content: "Under the newly rolled out policies, NAAC has refactored grades into binary parameters (Accredited vs. Non-Accredited) and introduced premium benchmarks for Tier-1 research institutions. Our current database configurations and course distributions are aligned to ensure compliance. CampusLink provides full exports of course syllabus records and student attendance counts for accreditation audits." },
    { slug: "national-credit-framework", title: "National Credit Framework Implementation Plan", category: "Policies", date: "June 14, 2026", author: "Dean Office", excerpt: "How our curriculum credit allocation models are adapting to the National Credit structures.", content: "The National Credit Framework allows students to earn credits through standard theory classes, sports, hackathons, and certified internships. CampusLink's credit calculator module ensures that registrations automatically check limits and record credentials directly to transcripts." }
  ],
  "technology-updates": [
    { slug: "ai-grading-assistant", title: "Introducing AI Assistant for Automated Question Drafting", category: "AI Modules", date: "June 18, 2026", author: "Prof. Shalini Sen", excerpt: "Faculty members can now compile custom student test sheets and quizzes in 30 seconds using CampusLink AI.", content: "Our newly integrated AI LLM assistant analyzes the uploaded course PDF structures, extracts primary syllabus headings, and generates multi-choice questions with answer checks. Teachers can audit, filter, and push these questions directly to student dashboards as graded assignments, reducing preparation loops." }
  ],
  "student-success-stories": [
    { slug: "google-placement-aisha", title: "How Aisha Sharma Secured Her Google Placement Offer", category: "Placements", date: "June 15, 2026", author: "Career Liaison", excerpt: "Read Aisha's software development track preparation sheet and corporate interview loops details.", content: "Aisha Sharma (B.Tech CS, Class of 2026) shares her roadmap: 'Maintaining a 9.4 CGPA on the CampusLink grade book helped me stay eligible for preliminary filters. The DSA practice sheets and mock interview sessions hosted by alumni networks pre-verified my preparation. Focus heavily on graphs, queues, and database indexing rules.'" }
  ],
  "faculty-articles": [
    { slug: "grading-integrity-standards", title: "Academics Evaluation & Grading Integrity Standards", category: "Evaluation", date: "June 12, 2026", author: "Dr. Anand Kumar", excerpt: "Dean's column on maintaining grading fairness and automated checks across class practical evaluations.", content: "Evaluating student capabilities fairly requires granular metrics. By locking grades entry via role-based access rules and using encrypted database entries, CampusLink ensures audit transparency. Practical classes evaluate attendance registers, project file logs, and oral defense cards in real time." }
  ],
  "industry-trends": [
    { slug: "web-engineering-demands", title: "Rising Global Demand for Web Infrastructure Engineers", category: "Careers", date: "June 17, 2026", author: "Placement Cell", excerpt: "Why cloud, React, and server-side framework capabilities are sought after by hiring firms.", content: "Recruitment data indicates a 40% rise in search parameters for React, TypeScript, and Node.js developers. Our CS syllabus has integrated CS401 Web Engineering as a core elective to ensure students construct database configurations and responsive layouts, matching hiring company needs." }
  ]
};

export default function BlogResource() {
  const { tab } = useParams<{ tab: string }>();
  const activeTab = tab || "education-news";

  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const tabs = [
    { id: "education-news", label: "Education News" },
    { id: "technology-updates", label: "Technology Updates" },
    { id: "student-success-stories", label: "Success Stories" },
    { id: "faculty-articles", label: "Faculty Articles" },
    { id: "industry-trends", label: "Industry Trends" }
  ];

  const currentArticlesList = MOCK_ARTICLES[activeTab] || [];
  
  const filteredArticles = currentArticlesList.filter(art => 
    art.title.toLowerCase().includes(search.toLowerCase()) ||
    art.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    art.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 gradient-brand text-white shadow-lg">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            Institutional Blog
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display leading-tight mb-2">
            CampusLink Insights & News
          </h1>
          <p className="text-white/80 text-xs sm:text-sm">
            Read expert Dean columns, software update releases, engineering roadmap sheets, and placement records.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide px-3 mb-2">Blog Streams</p>
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-1 lg:gap-1.5">
            {tabs.map((t) => {
              const isActive = activeTab === t.id;
              return (
                <Link
                  key={t.id}
                  to={`/resources/blog/${t.id}`}
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
          {/* Search bar widget */}
          <div className="bg-card border border-border rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <Search className="w-4.5 h-4.5 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search blog files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-foreground focus:outline-none placeholder-muted-foreground"
            />
          </div>

          {/* Article grid layout */}
          <div className="space-y-4">
            {filteredArticles.map((art) => (
              <div
                key={art.slug}
                onClick={() => setSelectedArticle(art)}
                className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3.5 text-left"
              >
                <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                  <span className="bg-primary/10 text-primary font-bold px-2 py-0.5 rounded uppercase tracking-wider">{art.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {art.date}</span>
                </div>

                <h3 className="font-bold text-foreground text-xs leading-snug">{art.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{art.excerpt}</p>

                <div className="flex justify-between items-center border-t border-border/60 pt-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-primary" /> {art.author}</span>
                  <span className="text-primary font-bold flex items-center gap-1 hover:underline">Read article <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </div>
            ))}
            
            {filteredArticles.length === 0 && (
              <div className="py-8 text-center text-muted-foreground bg-card border border-border rounded-2xl">
                No articles found in this category.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-modal space-y-4 text-left max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-xs text-primary font-bold hover:underline mb-2 flex items-center gap-1"
            >
              ← Back to Article List
            </button>

            <div className="space-y-2">
              <span className="bg-primary/10 text-primary font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">{selectedArticle.category}</span>
              <h2 className="text-sm sm:text-base font-bold text-foreground leading-snug">{selectedArticle.title}</h2>
              
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground pt-1 pb-3 border-b border-border">
                <span>By {selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>
            </div>

            <p className="text-xs font-semibold text-foreground leading-relaxed bg-muted/30 p-3 rounded-xl border border-border/50">
              {selectedArticle.excerpt}
            </p>

            <div className="text-xs text-muted-foreground leading-relaxed space-y-3.5 pt-2">
              {selectedArticle.content.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              <p>CampusLink maintains historical article sheets to catalog academic and technology updates. Subscribe to monthly newsletter alerts via your dashboard profile settings card.</p>
            </div>

            <div className="flex justify-end pt-4 border-t border-border mt-6">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 text-xs font-semibold bg-primary text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
