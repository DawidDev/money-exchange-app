import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

// Import komponentów
import CurrencyBox from "../components/CurrencyBox";
import RenderTitle from "../components/RenderTitle";
import RenderChart from "../components/RenderChart";

const ChartBox = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 3rem;
  padding-bottom: 4rem;
`;

const MainContainer = styled.div`
  .link-box {
    width: 100%;
    overflow: hidden;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .link-back {
      background-color: transparent;
      height: 2rem;
      padding: 0.25rem 0.75rem;
      text-decoration: none;
      color: #4e5255;
      transition: 0.25s;

      :hover {
        color: #29b35e;
      }
    }
  }
`;

const SelectedCurrency = () => {
  const { name } = useParams();

  const [data, setData] = useState<any>([]);
  const [info, setInfo] = useState<any>({});
  // Pobieranie z API danych na temat ostatnich kursów
  const url_last_courses = `http://api.nbp.pl/api/exchangerates/rates/a/${name}/last/30/`;
  useEffect(() => {
    fetch(url_last_courses)
      .then((res) => res.json())
      .then((res) => {
        if (data.length === 0) {
          const infoObject = {
            fullName: res.currency,
            codeCurrency: res.code,
            lastValue: res.rates[0].mid,
            lastValueDate: res.rates[0].effectiveDate,
          };
          setData(res);
          setInfo(infoObject);
        }
      });
  });
  console.log(info);

  let nameBox: string = info.fullName ? info.fullName : "brak";
  let shortNameBox: string = info.codeCurrency ? info.codeCurrency : "brak";
  let lastValueBox: number = info.lastValue ? info.lastValue : "brak";
  let lastValueDate: string = info.lastValueDate ? info.lastValueDate : "brak";

  return (
    <div data-aos="fade-zoom-in">
      <MainContainer>
        <RenderTitle textDark={`Kurs (${shortNameBox})`} textGreen={nameBox} />
        {info.codeCurrency ? (
          <CurrencyBox
            id={1}
            name={nameBox}
            shortName={shortNameBox}
            buy={lastValueBox}
          />
        ) : null}
        <ChartBox>{data ? <RenderChart dataTab={data} /> : null}</ChartBox>
        <div className="link-box">
          <Link to="/all-courses" className="link-back">
            Powrót do listy
          </Link>
        </div>
      </MainContainer>
    </div>
  );
};

export default SelectedCurrency;

/*

    const downloadData_1 = fetch(url)
    const downloadData_last = fetch(url_last_courses)

    // Przygotowana funkcja na wykonanie kilku zapytań do api
    const promiseAll = Promise.all([downloadData_last, downloadData_1])
        .then(responses => {
            const toJsonTab = responses.map(item => item.json())
            return toJsonTab
        })
        .then(res => {
            // Ustawianie w state pobranych danych do działania na nich
            if(data.length === 0 ) setData(res)
            
        })
        .catch(err => console.log(err))

*/
