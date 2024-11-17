import React from "react";
import "../styles/Auth.css";

const Login = () => {
  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form">
        <div className="form-group">
          <label>Email:</label>
          <div className="input-wrapper">
          <input type="email" placeholder="Enter your email" />
          </div>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <div className="input-wrapper">
            <input type="password" placeholder="Enter your password" />
            <i className="icon-eye"></i>
          </div>
        </div>
        <button type="submit" className="auth-button">Login</button>
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
