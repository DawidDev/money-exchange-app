import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgress, ratingClasses } from "@mui/material";

// Import komponentów
import RenderChart from "./RenderChart";

const MainContainer = styled.div`
  max-width: 28rem;
  width: 100%;
  height: 22rem;
  position: relative;

  .box-chart {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    .additional-info {
      width: 100%;
      font-size: 1rem;
      text-align: center;
      margin-bottom: 1rem;

      span {
        font-size: 1.5rem;
        color: #1FC686;
        margin-left: 0.5rem;
      }

    }

  }

  @media (max-width: 767px) {
    order: 3;
    margin: 2rem auto;
  }
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  button {
    width: 25%;
    border: none;
    background-color: transparent;
    color: #b0a88a;
    font-size: 1.5rem;
    font-weight: 500;
    transition: 0.25s;
    position: relative;
    padding-bottom: 0.5rem;

    ::after {
      content: '';
      width: 60%;
      height: 2px;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      bottom: 0;
      opacity: 0;
      transition: 0.25s;
    }
  }

  .active-btn {
    color: #29b35e;

    ::after {
      background-color: #29b35e !important;
      opacity: 1 !important;
    }
  }

  @media (max-width: 767px) {
    button {
      font-size: 1.75rem;
      margin: 1rem 0rem;
    }
  }
  @media (min-width: 1024px) {
    button:hover {
      cursor: pointer;
    }    
  }
`;

type namesCharts = "EUR" | "CHF" | "USD" | "BGN";

const CoursesBlock = () => {
  const [data, setData] = useState<any>([]);
  const [choosedChart, setChoosedChart] = useState<namesCharts>("EUR");
  const handleCharts = (e: any) => {
    //setChoosedChart(value);
    const name = e.target.name;
    setChoosedChart(name);
    // Obsługa zaznaczania aktualnie wybranego kursu (wykresu)
    customizeLink(choosedChart);
  };

  // Funkcja obsługująca zmianę zaznaczenia nazwy wykresu
  const customizeLink = (name: string) => {
    const allBtn = document.querySelectorAll("[data-active='true']");
    allBtn.forEach((item) => {
      item.classList.remove("active-btn");
    });
    const activeBtn = document.querySelectorAll(`[name='${name}']`);
    activeBtn.forEach((item) => item.classList.add("active-btn"));
  };
  customizeLink(choosedChart);

  // Przypisanie danych z pobranych z API do wybranego wykresu
  const dataToChart = data.filter((item: any) => item.code === choosedChart);
  //console.log(dataToChart.length > 0 ? dataToChart[0].rates : "null");
  // Decyzja o wyświetlaniu wykresu czy informacji ładowania
  let displayChart =
    dataToChart.length > 0 ? (
      <>
      <div className="additional-info">
        <p>Średni kurs: <span>{(dataToChart[0].rates[dataToChart[0].rates.length - 1].mid).toFixed(2)} zł</span></p>
      </div>
      <RenderChart dataTab={dataToChart[0]} />
      </>
    ) : (
      <CircularProgress
        sx={{
          color: "#29B35E",
        }}
      />
    );

  useEffect(() => {
    // URL do poszczególnych zapytań o wybraną walutę
    const urls = [
      "http://api.nbp.pl/api/exchangerates/rates/a/eur/last/30/",
      "http://api.nbp.pl/api/exchangerates/rates/a/chf/last/30/",
      "http://api.nbp.pl/api/exchangerates/rates/a/usd/last/30/",
      "http://api.nbp.pl/api/exchangerates/rates/a/bgn/last/30/",
    ];
    const promises = urls.map((url) => fetch(url));

    Promise.all(promises)
      .then((res) => {
        const jsonTab = res.map((item) => item.json());
        return jsonTab;
      })
      .then((res) => {
        let tab: any = [];
        res.forEach((item) => item.then((res) => tab.push(res)));
        return tab;
      })
      .then((tab) => {
        setTimeout(() => {
          setData(tab);
        }, 500);
      });
  }, []);

  return (
    <MainContainer>
      <ButtonsBox>
        <button data-active="true" name="EUR" onClick={handleCharts.bind(this)}>
          EUR
        </button>
        <button data-active="true" name="CHF" onClick={handleCharts.bind(this)}>
          CHF
        </button>
        <button data-active="true" name="USD" onClick={handleCharts.bind(this)}>
          USD
        </button>
        <button data-active="true" name="BGN" onClick={handleCharts.bind(this)}>
          BGN
        </button>
      </ButtonsBox>
      <div className="box-chart ">{displayChart}</div>
    </MainContainer>
  );
};

export default CoursesBlock;
