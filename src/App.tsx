import React from "react";
import "./App.css";

// Import komponentów
import PageManage from "./layouts/PageManage";
import Navigation from "./components/navigation";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <hr />
        <PageManage />
      </Router>
    </div>
  );
}

export default App;
