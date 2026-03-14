import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import "../styles/assignments.css";

function Assignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/dashboard/assignments`)
      .then(res => setAssignments(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="assignments-container">
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
          {assignments.map(a => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.due_date}</td>
              <td className={a.status === "completed" ? "completed" : "pending"}>
                {a.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Assignments;
