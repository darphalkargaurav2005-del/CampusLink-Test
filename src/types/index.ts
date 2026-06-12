export type UserRole = "admin" | "teacher" | "student" | "parent" | "librarian";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  department?: string;
  studentId?: string;
  teacherId?: string;
  childName?: string;
  joinDate?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  rollNo: string;
  class: string;
  section: string;
  department: string;
  year: number;
  gender: string;
  dob: string;
  address: string;
  parentName: string;
  parentPhone: string;
  feeStatus: "paid" | "pending" | "partial";
  attendance: number;
  cgpa: number;
  avatar?: string;
  joinDate: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  department: string;
  designation: string;
  subjects: string[];
  qualification: string;
  experience: number;
  salary: number;
  gender: string;
  joinDate: string;
  avatar?: string;
  status: "active" | "on-leave" | "inactive";
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  credits: number;
  semester: number;
  teacherId: string;
  teacherName: string;
  totalStudents: number;
  schedule: string;
  description: string;
  status: "active" | "inactive";
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: "present" | "absent" | "late";
  course: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  feeType: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "paid" | "pending" | "overdue";
  semester: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: "general" | "academic" | "examination" | "event" | "urgent";
  author: string;
  publishDate: string;
  targetAudience: string[];
  priority: "low" | "medium" | "high";
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publisher: string;
  year: number;
  copies: number;
  available: number;
  location: string;
  status: "available" | "issued" | "reserved";
}

export interface BookIssue {
  id: string;
  bookId: string;
  bookTitle: string;
  borrowerId: string;
  borrowerName: string;
  borrowerType: "student" | "teacher";
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fine: number;
  status: "issued" | "returned" | "overdue";
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  teacherId: string;
  dueDate: string;
  maxMarks: number;
  submittedCount?: number;
  totalStudents?: number;
  status: "active" | "closed" | "draft";
}

export interface Mark {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  examType: "internal" | "midterm" | "final" | "assignment";
  maxMarks: number;
  obtainedMarks: number;
  grade: string;
  semester: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  receiverId: string;
  receiverName: string;
  content: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface Schedule {
  id: string;
  courseId: string;
  courseName: string;
  teacherName: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  class: string;
  section: string;
}

export interface AnalyticsData {
  month: string;
  students?: number;
  attendance?: number;
  fees?: number;
  admissions?: number;
  performance?: number;
}
