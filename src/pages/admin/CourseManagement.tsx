import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Edit2, Trash2, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PageHeader from "@/components/features/PageHeader";
import Modal from "@/components/features/Modal";
import { MOCK_COURSES } from "@/constants/mockData";
import type { Course } from "@/types";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Course name required"),
  code: z.string().min(2, "Course code required"),
  department: z.string().min(2, "Department required"),
  credits: z.string().min(1, "Credits required"),
  semester: z.string().min(1, "Semester required"),
  teacherName: z.string().min(2, "Teacher required"),
  description: z.string().min(10, "Description required"),
});

type FormData = z.infer<typeof schema>;

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    if (editCourse) {
      setCourses(prev => prev.map(c => c.id === editCourse.id ? { ...c, ...data, credits: Number(data.credits), semester: Number(data.semester) } : c));
      toast.success("Course updated");
    } else {
      const newCourse: Course = { id: `c${Date.now()}`, ...data, credits: Number(data.credits), semester: Number(data.semester), teacherId: "t1", totalStudents: 0, schedule: "TBD", status: "active" };
      setCourses(prev => [newCourse, ...prev]);
      toast.success("Course created successfully");
    }
    setModalOpen(false);
  };

  const openEdit = (c: Course) => {
    setEditCourse(c);
    reset({ name: c.name, code: c.code, department: c.department, credits: String(c.credits), semester: String(c.semester), teacherName: c.teacherName, description: c.description });
    setModalOpen(true);
  };

  const deptColors: Record<string, string> = {
    "Computer Science": "bg-brand-100 text-brand-700 dark:bg-brand-950/30 dark:text-brand-400",
    "Mathematics": "bg-violet-100 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400",
    "Electronics": "bg-sky-100 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400",
    "Physics": "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  };

  return (
    <div>
      <PageHeader
        title="Course Management"
        subtitle={`${courses.length} courses across all departments`}
        action={
          <button onClick={() => { setEditCourse(null); reset(); setModalOpen(true); }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90">
            <Plus size={16} /> New Course
          </button>
        }
      />

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Code</th>
                <th>Department</th>
                <th>Credits</th>
                <th>Semester</th>
                <th>Teacher</th>
                <th>Students</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, idx) => (
                <motion.tr key={course.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-950/30 flex items-center justify-center">
                        <BookOpen size={15} className="text-brand-600 dark:text-brand-400" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{course.name}</p>
                        <p className="text-xs text-muted-foreground">{course.schedule}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="font-mono text-xs text-muted-foreground">{course.code}</span></td>
                  <td>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", deptColors[course.department] || "bg-muted text-muted-foreground")}>
                      {course.department}
                    </span>
                  </td>
                  <td className="text-sm font-medium">{course.credits}</td>
                  <td className="text-sm">Sem {course.semester}</td>
                  <td className="text-sm">{course.teacherName}</td>
                  <td className="text-sm font-medium">{course.totalStudents}</td>
                  <td><span className={course.status === "active" ? "badge-success" : "badge-error"}>{course.status}</span></td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(course)} className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => { setCourses(prev => prev.filter(c => c.id !== course.id)); toast.success("Course removed"); }} className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg text-muted-foreground hover:text-rose-600 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editCourse ? "Edit Course" : "Create Course"} size="lg"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors">Cancel</button>
            <button onClick={handleSubmit(onSubmit)} className="px-4 py-2 text-sm gradient-brand text-white rounded-xl font-semibold">{editCourse ? "Update" : "Create"}</button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "name", label: "Course Name", span: true },
            { name: "code", label: "Course Code" },
            { name: "department", label: "Department" },
            { name: "teacherName", label: "Assigned Teacher" },
            { name: "credits", label: "Credits" },
            { name: "semester", label: "Semester" },
          ].map(f => (
            <div key={f.name} className={f.span ? "col-span-2" : ""}>
              <label className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
              <input {...register(f.name as keyof FormData)} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring" />
              {errors[f.name as keyof FormData] && <p className="text-rose-500 text-xs mt-1">{errors[f.name as keyof FormData]?.message}</p>}
            </div>
          ))}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
            <textarea {...register("description")} rows={3} className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            {errors.description && <p className="text-rose-500 text-xs mt-1">{errors.description.message}</p>}
          </div>
        </div>
      </Modal>
    </div>
  );
}
