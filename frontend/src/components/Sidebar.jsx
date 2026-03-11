import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaClipboardList,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaBell,
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight
} from "react-icons/fa";
import "../styles/sidebar.css";

function Sidebar({ collapsed, setCollapsed }) {
  const menu = [
    { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { name: "Courses", path: "/courses", icon: <FaBook /> },
    { name: "Assignments", path: "/assignments", icon: <FaClipboardList /> },
    { name: "Timetable", path: "/timetable", icon: <FaCalendarAlt /> },
    { name: "Fees", path: "/fees", icon: <FaMoneyBillWave /> },
    { name: "Notifications", path: "/notifications", icon: <FaBell /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="logo">
        {!collapsed && <h1>University Portal</h1>}
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </button>
      </div>

      <nav className="menu">
        <p className="menu-title">{!collapsed && "Main"}</p>
        {menu.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}
          >
            <span className="icon">{item.icon}</span>
            {!collapsed && <span className="text">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;