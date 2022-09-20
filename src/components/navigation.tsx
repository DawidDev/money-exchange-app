import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import styled from "styled-components";

// Import komponentów
import RightNav from "./RightNav";

// Import logo
import logoMain from '../images/logo-main.png'

const MainContainer = styled.div<Props>`
  z-index: 1;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  position: relative;
  width: 100%;
  top: 0;

  img {
    width: 22rem;
    z-index: 2;
  }


  @media (max-width: 767px) {
    padding-left: 1.5rem;
    position: ${(props) => (props.open ? "fixed" : "absolute")};
    height: 7rem;
    img {
      width: 15rem;
    }
  }

  @media (max-width: 1024px){
    img {
      width: 17rem;
    }
  }
`;

const NavContainer = styled.div<Props>`
  width: 50%;
  
  ul {
    display: flex;
    justify-content: space-between;
    list-style-type: none;
    
    li {
      a {
        text-decoration: none;
        color: #4E5255;
        position: relative;
        font-size: 1.15rem;
        font-weight: 400;

        ::before {
          content: " ";
          position: absolute;
          bottom: -0.25rem;
          background-color: #29B35E;
          width: 100%;
          height: 1.5px;
          transition: 0.40s;
          opacity: 0;
        }
      }

      .active {
        color: #29B35E;
        font-weight: 500;

        ::before {
          opacity: 1;
        }
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 1024px){
    width: 60%;
  }
`;

const Button = styled.button<Props>`
display: none;
  @media (max-width: 767px) {
    display: block;
    z-index: 5 !important;
    margin: 1.5rem;
    height: 2.75rem;
    width: 3.5rem;
    padding: 0;
    position: relative;
    background-color: transparent;
    border: none;
    outline: none;

    .line_1, .line_2, .line_3 {
      width: 100%;
      height: 4px;
      border-radius: 10px;
      background-color: ${(props) => (props.open ? "#29B35E" : "#4E5255")};
      margin: 0.3rem 0;
      transition: 0.25s;
      transform: rotate(0deg);
    }

    .line_2 {
      width: ${(props) => (props.open ? "0" : "100%")};
      opacity: ${(props) => (props.open ? "0" : "1")};
      margin: 0 auto;
    }

    .line_1 {
      transform: ${(props) => (!props.open ? "rotate(0)" : "rotate(45deg)")};
      top: ${(props) => (!props.open ? "68%" : "35%")};
      position: absolute;
    }
    .line_3{
      transform: ${(props) => (!props.open ? "rotate(0)" : "rotate(-45deg)")};
      top: ${(props) => (!props.open ? "0%" : "35%")};
      position: absolute;
    }
  }
`;

// Typ dla propsów przesyłanych do stylowanych komponentów
type Props = {
  open: boolean;
};

type FunctionHandleOpenMenu = () => void;

const Navigation = () => {
  // Zmienna decydująca o otwartym menu
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const handleOpenMenu: FunctionHandleOpenMenu = () =>
    setIsOpenMenu((prevValue) => !prevValue);

  return (
    <MainContainer open={isOpenMenu}>
      <img src={logoMain} alt='#' />
      <NavContainer open={isOpenMenu}>
        <ul>
          <li>
            <NavLink to="/" className={(navData) => (navData.isActive ? 'active' : '')}>Start</NavLink>
          </li>
          <li>
            <NavLink to="/all-courses" className={(navData) => (navData.isActive ? 'active' : '')}>Wszystkie kursy</NavLink>
          </li>
          <li>
            <NavLink to="/watched-courses" className={(navData) => (navData.isActive ? 'active' : '')}>Obserwowane kursy</NavLink>
          </li>
          <li>
            <NavLink to="/faq" className={(navData) => (navData.isActive ? 'active' : '')}>FAQ</NavLink>
          </li>
        </ul>
      </NavContainer>
      <Button open={isOpenMenu} onClick={handleOpenMenu}>
        <div className="line_1"></div>
        <div className="line_2"></div>
        <div className="line_3"></div>
      </Button>

      <RightNav open={isOpenMenu} handleMenu={handleOpenMenu}/>
    </MainContainer>
  );
};

export default Navigation;
