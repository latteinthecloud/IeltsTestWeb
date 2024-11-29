import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import authenApi from "../api/authenApi"; // Import the API
import accountApi from "../api/accountApi"; // Import accountApi to create account

const Verify = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState(""); // To store any error messages
  const [successMessage, setSuccessMessage] = useState(""); // To store success message

  // Retrieve the email from localStorage
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password"); // Assuming you stored the password as well

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Clear any previous error
    setError("");
    setSuccessMessage(""); // Reset success message

    try {
      // Step 1: Call the verification API with email and code
      await authenApi.verificationApi(email, code);

      // Step 2: Call the API to create the account after verification
      await accountApi.create(email, password);

      // Step 3: Display success message and navigate to the login page
      setSuccessMessage("Create account successful!");
      setTimeout(() => {
        navigate("/login"); // Redirect to login after 2 seconds
      }, 2000); // 2 seconds delay for success message
    } catch (err) {
      // Step 4: Handle any errors during the process
      if (err.response && err.response.data) {
        setError("The verification code is incorrect. Please try again.");
      } else {
        setError("An error occurred. Please check your code and try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Verification</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
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

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default Verify;
