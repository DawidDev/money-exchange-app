import React from "react";
import styled from "styled-components";

// Import logo
import logoMain from "../images/logo-main.png";

const MainContainer = styled.div`
  width: 100%;

  .logo {
    display: flex;
    justify-content: center;
    margin: 1.25rem 0;

    img {
      width: 12rem;
    }
  }

  .box {
    background-color: #4e5255;
    display: flex;
    justify-content: center;

    .col {
        color: #fff;
        margin: 1.25rem 3rem;
        display: flex;
        align-items: center;
        font-size: 0.85rem;

        span {
            color: #29B35E;
            margin-left: 0.5rem;
            font-weight: 600;
            font-size: 1rem;
        }
    }
  }

  @media (max-width: 767px) {
    margin-top: 5rem;
    .box {
      flex-direction: column;
      padding: 0.75rem 0;
      
      .col {
        font-size: 0.75rem;
        display: flex;
        justify-content: center;
        margin: 0;

        span {
          font-size: 0.85rem;
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <MainContainer>
      <div className="logo">
        <img src={logoMain} alt="" />
      </div>
      <div className="box">
        <div className="col">Copyright © 2022</div>
        <div className="col">designed by <span>Dawid Rożak</span></div>
      </div>
    </MainContainer>
  );
};

export default Footer;
