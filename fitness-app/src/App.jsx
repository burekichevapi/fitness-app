import React from "react";
import Home from "./page/home";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/navbar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <div>
        <section>
          <Routes>
            {" "}
            <Route path="/" element={<Home />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
};

export default App;
