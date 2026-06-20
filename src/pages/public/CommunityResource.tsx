import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Users2, Send, MessageSquare, Shield, Clock, HelpCircle, FileText } from "lucide-react";
import { toast } from "sonner";

interface ForumPost {
  id: string;
  author: string;
  role: string;
  time: string;
  title: string;
  likes: number;
  replies: number;
}

const INITIAL_POSTS: Record<string, ForumPost[]> = {
  "student-discussions": [
    { id: "P-1", author: "Aisha Sharma", role: "Student", time: "2 hours ago", title: "Recommendations on choosing Web Engineering vs. Data Science electives?", likes: 14, replies: 6 },
    { id: "P-2", author: "Rohan Verma", role: "Student", time: "5 hours ago", title: "Hackathon 2026 team registration details: look up candidates skilled in Node.js.", likes: 8, replies: 3 }
  ],
  "teacher-forum": [
    { id: "P-3", author: "Dr. Anand Kumar", role: "Professor", time: "1 day ago", title: "Best practices on configuring AI assistant parameters to generate compiler quizzes?", likes: 22, replies: 5 },
    { id: "P-4", author: "Prof. Meera Iyer", role: "Faculty", time: "2 days ago", title: "Rescheduling mid-term practical evaluations - review locked Excel routines.", likes: 12, replies: 2 }
  ],
  "parent-forum": [
    { id: "P-5", author: "Rajesh Sharma", role: "Parent", time: "3 hours ago", title: "Highly recommend reading the 'Academic Progress' analytics graph cards. Very detailed.", likes: 18, replies: 4 },
    { id: "P-6", author: "Kiran Patel", role: "Parent", time: "1 day ago", title: "Direct messaging response thresholds for course teachers during exams?", likes: 5, replies: 1 }
  ],
  "academic-queries": [
    { id: "P-7", author: "Priya Patel", role: "Student", time: "4 hours ago", title: "Stuck on network analysis transfer equations. Can anyone share practice solutions?", likes: 6, replies: 2 },
    { id: "P-8", author: "Dr. Rajesh Sengupta", role: "Professor", time: "6 hours ago", title: "Guidelines on resolving quantum mechanics equations published on notes tab.", likes: 15, replies: 4 }
  ],
  "project-collaboration": [
    { id: "P-9", author: "Sneha Reddy", role: "Student", time: "1 hour ago", title: "Forming group for B.Tech final project. Need candidates matching cloud databases skills.", likes: 10, replies: 5 }
  ]
};

export default function CommunityResource() {
  const { tab } = useParams<{ tab: string }>();
  const activeTab = tab || "student-discussions";

  const [posts, setPosts] = useState<Record<string, ForumPost[]>>(INITIAL_POSTS);
  
  // Post input state
  const [newTitle, setNewTitle] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const tabs = [
    { id: "student-discussions", label: "Student Board" },
    { id: "teacher-forum", label: "Teacher Forum" },
    { id: "parent-forum", label: "Parent Forum" },
    { id: "academic-queries", label: "Academic Queries" },
    { id: "project-collaboration", label: "Project Collab" }
  ];

  const currentPosts = posts[activeTab] || [];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsPosting(true);
    setTimeout(() => {
      const newPost: ForumPost = {
        id: "P-" + Date.now(),
        author: "Anonymous Guest",
        role: "Guest Visitor",
        time: "Just now",
        title: newTitle,
        likes: 1,
        replies: 0
      };

      setPosts(prev => {
        const updated = { ...prev };
        updated[activeTab] = [newPost, ...updated[activeTab]];
        return updated;
      });

      toast.success("Query posted successfully in the community forum!");
      setNewTitle("");
      setIsPosting(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 gradient-brand text-white shadow-lg">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            Campus Forums
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display leading-tight mb-2">
            CampusLink Discussion Community
          </h1>
          <p className="text-white/80 text-xs sm:text-sm">
            Discuss mock papers, ask curriculum questions, form hackathon groups, and coordinate research topics with classmates and faculty.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide px-3 mb-2">Forum Boards</p>
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-1 lg:gap-1.5">
            {tabs.map((t) => {
              const isActive = activeTab === t.id;
              return (
                <Link
                  key={t.id}
                  to={`/resources/community/${t.id}`}
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
          {/* Post Message Widget */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4 text-left">
            <div>
              <h3 className="font-bold text-foreground text-xs uppercase tracking-wide text-muted-foreground">Start a Discussion Thread</h3>
              <p className="text-[11px] text-muted-foreground">Post questions, comments, or coordinate projects under the active forum tab.</p>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-3.5 text-xs">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type your discussion topic here..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  required
                  disabled={isPosting}
                />
                <button
                  type="submit"
                  disabled={isPosting}
                  className="px-5 py-2.5 rounded-xl text-white font-bold gradient-brand hover:opacity-90 flex items-center gap-1.5 transition-opacity disabled:opacity-50 shrink-0"
                >
                  {isPosting ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Post
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Forum Thread Listing */}
          <div className="space-y-4">
            {currentPosts.map((post) => (
              <div
                key={post.id}
                className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3.5 text-left hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-xs leading-none">{post.author}</h4>
                      <p className="text-[10px] text-primary font-semibold mt-1">{post.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3.5 h-3.5 shrink-0" /> {post.time}</span>
                </div>

                <p className="text-xs text-foreground font-semibold leading-relaxed pt-1">
                  {post.title}
                </p>

                <div className="flex gap-4 border-t border-border/60 pt-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1 hover:text-primary cursor-pointer transition-colors"><MessageSquare className="w-3.5 h-3.5" /> {post.replies} Replies</span>
                  <span className="flex items-center gap-1 hover:text-primary cursor-pointer transition-colors">👍 {post.likes} Likes</span>
                </div>
              </div>
            ))}
            
            {currentPosts.length === 0 && (
              <div className="py-8 text-center text-muted-foreground bg-card border border-border rounded-2xl">
                No discussion threads posted in this channel.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
