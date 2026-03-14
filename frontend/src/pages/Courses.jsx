import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import "../styles/courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/dashboard/courses`)
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="courses-container">
      <h2>My Courses</h2>
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <h3>{course.name}</h3>
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
  );
}

export default Courses;
