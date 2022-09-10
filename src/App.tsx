import React from "react";
import "./App.css";
import styled from "styled-components";

// Import komponentów
import PageManage from "./layouts/PageManage";
import Navigation from "./components/navigation";
import { BrowserRouter as Router } from "react-router-dom";

const AppContainer = styled.div`
  margin: 0 auto;
  //border: 1px solid red;
  font-family: "Poppins", sans-serif;


  @media (min-width: 767px) {
    max-width: 1400px;
    width: 100%;
    padding: 0 1rem;
  }
`


function App() {
  return (
    <AppContainer>
      <Router>
        <Navigation />
        <hr />
        <PageManage />
      </Router>
    </AppContainer>
  );
}

export default App;
