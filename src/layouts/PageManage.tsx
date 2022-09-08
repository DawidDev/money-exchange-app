import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomePage from "./HomePage";
import AllCourses from "./AllCourses";
import WatchedCourses from "./WatchedCourses";
import Faq from "./Faq";

const PageManage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/all-courses" element={<AllCourses />}></Route>
        <Route path="/watched-courses" element={<WatchedCourses />}></Route>
        <Route path="/faq" element={<Faq />}></Route>
      </Routes>
    </>
  );
};

export default PageManage;
