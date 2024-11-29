import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import authenApi from "../api/authenApi";
import "../styles/Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // State to manage the email input
  const navigate = useNavigate(); // Initialize the navigate function
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error messages
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    setIsLoading(true); // Set loading to true while making the request
    setErrorMessage(""); // Clear any previous error messages

    try {
      // Call the code API to send a verification code to the email
      await authenApi.code(email);

      // If successful, navigate to the verification page with state
      navigate("/verify", { state: { email } }); // Pass email to Verify page via state
    } catch (error) {
      // Handle errors (e.g., show an error message if the API call fails)
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state after the request is complete
    }
  
  }; 


  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update the email state
              required
            />
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
        <button type="submit" className="auth-button" disabled={isLoading}>
          {isLoading ? "Sending..." : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
