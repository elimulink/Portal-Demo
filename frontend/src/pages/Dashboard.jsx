import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import "../styles/dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch dashboard summary
    axios.get(`${API_BASE}/dashboard`)
      .then(res => setStats(res.data))
      .catch(err => console.error(err));

    // Fetch courses
    axios.get(`${API_BASE}/dashboard/courses`)
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));

    // Fetch assignments
    axios.get(`${API_BASE}/dashboard/assignments`)
      .then(res => setAssignments(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <div>Loading dashboard...</div>;

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
