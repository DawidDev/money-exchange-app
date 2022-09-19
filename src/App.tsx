import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";

// Import komponentów
import PageManage from "./layouts/PageManage";
import Navigation from "./components/navigation";
import { BrowserRouter as Router } from "react-router-dom";

import { AppContext } from "./context/AppContext";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "./layouts/Footer";

const AppContainer = styled.div`
  margin: 0 auto;
  //border: 1px solid red;
  font-family: "Poppins", sans-serif;
  z-index: 0;
  min-height: 78.3vh;

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

    // Tworzenie miejsca w localStorage jeśli nie ma danych dla aplikacji zapisanych wcześniej
    if (localStorage.getItem("watchedList") === null) {
      localStorage.setItem("watchedList", '');
  }

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
  console.log(exchangeValues);

  // Efekt ładowania danych. Bez pobrania danych aplikacja się nie uruchomi.
  const content = exchangeValues.length > 0 ? <PageManage /> : <CircularProgress
  sx={{
    color: "#29B35E",
    margin: "0 auto",
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translateY(-50%)',
  }}
/>

  return (
    <>
    <AppContainer>
      <AppContext.Provider value={exchangeValues}>
        <Router>
          <Navigation />
          {content}
        </Router>
      </AppContext.Provider>
    </AppContainer>
    <Footer/>
    </>
  );
}

export default App;
