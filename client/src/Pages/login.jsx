import React, { useContext } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import apiRequest from "../../../api/lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../context/userContext";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await apiRequest.post("/api/login", { username, password }, { withCredentials: true });
    if (res.status === 200) {
      alert("Login successful");
      const userInfo = res.data;
      setUserInfo(userInfo);
      navigate("/");
    } else {
      alert("Login failed");
    }
  }

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
          <Link id="l1" to="/register">
            Don't you have an account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default login;
