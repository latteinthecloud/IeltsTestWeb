import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import AuthContext for login functionality
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import authenApi from "../api/authenApi";
import accountApi from "../api/accountApi";


const Login = () => {
  const { login } = useAuth(); // Get login function from AuthContext
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
  
    // Step 1: Clear previous error message
    setError(null);
  
    // Step 2: Check if email or password is missing
    if (!email || !password) {
      setError("Email/Password is required!"); // Show error message
      return; // Stop the function execution if required fields are missing
    }
  
    try {
      // Step 3: Check if the account exists
      const accountList = await accountApi.getAll(); // Get all accounts or use another method to get the account
      const userAccount = accountList.find(account => account.email === email); // Find the account by email
  
      if (!userAccount) {
        // Step 4: If the account does not exist
        setError("Tài khoản không tồn tại, vui lòng đăng ký.");
        return;
      }
  
      // Step 5: If account exists, check if password matches
      if (userAccount.password !== password) {
        // Incorrect password
        setError("Sai email/mật khẩu.");
        return;
      }
  
      // Step 6: Call the login API (if needed) and navigate to home page
      const loginResponse = await authenApi.login(email, password); // Assuming you have a login API
  
      if (loginResponse && loginResponse.success) {
        // Navigate to the home page after successful login
        navigate("/");
      } else {
        // Handle any other errors returned by the login API
        setError("An error occurred. Please try again.");
      }
  
    } catch (err) {
      // Step 7: Catch network or other errors
      console.error(err);
      setError("An error occurred. Please try again later.");
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
        <button 
        className="auth-button"
        onClick={()=>handleLogin()}
        >Login
        </button>
        <div className="options">
          <label>
            <input type="checkbox" /> Remember Password
          </label>
          <a href="/forgot">Forgot Password?</a>
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
