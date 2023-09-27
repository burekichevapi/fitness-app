import React from "react";
import Home from "./page/home";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
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
