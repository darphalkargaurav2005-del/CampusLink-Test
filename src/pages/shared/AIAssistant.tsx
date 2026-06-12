import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, Sparkles, RefreshCw } from "lucide-react";
import PageHeader from "@/components/features/PageHeader";
import type { UserRole } from "@/types";
import { cn } from "@/lib/utils";

interface Props { role: UserRole; }

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AI_PERSONAS: Record<UserRole, { name: string; greeting: string; suggestions: string[] }> = {
  admin: {
    name: "CampusLink Admin AI",
    greeting: "Hello! I am your institutional AI assistant. I can help you with analytics, policy decisions, student insights, teacher performance analysis, and administrative reports. What would you like to explore?",
    suggestions: ["Generate monthly attendance report", "Analyze fee collection trends", "Top performing departments", "Students with low attendance alert"],
  },
  teacher: {
    name: "CampusLink Teacher AI",
    greeting: "Hello! I am your teaching assistant. I can help you generate question papers, create lesson plans, analyze student performance, generate study notes, and provide pedagogical suggestions.",
    suggestions: ["Generate question paper for Data Structures", "Create lesson plan for algorithms", "Analyze class performance", "Generate assignment ideas"],
  },
  student: {
    name: "CampusLink Study AI",
    greeting: "Hello! I am your personalized study assistant. I can help you understand concepts, create study plans, summarize topics, practice problems, and guide exam preparation.",
    suggestions: ["Explain binary trees with examples", "Create a study plan for finals", "Summarize DBMS concepts", "Practice questions for algorithms"],
  },
  parent: {
    name: "CampusLink Parent AI",
    greeting: "Hello! I am here to help you understand your child's academic progress, attendance patterns, and provide guidance on supporting their education.",
    suggestions: ["How is my child performing?", "Tips to improve attendance", "Understanding CGPA", "How to support exam preparation"],
  },
  librarian: {
    name: "CampusLink Library AI",
    greeting: "Hello! I can assist you with book recommendations, inventory management insights, overdue analysis, and library usage statistics.",
    suggestions: ["Books overdue this week", "Most borrowed books", "Low stock alert", "New book recommendations for CS dept"],
  },
};

const MOCK_RESPONSES: Record<string, string[]> = {
  default: [
    "Based on the institutional data, I can see several key insights worth highlighting. The overall student performance has improved by 8.2% compared to last semester, primarily driven by stronger engagement in Computer Science and Electronics departments.",
    "I have analyzed the current data. Here is a comprehensive summary: attendance rates are at 87% which is above the 75% threshold, fee collection stands at 78% of the target, and academic performance metrics show a positive upward trend over the last 3 months.",
    "Excellent question! Let me provide a detailed analysis. Looking at the patterns in the data, I can identify three key areas of focus: (1) Improving attendance in first-year courses, (2) Addressing fee payment delays in the Mechanical department, and (3) Leveraging high performance in Computer Science for institutional recognition.",
  ],
  "question paper": ["I have generated a comprehensive question paper for Data Structures:\n\n**Section A - Short Questions (20 marks)**\n1. Define and explain the concept of a Binary Search Tree.\n2. Write the pseudo-code for merge sort algorithm.\n3. Explain the differences between BFS and DFS traversal.\n\n**Section B - Long Questions (30 marks)**\n1. Implement a stack using linked list with all operations.\n2. Explain Dijkstra's shortest path algorithm with an example.\n\n**Section C - Practical (50 marks)**\n1. Design and implement a hash table with collision handling.\n\nTime: 3 hours | Max Marks: 100"],
  "study plan": ["Here is a personalized 4-week study plan for your upcoming exams:\n\n**Week 1**: Focus on Data Structures - Arrays, Linked Lists, Stacks, Queues (2 hours daily)\n**Week 2**: Trees and Graphs - Binary Trees, BST, BFS, DFS (2.5 hours daily)\n**Week 3**: Algorithm Design - Sorting, Searching, Dynamic Programming (3 hours daily)\n**Week 4**: Revision and Mock Tests (4 hours daily)\n\nPriority subjects based on your performance: DBMS (needs attention), Engineering Math (on track), Data Structures (strong)."],
};

export default function AIAssistant({ role }: Props) {
  const persona = AI_PERSONAS[role];
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", role: "assistant", content: persona.greeting, timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();
    for (const [key, responses] of Object.entries(MOCK_RESPONSES)) {
      if (key !== "default" && lower.includes(key)) {
        return responses[0];
      }
    }
    const defaults = MOCK_RESPONSES.default;
    return defaults[Math.floor(Math.random() * defaults.length)];
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: content.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: getResponse(content), timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <PageHeader
        title={persona.name}
        subtitle="Powered by CampusLink AI — your intelligent campus assistant"
        action={
          <button onClick={() => setMessages([{ id: "0", role: "assistant", content: persona.greeting, timestamp: new Date() }])} className="flex items-center gap-2 px-3 py-2.5 border border-border rounded-xl text-sm hover:bg-muted transition-colors">
            <RefreshCw size={15} /> Clear
          </button>
        }
      />

      <div className="flex flex-col flex-1 bg-card border border-border rounded-xl overflow-hidden shadow-card">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              <div className={cn("max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap", {
                "gradient-brand text-white rounded-tr-none": msg.role === "user",
                "bg-muted text-foreground rounded-tl-none": msg.role === "assistant",
              })}>
                {msg.content}
                <p className={cn("text-[10px] mt-1.5", msg.role === "user" ? "text-white/60" : "text-muted-foreground")}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex gap-1.5 items-center h-5">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-2 h-2 bg-muted-foreground/40 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-border">
          {persona.suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => sendMessage(s)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors border border-border"
            >
              <Sparkles size={11} className="text-brand-500" /> {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder="Ask me anything about your campus..."
              className="flex-1 px-4 py-3 text-sm bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              disabled={loading}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="w-11 h-11 gradient-brand rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
