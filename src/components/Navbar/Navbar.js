import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth(); // Access auth state and functions
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // Track dropdown state
  const dropdownRef = useRef(null); // Ref for dropdown menu
  const avatarContainerRef = useRef(null); // Ref for avatar container

  // Logout function
  const handleLogout = () => {
    logout(); // Log the user out
    navigate("/login"); // Redirect to login page
  };

  // Toggle dropdown visibility on avatar container click
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown state on click
  };

  // Show dropdown when hover over the avatar container
  const showDropdown = () => {
    setDropdownOpen(true);
  };

  // Hide dropdown when mouse leaves the dropdown menu
  const hideDropdown = () => {
    if (!dropdownRef.current.contains(document.activeElement)) {
      setDropdownOpen(false);
    }
  };

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if clicked outside avatar container or dropdown menu
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarContainerRef.current &&
        !avatarContainerRef.current.contains(event.target)
      ) {
        setDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Listen for clicks outside
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="nav-container">
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
              <Link to="/result-page" className="nav-item">
                Record
              </Link>
            </>
          )}

          {/* Hiển thị Nav dành riêng cho admin */}
          {user?.role === "admin" && (
            <>
              <Link to="/statistics" className="nav-item">
                Statistics
              </Link>
              <Link to="/test" className="nav-item">
                Test
              </Link>
              <Link to="/user" className="nav-item">
                User
              </Link>
            </>
          )}
        </div>

        <div className="auth-links">
          {isAuthenticated ? (
            <>
              <div
                ref={avatarContainerRef}
                className="avatar-container"
                onClick={toggleDropdown} // Toggle dropdown on click
                onMouseEnter={showDropdown} // Show dropdown on hover
              >
                <img
                  src="https://static.independent.co.uk/2024/10/18/15/shutterstock_editorial_13383768cn.jpg"
                  alt="User Avatar"
                  className="avatar-img"
                />
                <span className="username">{user?.email}</span>{" "}
                {/* Display user's email */}
                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="dropdown-menu"
                    onMouseLeave={hideDropdown} // Hide dropdown on mouse leave from menu
                  >
                    <button
                      onClick={() => navigate("/profile")}
                      className="dropdown-item"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => navigate("/statistic")}
                      className="dropdown-item"
                    >
                      Statistic
                    </button>
                    <button onClick={handleLogout} className="dropdown-item">
                      {" "}
                      Logout{" "}
                    </button>
                  </div>
                )}
                <img
                  style={{ width: "20px", height: "20px" }}
                  src={require("../../assets/expand_arrow_20px.png")}
                  alt="expand-icon"
                />
              </div>
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
    </div>
  );
};

export default Navbar;
