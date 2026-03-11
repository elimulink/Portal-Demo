import React from "react";
import "../styles/navbar.css";

function Navbar() {

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  };

  return (

    <div className="navbar">

      <h3>Student Portal</h3>

      <button onClick={logout} className="logout-btn">
        Logout
      </button>

    </div>

  );

}

export default Navbar;