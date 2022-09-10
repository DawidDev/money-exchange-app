import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  background-color: silver;
  max-width: 28rem;
  width: 100%;
  height: 22rem;
  position: relative;

  @media (max-width: 767px) {
    order: 3;
    margin: 2rem auto;
  }
`;

const CoursesBlock = () => {
  return <MainContainer>courses block</MainContainer>;
};

export default CoursesBlock;
