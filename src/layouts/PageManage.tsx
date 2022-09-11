import React from "react";
import {Routes, Route} from "react-router-dom";

import HomePage from "./HomePage";
import AllCourses from "./AllCourses";
import WatchedCourses from "./WatchedCourses";
import Faq from "./Faq";
import SelectedCurrency from "./SelectedCurrency";

const PageManage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/all-courses" element={<AllCourses />}></Route>
        <Route path="/watched-courses" element={<WatchedCourses />}></Route>
        <Route path="/faq" element={<Faq />}></Route>
        <Route path="/all-courses/:name" element={<SelectedCurrency />}></Route>
      </Routes>
    </>
  );
};

export default PageManage;
