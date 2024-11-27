import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Register = () => {
  const navigate = useNavigate(); // useNavigate hook to navigate to other pages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Simple validation (you can extend this with more validation logic)
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Perform registration logic here (e.g., API call)

    // After registration is successful, navigate to the login page
    navigate("/login"); // Assuming your login page route is "/login"
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="icon-eye"></i>
          </div>
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <i className="icon-eye"></i>
          </div>
        </div>
        <button type="submit" className="auth-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
