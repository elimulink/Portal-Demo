export const demoCourses = [
  { id: 1, name: "Introduction to Programming", instructor: "CSC101", progress: 75 },
  { id: 2, name: "Database Systems", instructor: "CSC204", progress: 60 },
  { id: 3, name: "Computer Networks", instructor: "CSC210", progress: 90 },
];

export const demoAssignments = [
  { id: 1, title: "Programming Lab Report", due_date: "2026-03-18", status: "completed" },
  { id: 2, title: "Database Design Project", due_date: "2026-03-22", status: "pending" },
];

export const demoTimetable = [
  { id: 1, course_name: "Introduction to Programming", day: "Monday", start_time: "8:00 AM", end_time: "10:00 AM", location: "Lab 1" },
  { id: 2, course_name: "Database Systems", day: "Wednesday", start_time: "11:00 AM", end_time: "1:00 PM", location: "Room B12" },
  { id: 3, course_name: "Computer Networks", day: "Friday", start_time: "2:00 PM", end_time: "4:00 PM", location: "Room C05" },
];

export const demoStats = {
  total_courses: 3,
  completed_assignments: 1,
  pending_assignments: 1,
  fees_paid: 38000,
  fees_due: 12000,
  upcoming_classes: 3,
  unread_notifications: 2,
};
