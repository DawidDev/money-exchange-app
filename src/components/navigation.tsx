import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      nawigacja
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/all-courses">Wszystkie kursy</Link>
          </li>
          <li>
            <Link to="/watched-courses">Obserwowane kursy</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
