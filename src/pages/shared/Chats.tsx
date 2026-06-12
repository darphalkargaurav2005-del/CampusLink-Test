import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Search } from "lucide-react";
import PageHeader from "@/components/features/PageHeader";
import { MOCK_MESSAGES } from "@/constants/mockData";
import { useAuth } from "@/contexts/AuthContext";
import type { Message } from "@/types";
import { cn } from "@/lib/utils";

const CONTACTS = [
  { id: "admin", name: "Admin Office", role: "admin", avatar: "A", online: true },
  { id: "t1", name: "Dr. Anand Kumar", role: "teacher", avatar: "A", online: true },
  { id: "t5", name: "Mr. Kartik Verma", role: "teacher", avatar: "K", online: false },
  { id: "s1", name: "Aisha Sharma", role: "student", avatar: "A", online: true },
  { id: "lib1", name: "Mrs. Kavitha Menon", role: "librarian", avatar: "K", online: false },
];

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-violet-500",
  teacher: "bg-sky-500",
  student: "bg-emerald-500",
  parent: "bg-amber-500",
  librarian: "bg-rose-500",
};

export default function Chats() {
  const { user } = useAuth();
  const [selectedContact, setSelectedContact] = useState(CONTACTS[0]);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedContact]);

  const convoMessages = messages.filter(m =>
    (m.senderId === user?.id && m.receiverId === selectedContact.id) ||
    (m.senderId === selectedContact.id && m.receiverId === user?.id)
  );

  const sendMsg = () => {
    if (!input.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      senderId: user?.id ?? "",
      senderName: user?.name ?? "",
      senderRole: user?.role ?? "student",
      receiverId: selectedContact.id,
      receiverName: selectedContact.name,
      content: input.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    setMessages(prev => [...prev, msg]);
    setInput("");
  };

  return (
    <div>
      <PageHeader title="Chats" subtitle="Direct messaging with staff and students" />

      <div className="flex bg-card border border-border rounded-xl overflow-hidden shadow-card" style={{ height: "calc(100vh - 200px)", minHeight: "500px" }}>
        {/* Sidebar */}
        <div className="w-72 border-r border-border flex flex-col">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Search..." className="w-full pl-8 pr-3 py-2 text-sm bg-muted rounded-lg border-0 focus:outline-none" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {CONTACTS.map(contact => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={cn("w-full flex items-center gap-3 px-3 py-3 hover:bg-muted/50 transition-colors text-left", selectedContact.id === contact.id && "bg-muted")}
              >
                <div className="relative">
                  <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm", ROLE_COLORS[contact.role])}>
                    {contact.avatar}
                  </div>
                  {contact.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-card" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{contact.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{contact.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm", ROLE_COLORS[selectedContact.role])}>
              {selectedContact.avatar}
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">{selectedContact.name}</p>
              <p className="text-xs text-muted-foreground">
                {selectedContact.online ? <span className="text-emerald-500">Online</span> : "Offline"}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {convoMessages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-sm">No messages yet. Start the conversation!</p>
              </div>
            )}
            {convoMessages.map(msg => {
              const isOwn = msg.senderId === user?.id;
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", isOwn ? "justify-end" : "justify-start")}
                >
                  <div className={cn("max-w-[65%] rounded-2xl px-4 py-2.5 text-sm", isOwn ? "gradient-brand text-white rounded-tr-none" : "bg-muted text-foreground rounded-tl-none")}>
                    <p>{msg.content}</p>
                    <p className={cn("text-[10px] mt-1", isOwn ? "text-white/60" : "text-muted-foreground")}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          <div className="p-4 border-t border-border flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") sendMsg(); }}
              placeholder={`Message ${selectedContact.name}...`}
              className="flex-1 px-4 py-2.5 text-sm bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button onClick={sendMsg} disabled={!input.trim()} className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-white hover:opacity-90 disabled:opacity-50">
              <Send size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
