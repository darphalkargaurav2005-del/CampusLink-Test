import type { User, UserRole } from "@/types";

export const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "admin@campus.edu": {
    password: "admin123",
    user: {
      id: "admin1",
      name: "Dr. Pradeep Srivastava",
      email: "admin@campus.edu",
      role: "admin",
      phone: "9800000001",
      department: "Administration",
      joinDate: "2005-01-01",
    },
  },
  "teacher@campus.edu": {
    password: "teacher123",
    user: {
      id: "t1",
      name: "Dr. Anand Kumar",
      email: "teacher@campus.edu",
      role: "teacher",
      phone: "9811234567",
      department: "Computer Science",
      teacherId: "EMP001",
      joinDate: "2009-07-01",
    },
  },
  "student@campus.edu": {
    password: "student123",
    user: {
      id: "s1",
      name: "Aisha Sharma",
      email: "student@campus.edu",
      role: "student",
      phone: "9876543210",
      department: "Computer Science",
      studentId: "CS2021001",
      joinDate: "2021-08-01",
    },
  },
  "parent@campus.edu": {
    password: "parent123",
    user: {
      id: "p1",
      name: "Rajesh Sharma",
      email: "parent@campus.edu",
      role: "parent",
      phone: "9876543200",
      childName: "Aisha Sharma",
      joinDate: "2021-08-01",
    },
  },
  "librarian@campus.edu": {
    password: "lib123",
    user: {
      id: "lib1",
      name: "Mrs. Kavitha Menon",
      email: "librarian@campus.edu",
      role: "librarian",
      phone: "9800000005",
      department: "Library",
      joinDate: "2015-06-01",
    },
  },
};

export const ROLE_DASHBOARD_PATHS: Record<UserRole, string> = {
  admin: "/admin/dashboard",
  teacher: "/teacher/dashboard",
  student: "/student/dashboard",
  parent: "/parent/dashboard",
  librarian: "/librarian/dashboard",
};

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Institute Admin",
  teacher: "Teacher",
  student: "Student",
  parent: "Parent",
  librarian: "Librarian",
};

export function getCurrentUser(): User | null {
  const stored = localStorage.getItem("campuslink_user");
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User): void {
  localStorage.setItem("campuslink_user", JSON.stringify(user));
}

export function clearCurrentUser(): void {
  localStorage.removeItem("campuslink_user");
}

export function loginUser(email: string, password: string): User | null {
  const entry = MOCK_USERS[email.toLowerCase()];
  if (!entry || entry.password !== password) return null;
  return entry.user;
}
