import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import styled from "styled-components";

// Import komponentów
import RightNav from "./RightNav";

// Import logo
import logoMain from '../images/logo-main.png'

const MainContainer = styled.div`
  z-index: 0;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;


  img {
    width: 22rem;
    z-index: 2;
  }


  @media (max-width: 767px) {
    padding-left: 1.5rem;

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
    position: ${(props) => (props.open ? "fixed" : "relative !important")};
    right: ${(props) => (props.open ? "0" : " ")};
    margin: 1.5rem;
    height: 2.75rem;
    width: 2.75rem;
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
    <MainContainer>
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
        MENU
      </Button>

      <RightNav open={isOpenMenu} handleMenu={handleOpenMenu}/>
    </MainContainer>
  );
};

export default Navigation;
