import React from "react";
import styled from "styled-components";

// Import komponentów
import CoursesBlock from "../components/CoursesBlock";
import CalculatorMoney from "../components/CalculatorMoney";

// Import logo
import wallet from '../images/wallet.png'

const MainContainer = styled.div`
  position: relative;
  z-index: 0;

  .box-img {
    width: 50%;
    height: 30rem;
    position: absolute;
    top: -5rem;
    right: 0;
    z-index: -1;
    display: flex;
    justify-content: center;

    img {
      height: 100%;
      object-fit: cover;
    }
  }

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

    .box-img {
      opacity: 0.2;
      width: 60%;
    }

    h1 {
        font-size: 3rem;
        margin: 2rem 0;
    }
  }
`;

const HomePage = () => {
  return (
    <div data-aos="fade-zoom-in">
    <MainContainer>
      <h1>
        Kurs wszystkich
        <br /> walut
        <br />w<span> jednym miejscu</span>
      </h1>
      <div className="box-img"><img src={wallet}/></div>
      <CalculatorMoney />
      <CoursesBlock />
    </MainContainer>
    </div>
  );
};

export default HomePage;
