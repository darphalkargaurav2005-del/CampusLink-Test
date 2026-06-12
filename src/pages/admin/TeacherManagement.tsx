import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserPlus, Search, Edit2, Trash2, ChevronDown, X } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import Modal from "@/components/features/Modal";
import { store } from "@/lib/store";
import type { Teacher } from "@/types";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  employeeId: z.string().min(2, "Employee ID required"),
  department: z.string().min(2, "Department required"),
  designation: z.string().min(2, "Designation required"),
  qualification: z.string().min(2, "Qualification required"),
  experience: z.string().min(1, "Experience required"),
  gender: z.string().min(1, "Gender required"),
});

type FormData = z.infer<typeof schema>;

const DEPARTMENTS = ["Computer Science", "Mathematics", "Electronics", "Physics", "Mechanical", "Civil", "Electrical"];
const DESIGNATIONS = ["Professor", "Associate Professor", "Assistant Professor", "Lecturer"];

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>([...store.teachers]);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { store.teachers = teachers; }, [teachers]);

  const filtered = teachers.filter(t => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      t.designation.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "all" || t.department === deptFilter;
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const hasActiveFilters = search || deptFilter !== "all" || statusFilter !== "all";
  const clearFilters = () => { setSearch(""); setDeptFilter("all"); setStatusFilter("all"); };

  const openAdd = () => {
    setEditTeacher(null);
    reset({ name: "", email: "", phone: "", employeeId: "", department: "", designation: "", qualification: "", experience: "", gender: "Male" });
    setModalOpen(true);
  };

  const openEdit = (t: Teacher) => {
    setEditTeacher(t);
    reset({
      name: t.name, email: t.email, phone: t.phone, employeeId: t.employeeId,
      department: t.department, designation: t.designation, qualification: t.qualification,
      experience: String(t.experience), gender: t.gender,
    });
    setModalOpen(true);
  };

  const onSubmit = (data: FormData) => {
    if (editTeacher) {
      const updated: Teacher = { ...editTeacher, ...data, experience: Number(data.experience) };
      setTeachers(prev => prev.map(t => t.id === editTeacher.id ? updated : t));
      toast.success("Teacher updated successfully");
    } else {
      const newT: Teacher = {
        id: `t${Date.now()}`, ...data, experience: Number(data.experience),
        subjects: [], salary: 60000, joinDate: new Date().toISOString().split("T")[0], status: "active",
      };
      setTeachers(prev => [newT, ...prev]);
      toast.success("Teacher added successfully");
    }
    setModalOpen(false);
  };

  const statusColors: Record<Teacher["status"], string> = {
    active: "badge-success",
    "on-leave": "badge-warning",
    inactive: "badge-error",
  };

  return (
    <div>
      <PageHeader
        title="Teacher Management"
        subtitle={`${teachers.length} faculty members on record`}
        action={
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90">
            <UserPlus size={16} /> Add Teacher
          </button>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Active", value: teachers.filter(t => t.status === "active").length, color: "text-emerald-600" },
          { label: "On Leave", value: teachers.filter(t => t.status === "on-leave").length, color: "text-amber-600" },
          { label: "Total", value: teachers.length, color: "text-brand-600" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 text-center">
            <p className={cn("text-xl font-bold font-display", s.color)}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search teachers..."
            className="w-full pl-9 pr-9 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><X size={14} /></button>}
        </div>
        <div className="relative">
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="all">All Departments</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
        <div className="relative">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="on-leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1.5 px-3 py-2.5 text-xs text-rose-600 border border-rose-200 dark:border-rose-900 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors">
            <X size={12} /> Clear
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <p className="text-sm text-muted-foreground mb-3">Showing <strong>{filtered.length}</strong> of {teachers.length} teachers</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-3 bg-card border border-border rounded-xl p-10 text-center text-muted-foreground text-sm">
            No teachers found.{" "}
            {hasActiveFilters && <button onClick={clearFilters} className="text-primary hover:underline">Clear filters</button>}
          </div>
        ) : (
          filtered.map((teacher, idx) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl gradient-sky flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{teacher.name}</p>
                    <p className="text-xs text-muted-foreground">{teacher.employeeId}</p>
                  </div>
                </div>
                <span className={statusColors[teacher.status]}>
                  {teacher.status === "on-leave" ? "On Leave" : teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                </span>
              </div>

              <div className="space-y-2 mb-4 text-xs">
                {[
                  ["Department", teacher.department],
                  ["Designation", teacher.designation],
                  ["Experience", `${teacher.experience} years`],
                  ["Qualification", teacher.qualification.split(",")[0]],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium text-foreground truncate ml-2 text-right max-w-[60%]">{v}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(teacher)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs border border-border rounded-lg hover:bg-brand-50 dark:hover:bg-brand-950/30 hover:text-brand-600 hover:border-brand-200 transition-colors"
                >
                  <Edit2 size={13} /> Edit
                </button>
                <button
                  onClick={() => setDeleteId(teacher.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs border border-rose-200 dark:border-rose-900 text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <Trash2 size={13} /> Remove
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editTeacher ? "Edit Teacher" : "Add Teacher"}
        subtitle={editTeacher ? `Editing: ${editTeacher.name}` : "Fill in teacher details"}
        size="lg"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors">Cancel</button>
            <button onClick={handleSubmit(onSubmit)} className="px-5 py-2 text-sm gradient-brand text-white rounded-xl font-semibold hover:opacity-90">
              {editTeacher ? "Update Teacher" : "Add Teacher"}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name</label>
            <input {...register("name")} placeholder="Dr. Full Name" className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/50" />
            {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          {[
            { name: "email", label: "Email", placeholder: "teacher@campus.edu" },
            { name: "phone", label: "Phone", placeholder: "10-digit number" },
            { name: "employeeId", label: "Employee ID", placeholder: "EMP001" },
            { name: "qualification", label: "Qualification", placeholder: "Ph.D., M.Tech, etc." },
            { name: "experience", label: "Experience (years)", placeholder: "e.g. 8" },
          ].map(f => (
            <div key={f.name}>
              <label className="block text-sm font-semibold text-foreground mb-1.5">{f.label}</label>
              <input {...register(f.name as keyof FormData)} placeholder={f.placeholder} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/50" />
              {errors[f.name as keyof FormData] && <p className="text-rose-500 text-xs mt-1">{errors[f.name as keyof FormData]?.message}</p>}
            </div>
          ))}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Department</label>
            <select {...register("department")} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">Select Department</option>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.department && <p className="text-rose-500 text-xs mt-1">{errors.department.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Designation</label>
            <select {...register("designation")} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">Select Designation</option>
              {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.designation && <p className="text-rose-500 text-xs mt-1">{errors.designation.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Gender</label>
            <select {...register("gender")} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Remove Teacher"
        size="sm"
        footer={
          <>
            <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors">Cancel</button>
            <button onClick={() => { setTeachers(prev => prev.filter(t => t.id !== deleteId)); setDeleteId(null); toast.success("Teacher removed"); }} className="px-4 py-2 text-sm bg-rose-600 text-white rounded-xl font-semibold hover:bg-rose-700">Remove</button>
          </>
        }
      >
        <p className="text-sm text-muted-foreground">Are you sure you want to remove <strong className="text-foreground">{teachers.find(t => t.id === deleteId)?.name}</strong>?</p>
      </Modal>
    </div>
  );
}
