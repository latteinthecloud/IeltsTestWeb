import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import authenApi from "../api/authenApi";
import accountApi from "../api/accountApi"; // Import accountApi to check if email exists

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1); // Toggle password visibility
  };

  // Regex to validate email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    // Check if email is in correct format
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Check if email already exists in the database
      const response = await accountApi.getAll(); // Get all accounts to check if email exists
      const emailExists = response.some((account) => account.email === email); // Check if the email is already in the list

      if (emailExists) {
        setError("Email already exists.");
        return; // If email exists, stop further execution
      }

      // Step 2: If email does not exist, call the API to send verification code to the provided email
      await authenApi.code(email);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password); // Store password for later use
      navigate("/verify"); // Navigate to verification page
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Display error message if any */}
        {error && <div className="error-message">{error}</div>}

        {/* Email Input */}
        <div className="form-group-auth">
          <label>Email:</label>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="form-group-auth">
          <label>Password:</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"} // Toggle between password and text
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <i
              className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"} // Toggle icon based on showPassword state
              onClick={togglePasswordVisibility} // On click, toggle password visibility
              role="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            ></i>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="form-group-auth">
          <label>Confirm Password:</label>
          <div className="input-wrapper">
            <input
              type={showPassword1 ? "text" : "password"} // Toggle between password and text
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <i
              className={showPassword1 ? "fas fa-eye" : "fas fa-eye-slash"} // Toggle icon based on showPassword state
              onClick={togglePasswordVisibility1} // On click, toggle password visibility
              role="button"
              aria-label={showPassword1 ? "Hide password" : "Show password"}
            ></i>
          </div>
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
