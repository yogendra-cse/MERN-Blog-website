import React from "react";
import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../../api/lib/apiRequest";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  async function registerUser(e) {
    e.preventDefault();
    const res = await apiRequest.post("/api/register", {
      username, email, password
    });
    if (res.status === 201) {
      alert("User registered successfully");
      navigate("/login");
    } else {
      alert("registeration failed");
    }
  } 
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={registerUser}>
          <h1>Create an Account</h1>
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" disabled={!username || !email || !password}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
