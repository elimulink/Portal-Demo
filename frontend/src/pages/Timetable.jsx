import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import "../styles/timetable.css";

function Timetable() {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/timetable`)
      .then(res => setTimetable(res.data))
      .catch(err => console.error(err));
  }, []);

  // Group entries by day
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const grouped = {};
  daysOfWeek.forEach(day => {
    grouped[day] = timetable.filter(entry => entry.day === day);
  });

  return (
    <div className="timetable-container">
      <h2>Weekly Timetable</h2>
      <div className="timetable-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="timetable-day">
            <h3>{day}</h3>
            {grouped[day].length === 0 && <p>No classes</p>}
            {grouped[day].map(entry => (
              <div key={entry.id} className="timetable-entry">
                <h4>{entry.course_name}</h4>
                <p>{entry.start_time} - {entry.end_time}</p>
                <p>{entry.location}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timetable;
