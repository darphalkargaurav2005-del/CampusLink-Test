import type { Student, Teacher, Course, Book, BookIssue, Notice, FeeRecord, AttendanceRecord, Assignment, Mark, Schedule, Message, Notification, AnalyticsData } from "@/types";

export const MOCK_STUDENTS: Student[] = [
  { id: "s1", name: "Aisha Sharma", email: "aisha.sharma@campus.edu", phone: "9876543210", rollNo: "CS2021001", class: "B.Tech", section: "A", department: "Computer Science", year: 3, gender: "Female", dob: "2002-05-15", address: "123 MG Road, Delhi", parentName: "Rajesh Sharma", parentPhone: "9876543200", feeStatus: "paid", attendance: 87, cgpa: 8.9, joinDate: "2021-08-01" },
  { id: "s2", name: "Rohan Mehta", email: "rohan.mehta@campus.edu", phone: "9876543211", rollNo: "CS2021002", class: "B.Tech", section: "A", department: "Computer Science", year: 3, gender: "Male", dob: "2001-12-20", address: "45 Park Street, Mumbai", parentName: "Sunil Mehta", parentPhone: "9876543201", feeStatus: "pending", attendance: 72, cgpa: 7.8, joinDate: "2021-08-01" },
  { id: "s3", name: "Priya Patel", email: "priya.patel@campus.edu", phone: "9876543212", rollNo: "EC2021003", class: "B.Tech", section: "B", department: "Electronics", year: 3, gender: "Female", dob: "2002-03-10", address: "78 Gandhi Nagar, Ahmedabad", parentName: "Ramesh Patel", parentPhone: "9876543202", feeStatus: "paid", attendance: 93, cgpa: 9.2, joinDate: "2021-08-01" },
  { id: "s4", name: "Karan Singh", email: "karan.singh@campus.edu", phone: "9876543213", rollNo: "ME2022001", class: "B.Tech", section: "A", department: "Mechanical", year: 2, gender: "Male", dob: "2003-07-25", address: "12 Sector 5, Chandigarh", parentName: "Gurpreet Singh", parentPhone: "9876543203", feeStatus: "partial", attendance: 65, cgpa: 6.9, joinDate: "2022-08-01" },
  { id: "s5", name: "Sneha Reddy", email: "sneha.reddy@campus.edu", phone: "9876543214", rollNo: "CS2022002", class: "B.Tech", section: "B", department: "Computer Science", year: 2, gender: "Female", dob: "2003-01-18", address: "56 Jubilee Hills, Hyderabad", parentName: "Venkat Reddy", parentPhone: "9876543204", feeStatus: "paid", attendance: 91, cgpa: 9.0, joinDate: "2022-08-01" },
  { id: "s6", name: "Arjun Nair", email: "arjun.nair@campus.edu", phone: "9876543215", rollNo: "CI2021004", class: "B.Tech", section: "C", department: "Civil", year: 3, gender: "Male", dob: "2001-09-05", address: "89 Marine Drive, Kochi", parentName: "Suresh Nair", parentPhone: "9876543205", feeStatus: "paid", attendance: 79, cgpa: 8.1, joinDate: "2021-08-01" },
  { id: "s7", name: "Tanvi Joshi", email: "tanvi.joshi@campus.edu", phone: "9876543216", rollNo: "CS2023001", class: "B.Tech", section: "A", department: "Computer Science", year: 1, gender: "Female", dob: "2004-06-22", address: "34 Shivaji Nagar, Pune", parentName: "Mahesh Joshi", parentPhone: "9876543206", feeStatus: "paid", attendance: 88, cgpa: 8.5, joinDate: "2023-08-01" },
  { id: "s8", name: "Dev Gupta", email: "dev.gupta@campus.edu", phone: "9876543217", rollNo: "EE2022003", class: "B.Tech", section: "A", department: "Electrical", year: 2, gender: "Male", dob: "2003-11-30", address: "67 Ashok Vihar, Jaipur", parentName: "Vijay Gupta", parentPhone: "9876543207", feeStatus: "pending", attendance: 55, cgpa: 6.2, joinDate: "2022-08-01" },
];

export const MOCK_TEACHERS: Teacher[] = [
  { id: "t1", name: "Dr. Anand Kumar", email: "anand.kumar@campus.edu", phone: "9811234567", employeeId: "EMP001", department: "Computer Science", designation: "Professor", subjects: ["Data Structures", "Algorithms"], qualification: "Ph.D. Computer Science", experience: 15, salary: 85000, gender: "Male", joinDate: "2009-07-01", status: "active" },
  { id: "t2", name: "Prof. Meera Iyer", email: "meera.iyer@campus.edu", phone: "9811234568", employeeId: "EMP002", department: "Mathematics", designation: "Associate Professor", subjects: ["Calculus", "Linear Algebra", "Discrete Math"], qualification: "M.Sc. Mathematics, Ph.D.", experience: 12, salary: 75000, gender: "Female", joinDate: "2012-07-01", status: "active" },
  { id: "t3", name: "Mr. Ravi Shankar", email: "ravi.shankar@campus.edu", phone: "9811234569", employeeId: "EMP003", department: "Electronics", designation: "Assistant Professor", subjects: ["Digital Electronics", "Microprocessors"], qualification: "M.Tech Electronics", experience: 8, salary: 65000, gender: "Male", joinDate: "2016-08-01", status: "active" },
  { id: "t4", name: "Dr. Lakshmi Prasad", email: "lakshmi.prasad@campus.edu", phone: "9811234570", employeeId: "EMP004", department: "Physics", designation: "Professor", subjects: ["Engineering Physics", "Quantum Mechanics"], qualification: "Ph.D. Physics", experience: 18, salary: 90000, gender: "Female", joinDate: "2006-07-01", status: "on-leave" },
  { id: "t5", name: "Mr. Kartik Verma", email: "kartik.verma@campus.edu", phone: "9811234571", employeeId: "EMP005", department: "Computer Science", designation: "Assistant Professor", subjects: ["Web Development", "Database Systems"], qualification: "M.Tech CSE", experience: 5, salary: 58000, gender: "Male", joinDate: "2019-08-01", status: "active" },
  { id: "t6", name: "Dr. Sunita Rao", email: "sunita.rao@campus.edu", phone: "9811234572", employeeId: "EMP006", department: "Mechanical", designation: "Associate Professor", subjects: ["Thermodynamics", "Fluid Mechanics"], qualification: "Ph.D. Mechanical Engineering", experience: 14, salary: 80000, gender: "Female", joinDate: "2010-07-01", status: "active" },
];

export const MOCK_COURSES: Course[] = [
  { id: "c1", name: "Data Structures & Algorithms", code: "CS301", department: "Computer Science", credits: 4, semester: 5, teacherId: "t1", teacherName: "Dr. Anand Kumar", totalStudents: 65, schedule: "Mon, Wed, Fri 9:00-10:00 AM", description: "Fundamental data structures and algorithm design techniques.", status: "active" },
  { id: "c2", name: "Database Management Systems", code: "CS302", department: "Computer Science", credits: 3, semester: 5, teacherId: "t5", teacherName: "Mr. Kartik Verma", totalStudents: 58, schedule: "Tue, Thu 2:00-3:30 PM", description: "Relational databases, SQL, and database design principles.", status: "active" },
  { id: "c3", name: "Engineering Mathematics III", code: "MA301", department: "Mathematics", credits: 4, semester: 5, teacherId: "t2", teacherName: "Prof. Meera Iyer", totalStudents: 120, schedule: "Mon, Wed 11:00 AM-12:00 PM", description: "Advanced calculus, transforms, and numerical methods.", status: "active" },
  { id: "c4", name: "Digital Electronics", code: "EC301", department: "Electronics", credits: 3, semester: 5, teacherId: "t3", teacherName: "Mr. Ravi Shankar", totalStudents: 45, schedule: "Tue, Thu 10:00-11:30 AM", description: "Logic gates, flip-flops, and digital circuit design.", status: "active" },
  { id: "c5", name: "Engineering Physics", code: "PH101", department: "Physics", credits: 3, semester: 1, teacherId: "t4", teacherName: "Dr. Lakshmi Prasad", totalStudents: 180, schedule: "Mon, Wed, Fri 8:00-9:00 AM", description: "Waves, optics, quantum mechanics fundamentals.", status: "active" },
  { id: "c6", name: "Web Development", code: "CS401", department: "Computer Science", credits: 3, semester: 7, teacherId: "t5", teacherName: "Mr. Kartik Verma", totalStudents: 40, schedule: "Fri 2:00-5:00 PM", description: "Full-stack web development with modern frameworks.", status: "active" },
];

export const MOCK_BOOKS: Book[] = [
  { id: "b1", title: "Introduction to Algorithms", author: "Cormen, Leiserson, Rivest", isbn: "978-0262033848", category: "Computer Science", publisher: "MIT Press", year: 2022, copies: 8, available: 3, location: "CS-Shelf-A1", status: "available" },
  { id: "b2", title: "Design Patterns", author: "Gang of Four", isbn: "978-0201633610", category: "Computer Science", publisher: "Addison-Wesley", year: 1994, copies: 5, available: 2, location: "CS-Shelf-A2", status: "available" },
  { id: "b3", title: "Clean Code", author: "Robert C. Martin", isbn: "978-0132350884", category: "Software Engineering", publisher: "Prentice Hall", year: 2008, copies: 6, available: 0, location: "SE-Shelf-B1", status: "issued" },
  { id: "b4", title: "The Pragmatic Programmer", author: "Hunt & Thomas", isbn: "978-0135957059", category: "Software Engineering", publisher: "Addison-Wesley", year: 2019, copies: 4, available: 4, location: "SE-Shelf-B2", status: "available" },
  { id: "b5", title: "Operating System Concepts", author: "Silberschatz, Galvin", isbn: "978-1119800361", category: "Computer Science", publisher: "Wiley", year: 2021, copies: 10, available: 7, location: "CS-Shelf-A3", status: "available" },
  { id: "b6", title: "Engineering Mathematics", author: "B.S. Grewal", isbn: "978-8174091955", category: "Mathematics", publisher: "Khanna Publishers", year: 2020, copies: 15, available: 9, location: "MA-Shelf-C1", status: "available" },
  { id: "b7", title: "Digital Electronics", author: "Morris Mano", isbn: "978-0131989245", category: "Electronics", publisher: "Pearson", year: 2018, copies: 8, available: 5, location: "EC-Shelf-D1", status: "available" },
  { id: "b8", title: "Computer Networks", author: "Andrew Tanenbaum", isbn: "978-0133499452", category: "Networking", publisher: "Pearson", year: 2021, copies: 7, available: 1, location: "CS-Shelf-A4", status: "available" },
];

export const MOCK_BOOK_ISSUES: BookIssue[] = [
  { id: "bi1", bookId: "b1", bookTitle: "Introduction to Algorithms", borrowerId: "s1", borrowerName: "Aisha Sharma", borrowerType: "student", issueDate: "2024-01-15", dueDate: "2024-01-29", fine: 0, status: "returned", returnDate: "2024-01-28" },
  { id: "bi2", bookId: "b3", bookTitle: "Clean Code", borrowerId: "s2", borrowerName: "Rohan Mehta", borrowerType: "student", issueDate: "2024-02-01", dueDate: "2024-02-15", fine: 50, status: "overdue" },
  { id: "bi3", bookId: "b8", bookTitle: "Computer Networks", borrowerId: "t1", borrowerName: "Dr. Anand Kumar", borrowerType: "teacher", issueDate: "2024-02-10", dueDate: "2024-03-10", fine: 0, status: "issued" },
  { id: "bi4", bookId: "b2", bookTitle: "Design Patterns", borrowerId: "s3", borrowerName: "Priya Patel", borrowerType: "student", issueDate: "2024-02-05", dueDate: "2024-02-19", fine: 0, status: "returned", returnDate: "2024-02-18" },
  { id: "bi5", bookId: "b5", bookTitle: "Operating System Concepts", borrowerId: "s4", borrowerName: "Karan Singh", borrowerType: "student", issueDate: "2024-02-12", dueDate: "2024-02-26", fine: 30, status: "overdue" },
];

export const MOCK_NOTICES: Notice[] = [
  { id: "n1", title: "Mid-Semester Examination Schedule", content: "The mid-semester examinations will be held from March 15-25, 2024. Students are advised to check the detailed timetable on the notice board and prepare accordingly. All students must carry their identity cards.", category: "examination", author: "Academic Office", publishDate: "2024-02-28", targetAudience: ["student", "teacher"], priority: "high" },
  { id: "n2", title: "Annual Sports Day - Registration Open", content: "The Annual Sports Day will be held on March 30, 2024. Students can register for various sports events including cricket, football, basketball, athletics, and table tennis. Registration deadline is March 10, 2024.", category: "event", author: "Sports Committee", publishDate: "2024-02-25", targetAudience: ["student", "teacher", "parent"], priority: "medium" },
  { id: "n3", title: "Fee Payment Reminder - Last Date March 15", content: "This is a reminder to all students that the last date for fee payment for the current semester is March 15, 2024. Students who fail to pay fees by the deadline will not be allowed to appear in examinations.", category: "general", author: "Accounts Office", publishDate: "2024-02-20", targetAudience: ["student", "parent"], priority: "high" },
  { id: "n4", title: "Workshop on Machine Learning - Free Registration", content: "The Computer Science department is organizing a 3-day workshop on Machine Learning and Artificial Intelligence from March 5-7, 2024. Industry experts from leading tech companies will be conducting sessions.", category: "academic", author: "CS Department", publishDate: "2024-02-18", targetAudience: ["student", "teacher"], priority: "medium" },
  { id: "n5", title: "Library Timing Change During Exams", content: "The library will remain open from 7:00 AM to 10:00 PM during the examination period (March 15-25). Students are encouraged to utilize library resources for exam preparation.", category: "general", author: "Library", publishDate: "2024-02-15", targetAudience: ["student", "teacher"], priority: "low" },
];

export const MOCK_FEES: FeeRecord[] = [
  { id: "f1", studentId: "s1", studentName: "Aisha Sharma", feeType: "Tuition Fee", amount: 45000, dueDate: "2024-01-15", paidDate: "2024-01-12", status: "paid", semester: 5 },
  { id: "f2", studentId: "s2", studentName: "Rohan Mehta", feeType: "Tuition Fee", amount: 45000, dueDate: "2024-01-15", status: "pending", semester: 5 },
  { id: "f3", studentId: "s3", studentName: "Priya Patel", feeType: "Tuition Fee", amount: 45000, dueDate: "2024-01-15", paidDate: "2024-01-10", status: "paid", semester: 5 },
  { id: "f4", studentId: "s4", studentName: "Karan Singh", feeType: "Tuition Fee", amount: 40000, dueDate: "2024-01-15", paidDate: "2024-01-20", status: "paid", semester: 3 },
  { id: "f5", studentId: "s5", studentName: "Sneha Reddy", feeType: "Tuition Fee", amount: 40000, dueDate: "2024-01-15", paidDate: "2024-01-08", status: "paid", semester: 3 },
  { id: "f6", studentId: "s6", studentName: "Arjun Nair", feeType: "Tuition Fee", amount: 42000, dueDate: "2024-01-15", status: "pending", semester: 5 },
  { id: "f7", studentId: "s7", studentName: "Tanvi Joshi", feeType: "Tuition Fee", amount: 38000, dueDate: "2024-01-15", paidDate: "2024-01-11", status: "paid", semester: 1 },
  { id: "f8", studentId: "s8", studentName: "Dev Gupta", feeType: "Tuition Fee", amount: 40000, dueDate: "2024-01-15", status: "pending", semester: 3 },
  { id: "f9", studentId: "s1", studentName: "Aisha Sharma", feeType: "Hostel Fee", amount: 25000, dueDate: "2024-01-15", paidDate: "2024-01-12", status: "paid", semester: 5 },
  { id: "f10", studentId: "s2", studentName: "Rohan Mehta", feeType: "Exam Fee", amount: 2500, dueDate: "2024-02-15", status: "pending", semester: 5 },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: "a1", title: "Binary Tree Traversal Implementation", description: "Implement all three tree traversal algorithms (inorder, preorder, postorder) in Python with proper documentation and test cases.", courseId: "c1", courseName: "Data Structures & Algorithms", teacherId: "t1", dueDate: "2024-03-10", maxMarks: 20, submittedCount: 45, totalStudents: 65, status: "active" },
  { id: "a2", title: "Database Design Project", description: "Design an ER diagram and implement a normalized relational database for a library management system.", courseId: "c2", courseName: "Database Management Systems", teacherId: "t5", dueDate: "2024-03-15", maxMarks: 30, submittedCount: 38, totalStudents: 58, status: "active" },
  { id: "a3", title: "Calculus Problem Set 5", description: "Solve the given problems on integration by parts, substitution, and partial fractions.", courseId: "c3", courseName: "Engineering Mathematics III", teacherId: "t2", dueDate: "2024-02-28", maxMarks: 25, submittedCount: 112, totalStudents: 120, status: "closed" },
  { id: "a4", title: "Responsive Portfolio Website", description: "Create a fully responsive personal portfolio website using HTML, CSS, and JavaScript with at least 4 sections.", courseId: "c6", courseName: "Web Development", teacherId: "t5", dueDate: "2024-03-20", maxMarks: 50, submittedCount: 22, totalStudents: 40, status: "active" },
];

export const MOCK_MARKS: Mark[] = [
  { id: "m1", studentId: "s1", studentName: "Aisha Sharma", courseId: "c1", courseName: "Data Structures", examType: "internal", maxMarks: 30, obtainedMarks: 26, grade: "A", semester: 5 },
  { id: "m2", studentId: "s1", studentName: "Aisha Sharma", courseId: "c2", courseName: "DBMS", examType: "internal", maxMarks: 30, obtainedMarks: 28, grade: "A+", semester: 5 },
  { id: "m3", studentId: "s1", studentName: "Aisha Sharma", courseId: "c3", courseName: "Engineering Math", examType: "midterm", maxMarks: 50, obtainedMarks: 44, grade: "A", semester: 5 },
  { id: "m4", studentId: "s2", studentName: "Rohan Mehta", courseId: "c1", courseName: "Data Structures", examType: "internal", maxMarks: 30, obtainedMarks: 21, grade: "B", semester: 5 },
  { id: "m5", studentId: "s2", studentName: "Rohan Mehta", courseId: "c2", courseName: "DBMS", examType: "internal", maxMarks: 30, obtainedMarks: 19, grade: "B-", semester: 5 },
  { id: "m6", studentId: "s3", studentName: "Priya Patel", courseId: "c1", courseName: "Data Structures", examType: "internal", maxMarks: 30, obtainedMarks: 29, grade: "A+", semester: 5 },
];

export const MOCK_SCHEDULES: Schedule[] = [
  { id: "sc1", courseId: "c1", courseName: "Data Structures & Algorithms", teacherName: "Dr. Anand Kumar", day: "Monday", startTime: "09:00", endTime: "10:00", room: "LH-201", class: "B.Tech", section: "A" },
  { id: "sc2", courseId: "c3", courseName: "Engineering Mathematics III", teacherName: "Prof. Meera Iyer", day: "Monday", startTime: "11:00", endTime: "12:00", room: "LH-101", class: "B.Tech", section: "A" },
  { id: "sc3", courseId: "c2", courseName: "Database Management Systems", teacherName: "Mr. Kartik Verma", day: "Tuesday", startTime: "14:00", endTime: "15:30", room: "LH-203", class: "B.Tech", section: "A" },
  { id: "sc4", courseId: "c1", courseName: "Data Structures & Algorithms", teacherName: "Dr. Anand Kumar", day: "Wednesday", startTime: "09:00", endTime: "10:00", room: "LH-201", class: "B.Tech", section: "A" },
  { id: "sc5", courseId: "c6", courseName: "Web Development", teacherName: "Mr. Kartik Verma", day: "Friday", startTime: "14:00", endTime: "17:00", room: "CS-Lab-1", class: "B.Tech", section: "A" },
  { id: "sc6", courseId: "c4", courseName: "Digital Electronics", teacherName: "Mr. Ravi Shankar", day: "Tuesday", startTime: "10:00", endTime: "11:30", room: "EC-Lab-1", class: "B.Tech", section: "B" },
  { id: "sc7", courseId: "c5", courseName: "Engineering Physics", teacherName: "Dr. Lakshmi Prasad", day: "Thursday", startTime: "08:00", endTime: "09:00", room: "LH-105", class: "B.Tech", section: "A" },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "notif1", title: "New Assignment Posted", message: "Dr. Anand Kumar posted a new assignment in Data Structures & Algorithms.", type: "info", timestamp: "2024-02-28T10:30:00Z", read: false },
  { id: "notif2", title: "Attendance Warning", message: "Your attendance in Engineering Physics has dropped below 75%.", type: "warning", timestamp: "2024-02-27T09:00:00Z", read: false },
  { id: "notif3", title: "Fee Payment Successful", message: "Your tuition fee payment of Rs. 45,000 has been received.", type: "success", timestamp: "2024-02-26T14:20:00Z", read: true },
  { id: "notif4", title: "Exam Timetable Released", message: "Mid-semester examination timetable has been published.", type: "info", timestamp: "2024-02-25T11:00:00Z", read: true },
];

export const MOCK_MESSAGES: Message[] = [
  { id: "msg1", senderId: "s1", senderName: "Aisha Sharma", senderRole: "student", receiverId: "t1", receiverName: "Dr. Anand Kumar", content: "Sir, I had a doubt regarding the time complexity analysis of the merge sort algorithm. Could you please clarify?", timestamp: "2024-02-28T10:30:00Z", read: true },
  { id: "msg2", senderId: "t1", senderName: "Dr. Anand Kumar", senderRole: "teacher", receiverId: "s1", receiverName: "Aisha Sharma", content: "Sure Aisha! Merge sort has O(n log n) time complexity in all cases. I will explain this in detail in our next class.", timestamp: "2024-02-28T11:00:00Z", read: false },
  { id: "msg3", senderId: "admin", senderName: "Admin Office", senderRole: "admin", receiverId: "t1", receiverName: "Dr. Anand Kumar", content: "Please submit your monthly attendance report by March 5, 2024.", timestamp: "2024-02-27T09:00:00Z", read: true },
];

export const ANALYTICS_ATTENDANCE: AnalyticsData[] = [
  { month: "Aug", attendance: 91 }, { month: "Sep", attendance: 88 }, { month: "Oct", attendance: 85 },
  { month: "Nov", attendance: 82 }, { month: "Dec", attendance: 78 }, { month: "Jan", attendance: 83 },
  { month: "Feb", attendance: 87 }, { month: "Mar", attendance: 89 },
];

export const ANALYTICS_FEE_COLLECTION: AnalyticsData[] = [
  { month: "Aug", fees: 2850000 }, { month: "Sep", fees: 3200000 }, { month: "Oct", fees: 1500000 },
  { month: "Nov", fees: 900000 }, { month: "Dec", fees: 500000 }, { month: "Jan", fees: 3800000 },
  { month: "Feb", fees: 2100000 }, { month: "Mar", fees: 1200000 },
];

export const ANALYTICS_ADMISSIONS: AnalyticsData[] = [
  { month: "2019", admissions: 320 }, { month: "2020", admissions: 345 }, { month: "2021", admissions: 398 },
  { month: "2022", admissions: 412 }, { month: "2023", admissions: 456 }, { month: "2024", admissions: 480 },
];

export const ANALYTICS_PERFORMANCE: AnalyticsData[] = [
  { month: "Aug", performance: 72 }, { month: "Sep", performance: 75 }, { month: "Oct", performance: 78 },
  { month: "Nov", performance: 76 }, { month: "Dec", performance: 74 }, { month: "Jan", performance: 79 },
  { month: "Feb", performance: 82 }, { month: "Mar", performance: 84 },
];

export const SUBJECT_PERFORMANCE = [
  { subject: "Data Structures", avg: 78, highest: 96, lowest: 45 },
  { subject: "DBMS", avg: 82, highest: 98, lowest: 52 },
  { subject: "Eng. Math", avg: 75, highest: 94, lowest: 40 },
  { subject: "Digital Electronics", avg: 80, highest: 97, lowest: 48 },
  { subject: "Physics", avg: 73, highest: 92, lowest: 38 },
  { subject: "Web Dev", avg: 88, highest: 99, lowest: 62 },
];

export const TEACHER_ATTENDANCE_DATA = [
  { month: "Aug", present: 22, absent: 0, leave: 2 },
  { month: "Sep", present: 24, absent: 1, leave: 1 },
  { month: "Oct", present: 23, absent: 0, leave: 2 },
  { month: "Nov", present: 21, absent: 1, leave: 3 },
  { month: "Dec", present: 20, absent: 0, leave: 4 },
  { month: "Jan", present: 25, absent: 2, leave: 0 },
  { month: "Feb", present: 23, absent: 1, leave: 2 },
];

export const LIBRARY_STATS = [
  { month: "Aug", issued: 145, returned: 132, overdue: 13 },
  { month: "Sep", issued: 189, returned: 175, overdue: 14 },
  { month: "Oct", issued: 201, returned: 195, overdue: 6 },
  { month: "Nov", issued: 178, returned: 170, overdue: 8 },
  { month: "Dec", issued: 112, returned: 108, overdue: 4 },
  { month: "Jan", issued: 224, returned: 210, overdue: 14 },
  { month: "Feb", issued: 198, returned: 185, overdue: 13 },
];

export const DEPARTMENT_DISTRIBUTION = [
  { name: "Computer Science", value: 420, color: "#4f46e5" },
  { name: "Electronics", value: 280, color: "#0ea5e9" },
  { name: "Mechanical", value: 240, color: "#10b981" },
  { name: "Civil", value: 180, color: "#f59e0b" },
  { name: "Electrical", value: 160, color: "#f43f5e" },
  { name: "Mathematics", value: 80, color: "#8b5cf6" },
];
