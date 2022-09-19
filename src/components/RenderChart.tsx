import React, { useState } from "react";
import styled from "styled-components";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartContainer = styled.div`
    width: 100%;
    height: 14rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  button {
    border: none;
    padding: 0.25rem;
    font-size: 1rem;
    margin: 0 0.5rem;
    transition: 0.25s;
    color: #4e5255;
    background-color: transparent;
    outline: none;

    :hover {
      background-color: #29b35e;
      color: #fff;
      cursor: pointer;
    }
  }
`;

type renderChartType = {
  dataTab: any;
};

const RenderChart = (props: renderChartType) => {
  const [numberLast, setNumberLast] = useState(30);
  const handleNumberLast: any = (value: number) => {
    console.log("Renderuje dla dni: " + value);
    setNumberLast(value);
  };

  // Domyślne dane w przypadku braku otrzymania ich z komponentu wyższego rzędu
  const data = [
    { name: "Page A", course: 800 },
    { name: "Page B", course: 480 },
  ];

  // Tablica w której znajdują się albo dane domyślne albo pobranez api
  let localTab = data;
  if (props.dataTab.rates) {
    const toChartTab = props.dataTab.rates.map((item: any) => {
      return {
        name: item.effectiveDate.substring(5, 10),
        kurs: item.mid,
      };
    });
    localTab = toChartTab;
    localTab = localTab.slice(localTab.length - numberLast, localTab.length);
  }

  const Buttons = () => (
    <>
      <button onClick={handleNumberLast.bind(this, 3)}>3 dni</button>
      <button onClick={handleNumberLast.bind(this, 7)}>7 dni</button>
      <button onClick={handleNumberLast.bind(this, 21)}>21 dni</button>
      <button onClick={handleNumberLast.bind(this, 30)}>30 dni</button>
    </>
  );

  return (
    <>
      <ChartContainer>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            width={500}
            height={300}
            data={localTab}
            margin={{ top: 5, right: 5, bottom: 5, left: -30 }}
          >
            <Line type="monotone" dataKey="kurs" stroke="#29b35e" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
        <ButtonContainer>
          <Buttons />
        </ButtonContainer>
      </ChartContainer>
    </>
  );
};

export default RenderChart;
