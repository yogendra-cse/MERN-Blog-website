import { Link, useNavigate, useLocation } from "react-router-dom"; // Add useLocation import here
import { useEffect, useState } from "react";
import apiRequest from "../../api/lib/apiRequest";
import { UserContext } from "./context/userContext";
import { useContext } from "react";
import './Header.css';
export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation(); // Add this line to get current route
  

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest.post("/api/logout");
      setUserInfo(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  }
  const username = userInfo?.username;
  useEffect(() => { 
    const fetchProfile = async () => {
      try {
        const response = await apiRequest.get("/api/profile");
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        if (error.response && error.response.status === 401) {
          setUserInfo(null);
        }
      }
    };
  
    // Only fetch profile if userInfo exists or we're not on login/register pages
    if (userInfo || !['/login', '/register'].includes(location.pathname)) {
      fetchProfile();
    }
  }, [location, userInfo]); // Add userInfo to dependencies`

  return (
    <header>
      <Link to="/" className="logo">My Blog</Link>
      <nav>
        {userInfo ? (
          <>
            {/* <span>Welcome, {username}</span> */}
            <Link to="/create">Create New Post</Link>
            <button id = "logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}