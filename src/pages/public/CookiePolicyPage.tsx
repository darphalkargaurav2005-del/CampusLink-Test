import { Lock, Cookie, Eye, ShieldAlert } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 text-left">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-primary/20">
          Compliance & Safety
        </span>
        <h1 className="text-3xl font-bold text-foreground font-display">Cookie Policy</h1>
        <p className="text-muted-foreground text-sm">Last updated: June 19, 2026</p>
      </div>

      {/* Main Content */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-6 text-sm text-foreground/80 leading-relaxed">
        <p>
          At CampusLink, we value student privacy, user transparency, and data compliance. This policy describes how and why we utilize cookies, web beacons, and local storage variables on our hosted ERP domains.
        </p>

        <h3 className="text-sm font-bold text-foreground mt-4 border-b border-border pb-2 flex items-center gap-2">
          <Cookie className="w-4 h-4 text-primary" /> What are Cookies & Local Storage?
        </h3>
        <p>
          Cookies are small text structures dispatched by host servers and saved on user devices. Local Storage (part of modern HTML5 web specifications) allows us to save variables locally on your web browser. This ensures pages compile rapidly and maintains user authentication states without overloading database queries on every route transition.
        </p>

        <h3 className="text-sm font-bold text-foreground mt-4 border-b border-border pb-2 flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary" /> How We Utilize Local Storage
        </h3>
        <p>
          CampusLink relies on local browser storage for critical system functions:
        </p>
        <ul className="list-disc pl-5 space-y-2.5 text-xs text-muted-foreground">
          <li><strong>Authentication & Profile:</strong> We save encrypted session tokens (`campuslink_user`) to keep you logged in to student, teacher, librarian, or parent dashboards.</li>
          <li><strong>Preferences:</strong> We save active theme parameters (Dark / Light mode preferences) in local browser configurations.</li>
          <li><strong>Billing Checkouts:</strong> We utilize temporary session caching to handle payment checkout steps and transaction receipts safely.</li>
        </ul>

        <h3 className="text-sm font-bold text-foreground mt-4 border-b border-border pb-2 flex items-center gap-2">
          <Eye className="w-4 h-4 text-primary" /> Tracking & Third-Party Cookies
        </h3>
        <p>
          Unlike generic social networks, <strong>CampusLink does not deploy third-party advertising cookies or trackers</strong>. We do not sell user data, track off-site activities, or compile marketing lists. Any diagnostic tools we utilize are strictly localized to ensure high SLA uptimes (99.9%) and trace error backlogs.
        </p>

        <h3 className="text-sm font-bold text-foreground mt-4 border-b border-border pb-2 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-primary" /> Disabling Browser Cookies
        </h3>
        <p>
          You can restrict cookies or clear local storage folders via your browser settings. However, please note that doing so will disable automated dashboard logins and force you to re-authenticate on every page reload, as we require local tokens to enforce role-based route guards.
        </p>
      </div>
    </div>
  );
}
