import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Import AuthContext for login functionality
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import accountApi from "../api/accountApi";



const Login = () => {
  const { login } = useAuth(); // Get login function from AuthContext
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true); // Automatically check the 'Remember Me' box
    }
  }, []);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handleLogin = async () => {

    // Step 1: Clear previous error message
    setError(null);
  
     // Step 2: Check if email or password is missing
     if (!email) {
      console.log("Email is required!"); // Log specific error for email
      setError("Email is required!"); // Show error message for email
      return; // Stop execution if email is missing
    }

    if (!password) {
      console.log("Password is required!"); // Log specific error for password
      setError("Password is required!"); // Show error message for password
      return; // Stop execution if password is missing
    }
  
    try {

      // Step 3: Get the list of accounts from the API
      const accountList = await accountApi.getAll(); // Assuming accountApi.getAll() fetches all accounts
      const userAccount = accountList.find(account => account.email === email); // Find the account by email

      if (!userAccount) {
        // Step 4: If the account does not exist
        setError("Account doesn't exist, please sign up!.");
        return;
      }
  
      // Step 5: Call the login API (if needed) and navigate to home page
      const loginResponse = await login(email, password); // Assuming you have a login API
      console.log(loginResponse)
  
      if (loginResponse.success === true) {
        // Navigate to the home page after successful login
            // If login is successful, check "Remember Me" option
            if (rememberMe) {
              localStorage.setItem("email", email);
              localStorage.setItem("password", password);
            } else {
              localStorage.removeItem("email");
              localStorage.removeItem("password");
            }
        navigate("/");
      } else {
        // Handle any other errors returned by the login API
        setError("Wrong password, please try again!");
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
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <div className="auth-form">
        <div className="form-group">
          <label>Email</label>
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
  <label>Password</label>
  <div className="input-wrapper">
    <input
      type={showPassword ? "text" : "password"} // Toggle between password and text
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    {/* Eye icon positioned outside the input */}
    <i
      className={ showPassword ? "fas fa-eye" : "fas fa-eye-slash"} // Toggle icon based on showPassword state
      onClick={togglePasswordVisibility} // On click, toggle password visibility
      role="button"
      aria-label={showPassword ? "Hide password" : "Show password"}
    />
  </div>
</div>

        <button 
        className="auth-button"
        onClick={()=>handleLogin()}
        >Login
        </button>
        <div className="options">
          <label>
            <input 
            type="checkbox" 
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            style={{width: "fit-content"}}
            /> Remember Password
          </label>
          <a style={{fontWeight: 600}} href="/forgot">Forgot Password?</a>
        </div>
        <div className="divider">
          <span>OR</span>
        </div>
        <p>
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
