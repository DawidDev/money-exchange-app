import React from "react";
import styled from "styled-components";

const CurrencyContainer = styled.div`
  border-bottom: 1px solid #F4F2EE;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.45rem 0;

  #short-name {
    min-width: auto;
    width: 10%;
  }

  #name {
    width: 30%;
  }

  #sell, #buy {
    width: 15%;
  }

  button {
   border: none;
   background-color: transparent;
   font-weight: 500;
   color: #91c8a6;
   font-family: "Poppins", sans-serif;
   transition: 0.25s;
  }

  button:hover {
    color: #29B35E;
    cursor: pointer;
  }

`;

type CurrencyBoxProps = {
  id: number;
  name: string;
  shortName: string;
  sell: number;
  buy: number;
};

const CurrencyBox = (props: CurrencyBoxProps) => {
  return( 
  <CurrencyContainer>
    <p id="short-name">{props.shortName}</p>
    <p id="name">{props.name}</p>
    <p id="sell">{props.sell}</p>
    <p id="buy">{props.buy}</p>
    <button>Obserwuj</button>
  </CurrencyContainer>)
};

export default CurrencyBox;
