import React from "react";
import Home from "./pages/home";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/navbar";
import "./theme.css";

const App = () => {
  return (
    <Router>
      <>
        <NavBar />
        <section>
          <Routes>
            {" "}
            <Route path="/" element={<Home />} />
          </Routes>
        </section>
      </>
    </Router >
  );
};

export default App;
