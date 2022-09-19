import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

// Import komponentów
import CurrencyBox from "../components/CurrencyBox";
import RenderTitle from "../components/RenderTitle";
import RenderChart from "../components/RenderChart";

const ChartBox = styled.div`
width: 50%;
height: 300px;
margin-top: 3rem;
`

const SelectedCurrency = () => {
  const { name } = useParams();
  //console.log("Wybrana waluta: " + name);

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
  //console.log(data);
  console.log(info);

  let nameBox: string = info.fullName ? info.fullName : "brak";
  let shortNameBox: string = info.codeCurrency ? info.codeCurrency : "brak";
  let lastValueBox: number = info.lastValue ? info.lastValue : "brak";
  let lastValueDate: string = info.lastValueDate ? info.lastValueDate : "brak";

  return (
    <>
      <RenderTitle textDark={`Kurs (${shortNameBox})`} textGreen={nameBox} />
      {info.codeCurrency ? <CurrencyBox
        id={1}
        name={nameBox}
        shortName={shortNameBox}
        buy={lastValueBox}
      /> : null}
      <Link to="/all-courses">Powrót do listy</Link>
      <br/>
      <ChartBox>
      {data ? <RenderChart dataTab={data} /> : null}
      </ChartBox>
      
    </>
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
