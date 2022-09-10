import React from "react";
import styled from "styled-components";


// Import komponentów
import CoursesBlock from "../components/CoursesBlock";
import CalculatorMoney from "../components/CalculatorMoney";

const MainContainer = styled.div`
  position: relative;

  h1 {
    font-family: "Times New Roman", sans-serif;
    font-weight: 700;
    color: #4e5255;
    font-size: 4rem;

    span {
        color: #29B35E;
    }
  }
`;

const HomePage = () => {
  return (
    <MainContainer>
      <h1>
        Kurs wszystkich<br/> walut
        <br />w<span> jednym miejscu</span>
      </h1>
      <CalculatorMoney />
      <CoursesBlock />
    </MainContainer>
  );
};

export default HomePage;
