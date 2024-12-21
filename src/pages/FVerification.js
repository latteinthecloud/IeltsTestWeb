import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import authenApi from "../api/authenApi";
import "../styles/Auth.css";

const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get location object
  const [code, setCode] = useState(""); // State for the verification code
  const [error, setError] = useState(""); // State for error messages

  // Retrieve email from location.state passed via navigate
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Call verification API with email and verification code
      await authenApi.verificationApi(email, code);
      
      // Navigate to the next page after successful verification
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setError("Account verification failed. Please check the code.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Verification</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Display error message if there is any */}
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label>Verification Code:</label>
          <div className="input-wrapper">
            <input
              type="text" // Use "text" for the code input field
              placeholder="Enter your verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="auth-button">
          Verify
        </button>
      </form>

      {error && <p className="error-message">{error}</p>} {/* Display error if there's any */}
    </div>
  );
};

export default Verify;
