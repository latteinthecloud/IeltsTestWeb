import React from "react";
import "../styles/Auth.css";

const Register = () => {
  return (
    <div className="auth-container">
      <h2>Register</h2>
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <div className="input-wrapper">
            <input type="password" placeholder="Confirm your password" />
            <i className="icon-eye"></i>
          </div>
        </div>
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
