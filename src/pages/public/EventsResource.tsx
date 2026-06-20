import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Calendar, Users, MapPin, CheckCircle, Clock, Presentation, Trophy } from "lucide-react";
import { toast } from "sonner";

interface CampusEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  venue: string;
  desc: string;
  attendees: number;
  registered: boolean;
}

const MOCK_EVENTS: Record<string, CampusEvent[]> = {
  "upcoming-events": [
    { id: "E-101", title: "National Technical Hackathon 2026", category: "Technical", date: "June 25-26, 2026", venue: "Seminar Block Aud-2", desc: "Build cutting-edge software products. Cash prizes for innovative cloud architecture and decentralized designs.", attendees: 184, registered: false },
    { id: "E-102", title: "Annual Cultural Symphony Fest", category: "Cultural", date: "July 10, 2026", venue: "Main Open-Air Theater", desc: "Featuring student music bands, classical dance showcases, theatrical arts, and global culinary booths.", attendees: 1200, registered: false }
  ],
  "workshops": [
    { id: "W-201", title: "Advanced React & Web Architecture", category: "Technical", date: "June 22, 2026", venue: "CS Lab-4", desc: "Learn key rendering patterns, custom hooks strategies, and state optimizations using Vite and React.", attendees: 45, registered: false },
    { id: "W-202", title: "Introduction to PyTorch & LLMs", category: "Technical", date: "June 29, 2026", venue: "AI Research Cell", desc: "Hands-on implementation of matrix vector structures, neural weights, and configuring model parameters.", attendees: 60, registered: false }
  ],
  "seminars": [
    { id: "S-301", title: "Cloud Scale & Distributed Systems", category: "Infrastructure", date: "June 23, 2026", venue: "Admin Aud-1", desc: "Guest lecture on how modern servers manage millions of concurrent user sessions and handle data syncs.", attendees: 150, registered: false },
    { id: "S-302", title: "Blockchain Consensus & Tokenomics", category: "Fintech", date: "July 02, 2026", venue: "MBA Conference Room", desc: "Review of Proof of Stake models, cryptographic ledger checks, and corporate finance interfaces.", attendees: 90, registered: false }
  ],
  "cultural-programs": [
    { id: "C-401", title: "Indie Rock Night & Solo Battle", category: "Music", date: "July 12, 2026", venue: "Campus Amphitheater", desc: "Undergraduate student music clubs face off in a battle of bands, featuring rock, pop, and blues lists.", attendees: 320, registered: false },
    { id: "C-402", title: "Inter-College Theater & Drama Fest", category: "Drama", date: "July 18, 2026", venue: "Sanskriti Hall", desc: "Classic and contemporary street plays showcasing social messages and comedy circles.", attendees: 240, registered: false }
  ],
  "sports-activities": [
    { id: "SP-501", title: "Inter-College Cricket League Finals", category: "Sports", date: "August 02, 2026", venue: "Campus Main Ground", desc: "The final match of the CampusLink trophy. Support the home squad in their championship defense.", attendees: 550, registered: false },
    { id: "SP-502", title: "Athletics Sprint & Relay Rollup", category: "Sports", date: "August 04, 2026", venue: "Athletic Tracks", desc: "100m, 400m, and 4x100m relay races. Registrations open for track and field candidates.", attendees: 120, registered: false }
  ]
};

export default function EventsResource() {
  const { tab } = useParams<{ tab: string }>();
  const activeTab = tab || "upcoming-events";

  const [events, setEvents] = useState<Record<string, CampusEvent[]>>(MOCK_EVENTS);

  const tabs = [
    { id: "upcoming-events", label: "Upcoming Events" },
    { id: "workshops", label: "Workshops" },
    { id: "seminars", label: "Seminars" },
    { id: "cultural-programs", label: "Cultural Programs" },
    { id: "sports-activities", label: "Sports Activities" }
  ];

  const currentEventsList = events[activeTab] || [];

  const handleToggleRegister = (id: string) => {
    setEvents(prev => {
      const updated = { ...prev };
      updated[activeTab] = updated[activeTab].map(evt => {
        if (evt.id !== id) return evt;
        if (evt.registered) {
          toast.info(`Cancelled registration for ${evt.title}.`);
          return { ...evt, registered: false, attendees: evt.attendees - 1 };
        } else {
          toast.success(`Successfully registered for ${evt.title}! See you there.`);
          return { ...evt, registered: true, attendees: evt.attendees + 1 };
        }
      });
      return updated;
    });
  };

  return (
    <div className="space-y-8">
      {/* Header banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 gradient-brand text-white shadow-lg">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            Campus Engagements
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display leading-tight mb-2">
            Events, Workshops & Seminars
          </h1>
          <p className="text-white/80 text-xs sm:text-sm">
            Participate in dev bootcamps, academic discussions, music fests, and athletic leagues to build capabilities outside classrooms.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide px-3 mb-2">Activities Hub</p>
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-1 lg:gap-1.5">
            {tabs.map((t) => {
              const isActive = activeTab === t.id;
              return (
                <Link
                  key={t.id}
                  to={`/resources/events/${t.id}`}
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
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentEventsList.map((evt) => (
              <div
                key={evt.id}
                className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow text-left"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {evt.category}
                    </span>
                    <span className="text-[9px] text-muted-foreground font-mono">ID: {evt.id}</span>
                  </div>
                  <h3 className="font-bold text-foreground text-xs leading-snug">{evt.title}</h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">{evt.desc}</p>
                </div>

                <div className="space-y-2.5 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2 text-[10px]">
                    <Calendar className="w-4 h-4 text-primary shrink-0" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span>{evt.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <Users className="w-4 h-4 text-primary shrink-0" />
                    <span>{evt.attendees.toLocaleString()} Registered</span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleRegister(evt.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                    evt.registered
                      ? "bg-emerald-600 border border-emerald-600 text-white dark:bg-emerald-500 dark:border-emerald-500"
                      : "bg-primary text-white hover:opacity-90"
                  }`}
                >
                  {evt.registered ? (
                    <span className="flex items-center justify-center gap-1.5"><CheckCircle className="w-4 h-4" /> Registered</span>
                  ) : (
                    "Register Now"
                  )}
                </button>
              </div>
            ))}
            
            {currentEventsList.length === 0 && (
              <div className="col-span-2 py-8 text-center text-muted-foreground bg-card border border-border rounded-2xl">
                No events schedule posted for this tab.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
