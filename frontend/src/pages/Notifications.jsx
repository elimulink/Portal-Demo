import { useState } from "react";
import "../styles/notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([
    { message: "New lecture notes uploaded", time: "2 hours ago", read: false },
    { message: "Assignment deadline approaching", time: "1 day ago", read: false },
    { message: "Fee payment reminder", time: "3 days ago", read: true },
    { message: "Course registration open", time: "5 days ago", read: true },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>Notifications</h2>
        <button onClick={markAllRead}>Mark all as read</button>
      </div>

      <div className="notifications-list">
        {notifications.map((note, index) => (
          <div key={index} className={`notification-card ${note.read ? "read" : "unread"}`}>
            <p className="message">{note.message}</p>
            <span className="time">{note.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;