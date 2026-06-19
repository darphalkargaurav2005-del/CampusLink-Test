import { useState } from "react";
import { Calendar, Users, Award, MapPin, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface CampusEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  desc: string;
  attendees: number;
  registered: boolean;
}

const INITIAL_EVENTS: CampusEvent[] = [
  { id: "EVT01", title: "National Technical Hackathon 2026", date: "June 25-26, 2026", venue: "Seminar Block Aud-2", desc: "Build state-of-the-art software solutions. Grand prizes for innovative cloud integrations and AI apps.", attendees: 184, registered: false },
  { id: "EVT02", title: "Annual Cultural Symphony Fest", date: "July 10, 2026", venue: "Main Open-Air Theater", desc: "Showcasing student dance circles, live bands, theatrical arts, and global culinary booths.", attendees: 1200, registered: false },
  { id: "EVT03", title: "Inter-College Sports Championship", date: "August 02-05, 2026", venue: "Main Athletics Ground", desc: "Represent CampusLink in cricket, football, basketball, and athletic sprints against 15+ colleges.", attendees: 430, registered: false }
];

export default function EventsPage() {
  const [events, setEvents] = useState<CampusEvent[]>(INITIAL_EVENTS);

  const handleRegister = (id: string) => {
    setEvents(prev => 
      prev.map(evt => {
        if (evt.id !== id) return evt;
        if (evt.registered) {
          toast.info(`You have cancelled registration for ${evt.title}.`);
          return { ...evt, registered: false, attendees: evt.attendees - 1 };
        } else {
          toast.success(`Registered successfully for ${evt.title}! See you there.`);
          return { ...evt, registered: true, attendees: evt.attendees + 1 };
        }
      })
    );
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-primary/20">
          Campus Life
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground font-display mb-2">Campus Events & Activities</h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">Discover upcoming hackathons, athletic events, cultural festivals, and technical workshops.</p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div key={evt.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <span className="text-[9px] bg-primary/15 text-primary font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Event ID: {evt.id}
              </span>
              <h3 className="font-bold text-foreground text-base leading-snug">{evt.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{evt.desc}</p>
            </div>

            <div className="space-y-3 border-t border-border/60 pt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary shrink-0" />
                <span>{evt.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{evt.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary shrink-0" />
                <span>{evt.attendees.toLocaleString()} Registered Attendees</span>
              </div>
            </div>

            <button
              onClick={() => handleRegister(evt.id)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors ${
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
      </div>
    </div>
  );
}
