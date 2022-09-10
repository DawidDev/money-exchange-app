import React from "react";
import styled from "styled-components";

// Import komponentów
import CoursesBlock from "../components/CoursesBlock";
import CalculatorMoney from "../components/CalculatorMoney";

const MainContainer = styled.div`
  position: relative;
  z-index: 0;

  h1 {
    font-family: "Times New Roman", sans-serif;
    font-weight: 700;
    color: #4e5255;
    font-size: 4rem;
    margin: 3rem 0;

    span {
      color: #29b35e;
    }
  }

  @media (max-width: 768px) {

    padding: 0 1rem;

    h1 {
        font-size: 3rem;
        margin: 2rem 0;
    }
  }
`;

const HomePage = () => {
  return (
    <MainContainer>
      <h1>
        Kurs wszystkich
        <br /> walut
        <br />w<span> jednym miejscu</span>
      </h1>
      <CalculatorMoney />
      <CoursesBlock />
    </MainContainer>
  );
};

export default HomePage;
