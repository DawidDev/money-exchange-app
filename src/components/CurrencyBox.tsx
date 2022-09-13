import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CurrencyContainer = styled.div`
  border-bottom: 1px solid #f4f2ee;
  width: 90%;
  max-width: 1200px;
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

  #sell,
  #buy {
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
    color: #29b35e;
    cursor: pointer;
  }

  .link {
    color: #29b35e;
    text-decoration: none;
    font-size: 0.875rem;
  }
`;

type CurrencyBoxProps = {
  id: number;
  name: string;
  shortName: string;
  buy: number;
};

const CurrencyBox = (props: CurrencyBoxProps) => {
  const localStorageList = localStorage.watchedList.split("-");

  // Stan pobierający informacje z lokalnej pamięci czy waluta jest dodana do ulubionych
  const [typeBtn, setTypeBtn] = useState(
    localStorageList.indexOf(props.shortName)
  );
  
  console.log(typeBtn);
  // Stan zawierający lokalną tablice pobraną z pamięci przeglądarki
  const [localTab, setLocalTab] = useState<Array<string>>(localStorageList);

  const addToWatchedList: any = () => {
    // Obsługa dodawania do pamięci przeglądarki krótkich nazw walut, obserwowanych
    // Jeśli nie ma na liście tej waluty to dodaj do localStorage
    if (localStorageList.indexOf(props.shortName) === -1) {
      let array = [];
      if (localStorage.watchedList.length > 0) {
        localStorage.watchedList += `-${props.shortName}`;
      } else {
        localStorage.watchedList += `${props.shortName}`;
      }
      //array = localStorage.watchedList.split("-");
      //console.log(array)
      //setLocalTab(array);
      setTypeBtn(1);
    }
  };

  //console.log(typeBtn);

  // Obsługa usuwania z localStorage wybranej waluty
  const removeFromWatched = () => {
    console.log("Usuwam");
    let array = localStorageList.filter((item: any) => item !== props.shortName)
    //console.log(array)
    let temporaryLocalStorage = "";

    array.forEach((item: any) => {
      if (array.length > 1) {
        temporaryLocalStorage += `-${item}`;
      } else if (array.length === 1) {
        temporaryLocalStorage = `${item}`;
      } else {
        temporaryLocalStorage = "";
      }
    });

    console.log(localStorageList);
    localStorage.watchedList = temporaryLocalStorage;
    //setLocalTab(array);
    setTypeBtn(-1);
  };

  //console.log(typeBtn)
  const fnkToBtnHandle = typeBtn === -1 ? addToWatchedList : removeFromWatched;
  console.log(localStorageList);

  return (
    <CurrencyContainer>
      <p id="short-name">{props.shortName}</p>
      <p id="name">{props.name}</p>
      <p id="buy">{props.buy}</p>
      <button onClick={fnkToBtnHandle}>
        {typeBtn === -1 ? "Dodaj" : "Usuń"}
      </button>
      <Link className="link" to={`/all-courses/${props.shortName}`}>
        Szczegóły
      </Link>
    </CurrencyContainer>
  );
};

export default CurrencyBox;
