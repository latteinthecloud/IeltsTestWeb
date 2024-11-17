import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth(); // Access auth state and functions
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Log the user out
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        {/* Conditionally render links only if the user is not an admin */}
        {user?.role !== "admin" && (
          <>
            <Link to="/" className="nav-item">
              IELTS Exam Library
            </Link>
            <Link to="/exercise" className="nav-item">
              Exercise
            </Link>
            <Link to="/statistic" className="nav-item">
              Statistic
            </Link>
          </>
        )}
      </div>
      <div className="auth-links">
        {isAuthenticated ? (
          <>
            <span className="welcome-message">Welcome, {user?.role}!</span>
            <button className="nav-item logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="nav-item">
              Sign up
            </Link>
            <Link to="/login" className="nav-item">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
