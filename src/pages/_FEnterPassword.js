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
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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
