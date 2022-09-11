import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";

// Import komponentów
import PageManage from "./layouts/PageManage";
import Navigation from "./components/navigation";
import { BrowserRouter as Router } from "react-router-dom";

import { AppContext } from "./context/AppContext";

const AppContainer = styled.div`
  margin: 0 auto;
  //border: 1px solid red;
  font-family: "Poppins", sans-serif;
  z-index: 0;

  @media (min-width: 768px) {
    max-width: 1400px;
    width: 100%;
    padding: 0 1rem;
  }
`;

function App() {
  const [exchangeValues, setExchangeValues] = useState<any>([]);
  const url = "http://api.nbp.pl/api/exchangerates/tables/a/?format=json";
  useEffect(() => {
    if (exchangeValues.length === 0) {
      fetch(url)
        .then((response) => {
          if (response.status !== 200) {
            throw Error("Błąd zapytania");
          } else {
            console.log("POBIERAM");
            return response.json();
          }
        })
        .then((res) => setExchangeValues(res[0].rates));
    }
  });
  //console.log("KOMPONENT GŁÓWNY");
  //console.log(exchangeValues);

  return (
    <AppContainer>
      <AppContext.Provider value={exchangeValues}>
        <Router>
          <Navigation />
          <PageManage />
        </Router>
      </AppContext.Provider>
    </AppContainer>
  );
}

export default App;
