import { motion } from "framer-motion";
import { BookOpen, Users, Clock, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import PageHeader from "@/components/features/PageHeader";
import ChartCard from "@/components/features/ChartCard";
import { MOCK_COURSES } from "@/constants/mockData";
import { cn } from "@/lib/utils";

export default function MyCourses() {
  const myCourses = MOCK_COURSES.filter(c => c.teacherId === "t1" || c.teacherId === "t5").slice(0, 4);

  const courseStats = myCourses.map(c => ({
    name: c.code,
    students: c.totalStudents,
    credits: c.credits,
    avg: Math.floor(70 + Math.random() * 25),
  }));

  return (
    <div>
      <PageHeader title="My Courses" subtitle={`Teaching ${myCourses.length} courses this semester`} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {myCourses.map((course, idx) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
            className="bg-card border border-border rounded-xl p-5 shadow-card"
          >
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

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <p className="font-bold text-sm text-foreground">{course.totalStudents}</p>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <p className="font-bold text-sm text-foreground">{course.credits}</p>
                <p className="text-xs text-muted-foreground">Credits</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <p className="font-bold text-sm text-foreground">{course.semester}</p>
                <p className="text-xs text-muted-foreground">Semester</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock size={12} />
              <span>{course.schedule}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <ChartCard title="Course Enrollment Comparison" subtitle="Number of students per course" index={0}>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={courseStats} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "10px", fontSize: "13px" }} />
            <Bar dataKey="students" fill="#4f46e5" radius={[6, 6, 0, 0]} name="Students" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
