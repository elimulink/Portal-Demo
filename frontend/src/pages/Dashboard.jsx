import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import { demoAssignments, demoCourses, demoStats } from "../demoData";
import "../styles/dashboard.css";

const EMPTY_STATS = demoStats;

function Dashboard() {
  const [stats, setStats] = useState(EMPTY_STATS);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      axios.get(`${API_BASE}/dashboard`),
      axios.get(`${API_BASE}/dashboard/courses`),
      axios.get(`${API_BASE}/dashboard/assignments`),
    ]).then(([statsResult, coursesResult, assignmentsResult]) => {
      if (statsResult.status === "fulfilled") {
        const apiStats = statsResult.value.data || {};
        const hasValues = Object.values(apiStats).some(value => value !== 0 && value !== null && value !== "");
        setStats(hasValues ? { ...EMPTY_STATS, ...apiStats } : EMPTY_STATS);
      } else {
        console.error(statsResult.reason);
        setStats(EMPTY_STATS);
      }

      if (coursesResult.status === "fulfilled") {
        const apiCourses = coursesResult.value.data || [];
        setCourses(apiCourses.length ? apiCourses : demoCourses);
      } else {
        console.error(coursesResult.reason);
        setCourses(demoCourses);
      }

      if (assignmentsResult.status === "fulfilled") {
        const apiAssignments = assignmentsResult.value.data || [];
        setAssignments(apiAssignments.length ? apiAssignments : demoAssignments);
      } else {
        console.error(assignmentsResult.reason);
        setAssignments(demoAssignments);
      }

      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="dashboard-container">
      {/* Stats Cards */}
      <div className="cards">
        <div className="card">
          <h3>Total Courses</h3>
          <p>{stats.total_courses}</p>
        </div>
        <div className="card">
          <h3>Completed Assignments</h3>
          <p>{stats.completed_assignments}</p>
        </div>
        <div className="card">
          <h3>Pending Assignments</h3>
          <p>{stats.pending_assignments}</p>
        </div>
        <div className="card">
          <h3>Fees Paid / Due</h3>
          <p>${stats.fees_paid} / ${stats.fees_due}</p>
        </div>
        <div className="card">
          <h3>Upcoming Classes</h3>
          <p>{stats.upcoming_classes}</p>
        </div>
        <div className="card">
          <h3>Unread Notifications</h3>
          <p>{stats.unread_notifications}</p>
        </div>
      </div>

      {/* Courses Section */}
      <div className="section">
        <h2>My Courses</h2>
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <h4>{course.name}</h4>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p>{course.progress}% Complete</p>
            </div>
          ))}
        </div>
      </div>

      {/* Assignments Section */}
      <div className="section">
        <h2>Assignments</h2>
        <table className="assignments-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(assignment => (
              <tr key={assignment.id}>
                <td>{assignment.title}</td>
                <td>{assignment.due_date}</td>
                <td
                  className={
                    assignment.status === "completed" ? "completed" : "pending"
                  }
                >
                  {assignment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
