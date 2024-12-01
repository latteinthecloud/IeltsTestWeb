import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import authenApi from "../api/authenApi"; // Import authenApi
import "../styles/Auth.css";

const EnterPassword = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to access the state
  const [password, setPassword] = useState(""); // State for password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming password
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // To store error messages

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1); // Toggle password visibility
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  // Retrieve the email from the location state
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Simple validation (check if passwords match)
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true); // Set loading state to true when request starts
    try {
      // Call the password API to reset the password
      await authenApi.password(email, password); // Send email and new password to the API
      navigate("/login"); // Navigate to the login page after successful password reset
    } catch (err) {
      setError("An error occurred. Please try again."); // Handle any errors
    } finally {
      setLoading(false); // Reset loading state after the request is done
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Password:</label>
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
    />
          </div>
        </div>

        <div className="form-group">
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
    />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>} {/* Display error message if any */}

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Please wait..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default EnterPassword;
