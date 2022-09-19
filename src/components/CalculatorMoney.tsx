import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Select, MenuItem } from "@mui/material";

import { AppContext } from "../context/AppContext";

const MainContainer = styled.div`
  width: 60%;
  height: 10rem;
  position: absolute;
  right: 0;
  top: 28rem;
  transform: translateY(-50%);
  z-index: 1;

  .calculator {
    width: 100%;
    height: 100%;
    display: flex;
    box-shadow: 0px 11px 24px -11px rgba(66, 68, 90, 1);

    .box-1,
    .box-2 {
      width: 50%;
      height: 100%;
    }

    .box-1,
    .box-2 {
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

      p {
        color: #fff;
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
  @media (max-width: 768px) {
    position: relative;
    width: 100% !important;
    order: 2;
    transform: translateY(0%);
    top: 0;
    height: auto;

    .calculator {
      flex-direction: column;

      .box-1,
      .box-2 {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .line-1 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 40%;

          .select-input {
            width: 100%;
            font-size: 1.5rem;
          }
        }

        input {
          width: 55%;
          height: 100%;
          bottom: 0;
          position: relative;
          left: 0%;
          transform: translateX(0%);
          text-align: right;
        }

        p {
          display: none;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    width: 45%;
    .calculator {
      flex-direction: column;

      .box-1,
      .box-2 {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .line-1 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 40%;

          .select-input {
            width: 100%;
            font-size: 1.5rem;
          }
        }

        input {
          width: 55%;
          height: 100%;
          bottom: 0;
          position: relative;
          left: 0%;
          transform: translateX(0%);
          text-align: right;
        }

        p {
          display: none;
        }
      }
    }
  }
`;

const CalculatorMoney = () => {
  // Pobieranie z kontekstu tablicy z danymi o
  const MoneyGlobalTab = useContext(AppContext);
  //console.log(MoneyGlobalTab)

  // Tworzenie tablicy z polami do wyboru do kalkulacji
  const arrayOptionsValues = MoneyGlobalTab.map((item: any) => ({
    code: item.code,
    value: item.mid,
  }));

  // Aktualnie wybrana opcja (nazwa waluty)
  const [optionChoosed, setOptionChoosed] = useState("EUR");
  const handleOption = (e: any) => {
    const newValue = e.target.value;
    setOptionChoosed(newValue);
    setValueInput(0);
    setCalculateValue(0);
  };

  // Aktualnie wprowadzona wartość do kalkulacji
  const [valueInput, setValueInput] = useState(0);
  const handleValueInput = (e: any) => {
    if (!isNaN(e.target.value)) {
      const value = parseFloat(e.target.value);
      handleCalculateValue(value);
      setValueInput(value);
    } else {
      setValueInput(0);
    }
  };

  // Aktualnie wybrana nazwa waluty do kalulacji
  const [resultOptionChoosed, setResultOptionChoosed] = useState("CHF");
  const handleResultOption = (e: any) => {
    setValueInput(0);
    setCalculateValue(0);
    setResultOptionChoosed(e.target.value);
  };

  // Aktualnie przekalkulowana wartość po konwersji waluty
  const [afterCalculateValue, setCalculateValue] = useState(0);
  const handleCalculateValue = (number: number) => {
    // Przypisanie do zmiennych wartości dwóch walut wybranych do kalkulacji
    const firstValue: any = arrayOptionsValues.filter(
      (item: any) => item.code === optionChoosed
    );
    const secondValue: any = arrayOptionsValues.filter(
      (item: any) => item.code === resultOptionChoosed
    );

    // Kalkulacja wyniku
    let newValue = Math.round(
      (number * firstValue[0].value) / secondValue[0].value
    );
    setCalculateValue(newValue);
  };

  // Tablica zawierająca dostępne waluty do wyboru
  const optionsTab = arrayOptionsValues.map((item: any) => item.code);

  // Funkcja zwracająca opcje dla elementu Select
  const SelectOptions = (option: string) =>
    optionsTab.map((item) => (
      <MenuItem
        key={item}
        value={item}
        className={"select-option"}
        sx={{
          width: "100%",
          border: "none",
          color: option === "input" ? "#4e5255" : "#29B35E",
          "&:hover": {
            backgroundColor: "#c1e9d0",
          },
          "&.Mui-selected": {
            color: "#fff",
            backgroundColor: "#29B35E",
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
              {SelectOptions("input")}
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
              Kwota <strong>po</strong> kalkulacji
            </p>
            <Select
              value={resultOptionChoosed}
              onChange={handleResultOption}
              className={"select-input"}
              sx={{
                color: "#fff",
              }}
            >
              {SelectOptions("result")}
            </Select>
          </div>
          <input
            type={"number"}
            className={"input-value"}
            value={afterCalculateValue}
            disabled={true}
          />
        </div>
      </div>
    </MainContainer>
  );
};

export default CalculatorMoney;
