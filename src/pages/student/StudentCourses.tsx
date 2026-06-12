import { motion } from "framer-motion";
import { BookOpen, Users, Clock, Award } from "lucide-react";
import PageHeader from "@/components/features/PageHeader";
import { MOCK_COURSES } from "@/constants/mockData";
import { cn } from "@/lib/utils";

export default function StudentCourses() {
  return (
    <div>
      <PageHeader title="My Courses" subtitle={`Enrolled in ${MOCK_COURSES.length} courses this semester`} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_COURSES.map((course, idx) => (
          <motion.div key={course.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.07 }} className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950/30 flex items-center justify-center">
                <BookOpen size={20} className="text-brand-600 dark:text-brand-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm">{course.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{course.code} • {course.department}</p>
              </div>
              <span className="badge-success">{course.status}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{course.description}</p>
            <div className="grid grid-cols-3 gap-2 mb-3 text-center text-xs">
              <div className="bg-muted/50 rounded-lg p-2">
                <p className="font-bold text-foreground">{course.credits}</p>
                <p className="text-muted-foreground">Credits</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2">
                <p className="font-bold text-foreground">Sem {course.semester}</p>
                <p className="text-muted-foreground">Semester</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2">
                <p className="font-bold text-foreground">{course.totalStudents}</p>
                <p className="text-muted-foreground">Students</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users size={12} />
              <span>{course.teacherName}</span>
              <span className="mx-1">•</span>
              <Clock size={12} />
              <span>{course.schedule}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
