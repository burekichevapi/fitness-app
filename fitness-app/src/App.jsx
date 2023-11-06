import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/sideNavbar/sideNavbar";
import FindExercises from './pages/find-exercises';
import DisplayFavorites from "./pages/find-favorites";
import "./App.css";

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="content">
        <section>
          <Routes>
            <Route path="/" element={<FindExercises />} />
            <Route path="/my-workout" element={<DisplayFavorites />} />
            <Route path="/goals-progress" element={null} />
          </Routes>
        </section>
      </div>
    </Router >
  );
};

export default App;