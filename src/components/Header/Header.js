import React from 'react';
import './Header.css';
import logo from "../../assets/logo.png";
const Header = () => {
  return (
    <div className="header-container">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h1>IELTS Online Tests</h1>
        </div>
      </header>
    </div>
  );
};

export default Header;
