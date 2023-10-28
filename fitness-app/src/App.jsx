import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/sideNavbar/sideNavbar";
import FindExercises from './pages/find-exercises';
import "./App.css";

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="content">
        <section>
          <Routes>
            <Route path="/" element={<FindExercises />} />
            <Route path="/my-workout" element={null} />
            <Route path="/goals-progress" element={null} />
          </Routes>
        </section>
      </div>
    </Router >
  );
};

export default App;