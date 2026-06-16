import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { DeleteConfirmProvider } from "@/contexts/DeleteConfirmContext";

// Auth Pages
import LoginPage from "@/pages/auth/LoginPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";

// Admin Pages
import AdminLayout from "@/components/layout/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import StudentManagement from "@/pages/admin/StudentManagement";
import TeacherManagement from "@/pages/admin/TeacherManagement";
import ParentManagement from "@/pages/admin/ParentManagement";
import ClassManagement from "@/pages/admin/ClassManagement";
import CourseManagement from "@/pages/admin/CourseManagement";
import TeacherAssignment from "@/pages/admin/TeacherAssignment";
import FeeManagement from "@/pages/admin/FeeManagement";
import TeacherAttendance from "@/pages/admin/TeacherAttendance";
import TeacherSchedule from "@/pages/admin/TeacherSchedule";
import NoticeBoard from "@/pages/shared/NoticeBoard";
import ReportsAnalytics from "@/pages/admin/ReportsAnalytics";
import AdminChats from "@/pages/shared/Chats";
import AdminSettings from "@/pages/shared/Settings";
import AIAssistant from "@/pages/shared/AIAssistant";
import HistoryPage from "@/pages/shared/History";

// Teacher Pages
import TeacherLayout from "@/components/layout/TeacherLayout";
import TeacherDashboard from "@/pages/teacher/TeacherDashboard";
import DigitalAttendance from "@/pages/teacher/DigitalAttendance";
import MarksEntry from "@/pages/teacher/MarksEntry";
import StudyMaterial from "@/pages/teacher/StudyMaterial";
import StudentProfiles from "@/pages/teacher/StudentProfiles";
import MyCourses from "@/pages/teacher/MyCourses";
import PerformanceGraphs from "@/pages/teacher/PerformanceGraphs";
import TeacherMySchedule from "@/pages/teacher/TeacherMySchedule";
import Assignments from "@/pages/teacher/Assignments";

// Student Pages
import StudentLayout from "@/components/layout/StudentLayout";
import StudentDashboard from "@/pages/student/StudentDashboard";
import AttendanceReport from "@/pages/student/AttendanceReport";
import Results from "@/pages/student/Results";
import StudentNotes from "@/pages/student/StudentNotes";
import StudentCourses from "@/pages/student/StudentCourses";
import StudentAssignments from "@/pages/student/StudentAssignments";
import StudentSchedule from "@/pages/student/StudentSchedule";
import StudentPerformance from "@/pages/student/StudentPerformance";

// Parent Pages
import ParentLayout from "@/components/layout/ParentLayout";
import ParentDashboard from "@/pages/parent/ParentDashboard";
import ChildAttendance from "@/pages/parent/ChildAttendance";
import AcademicProgress from "@/pages/parent/AcademicProgress";
import TeacherContact from "@/pages/parent/TeacherContact";
import ParentAnnouncements from "@/pages/parent/ParentAnnouncements";
import ParentPerformanceGraphs from "@/pages/parent/ParentPerformanceGraphs";
import GrowthAnalysis from "@/pages/parent/GrowthAnalysis";

// Librarian Pages
import LibrarianLayout from "@/components/layout/LibrarianLayout";
import LibrarianDashboard from "@/pages/librarian/LibrarianDashboard";
import Books from "@/pages/librarian/Books";
import BookCategories from "@/pages/librarian/BookCategories";
import IssueBooks from "@/pages/librarian/IssueBooks";
import ReturnBooks from "@/pages/librarian/ReturnBooks";
import LibraryStudents from "@/pages/librarian/LibraryStudents";
import LibraryTeachers from "@/pages/librarian/LibraryTeachers";
import FineManagement from "@/pages/librarian/FineManagement";
import BookRequests from "@/pages/librarian/BookRequests";
import LibraryReports from "@/pages/librarian/LibraryReports";

import LandingPage from "@/pages/LandingPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import NotFound from "@/pages/NotFound";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="students" element={<StudentManagement />} />
        <Route path="teachers" element={<TeacherManagement />} />
        <Route path="parents" element={<ParentManagement />} />
        <Route path="classes" element={<ClassManagement />} />
        <Route path="courses" element={<CourseManagement />} />
        <Route path="teacher-assignment" element={<TeacherAssignment />} />
        <Route path="fees" element={<FeeManagement />} />
        <Route path="teacher-attendance" element={<TeacherAttendance />} />
        <Route path="teacher-schedule" element={<TeacherSchedule />} />
        <Route path="notices" element={<NoticeBoard role="admin" />} />
        <Route path="reports" element={<ReportsAnalytics />} />
        <Route path="ai" element={<AIAssistant role="admin" />} />
        <Route path="chats" element={<AdminChats />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="history" element={<HistoryPage />} />
      </Route>

      {/* Teacher Routes */}
      <Route path="/teacher" element={<ProtectedRoute role="teacher"><TeacherLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="attendance" element={<DigitalAttendance />} />
        <Route path="marks" element={<MarksEntry />} />
        <Route path="materials" element={<StudyMaterial />} />
        <Route path="students" element={<StudentProfiles />} />
        <Route path="courses" element={<MyCourses />} />
        <Route path="performance" element={<PerformanceGraphs />} />
        <Route path="schedule" element={<TeacherMySchedule />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="ai" element={<AIAssistant role="teacher" />} />
        <Route path="chats" element={<AdminChats />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="history" element={<HistoryPage />} />
      </Route>

      {/* Student Routes */}
      <Route path="/student" element={<ProtectedRoute role="student"><StudentLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="attendance" element={<AttendanceReport />} />
        <Route path="results" element={<Results />} />
        <Route path="notices" element={<NoticeBoard role="student" />} />
        <Route path="notes" element={<StudentNotes />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="schedule" element={<StudentSchedule />} />
        <Route path="performance" element={<StudentPerformance />} />
        <Route path="ai" element={<AIAssistant role="student" />} />
        <Route path="chats" element={<AdminChats />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="history" element={<HistoryPage />} />
      </Route>

      {/* Parent Routes */}
      <Route path="/parent" element={<ProtectedRoute role="parent"><ParentLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ParentDashboard />} />
        <Route path="attendance" element={<ChildAttendance />} />
        <Route path="progress" element={<AcademicProgress />} />
        <Route path="teachers" element={<TeacherContact />} />
        <Route path="announcements" element={<ParentAnnouncements />} />
        <Route path="performance" element={<ParentPerformanceGraphs />} />
        <Route path="growth" element={<GrowthAnalysis />} />
        <Route path="chats" element={<AdminChats />} />
        <Route path="ai" element={<AIAssistant role="parent" />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="history" element={<HistoryPage />} />
      </Route>

      {/* Librarian Routes */}
      <Route path="/librarian" element={<ProtectedRoute role="librarian"><LibrarianLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<LibrarianDashboard />} />
        <Route path="books" element={<Books />} />
        <Route path="categories" element={<BookCategories />} />
        <Route path="issue" element={<IssueBooks />} />
        <Route path="return" element={<ReturnBooks />} />
        <Route path="students" element={<LibraryStudents />} />
        <Route path="teachers" element={<LibraryTeachers />} />
        <Route path="fines" element={<FineManagement />} />
        <Route path="requests" element={<BookRequests />} />
        <Route path="reports" element={<LibraryReports />} />
        <Route path="ai" element={<AIAssistant role="librarian" />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="history" element={<HistoryPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <DeleteConfirmProvider>
            <AppRoutes />
            <Toaster richColors position="top-right" />
          </DeleteConfirmProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
