import React from "react";
import styled from "styled-components";

const HeadersContainer = styled.div`
  border-bottom: 1px solid #f4f2ee;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.45rem 0;
  font-weight: 600;
  color: #4E5255;
  padding-bottom: 1rem;

  #short-name {
    width: 10%;
  }

  #name {
    width: 30%;
  }

  #sell,
  #buy {
    width: 15%;
  }

  #btn {
    width: 1.5rem;
    visibility: hidden;
  }
  @media (max-width: 767px) {
    height: 2rem;
    padding-bottom: 2.5rem;
    font-size: 0.75rem;
  }
`;

const TableHeaders = () => {
  return (
    <HeadersContainer>
      <p id="short-name">Kod</p>
      <p id="name">Nazwa</p>
      <p id="buy">Cena zakupu (zł)</p>
      <p id="btn">Obserwuj</p>
      <p id="details">Sprawdź</p>
    </HeadersContainer>
  );
};

export default TableHeaders;
