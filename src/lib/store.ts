/**
 * Global in-memory store for CampusLink
 * This ensures all pages share the same mutable data so Add/Edit/Delete persists
 * across navigation within a session.
 */
import { MOCK_BOOKS, MOCK_STUDENTS, MOCK_TEACHERS, MOCK_COURSES, MOCK_BOOK_ISSUES, MOCK_NOTICES, MOCK_FEES, MOCK_ASSIGNMENTS } from "@/constants/mockData";
import type { Book, Student, Teacher, Course, BookIssue, Notice, FeeRecord, Assignment } from "@/types";

// Extend BookIssue to track history entries
export interface HistoryEntry {
  id: string;
  action: "added" | "deleted" | "edited";
  itemType: string;
  itemName: string;
  timestamp: string;
  performedBy?: string;
  details?: string;
}

class CampusStore {
  books: Book[] = [...MOCK_BOOKS];
  students: Student[] = [...MOCK_STUDENTS];
  teachers: Teacher[] = [...MOCK_TEACHERS];
  courses: Course[] = [...MOCK_COURSES];
  bookIssues: BookIssue[] = [...MOCK_BOOK_ISSUES];
  notices: Notice[] = [...MOCK_NOTICES];
  fees: FeeRecord[] = [...MOCK_FEES];
  assignments: Assignment[] = [...MOCK_ASSIGNMENTS];
  users = [
    { id: "u1", name: "Dr. Pradeep Srivastava", email: "admin@campus.edu", role: "Institute Admin", status: "Active", lastLogin: "2024-02-28", department: "Administration" },
    { id: "u2", name: "Dr. Anand Kumar", email: "teacher@campus.edu", role: "Teacher", status: "Active", lastLogin: "2024-02-28", department: "Computer Science" },
    { id: "u3", name: "Aisha Sharma", email: "student@campus.edu", role: "Student", status: "Active", lastLogin: "2024-02-27", department: "Computer Science" },
    { id: "u4", name: "Rajesh Sharma", email: "parent@campus.edu", role: "Parent", status: "Active", lastLogin: "2024-02-25", department: "-" },
    { id: "u5", name: "Mrs. Kavitha Menon", email: "librarian@campus.edu", role: "Librarian", status: "Active", lastLogin: "2024-02-28", department: "Library" },
  ];

  // History log
  history: HistoryEntry[] = [
    { id: "h1", action: "added", itemType: "Book", itemName: "Introduction to Algorithms", timestamp: "2024-01-15 09:30", details: "Added 8 copies to CS-Shelf-A1" },
    { id: "h2", action: "deleted", itemType: "Book", itemName: "Old Calculus Textbook (3rd Ed)", timestamp: "2024-01-10 14:20", details: "Removed outdated edition" },
    { id: "h3", action: "added", itemType: "Category", itemName: "Artificial Intelligence", timestamp: "2024-02-01 11:00", details: "New category created" },
    { id: "h4", action: "edited", itemType: "Book", itemName: "Design Patterns", timestamp: "2024-02-05 16:45", details: "Updated copies count from 3 to 5" },
  ];

  // Book categories
  bookCategories = [
    { id: "cat1", name: "Computer Science", count: 45, color: "#4f46e5" },
    { id: "cat2", name: "Mathematics", count: 28, color: "#8b5cf6" },
    { id: "cat3", name: "Electronics", count: 22, color: "#0ea5e9" },
    { id: "cat4", name: "Software Engineering", count: 18, color: "#10b981" },
    { id: "cat5", name: "Networking", count: 15, color: "#f59e0b" },
    { id: "cat6", name: "Physics", count: 20, color: "#f43f5e" },
    { id: "cat7", name: "Mechanical", count: 16, color: "#6b7280" },
    { id: "cat8", name: "General Science", count: 12, color: "#14b8a6" },
  ];

  addHistory(entry: Omit<HistoryEntry, "id">) {
    this.history.unshift({ ...entry, id: `h${Date.now()}` });
  }
}

// Singleton
export const store = new CampusStore();
