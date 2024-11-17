import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-item">IELTS Exam Library</Link>
        <Link to="/exercise" className="nav-item">Exercise</Link>
        <Link to="/statistic" className="nav-item">Statistic</Link>
      </div>
      <div className="auth-links">
        <Link to="/signup" className="nav-item">Sign up</Link>
        <Link to="/login" className="nav-item">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
