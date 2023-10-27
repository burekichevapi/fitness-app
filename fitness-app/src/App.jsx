import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/sideNavbar/sideNavbar";
import Home from './pages/home';
import FindExercises from './pages/find-exercises';
import "./theme.css";

const App = () => {
  return (
    <Router>
      <NavBar />
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-workout" element={null} />
          <Route path="/goals-progress" element={null} />
          <Route path="/find-exercises" element={<FindExercises />} />
        </Routes>
      </section>
    </Router >
  );
};

export default App;