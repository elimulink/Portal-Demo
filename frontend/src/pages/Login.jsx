import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import "../styles/login.css";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(`${API_BASE}/auth/login`, {
        username,
        password
      });

      /* Save token */
      localStorage.setItem("token", res.data.access_token);

      /* Redirect to dashboard */
      window.location.href = "/";

    } catch (err) {

      alert("Invalid username or password");
      console.error(err);

    }

  };

  return (

    <div className="login-container">

      <form className="login-card" onSubmit={handleLogin}>

        <h2>Student Portal Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

      </form>

    </div>

  );
}

export default Login;
