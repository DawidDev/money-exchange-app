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
    background-color: #29b35e;
    font-weight: 500;
    color: #fff;
    font-family: "Poppins", sans-serif;
    transition: 0.25s;
    width: 3.5rem;
    font-size: 0.75rem;
  }

  button:hover {
    color: #29b35e;
    background-color: #fff;
    border: 1px solid #29b35e;
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
  refreshState? : ()=> void;
};

const CurrencyBox = (props: CurrencyBoxProps) => {
  let localStorageList = localStorage.watchedList.split("-");

  // Stan pobierający informacje z lokalnej pamięci czy waluta jest dodana do ulubionych
  const [typeBtn, setTypeBtn] = useState(
    localStorageList.indexOf(props.shortName)
  );
  const addToWatchedList: any = () => {
    // Ponowne przypisanie do zmiennej lokalnej komponentu wartości listy z pamięci podręcznej dla aktualizacji i uniknięcia błędów
    localStorageList = localStorage.watchedList.split("-");
    // Obsługa dodawania do pamięci przeglądarki krótkich nazw walut, obserwowanych
    // Jeśli nie ma na liście tej waluty to dodaj do localStorage
    if (localStorageList.indexOf(props.shortName) === -1) {
      if (localStorage.watchedList.length > 0) {
        localStorage.watchedList += `-${props.shortName}`;
      } else {
        localStorage.watchedList += `${props.shortName}`;
      }
      setTypeBtn(1);
    }
  };

  //console.log(typeBtn);

  // Obsługa usuwania z localStorage wybranej waluty
  const removeFromWatched = () => {
    // Ponowne przypisanie do zmiennej lokalnej komponentu wartości listy z pamięci podręcznej dla aktualizacji i uniknięcia błędów
    localStorageList = localStorage.watchedList.split("-");
    console.log("Usuwam");
    let array = localStorageList.filter((item: any) => item !== props.shortName)
    //console.log(array)
    let temporaryLocalStorage = "";


    for (let i = 0; i < array.length; i++) {
      if(array.length > 1) {
        if(array.length-1 === i) {
          temporaryLocalStorage += `${array[i]}`
        }
        else {
          temporaryLocalStorage += `${array[i]}-`;
        }
      }
      else if (array.length === 1) temporaryLocalStorage = `${array[i]}`
      else if(array.length === 0) temporaryLocalStorage = ''
      
    }

    localStorage.watchedList = temporaryLocalStorage;
    setTypeBtn(-1);
    if(props.refreshState) props.refreshState()
  };

  // Decyzja: która funckja obsługiwana będzie z przycisku
  const fnkToBtnHandle = typeBtn === -1 ? addToWatchedList : removeFromWatched;
  console.log(localStorageList);

  return (
    <CurrencyContainer>
      <p id="short-name">{props.shortName}</p>
      <p id="name">{props.name}</p>
      <p id="buy">{props.buy}</p>
      <button onClick={fnkToBtnHandle}>
        {typeBtn === -1 && !props.refreshState? "Dodaj" : "Usuń"}
      </button>
      <Link className="link" to={`/all-courses/${props.shortName}`}>
        Szczegóły
      </Link>
    </CurrencyContainer>
  );
};

export default CurrencyBox;
