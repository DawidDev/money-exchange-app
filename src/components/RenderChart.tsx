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
    height: 100%;
`

const ButtonContainer = styled.div`
  width: 100%;
  border: 1px solid red;
  display: flex;
  justify-content: center;

  button {
    border: none;
    padding: 0.25rem;
    font-size: 1rem;
    margin: 0 0.5rem;
    transition: 0.25s;
    color: #4e5255;
    background-color: #f4f4f4;
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
  const [numberLast, setNumberLast] = useState(7);
  const handleNumberLast: any = (value: number) => {
    console.log("Renderuje dla dni: " + value);
    setNumberLast(value);
  };

  // Domyślne dane w przypadku braku otrzymania ich z komponentu wyższego rzędu
  const data = [
    { name: "Page A", uv: 800 },
    { name: "Page B", uv: 480 },
  ];

  // Tablica w której znajdują się albo dane domyślne albo pobranez api
  let localTab = data;
  if (props.dataTab.rates) {
    const toChartTab = props.dataTab.rates.map((item: any) => {
      return {
        name: item.effectiveDate.substring(5, 10),
        uv: item.mid,
      };
    });
    localTab = toChartTab;
    localTab = localTab.slice(localTab.length - numberLast, localTab.length);
  }

  const Buttons = () => (
    <>
      <button onClick={handleNumberLast.bind(this, 3)}>Ostatnie 3 dni</button>
      <button onClick={handleNumberLast.bind(this, 7)}>Ostatnie 7 dni</button>
      <button onClick={handleNumberLast.bind(this, 21)}>Ostatnie 21 dni</button>
      <button onClick={handleNumberLast.bind(this, 30)}>Ostatnie 30 dni</button>
    </>
  );

  return (
    <>
      <ChartContainer>
        <ResponsiveContainer width='100%' height='75%'>
          <LineChart
            width={500}
            height={300}
            data={localTab}
            margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="uv" stroke="#29b35e" />
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
