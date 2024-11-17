import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import AuthContext for login functionality
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Login = () => {
  const { login } = useAuth(); // Get login function from AuthContext
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission

    // Attempt login with provided email and password
    const success = login(email, password);

    if (success) {
      navigate("/"); // Redirect to home on successful login
    } else {
      setError("Invalid email or password"); // Show error message
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <form className="auth-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
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
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
            />
            <i className="icon-eye"></i>
          </div>
        </div>
        <button type="submit" className="auth-button">
          Login
        </button>
        <div className="options">
          <label>
            <input type="checkbox" /> Remember Password
          </label>
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        <div className="divider">
          <span>OR</span>
        </div>
        <p>
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
