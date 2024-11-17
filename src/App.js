import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import MainContent from './components/MainContent/MainContent';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Navbar />
        <MainContent />
      </div>
    </Router>
  );
};

export default App;
