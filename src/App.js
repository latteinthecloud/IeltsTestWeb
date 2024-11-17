import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import MainContent from "./components/MainContent/MainContent";
import ExercisePage from "./pages/ExercisePage";
import StatisticPage from "./pages/StatisticPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CreateListeningTestPage from "./pages/CreateListeningTestPage";
import CreateReadingTestPage from "./pages/CreateReadingTestPage";

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Common Header and Navbar */}
        <Header />
        <Navbar />

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/exercise" element={<ExercisePage />} />
          <Route path="/statistic" element={<StatisticPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/exercise/create-listening-test" element={<CreateListeningTestPage />} />
          <Route path="/exercise/create-reading-test" element={<CreateReadingTestPage />} />

        </Routes>
      </div>
    </Router>
  );
};



export default App;
