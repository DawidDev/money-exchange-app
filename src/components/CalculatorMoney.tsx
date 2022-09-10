import React, { useState } from "react";
import styled from "styled-components";
import { Select, MenuItem } from "@mui/material";

const MainContainer = styled.div`
  width: 60%;
  height: 10rem;
  position: absolute;
  right: 0;
  top: 28rem;
  transform: translateY(-50%);

  .calculator {
    width: 100%;
    height: 100%;
    display: flex;

    .box-1,
    .box-2 {
      width: 50%;
      height: 100%;
    }

    .box-1, .box-2 {
      background-color: #f4f2ee;
      position: relative;
      padding: 1rem;
      .line-1 {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .select-input {
          width: 50%;
          font-size: 1.5rem;
        }
      }

      input {
        width: 80%;
        border: none;
        border-bottom: 2px solid #4e5255;
        position: absolute;
        bottom: 1.25rem;
        left: 50%;
        transform: translateX(-50%);
        background-color: transparent;
        text-align: center;
        color: #4e5255;
        font-weight: 400;
        letter-spacing: 1px;
        font-size: 2.5rem;
      }

      input[type="number"] {
        -moz-appearance: textfield;
      }

      input:focus {
        outline: none;
      }
    }

    .box-2 {
      background-color: #29b35e;

      input {
        color: #fff;
        border: none;
      }
    }
  }

  h2 {
    font-size: 1.35rem;
    font-weight: 500;
    color: #4e5255;
    margin-bottom: 0.5rem;

    span {
      color: #29b35e;
    }
  }
`;

const CalculatorMoney = () => {

  // Aktualnie wybrana opcja (nazwa waluty)
  const [optionChoosed, setOptionChoosed] = useState("EUR");
  const handleOption = (e: any) => {
    const newValue = e.target.value;
    setOptionChoosed(newValue);
    console.log(newValue);
  };

  // Aktualnie wprowadzona wartość do kalkulacji
  const [valueInput, setValueInput] = useState(0);
  const handleValueInput = (e: any) => {
    setValueInput(e.target.value);
    handleCalculateValue(optionChoosed, e.target.value, 0.42)
  }

  // Aktualnie wybrana nazwa waluty do kalulacji 
  const [resultOptionChoosed, setResultOptionChoosed] = useState("CHF");
  const handleResultOption = (e:any) => {
    setResultOptionChoosed(e.target.value)
  }

  // Aktualnie przekalkulowana wartość po konwersji waluty
  const [afterCalculateValue, setCalculateValue] = useState(0);
  const handleCalculateValue = (name:string, value:number, multiplier:number) => {
    const newValue:number = (value * multiplier);
    setCalculateValue(newValue)
  }

  // Tablica zawierająca dostępne waluty do wyboru
  const optionsTab = ["EUR", "CHF", "FRA"];

  // Funkcja zwracająca opcje dla elementu Select
  const SelectOptions = (option:string) => optionsTab.map((item) => (
    <MenuItem
      key={item}
      value={item}
      className={"select-option"}
      sx={{
        width: "100%",
        border: 'none',
        color: option === 'input' ? '#4e5255' : '#29B35E',
        '&:hover': {
            backgroundColor: '#c1e9d0',
          },
          '&.Mui-selected': {
            color: '#fff',  
            backgroundColor: '#29B35E',
          },
      }}
    >
      {item}
    </MenuItem>
  ));

  return (
    <MainContainer>
      <h2>
        Szybki <span>przelicznik</span> walut
      </h2>
      <div className="calculator">
        <div className="box-1">
          <div className="line-1">
            <p>
              Kwota <strong>do</strong> kalkulacji
            </p>
            <Select
              value={optionChoosed}
              onChange={handleOption}
              className={"select-input"}
            >
              {SelectOptions('input')}
            </Select>
          </div>
          <input
            type={"number"}
            className={"input-value"}
            value={valueInput}
            onChange={handleValueInput}
          />
        </div>
        <div className="box-2">
        <div className="line-1">
            <p>
              Kwota <strong>do</strong> kalkulacji
            </p>
            <Select
              value={resultOptionChoosed}
              onChange={handleResultOption}
              className={"select-input"}
              sx={{
                color: '#fff'
              }}
            >
              {SelectOptions('result')}
            </Select>
            <input
            type={"number"}
            className={"input-value"}
            value={afterCalculateValue}

          />
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default CalculatorMoney;
