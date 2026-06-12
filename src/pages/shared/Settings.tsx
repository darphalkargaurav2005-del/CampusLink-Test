import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Save, User, Lock, Bell, Palette, Globe, Shield } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/features/PageHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const profileSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  bio: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Current password required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine(d => d.newPassword === d.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

type ProfileData = z.infer<typeof profileSchema>;
type PasswordData = z.infer<typeof passwordSchema>;

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function Settings() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false, newsletter: false });

  const profileForm = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name, email: user?.email, phone: user?.phone },
  });

  const passwordForm = useForm<PasswordData>({ resolver: zodResolver(passwordSchema) });

  const onProfileSave = (data: ProfileData) => { toast.success("Profile updated successfully"); };
  const onPasswordSave = (data: PasswordData) => { toast.success("Password changed successfully"); passwordForm.reset(); };

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your account preferences and configurations" />

      <div className="flex gap-4">
        {/* Tab List */}
        <div className="w-48 flex-shrink-0">
          <div className="bg-card border border-border rounded-xl p-2 space-y-1">
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn("w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all", activeTab === tab.id ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground")}
                >
                  <Icon size={16} /> {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} className="bg-card border border-border rounded-xl p-6 shadow-card">

            {activeTab === "profile" && (
              <div>
                <h2 className="font-semibold text-foreground text-base mb-5 font-display">Profile Information</h2>
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center text-white font-bold text-2xl">
                    {user?.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{user?.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
                    <button onClick={() => toast.info("Change avatar coming soon")} className="text-xs text-primary hover:underline mt-1">Change avatar</button>
                  </div>
                </div>
                <form onSubmit={profileForm.handleSubmit(onProfileSave)} className="space-y-4">
                  {[
                    { name: "name", label: "Full Name", type: "text" },
                    { name: "email", label: "Email Address", type: "email" },
                    { name: "phone", label: "Phone Number", type: "tel" },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
                      <input {...profileForm.register(f.name as keyof ProfileData)} type={f.type} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
                      {profileForm.formState.errors[f.name as keyof ProfileData] && (
                        <p className="text-rose-500 text-xs mt-1">{profileForm.formState.errors[f.name as keyof ProfileData]?.message}</p>
                      )}
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
                    <textarea {...profileForm.register("bio")} rows={3} placeholder="A short bio about yourself..." className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="flex items-center gap-2 px-5 py-2.5 gradient-brand text-white rounded-xl text-sm font-semibold hover:opacity-90">
                      <Save size={15} /> Save Profile
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "security" && (
              <div>
                <h2 className="font-semibold text-foreground text-base mb-5 font-display">Change Password</h2>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSave)} className="space-y-4 max-w-md">
                  {[
                    { name: "currentPassword", label: "Current Password" },
                    { name: "newPassword", label: "New Password" },
                    { name: "confirmPassword", label: "Confirm New Password" },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
                      <input {...passwordForm.register(f.name as keyof PasswordData)} type="password" className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
                      {passwordForm.formState.errors[f.name as keyof PasswordData] && (
                        <p className="text-rose-500 text-xs mt-1">{passwordForm.formState.errors[f.name as keyof PasswordData]?.message}</p>
                      )}
                    </div>
                  ))}
                  <button type="submit" className="flex items-center gap-2 px-5 py-2.5 gradient-brand text-white rounded-xl text-sm font-semibold hover:opacity-90">
                    <Shield size={15} /> Update Password
                  </button>
                </form>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h2 className="font-semibold text-foreground text-base mb-5 font-display">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                    { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
                    { key: "sms", label: "SMS Alerts", desc: "Text messages for urgent updates" },
                    { key: "newsletter", label: "Newsletter", desc: "Monthly institutional newsletter" },
                  ].map(n => (
                    <div key={n.key} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                      <div>
                        <p className="font-medium text-foreground text-sm">{n.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                      </div>
                      <button
                        onClick={() => {
                          setNotifications(prev => ({ ...prev, [n.key]: !prev[n.key as keyof typeof prev] }));
                          toast.success("Preference saved");
                        }}
                        className={cn("relative w-11 h-6 rounded-full transition-colors", notifications[n.key as keyof typeof notifications] ? "gradient-brand" : "bg-muted-foreground/20")}
                      >
                        <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform", notifications[n.key as keyof typeof notifications] ? "translate-x-6" : "translate-x-1")} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div>
                <h2 className="font-semibold text-foreground text-base mb-5 font-display">Appearance</h2>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-foreground text-sm mb-3">Theme</p>
                    <div className="grid grid-cols-2 gap-3 max-w-xs">
                      {[
                        { value: "light", label: "Light Mode" },
                        { value: "dark", label: "Dark Mode" },
                      ].map(t => (
                        <button
                          key={t.value}
                          onClick={() => { setTheme(t.value as "light" | "dark"); toast.success(`${t.label} enabled`); }}
                          className={cn("p-4 border rounded-xl text-sm font-medium transition-all", theme === t.value ? "border-primary gradient-brand text-white" : "border-border hover:bg-muted")}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
