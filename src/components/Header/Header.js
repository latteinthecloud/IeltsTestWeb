import React from 'react';
import './Header.css';
import logo from "../../assets/logo.png";
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>IELTS Online Tests</h1>
      </div>
    </header>
  );
};

export default Header;
