import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserPlus, Search, Filter, Edit2, Trash2, ChevronDown, X } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import Modal from "@/components/features/Modal";
import { store } from "@/lib/store";
import type { Student } from "@/types";
import { cn } from "@/lib/utils";
import { useDeleteConfirm } from "@/contexts/DeleteConfirmContext";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid 10-digit phone required"),
  rollNo: z.string().min(2, "Roll number required"),
  department: z.string().min(2, "Department required"),
  year: z.string().min(1, "Year required"),
  section: z.string().min(1, "Section required"),
  gender: z.string().min(1, "Gender required"),
  feeStatus: z.string().min(1, "Fee status required"),
});

type FormData = z.infer<typeof schema>;

const DEPARTMENTS = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical", "Mathematics"];

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([...store.students]);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [feeFilter, setFeeFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const { confirmDelete } = useDeleteConfirm();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Sync to store
  useEffect(() => { store.students = students; }, [students]);

  const filtered = students.filter(s => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "all" || s.department === deptFilter;
    const matchYear = yearFilter === "all" || String(s.year) === yearFilter;
    const matchFee = feeFilter === "all" || s.feeStatus === feeFilter;
    return matchSearch && matchDept && matchYear && matchFee;
  });

  const hasActiveFilters = search || deptFilter !== "all" || yearFilter !== "all" || feeFilter !== "all";

  const clearFilters = () => { setSearch(""); setDeptFilter("all"); setYearFilter("all"); setFeeFilter("all"); };

  const openAdd = () => {
    setEditStudent(null);
    reset({ name: "", email: "", phone: "", rollNo: "", department: "", year: "", section: "", gender: "", feeStatus: "pending" });
    setModalOpen(true);
  };

  const openEdit = (s: Student) => {
    setEditStudent(s);
    reset({
      name: s.name, email: s.email, phone: s.phone, rollNo: s.rollNo,
      department: s.department, year: String(s.year), section: s.section,
      gender: s.gender, feeStatus: s.feeStatus,
    });
    setModalOpen(true);
  };

  const onSubmit = (data: FormData) => {
    if (editStudent) {
      const updated: Student = {
        ...editStudent,
        name: data.name, email: data.email, phone: data.phone,
        rollNo: data.rollNo, department: data.department,
        year: Number(data.year), section: data.section,
        gender: data.gender, feeStatus: data.feeStatus as Student["feeStatus"],
      };
      setStudents(prev => prev.map(s => s.id === editStudent.id ? updated : s));
      toast.success("Student updated successfully");
    } else {
      const newStudent: Student = {
        id: `s${Date.now()}`,
        name: data.name, email: data.email, phone: data.phone,
        rollNo: data.rollNo, department: data.department,
        year: Number(data.year), section: data.section,
        gender: data.gender, feeStatus: data.feeStatus as Student["feeStatus"],
        class: "B.Tech", dob: "", address: "",
        parentName: "", parentPhone: "",
        attendance: 0, cgpa: 0,
        joinDate: new Date().toISOString().split("T")[0],
      };
      setStudents(prev => [newStudent, ...prev]);
      toast.success("Student added successfully");
    }
    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Student Management"
        subtitle={`Managing ${students.length} students across all departments`}
        action={
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <UserPlus size={16} /> Add Student
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total", value: students.length, color: "text-brand-600" },
          { label: "Paid Fees", value: students.filter(s => s.feeStatus === "paid").length, color: "text-emerald-600" },
          { label: "Pending Fees", value: students.filter(s => s.feeStatus === "pending").length, color: "text-amber-600" },
          { label: "Avg Attendance", value: students.length ? Math.round(students.reduce((a, s) => a + s.attendance, 0) / students.length) + "%" : "0%", color: "text-sky-600" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 text-center">
            <p className={cn("text-xl font-bold font-display", s.color)}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, roll no, department..."
            className="w-full pl-9 pr-9 py-2.5 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-all",
            showFilters || (deptFilter !== "all" || yearFilter !== "all" || feeFilter !== "all")
              ? "border-primary bg-primary/5 text-primary"
              : "border-border text-muted-foreground hover:bg-muted"
          )}
        >
          <Filter size={14} /> Filters
          {(deptFilter !== "all" || yearFilter !== "all" || feeFilter !== "all") && (
            <span className="w-4 h-4 rounded-full gradient-brand text-white text-[9px] flex items-center justify-center font-bold">
              {[deptFilter !== "all", yearFilter !== "all", feeFilter !== "all"].filter(Boolean).length}
            </span>
          )}
        </button>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1.5 px-3 py-2.5 text-xs text-rose-600 border border-rose-200 dark:border-rose-900 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors">
            <X size={12} /> Clear All
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 mb-4 p-4 bg-muted/40 border border-border rounded-xl">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-muted-foreground">Department</label>
            <div className="relative">
              <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">All Departments</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-muted-foreground">Year</label>
            <div className="relative">
              <select value={yearFilter} onChange={e => setYearFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">All Years</option>
                {[1, 2, 3, 4].map(y => <option key={y} value={String(y)}>Year {y}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-muted-foreground">Fee Status</label>
            <div className="relative">
              <select value={feeFilter} onChange={e => setFeeFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="partial">Partial</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </motion.div>
      )}

      {hasActiveFilters && (
        <p className="text-sm text-muted-foreground mb-3">Showing <strong>{filtered.length}</strong> of {students.length} students</p>
      )}

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th>Department</th>
                <th>Year</th>
                <th>Attendance</th>
                <th>CGPA</th>
                <th>Fee Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-muted-foreground text-sm">
                    No students found.{" "}
                    {hasActiveFilters && <button onClick={clearFilters} className="text-primary hover:underline">Clear filters</button>}
                  </td>
                </tr>
              ) : (
                filtered.map((student, idx) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center text-brand-700 dark:text-brand-400 font-bold text-sm flex-shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-xs text-muted-foreground">{student.rollNo}</td>
                    <td className="text-sm">{student.department}</td>
                    <td className="text-sm">Year {student.year}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            style={{ width: `${student.attendance}%` }}
                            className={cn("h-full rounded-full", student.attendance >= 75 ? "bg-emerald-500" : "bg-rose-500")}
                          />
                        </div>
                        <span className={cn("text-xs font-semibold", student.attendance >= 75 ? "text-emerald-600" : "text-rose-600")}>
                          {student.attendance}%
                        </span>
                      </div>
                    </td>
                    <td className="font-semibold text-sm text-foreground">{student.cgpa.toFixed(1)}</td>
                    <td>
                      <span className={cn({
                        "badge-success": student.feeStatus === "paid",
                        "badge-warning": student.feeStatus === "partial",
                        "badge-error": student.feeStatus === "pending",
                      })}>
                        {student.feeStatus.charAt(0).toUpperCase() + student.feeStatus.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEdit(student)}
                          className="p-1.5 hover:bg-brand-50 dark:hover:bg-brand-950/30 rounded-lg transition-colors text-muted-foreground hover:text-brand-600"
                          title="Edit student"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => confirmDelete({
                            title: "Remove Student",
                            itemName: student.name,
                            itemType: "Student",
                            onConfirm: () => {
                              setStudents(prev => prev.filter(s => s.id !== student.id));
                              toast.success("Student removed successfully");
                            }
                          })}
                          className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors text-muted-foreground hover:text-rose-600"
                          title="Remove student"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editStudent ? "Edit Student" : "Add New Student"}
        subtitle={editStudent ? `Editing: ${editStudent.name}` : "Fill in the student details below"}
        size="lg"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors">Cancel</button>
            <button onClick={handleSubmit(onSubmit)} className="px-5 py-2 text-sm gradient-brand text-white rounded-xl hover:opacity-90 font-semibold">
              {editStudent ? "Update Student" : "Add Student"}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "name", label: "Full Name", placeholder: "Enter full name", span: true },
            { name: "email", label: "Email", placeholder: "student@campus.edu" },
            { name: "phone", label: "Phone", placeholder: "10-digit mobile number" },
            { name: "rollNo", label: "Roll Number", placeholder: "e.g. CS2021001" },
            { name: "department", label: "Department", placeholder: "" },
            { name: "section", label: "Section", placeholder: "e.g. A" },
          ].map(field => (
            <div key={field.name} className={(field as any).span ? "col-span-2" : ""}>
              <label className="block text-sm font-semibold text-foreground mb-1.5">{field.label}</label>
              {field.name === "department" ? (
                <select
                  {...register(field.name as keyof FormData)}
                  className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              ) : (
                <input
                  {...register(field.name as keyof FormData)}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/50"
                />
              )}
              {errors[field.name as keyof FormData] && (
                <p className="text-rose-500 text-xs mt-1">{errors[field.name as keyof FormData]?.message}</p>
              )}
            </div>
          ))}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Year</label>
            <select {...register("year")} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">Select Year</option>
              {[1, 2, 3, 4].map(y => <option key={y} value={y}>Year {y}</option>)}
            </select>
            {errors.year && <p className="text-rose-500 text-xs mt-1">{errors.year.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Gender</label>
            <select {...register("gender")} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-rose-500 text-xs mt-1">{errors.gender.message}</p>}
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-foreground mb-1.5">Fee Status</label>
            <select {...register("feeStatus")} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
            </select>
          </div>
        </div>
      </Modal>

    </div>
  );
}
