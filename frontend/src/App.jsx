import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* Components */
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

/* Pages */
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Timetable from "./pages/Timetable";
import Assignments from "./pages/Assignments";
import Fees from "./pages/Fees";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

import "./App.css";

/* Check authentication */
const isAuthenticated = () => {
  return localStorage.getItem("token");
};

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <Router>

      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Portal */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>

              <div className="portal-layout">

                <Sidebar />

                <div className="main-section">

                  <Navbar />

                  <div className="page-content">

                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="/timetable" element={<Timetable />} />
                      <Route path="/assignments" element={<Assignments />} />
                      <Route path="/fees" element={<Fees />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/profile" element={<Profile />} />
                    </Routes>

                  </div>

                </div>

              </div>

            </ProtectedRoute>
          }
        />

      </Routes>

    </Router>
  );
}

export default App;