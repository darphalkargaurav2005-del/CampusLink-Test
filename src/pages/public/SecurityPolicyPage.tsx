import { Shield, Key, EyeOff, Server, Award } from "lucide-react";

export default function SecurityPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 text-left">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-primary/20">
          Core Architecture
        </span>
        <h1 className="text-3xl font-bold text-foreground font-display">Security & Compliance Policy</h1>
        <p className="text-muted-foreground text-sm">Last updated: June 19, 2026</p>
      </div>

      {/* Main Content */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-6 text-sm text-foreground/80 leading-relaxed">
        <p>
          At CampusLink, security is baked into every layer of our platform infrastructure. We protect academic archives, grading databases, payment gateways, and personal communications for over 50 colleges and 100,000+ active portals.
        </p>

        <h3 className="text-sm font-bold text-foreground mt-4 border-b border-border pb-2 flex items-center gap-2">
          <Key className="w-4 h-4 text-primary" /> Role-Based Access Control (RBAC)
        </h3>
        <p>
          We enforce a strict zero-trust model using role-based routing. Route guards pre-verify authentication status before rendering dashboards:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs text-muted-foreground">
          <li><strong>Admin:</strong> Complete configuration control, fee oversight, HOD course assignments, and audit trails.</li>
          <li><strong>Teacher:</strong> Marks entry limits, digital attendance rolls, and study material uploads.</li>
          <li><strong>Student:</strong> View-only grade sheets, assignment submissions, and billing checkouts.</li>
          <li><strong>Parent:</strong> Real-time child performance tracking and direct faculty contact cards.</li>
          <li><strong>Librarian:</strong> Inventory catalog updates, book reservation logs, and fine clearances.</li>
        </ul>

        <h3 className="text-sm font-bold text-foreground mt-4 border-b border-border pb-2 flex items-center gap-2">
          <EyeOff className="w-4 h-4 text-primary" /> Data Encryption Standards
        </h3>
        <p>
          Any data dispatched to CampusLink is encrypted in transit and at rest:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs text-muted-foreground">
          <li><strong>In Transit:</strong> Enforced HTTPS/TLS 1.3 tunnels protect user passwords, student transcripts, and fee records from route interceptions.</li>
          <li><strong>At Rest:</strong> Databases utilize AES-256 bit encryption keys. Passwords are salted and hashed on sign-ups to ensure database dumps reveal no clean strings.</li>
        </ul>

        <h3 className="text-sm font-bold text-foreground mt-4 border-b border-border pb-2 flex items-center gap-2">
          <Server className="w-4 h-4 text-primary" /> Infrastructure & Backups
        </h3>
        <p>
          Our web servers are hosted on certified, high-availability clouds with automated redundancies:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs text-muted-foreground">
          <li><strong>Automated Backups:</strong> Database snapshots are compiled every 24 hours and saved in independent cloud sectors to guard against hardware losses.</li>
          <li><strong>99.9% Uptime SLA:</strong> Real-time latency tracking and automatic server scaling minimize routine lag and prevent downtime during exam periods.</li>
        </ul>

        <h3 className="text-sm font-bold text-foreground mt-4 border-b border-border pb-2 flex items-center gap-2">
          <Award className="w-4 h-4 text-primary" /> Certifications & Compliance
        </h3>
        <p>
          CampusLink complies with leading security frameworks and educational regulations:
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="text-[10px] font-bold bg-muted text-muted-foreground border border-border/80 px-3 py-1.5 rounded-lg">NAAC A++ Compliant</span>
          <span className="text-[10px] font-bold bg-muted text-muted-foreground border border-border/80 px-3 py-1.5 rounded-lg">AICTE ERP Standards</span>
          <span className="text-[10px] font-bold bg-muted text-muted-foreground border border-border/80 px-3 py-1.5 rounded-lg">ISO 27001 Certified Data Sectors</span>
          <span className="text-[10px] font-bold bg-muted text-muted-foreground border border-border/80 px-3 py-1.5 rounded-lg">GDPR Privacy Alignment</span>
        </div>
      </div>
    </div>
  );
}
